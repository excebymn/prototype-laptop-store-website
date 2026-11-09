"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, RotateCcw, SearchX } from "lucide-react";
import { useStore } from "@/store";
import {
  CATEGORY_OPTIONS,
  RAM_OPTIONS,
  STORAGE_OPTIONS,
  storageLabel,
} from "@/lib/catalog-options";
import { FinderResultCard } from "@/components/finder-result-card";
import { RevealItem, RevealStagger } from "@/components/motion";
import type { Category } from "@/lib/data";

type StepId = "purpose" | "budget" | "ram" | "storage" | "brand";

const STEPS: { id: StepId; question: string }[] = [
  { id: "purpose", question: "Buat apa laptopnya?" },
  { id: "budget", question: "Berapa budget kamu?" },
  { id: "ram", question: "RAM minimal berapa?" },
  { id: "storage", question: "Penyimpanan minimal berapa?" },
  { id: "brand", question: "Ada brand favorit?" },
];

const MAX_RESULTS_SHOWN = 6;

function optionButtonClass(isSelected: boolean) {
  return `rounded-md border px-4 py-2 text-sm font-medium transition-colors ${
    isSelected
      ? "border-brand bg-brand/10 text-brand-dark"
      : "border-surface text-slate hover:border-ink hover:text-ink"
  }`;
}

interface SmartFinderProps {
  initialPurpose?: Category;
}

