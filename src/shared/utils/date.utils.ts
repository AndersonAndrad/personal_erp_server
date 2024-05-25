export const getFirstAndLastDayOfMonth = (): { firstDay: Date; lastDay: Date } => {
  const today = new Date(); // Get current date
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1); // First day of current month
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Last day of current month

  return { firstDay, lastDay };
};

export const getDateToBackup = (): string => {
  return new Date()
    .toLocaleDateString('pt-br', {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
    .replace(/(\d{2})\/(\d{2})\/(\d{2}), (\d{2}):(\d{2})/, '$1-$2-$3_hrs$4-$5');
};
