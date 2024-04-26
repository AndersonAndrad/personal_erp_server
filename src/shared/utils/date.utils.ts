export const getFirstAndLastDayOfMonth = (): { firstDay: Date; lastDay: Date } => {
  const today = new Date(); // Get current date
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1); // First day of current month
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Last day of current month

  return { firstDay, lastDay };
};
