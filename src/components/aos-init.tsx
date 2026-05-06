"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AosInit() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      return;
    }

    AOS.init({
      duration: 850,
      easing: "ease-out-cubic",
      once: true,
      offset: 80,
      delay: 0,
    });

    AOS.refreshHard();
  }, []);

  return null;
}