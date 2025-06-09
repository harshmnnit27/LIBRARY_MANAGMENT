export const calculateFine = (dueDate) => {
  const now = new Date();
  const due = new Date(dueDate);
  const daysLate = Math.ceil((now - due) / (1000 * 60 * 60 * 24));
  return daysLate > 0 ? daysLate * 5 : 0; // ₹5 per day late
};