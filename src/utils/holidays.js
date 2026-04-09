// Major holidays for 2026
export const HOLIDAYS_2026 = {
  '2026-01-01': { name: 'New Year\'s Day', emoji: '🎉' },
  '2026-02-14': { name: 'Valentine\'s Day', emoji: '❤️' },
  '2026-03-17': { name: 'St. Patrick\'s Day', emoji: '🍀' },
  '2026-04-05': { name: 'Easter Sunday', emoji: '🐰' },
  '2026-05-10': { name: 'Mother\'s Day', emoji: '💐' },
  '2026-05-25': { name: 'Memorial Day', emoji: '🇺🇸' },
  '2026-06-21': { name: 'Father\'s Day', emoji: '👔' },
  '2026-07-04': { name: 'Independence Day', emoji: '🎆' },
  '2026-09-07': { name: 'Labor Day', emoji: '⚒️' },
  '2026-10-12': { name: 'Columbus Day', emoji: '⛵' },
  '2026-10-31': { name: 'Halloween', emoji: '🎃' },
  '2026-11-26': { name: 'Thanksgiving', emoji: '🦃' },
  '2026-12-25': { name: 'Christmas', emoji: '🎄' },
  '2026-12-31': { name: 'New Year\'s Eve', emoji: '🍾' }
};

export const getHoliday = (dateString) => {
  return HOLIDAYS_2026[dateString] || null;
};