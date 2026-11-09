"use client";

import { useState } from "react";
import { Check, Copy, Download, Link2 } from "lucide-react";
import type { Laptop } from "@/lib/data";
import { buildLaptopShareText } from "@/lib/share-text";
import { generateLaptopShareImage } from "@/lib/share-image";

// Tiga aksi share (Perencanaan §5.6). Semua pakai `window.location.href`
// sebagai sumber URL — sama seperti pola di ContactAdminButton — jadi
// komponen ini juga client-only.

type ActionStatus = "idle" | "working" | "done" | "error";

interface ProductShareProps {
  laptop: Laptop;
  storeName: string;
}

export function ProductShare({ laptop, storeName }: ProductShareProps) {
  const [imageStatus, setImageStatus] = useState<ActionStatus>("idle");
  const [infoStatus, setInfoStatus] = useState<ActionStatus>("idle");
  const [linkStatus, setLinkStatus] = useState<ActionStatus>("idle");

  const flashStatus = (setStatus: (status: ActionStatus) => void, status: ActionStatus) => {
    setStatus(status);
    if (status === "done" || status === "error") {
      setTimeout(() => setStatus("idle"), 2000);
    }
  };

  const handleSaveAsImage = async () => {
    setImageStatus("working");
    try {
      const blob = await generateLaptopShareImage(laptop, storeName);
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `${laptop.slug}.png`;
      anchor.click();
      URL.revokeObjectURL(url);
      flashStatus(setImageStatus, "done");
    } catch {
      flashStatus(setImageStatus, "error");
    }
  };

  const handleCopyInformation = async () => {
    setInfoStatus("working");
    try {
      const text = buildLaptopShareText(laptop, window.location.href);
      await navigator.clipboard.writeText(text);
      flashStatus(setInfoStatus, "done");
    } catch {
      flashStatus(setInfoStatus, "error");
    }
  };

  const handleCopyLink = async () => {
    setLinkStatus("working");
    try {
      await navigator.clipboard.writeText(window.location.href);
      flashStatus(setLinkStatus, "done");
    } catch {
      flashStatus(setLinkStatus, "error");
    }
  };

  return (
    <div className="border-surface flex flex-wrap gap-2 rounded-lg border p-3">
      <ShareButton
        icon={Download}
        label="Simpan Gambar"
        status={imageStatus}
        onClick={handleSaveAsImage}
        doneLabel="Tersimpan"
      />
      <ShareButton
        icon={Copy}
        label="Salin Info"
        status={infoStatus}
        onClick={handleCopyInformation}
        doneLabel="Tersalin"
      />
      <ShareButton
        icon={Link2}
        label="Salin Link"
        status={linkStatus}
        onClick={handleCopyLink}
        doneLabel="Tersalin"
      />
    </div>
  );
}

interface ShareButtonProps {
  icon: typeof Download;
  label: string;
  doneLabel: string;
  status: ActionStatus;
  onClick: () => void;
}

function ShareButton({ icon: Icon, label, doneLabel, status, onClick }: ShareButtonProps) {
  const isDone = status === "done";
  const isWorking = status === "working";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isWorking}
      className="border-surface text-slate hover:border-ink hover:text-ink inline-flex items-center gap-2 rounded-md border px-4 py-2 text-xs font-semibold transition-colors disabled:opacity-60"
    >
      {isDone ? (
        <Check className="text-moss h-3.5 w-3.5" aria-hidden="true" />
      ) : (
        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      )}
      {status === "error" ? "Gagal, coba lagi" : isDone ? doneLabel : label}
    </button>
  );
}
