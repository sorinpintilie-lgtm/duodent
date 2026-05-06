'use client';

import { useEffect } from 'react';

export default function AosInit() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('aos').then((AOS) => {
        AOS.default.init({
          duration: 800,
          easing: 'ease-out-cubic',
          once: true,
          offset: 50,
          delay: 0,
        });
      });
    }
  }, []);

  return null;
}