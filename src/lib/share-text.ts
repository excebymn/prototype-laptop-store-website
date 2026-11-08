// Template teks untuk fitur "Copy Information" (Perencanaan §5.6).
// Dipisah dari komponen supaya gampang dites/diubah tanpa menyentuh UI, dan
// supaya format pesan tetap konsisten dengan yang dipakai ContactAdminButton.

import type { Laptop } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import { CONDITION_LABEL } from "@/lib/laptop-display";

export function buildLaptopShareText(laptop: Laptop, pageUrl: string): string {
  const { specs } = laptop;

  return [
    `*${laptop.name}*`,
    `${laptop.brand} • ${CONDITION_LABEL[laptop.condition]}`,
    `*${formatPrice(laptop.price)}*`,
    "",
    "Spesifikasi:",
    `• ${specs.cpu}`,
    `• RAM ${specs.ramGb}GB`,
    `• ${specs.storageGb}GB ${specs.storageType}`,
    `• ${specs.display}`,
    "",
    "Info lengkap & foto:",
    pageUrl,
  ].join("\n");
}
