/**
 * Calculation utilities for Albion Online stats
 * Utilitários de cálculo para estatísticas do Albion Online
 */

/**
 * Calculate fame ratio (Kill/Death ratio)
 */
export function calculateFameRatio(
  killFame: number,
  deathFame: number
): number {
  if (deathFame === 0) return killFame > 0 ? Infinity : 0;
  return killFame / deathFame;
}

/**
 * Calculate percentage
 */
export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0;
  return (value / total) * 100;
}

/**
 * Calculate percentage change
 */
export function calculatePercentageChange(
  oldValue: number,
  newValue: number
): number {
  if (oldValue === 0) return newValue > 0 ? 100 : 0;
  return ((newValue - oldValue) / oldValue) * 100;
}

/**
 * Calculate profit margin
 */
export function calculateProfitMargin(cost: number, price: number): number {
  if (price === 0) return 0;
  return ((price - cost) / price) * 100;
}

/**
 * Calculate profit
 */
export function calculateProfit(cost: number, price: number): number {
  return price - cost;
}

/**
 * Calculate average
 */
export function calculateAverage(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
}

/**
 * Calculate item power with quality bonus
 */
export function calculateItemPower(
  basePower: number,
  quality: number
): number {
  const qualityBonus = [0, 0, 0.1, 0.2, 0.3, 0.4]; // Normal, Good, Outstanding, Excellent, Masterpiece
  return basePower * (1 + qualityBonus[quality]);
}

/**
 * Calculate crafting cost with return rate
 */
export function calculateCraftingCost(
  materialCosts: number[],
  returnRate: number = 0.15
): number {
  const totalCost = materialCosts.reduce((sum, cost) => sum + cost, 0);
  return totalCost * (1 - returnRate);
}

/**
 * Calculate tax amount
 */
export function calculateTax(amount: number, taxRate: number = 0.065): number {
  return amount * taxRate;
}

/**
 * Calculate net profit after taxes
 */
export function calculateNetProfit(
  revenue: number,
  costs: number,
  taxRate: number = 0.065
): number {
  const profit = revenue - costs;
  const tax = calculateTax(revenue, taxRate);
  return profit - tax;
}

/**
 * Calculate median
 */
export function calculateMedian(numbers: number[]): number {
  if (numbers.length === 0) return 0;

  const sorted = [...numbers].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[mid - 1] + sorted[mid]) / 2;
  }
  return sorted[mid];
}

/**
 * Calculate standard deviation
 */
export function calculateStandardDeviation(numbers: number[]): number {
  const avg = calculateAverage(numbers);
  const squareDiffs = numbers.map((num) => Math.pow(num - avg, 2));
  const avgSquareDiff = calculateAverage(squareDiffs);
  return Math.sqrt(avgSquareDiff);
}
