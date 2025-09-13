import { useEffect, useRef, useState } from "react";

function useKeyboard() {
  const [open, setOpen] = useState(false);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;

    const onResize = () => {
      // keyboard height ≈ innerHeight - visualViewport.height - offsetTop
      const kb = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
      setOpen(kb > 80); // threshold to avoid false positives
      //   alert(kb);
      setOffset(kb);
    };

    const onScroll = () => {
      const kb = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
      setOffset(kb);
    };

    vv.addEventListener("resize", onResize);
    vv.addEventListener("scroll", onScroll); // some browsers update offsetTop here
    onResize();
    return () => {
      vv.removeEventListener("resize", onResize);
      vv.removeEventListener("scroll", onScroll);
    };
  }, []);

  return { open, offset };
}

export default useKeyboard;

// import { useEffect, useState } from "react";

// /** Robust keyboard detector for mobile browsers */
// export function useKeyboard(threshold = 120) {
//   const [open, setOpen] = useState(false);
//   const [offset, setOffset] = useState(0);
//   const clientHeight = "djb";

//   useEffect(() => {
//     const vv = window.visualViewport;
//     if (!vv) return;

//     // Use the *maximum* "layout" height we've observed as the baseline.
//     // layoutH ≈ vv.height + vv.offsetTop (works across iOS/Android)
//     let baseline = vv.height + (vv.offsetTop || 0);

//     const recalc = () => {
//       const layoutH = vv.height + (vv.offsetTop || 0);
//       // URL bar can expand/collapse — only raise the baseline, never lower.
//       baseline = Math.max(baseline, layoutH);

//       const kb = Math.max(0, baseline - layoutH);
//       setOffset(kb);
//       setOpen(kb > threshold);
//     };

//     const onResize = () => requestAnimationFrame(recalc);

//     vv.addEventListener("resize", onResize);
//     // vv.addEventListener("scroll", onResize); // iOS updates offsetTop here
//     window.addEventListener("orientationchange", recalc);
//     document.addEventListener("focusin", recalc);
//     document.addEventListener("focusout", recalc);

//     recalc();
//     return () => {
//       vv.removeEventListener("resize", onResize);
//       vv.removeEventListener("scroll", onResize);
//       window.removeEventListener("orientationchange", recalc);
//       document.removeEventListener("focusin", recalc);
//       document.removeEventListener("focusout", recalc);
//     };
//   }, [threshold]);

//   return { open, offset, stableHeight: clientHeight }; // height ≈ keyboard height in px
// }
// export default useKeyboard;