export function SmartFinder({ initialPurpose }: SmartFinderProps) {
  const answers = useStore((s) => s.answers);
  const results = useStore((s) => s.results);
  const isCalculating = useStore((s) => s.isCalculating);
  const finderError = useStore((s) => s.finderError);
  const brands = useStore((s) => s.brands);
  const setAnswer = useStore((s) => s.setAnswer);
  const resetAnswers = useStore((s) => s.resetAnswers);
  const runFinder = useStore((s) => s.runFinder);
  const fetchBrands = useStore((s) => s.fetchBrands);

  const [stepIndex, setStepIndex] = useState(0);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [budgetInput, setBudgetInput] = useState(answers.budget?.toString() ?? "");
  const appliedInitialPurpose = useRef(false);

  // Kalau datang dari Home lewat "Browse by Need" (?purpose=...), pre-select
  // jawaban purpose sekali di awal — user masih bisa ganti di step pertama.
  useEffect(() => {
    if (initialPurpose && !appliedInitialPurpose.current) {
      setAnswer("purpose", initialPurpose);
      appliedInitialPurpose.current = true;
    }
  }, [initialPurpose, setAnswer]);

  useEffect(() => {
    void fetchBrands();
  }, [fetchBrands]);

  const isLastStep = stepIndex === STEPS.length - 1;
  const currentStep = STEPS[stepIndex];

  const commitBudget = () => {
    setAnswer("budget", budgetInput ? Number(budgetInput) : undefined);
  };

  const runSearch = async () => {
    await runFinder();
    setHasSubmitted(true);
  };

  const handleNext = () => {
    if (currentStep.id === "budget") commitBudget();
    if (isLastStep) {
      void runSearch();
    } else {
      setStepIndex((i) => i + 1);
    }
  };

  const handleSkip = () => {
    if (currentStep.id === "budget") {
      setBudgetInput("");
      setAnswer("budget", undefined);
    }
    if (isLastStep) {
      void runSearch();
    } else {
      setStepIndex((i) => i + 1);
    }
  };

  const handleBack = () => setStepIndex((i) => Math.max(0, i - 1));

  const handleReset = () => {
    resetAnswers();
    setBudgetInput("");
    setStepIndex(0);
    setHasSubmitted(false);
  };

  if (hasSubmitted) {
    const topResults = results.slice(0, MAX_RESULTS_SHOWN);

    if (finderError) {
      return (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <SearchX className="text-slate h-10 w-10" aria-hidden="true" />
          <p className="text-ink font-medium">{finderError}</p>
          <button
            type="button"
            onClick={() => void runSearch()}
            className="border-ink text-ink inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-semibold"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Coba Lagi
          </button>
        </div>
      );
    }

    if (topResults.length === 0) {
      return (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <SearchX className="text-slate h-10 w-10" aria-hidden="true" />
          <p className="text-ink font-medium">Semua pertanyaan dilewati.</p>
          <p className="text-slate max-w-sm text-sm">
            Belum ada kriteria buat dicocokkan. Coba isi minimal satu pertanyaan, atau langsung
            lihat semua laptop di katalog.
          </p>
          <div className="mt-2 flex gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="border-ink text-ink inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-semibold"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Ulangi
            </button>
            <Link
              href="/laptops"
              className="bg-ink rounded-md px-4 py-2 text-sm font-semibold text-white"
            >
              Lihat Katalog
            </Link>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="flex items-center justify-between">
          <p className="text-slate text-sm">
            {results.length} laptop dicocokkan, {topResults.length} rekomendasi teratas:
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="text-slate hover:text-ink flex items-center gap-1.5 text-sm font-medium"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            Ulangi
          </button>
        </div>

        <RevealStagger
          className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.08}
        >
          {topResults.map((result, index) => (
            <RevealItem key={result.laptop.id}>
              <FinderResultCard result={result} rank={index + 1} />
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    );
  }

  return (
    <div className="border-surface rounded-lg border p-6 sm:p-8">
      {/* Progress dots */}
      <div className="flex items-center justify-center gap-2">
        {STEPS.map((step, index) => (
          <span
            key={step.id}
            className={`h-1.5 rounded-full transition-all ${
              index === stepIndex ? "bg-brand w-6" : index < stepIndex ? "bg-brand/50 w-1.5" : "bg-surface w-1.5"
            }`}
          />
        ))}
      </div>

      <p className="text-slate mt-4 text-center text-xs">
        Pertanyaan {stepIndex + 1} dari {STEPS.length} — boleh dilewati
      </p>

      {/* key = id langkah → tiap pertanyaan baru masuk dengan geser + fade */}
      <motion.div
        key={currentStep.id}
        initial={{ opacity: 0, x: 28 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
      >
      <h2 className="font-display text-ink mt-2 text-center text-xl font-semibold">
        {currentStep.question}
      </h2>

      <div className="mt-6 flex justify-center">
        {currentStep.id === "purpose" && (
          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORY_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setAnswer("purpose", option.value)}
                className={optionButtonClass(answers.purpose === option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}

        {currentStep.id === "budget" && (
          <input
            type="number"
            inputMode="numeric"
            placeholder="Contoh: 8000000"
            value={budgetInput}
            onChange={(e) => setBudgetInput(e.target.value)}
            onBlur={commitBudget}
            className="border-surface text-ink w-full max-w-xs rounded-md border px-3 py-2 text-center text-sm"
          />
        )}

        {currentStep.id === "ram" && (
          <div className="flex flex-wrap justify-center gap-2">
            {RAM_OPTIONS.map((ram) => (
              <button
                key={ram}
                type="button"
                onClick={() => setAnswer("ramMin", ram)}
                className={optionButtonClass(answers.ramMin === ram)}
              >
                {ram}GB+
              </button>
            ))}
          </div>
        )}

        {currentStep.id === "storage" && (
          <div className="flex flex-wrap justify-center gap-2">
            {STORAGE_OPTIONS.map((storage) => (
              <button
                key={storage}
                type="button"
                onClick={() => setAnswer("storageMin", storage)}
                className={optionButtonClass(answers.storageMin === storage)}
              >
                {storageLabel(storage)}
              </button>
            ))}
          </div>
        )}

        {currentStep.id === "brand" && (
          <div className="flex flex-wrap justify-center gap-2">
            {brands.map((brand) => (
              <button
                key={brand}
                type="button"
                onClick={() => setAnswer("brand", brand)}
                className={optionButtonClass(answers.brand === brand)}
              >
                {brand}
              </button>
            ))}
          </div>
        )}
      </div>
      </motion.div>

      <div className="mt-8 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={handleBack}
          disabled={stepIndex === 0}
          className="text-slate hover:text-ink flex items-center gap-1 text-sm font-medium disabled:opacity-0"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Kembali
        </button>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSkip}
            className="text-slate hover:text-ink text-sm font-medium"
          >
            Lewati
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={isCalculating}
            className="bg-ink inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {isCalculating ? "Mencari..." : isLastStep ? "Lihat Hasil" : "Lanjut"}
            {!isCalculating && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
          </button>
        </div>
      </div>
    </div>
  );
}
