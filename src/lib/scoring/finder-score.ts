// Smart Finder scoring — Perencanaan §6.
//
// Semua kriteria opsional karena setiap step di form Smart Finder bisa
// di-skip. `maxPossibleScore` dihitung dinamis dari kriteria yang benar-benar
// dijawab, supaya matchPercentage tetap adil buat user yang cuma isi
// sebagian pertanyaan — bukan dibagi terhadap skor maksimum tetap.

import type { FinderAnswers, FinderResult, Laptop } from "@/lib/data";

// Toleransi 10% di atas budget — laptop yang sedikit di atas budget masih
// dianggap "sesuai budget" daripada langsung dapat skor 0 untuk kriteria ini.
const BUDGET_TOLERANCE = 1.1;

const CRITERIA_WEIGHTS = {
  budget: 30,
  ramMin: 20,
  storageMin: 15,
  purpose: 20,
  brand: 10,
} as const satisfies Record<keyof FinderAnswers, number>;

function isWithinBudget(price: number, budget: number): boolean {
  return price <= budget * BUDGET_TOLERANCE;
}

interface EvaluatedCriterion {
  weight: number;
  met: boolean;
  reason: string;
}

function evaluateCriteria(laptop: Laptop, answers: FinderAnswers): EvaluatedCriterion[] {
  const criteria: EvaluatedCriterion[] = [];

  if (answers.budget !== undefined) {
    criteria.push({
      weight: CRITERIA_WEIGHTS.budget,
      met: isWithinBudget(laptop.price, answers.budget),
      reason: "Sesuai budget",
    });
  }

  if (answers.ramMin !== undefined) {
    criteria.push({
      weight: CRITERIA_WEIGHTS.ramMin,
      met: laptop.specs.ramGb >= answers.ramMin,
      reason: `RAM ${laptop.specs.ramGb}GB`,
    });
  }

  if (answers.storageMin !== undefined) {
    criteria.push({
      weight: CRITERIA_WEIGHTS.storageMin,
      met: laptop.specs.storageGb >= answers.storageMin,
      reason: `Storage ${laptop.specs.storageGb}GB`,
    });
  }

  if (answers.purpose !== undefined) {
    criteria.push({
      weight: CRITERIA_WEIGHTS.purpose,
      met: laptop.categories.includes(answers.purpose),
      reason: "Cocok untuk kebutuhanmu",
    });
  }

  if (answers.brand !== undefined) {
    criteria.push({
      weight: CRITERIA_WEIGHTS.brand,
      met: laptop.brand === answers.brand,
      reason: `Brand ${laptop.brand}`,
    });
  }

  // Preferensi tambahan (performa/mobilitas/layar, +5) belum ada field-nya di
  // `FinderAnswers` — bisa ditambahkan di sini nanti kalau form-nya berkembang.

  return criteria;
}

/** Skor satu laptop terhadap satu set jawaban. */
export function scoreLaptop(laptop: Laptop, answers: FinderAnswers): number {
  const criteria = evaluateCriteria(laptop, answers);
  return criteria.reduce((sum, c) => sum + (c.met ? c.weight : 0), 0);
}

function getMaxPossibleScore(answers: FinderAnswers): number {
  return (Object.keys(CRITERIA_WEIGHTS) as (keyof FinderAnswers)[]).reduce(
    (sum, key) => sum + (answers[key] !== undefined ? CRITERIA_WEIGHTS[key] : 0),
    0,
  );
}

function hasAnyAnswer(answers: FinderAnswers): boolean {
  return Object.values(answers).some((value) => value !== undefined);
}

/**
 * Ranking semua laptop berdasarkan jawaban Smart Finder, urut dari skor
 * tertinggi. Return array kosong kalau user belum jawab apa pun sama sekali
 * — tidak ada dasar buat scoring, jadi mending tampilkan pesan lain di UI
 * daripada nampilin "100% cocok" yang menyesatkan.
 */
export function rankLaptops(laptops: Laptop[], answers: FinderAnswers): FinderResult[] {
  if (!hasAnyAnswer(answers)) return [];

  const maxPossibleScore = getMaxPossibleScore(answers);

  return laptops
    .map((laptop) => {
      const criteria = evaluateCriteria(laptop, answers);
      const score = criteria.reduce((sum, c) => sum + (c.met ? c.weight : 0), 0);
      const reasons = criteria.filter((c) => c.met).map((c) => c.reason);

      return {
        laptop,
        score,
        matchPercentage: maxPossibleScore > 0 ? Math.round((score / maxPossibleScore) * 100) : 0,
        reasons,
      } satisfies FinderResult;
    })
    .sort((a, b) => b.score - a.score);
}
