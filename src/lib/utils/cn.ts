/**
 * Utility for merging Tailwind CSS classes
 * Utilitário para mesclar classes do Tailwind CSS
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
