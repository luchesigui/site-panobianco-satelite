"use client";

import { useCallback, useEffect, useMemo, useState, type MouseEvent, type ReactNode } from "react";
import Link from "next/link";
import { useIndication } from "@/contexts/IndicationContext";

interface SchedulingLinkProps {
  children: ReactNode;
  className?: string;
  baseUrl?: string;
}

const isAdminUrl = (url?: string) => {
  if (!url) {
    return false;
  }

  const normalized = url.toLowerCase();
  return normalized.includes("/admin") || normalized.includes("admin.");
};

const shouldBlockScheduling = (adminLink: boolean) => {
  if (adminLink) {
    return false;
  }

  const today = new Date();
  const dayOfWeek = today.getDay();

  return dayOfWeek === 1 || dayOfWeek === 2;
};

export default function SchedulingLink({
  children,
  className = "btn-primary",
  baseUrl,
}: SchedulingLinkProps) {
  const { getSchedulingUrl } = useIndication();

  const schedulingUrl = useMemo(() => getSchedulingUrl(baseUrl), [getSchedulingUrl, baseUrl]);
  const adminLink = useMemo(() => isAdminUrl(baseUrl) || isAdminUrl(schedulingUrl), [baseUrl, schedulingUrl]);
  const [blockScheduling, setBlockScheduling] = useState<boolean | null>(adminLink ? false : null);

  useEffect(() => {
    setBlockScheduling(shouldBlockScheduling(adminLink));
  }, [adminLink]);

  const isBlocked = blockScheduling !== false;

  const handleClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      if (!isBlocked) {
        return;
      }

      event.preventDefault();
      if (blockScheduling) {
        alert("Os agendamentos estão indisponíveis às segundas e terças-feiras. Por favor, escolha outro dia ou procure a recepção.");
      }
    },
    [blockScheduling, isBlocked]
  );

  const resolvedClassName = useMemo(() => {
    if (!isBlocked) {
      return className;
    }

    return `${className} cursor-not-allowed opacity-80`;
  }, [isBlocked, className]);

  return (
    <Link
      href={isBlocked ? "#" : schedulingUrl}
      className={resolvedClassName}
      target={isBlocked ? undefined : "_blank"}
      rel={isBlocked ? undefined : "noopener noreferrer"}
      aria-disabled={isBlocked}
      onClick={handleClick}
      title={isBlocked ? "Agendamentos indisponíveis às segundas e terças-feiras." : undefined}
    >
      {children}
    </Link>
  );
}