"use client";

import { useEffect } from "react";

export const GTM_ID = "GTM-54RZX6VV";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/**
 * Injects GTM script into document.head on mount (client-only).
 * This avoids Next.js script ordering/hydration issues.
 */
export function GTMHead() {
  useEffect(() => {
    if (typeof window === "undefined" || !document.head) return;
    if (document.getElementById("gtm-script-head")) return;

    const script = document.createElement("script");
    script.id = "gtm-script-head";
    script.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`;
    document.head.appendChild(script);
  }, []);

  return null;
}

/** Push a custom event to GTM dataLayer (use in client components). */
export function sendGTMEvent(data: Record<string, unknown>): void {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push(data);
  }
}
