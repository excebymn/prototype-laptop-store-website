// Template dibuat ulang di setiap perpindahan halaman, jadi animasi fade
// di bawah otomatis berulang tiap navigasi. Sengaja hanya opacity (bukan
// transform) supaya elemen sticky/fixed di dalam halaman tidak terganggu.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="anim-page flex flex-1 flex-col">{children}</div>;
}
