/**
 * @param amount
 * 100 = cents per real
 */
export const convertToCents = (amount: number): number => Math.floor(amount * 100);

/**
 * @param cents
 * 100 = cents per real
 */
export const convertToMoney = (cents: number): number => cents / 100;
