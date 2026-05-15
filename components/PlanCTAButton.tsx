"use client";

import Link from "next/link";

import { trackPlanCtaClicked, trackWhatsappClicked } from "@/lib/analytics";

interface PlanCTAButtonProps {
  plan: "orange" | "platinum" | "avulso";
  href: string;
  destination: "checkout" | "whatsapp";
  className: string;
  children: React.ReactNode;
}

export default function PlanCTAButton({
  plan,
  href,
  destination,
  className,
  children,
}: PlanCTAButtonProps) {
  const trackPlanCta = () => {
    trackPlanCtaClicked(plan, destination);
    if (destination === "whatsapp") {
      trackWhatsappClicked("plan_avulso", "avulso");
    }
  };

  if (destination === "checkout") {
    return (
      <Link href={href} className={className} onClick={trackPlanCta} target="_blank" rel="noopener noreferrer">
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={trackPlanCta}
    >
      {children}
    </a>
  );
}
