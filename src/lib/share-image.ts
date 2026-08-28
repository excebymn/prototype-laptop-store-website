// Generator kartu produk untuk fitur "Save as Image" (Perencanaan §5.6).
//
// Pakai Canvas API native (bukan `html-to-image`) supaya tidak perlu tambah
// dependency baru — sesuai opsi kedua yang disebut di rencana. Fungsi ini
// client-only (pakai `document`/canvas), jadi hanya boleh dipanggil dari
// komponen "use client".
//
// Tampilan kartu sengaja meniru placeholder foto yang sudah ada di
// LaptopCard/LaptopGallery (panel gradient + ikon laptop), supaya konsisten
// walau belum ada foto produk asli. Begitu foto asli tersedia, bagian
// `drawPlaceholderPanel` tinggal diganti jadi `drawImage` dari foto laptop.

import type { Laptop } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import { CONDITION_LABEL } from "@/lib/laptop-display";

const WIDTH = 1080;
const HEIGHT = 1350;
const PADDING = 64;

const COLOR = {
  ink: "#16233a",
  paper: "#f6f4ee",
  surface: "#ede9df",
  gold: "#d1953a",
  goldDark: "#a9722a",
  slate: "#5b6472",
};

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
}

// Ikon laptop super-sederhana (layar + alas) — cukup untuk placeholder,
// tidak perlu import library ikon di dalam canvas.
function drawLaptopGlyph(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number) {
  ctx.save();
  ctx.strokeStyle = "rgba(255,255,255,0.35)";
  ctx.lineWidth = size * 0.035;
  ctx.lineJoin = "round";

  const screenW = size * 0.72;
  const screenH = size * 0.5;
  drawRoundedRect(ctx, cx - screenW / 2, cy - screenH, screenW, screenH, size * 0.05);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(cx - screenW / 2 - size * 0.08, cy + size * 0.06);
  ctx.lineTo(cx + screenW / 2 + size * 0.08, cy + size * 0.06);
  ctx.lineTo(cx + screenW / 2 + size * 0.02, cy + size * 0.12);
  ctx.lineTo(cx - screenW / 2 - size * 0.02, cy + size * 0.12);
  ctx.closePath();
  ctx.stroke();
  ctx.restore();
}

function drawPlaceholderPanel(ctx: CanvasRenderingContext2D, laptop: Laptop, panelHeight: number) {
  const gradient = ctx.createLinearGradient(0, 0, WIDTH, panelHeight);
  gradient.addColorStop(0, COLOR.ink);
  gradient.addColorStop(1, "#16233ab3");
  ctx.fillStyle = gradient;
  drawRoundedRect(ctx, PADDING, PADDING, WIDTH - PADDING * 2, panelHeight - PADDING, 24);
  ctx.fill();

  drawLaptopGlyph(ctx, WIDTH / 2, PADDING + (panelHeight - PADDING) / 2 + 40, 180);

  // Badge kondisi, pojok kanan atas panel — meniru border-dashed di UI.
  ctx.font = "700 26px 'Inter', sans-serif";
  const badgeText = CONDITION_LABEL[laptop.condition];
  const badgeMetrics = ctx.measureText(badgeText);
  const badgePaddingX = 20;
  const badgeWidth = badgeMetrics.width + badgePaddingX * 2;
  const badgeHeight = 52;
  const badgeX = WIDTH - PADDING - 24 - badgeWidth;
  const badgeY = PADDING + 24;

  ctx.fillStyle = COLOR.paper;
  drawRoundedRect(ctx, badgeX, badgeY, badgeWidth, badgeHeight, 10);
  ctx.fill();
  ctx.setLineDash([6, 5]);
  ctx.lineWidth = 3;
  ctx.strokeStyle = COLOR.gold;
  drawRoundedRect(ctx, badgeX, badgeY, badgeWidth, badgeHeight, 10);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = COLOR.goldDark;
  ctx.textBaseline = "middle";
  ctx.fillText(badgeText, badgeX + badgePaddingX, badgeY + badgeHeight / 2 + 2);
}

