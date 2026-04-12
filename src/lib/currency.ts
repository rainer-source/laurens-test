export const IDR_TO_USD_RATE = 15500

/** Format a number as IDR: Rp 459.000 */
export function formatIDR(amount: number): string {
  return 'Rp ' + amount.toLocaleString('id-ID')
}

/** Format a number as USD: $29.61 */
export function formatUSD(amount: number): string {
  return '$' + amount.toFixed(2)
}

/** Convert IDR amount to USD */
export function toUSD(amountIDR: number): number {
  return amountIDR / IDR_TO_USD_RATE
}

/** Format IDR or USD based on the active currency */
export function formatPrice(amountIDR: number, currency: 'IDR' | 'USD'): string {
  if (currency === 'USD') return formatUSD(toUSD(amountIDR))
  return formatIDR(amountIDR)
}
