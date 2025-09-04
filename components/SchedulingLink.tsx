"use client";

import Link from "next/link";
import { useIndication } from "@/contexts/IndicationContext";

interface SchedulingLinkProps {
  children: React.ReactNode;
  className?: string;
  baseUrl?: string;
}

export default function SchedulingLink({ 
  children, 
  className = "btn-primary", 
  baseUrl 
}: SchedulingLinkProps) {
  const { getSchedulingUrl } = useIndication();

  return (
    <Link
      href={getSchedulingUrl(baseUrl)}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </Link>
  );
}