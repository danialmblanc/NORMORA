import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string) {
  if (!dateString) return "N/A";
  return dateString;
}

export function calculateReadiness(controls: { status: string }[]): number {
  if (!controls.length) return 0;
  const effective = controls.filter(
    (c) => c.status === "Effective" || c.status === "Exception Approved"
  ).length;
  return Math.round((effective / controls.length) * 100);
}
