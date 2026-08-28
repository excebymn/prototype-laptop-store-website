"use client";

import { MessageCircle } from "lucide-react";
import { formatPrice } from "@/lib/format";

// Link wa.me butuh URL halaman saat ini (window.location), jadi komponen ini
// harus client-side — nomor WA & nama/harga produk sudah pasti dari server,
// tapi origin domain baru diketahui di browser saat tombol diklik.

interface ContactAdminButtonProps {
  whatsappNumber: string;
  productName: string;
  price: number;
  className?: string;
}

export function ContactAdminButton({
  whatsappNumber,
  productName,
  price,
  className,
}: ContactAdminButtonProps) {
  const handleClick = () => {
    const pageUrl = window.location.href;
    const message = `Halo, saya mau tanya soal ${productName} (${formatPrice(price)}).\n${pageUrl}`;
    const link = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={
        className ??
        "bg-ink inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
      }
    >
      <MessageCircle className="h-4 w-4" aria-hidden="true" />
      Hubungi Admin
    </button>
  );
}
