"use client";

import { useEffect, useState } from "react";

export function useDesktopMotion() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)"
    );

    const update = () => setEnabled(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);

    return () => {
      mediaQuery.removeEventListener("change", update);
    };
  }, []);

  return enabled;
}