import Link from "next/link";
import { MapPin, MessageCircle } from "lucide-react";
import type { StoreInfo } from "@/lib/data";
import { whatsappLink } from "@/lib/site";

/**
 * Bar kontak yang menempel di bawah layar HP (disembunyikan di ≥md).
 * Layout menambah `pb-20` di mobile supaya footer tidak tertutup.
 */
export function MobileContactBar({ info }: { info: StoreInfo }) {
  const wa = whatsappLink(info.whatsapp, `Halo ${info.storeName}, saya mau tanya stok laptop.`);

  return (
    <div style={{ "--d": "1.2s" } as React.CSSProperties} className="anim-rise border-surface fixed inset-x-0 bottom-0 z-40 border-t bg-card/95 px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-md gap-2">
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-md bg-[#128c4a] px-4 py-3 text-sm font-semibold text-white"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          Tanya Stok
        </a>
        <Link
          href="/locations"
          className="border-ink text-ink flex items-center justify-center gap-2 rounded-md border px-5 py-3 text-sm font-semibold"
        >
          <MapPin className="h-4 w-4" aria-hidden="true" />
          Lokasi
        </Link>
      </div>
    </div>
  );
}
