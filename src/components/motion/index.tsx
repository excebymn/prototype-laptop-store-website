"use client";

// Komponen animasi berbasis `motion` (motion.dev). Semua animasi otomatis
// dimatikan/diperhalus kalau pengguna memilih "reduce motion" di perangkatnya
// (lihat MotionProvider → reducedMotion="user").

import {
  MotionConfig,
  motion,
  useScroll,
  useTransform,
  type Variants,
} from "motion/react";

const EASE: [number, number, number, number] = [0.2, 0.7, 0.2, 1];
const VIEWPORT = { once: true, margin: "0px 0px -80px 0px" } as const;

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/** Muncul (fade + naik) saat masuk layar. Hanya sekali. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

const groupVariants = (stagger: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: 0.05 } },
});

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: EASE } },
};

type Tag = "div" | "ul" | "ol";
type ItemTag = "div" | "li";

/** Grup yang memunculkan anak-anaknya (RevealItem) satu per satu. */
export function RevealStagger({
  children,
  className,
  stagger = 0.1,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  as?: Tag;
}) {
  const Component = motion[as] as typeof motion.div;
  return (
    <Component
      className={className}
      variants={groupVariants(stagger)}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {children}
    </Component>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: ItemTag;
}) {
  const Component = motion[as] as typeof motion.div;
  return (
    <Component className={className} variants={itemVariants}>
      {children}
    </Component>
  );
}

/**
 * Isi bergeser pelan saat halaman di-scroll (efek parallax). Letakkan di
 * dalam wadah `overflow-hidden`; lapisan dibuat sedikit lebih tinggi supaya
 * tidak ada celah saat bergeser.
 */
export function ParallaxLayer({
  children,
  distance = 48,
  className = "",
}: {
  children: React.ReactNode;
  distance?: number;
  className?: string;
}) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, distance]);

  return (
    <motion.div style={{ y }} className={`absolute inset-x-0 -top-12 -bottom-12 ${className}`}>
      {children}
    </motion.div>
  );
}
