/**
 * Generate calendar grid for a given month/year
 * Returns array of date objects including previous/next month offsets
 */
export const generateCalendarGrid = (year, month) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  
  // Get day of week (0 = Sunday, 1 = Monday, etc.)
  // Adjust so Monday = 0
  let firstDayOfWeek = firstDay.getDay() - 1;
  if (firstDayOfWeek < 0) firstDayOfWeek = 6;
  
  const calendarDays = [];
  
  // Add previous month days
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    calendarDays.push({
      date: prevMonthLastDay - i,
      month: prevMonth,
      year: prevYear,
      isCurrentMonth: false,
      dateString: `${prevYear}-${String(prevMonth + 1).padStart(2, '0')}-${String(prevMonthLastDay - i).padStart(2, '0')}`
    });
  }
  
  // Add current month days
  for (let date = 1; date <= daysInMonth; date++) {
    calendarDays.push({
      date,
      month,
      year,
      isCurrentMonth: true,
      dateString: `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`
    });
  }
  
  // Add next month days to complete the grid (always show 6 weeks = 42 days)
  const remainingDays = 42 - calendarDays.length;
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;
  for (let date = 1; date <= remainingDays; date++) {
    calendarDays.push({
      date,
      month: nextMonth,
      year: nextYear,
      isCurrentMonth: false,
      dateString: `${nextYear}-${String(nextMonth + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`
    });
  }
  
  return calendarDays;
};

export const getMonthName = (month) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months[month];
};

export const isSameDate = (date1, date2) => {
  if (!date1 || !date2) return false;
  return date1 === date2;
};

export const isDateInRange = (date, startDate, endDate) => {
  if (!startDate || !endDate || !date) return false;
  return date > startDate && date < endDate;
};

export const getTodayString = () => {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
};