function drawSpecRow(ctx: CanvasRenderingContext2D, x: number, y: number, label: string) {
  ctx.fillStyle = COLOR.gold;
  ctx.beginPath();
  ctx.arc(x + 6, y - 8, 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = COLOR.slate;
  ctx.font = "500 30px 'Inter', sans-serif";
  ctx.textBaseline = "alphabetic";
  ctx.fillText(label, x + 26, y);
}

export async function generateLaptopShareImage(laptop: Laptop, storeName: string): Promise<Blob> {
  // Font sudah dipakai di halaman produk, jadi biasanya sudah termuat —
  // tunggu tetap dipasang untuk jaga-jaga (mis. klik terjadi sangat cepat).
  if (typeof document !== "undefined" && "fonts" in document) {
    await document.fonts.ready;
  }

  const canvas = document.createElement("canvas");
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas 2D context tidak tersedia di browser ini.");
  }

  // Background.
  ctx.fillStyle = COLOR.paper;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  const panelHeight = 620;
  drawPlaceholderPanel(ctx, laptop, panelHeight);

  let cursorY = panelHeight + 84;

  ctx.fillStyle = COLOR.slate;
  ctx.font = "600 30px 'Inter', sans-serif";
  ctx.textBaseline = "alphabetic";
  ctx.fillText(laptop.brand.toUpperCase(), PADDING, cursorY);
  cursorY += 62;

  ctx.fillStyle = COLOR.ink;
  ctx.font = "700 56px 'Space Grotesk', sans-serif";
  cursorY = drawWrappedText(ctx, laptop.name, PADDING, cursorY, WIDTH - PADDING * 2, 62);
  cursorY += 20;

  ctx.fillStyle = COLOR.ink;
  ctx.font = "600 52px 'IBM Plex Mono', monospace";
  ctx.fillText(formatPrice(laptop.price), PADDING, cursorY);
  cursorY += 70;

  // Divider.
  ctx.strokeStyle = COLOR.surface;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(PADDING, cursorY);
  ctx.lineTo(WIDTH - PADDING, cursorY);
  ctx.stroke();
  cursorY += 56;

  const { specs } = laptop;
  const specLines = [
    specs.cpu,
    `RAM ${specs.ramGb}GB`,
    `${specs.storageGb}GB ${specs.storageType}`,
    specs.display,
  ];
  for (const line of specLines) {
    drawSpecRow(ctx, PADDING, cursorY, line);
    cursorY += 54;
  }

  // Footer — branding toko, biar jelas dari mana kartu ini berasal saat
  // di-forward orang lain.
  ctx.fillStyle = COLOR.slate;
  ctx.font = "500 26px 'Inter', sans-serif";
  ctx.fillText(`via ${storeName}`, PADDING, HEIGHT - PADDING);

  return await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("Gagal membuat gambar."));
    }, "image/png");
  });
}

// Word-wrap sederhana untuk judul laptop yang panjang. Return posisi Y
// setelah baris terakhir supaya elemen berikutnya bisa disusun di bawahnya.
function drawWrappedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
): number {
  const words = text.split(" ");
  let line = "";
  let currentY = y;
  const maxLines = 2;
  let lineCount = 0;

  for (let i = 0; i < words.length; i++) {
    const testLine = line ? `${line} ${words[i]}` : words[i];
    if (ctx.measureText(testLine).width > maxWidth && line) {
      ctx.fillText(line, x, currentY);
      line = words[i];
      currentY += lineHeight;
      lineCount++;
      if (lineCount >= maxLines - 1) {
        // Baris terakhir yang diizinkan — gabung sisa kata, potong dengan "…" kalau kepanjangan.
        const remaining = words.slice(i).join(" ");
        line = truncateToWidth(ctx, remaining, maxWidth);
        break;
      }
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, currentY);
  return currentY + lineHeight;
}

function truncateToWidth(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string {
  if (ctx.measureText(text).width <= maxWidth) return text;
  let truncated = text;
  while (truncated.length > 1 && ctx.measureText(`${truncated}…`).width > maxWidth) {
    truncated = truncated.slice(0, -1);
  }
  return `${truncated}…`;
}
