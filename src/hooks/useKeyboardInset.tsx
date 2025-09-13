"use client";

import { useLayoutEffect, useRef } from "react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : () => {};

/**
 * Smoothly updates CSS vars:
 *  --kb       -> dynamic keyboard inset (Android/Chrome via visualViewport)
 *  --input-h  -> current input bar height
 *
 * On iOS Safari, CSS @supports path takes over and we don't apply --kb.
 */
export function useKeyboardInset() {
  const inputBarRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    inputBarRef.current =
      document.querySelector<HTMLElement>(".input-bar") || null;
    if (!inputBarRef.current) return;

    const root = document.documentElement;

    // Keep --input-h in sync with the bar’s current height
    const setInputHeightVar = () => {
      const h = inputBarRef.current!.getBoundingClientRect().height;
      root.style.setProperty("--input-h", `${h}px`);
    };

    const ro = new ResizeObserver(setInputHeightVar);
    ro.observe(inputBarRef.current!);
    setInputHeightVar();

    // Android/Chrome path: visualViewport gives the “covered” inset
    const vv = window.visualViewport;

    let rafId = 0;
    const schedule = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        if (!vv) return; // iOS path handled in CSS
        const inset = Math.max(
          0,
          window.innerHeight - (vv.height + vv.offsetTop)
        );
        root.style.setProperty("--kb", `${inset}px`);
      });
    };

    vv?.addEventListener("resize", schedule);
    vv?.addEventListener("scroll", schedule);
    window.addEventListener("orientationchange", schedule);

    // initial
    schedule();

    return () => {
      ro.disconnect();
      vv?.removeEventListener("resize", schedule);
      vv?.removeEventListener("scroll", schedule);
      window.removeEventListener("orientationchange", schedule);
      cancelAnimationFrame(rafId);
    };
  }, []);
}
