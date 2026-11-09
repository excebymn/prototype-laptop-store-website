import type { CSSProperties } from "react";

/** Jeda animasi masuk CSS (`.anim-rise` / `.anim-line` di globals.css), dalam detik. */
export const animDelay = (seconds: number) => ({ "--d": `${seconds}s` }) as CSSProperties;
