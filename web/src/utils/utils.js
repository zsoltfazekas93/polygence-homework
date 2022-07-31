export const Filter_Map = {
  '': () => true,
  HUF: (item) => item.currency === 'HUF',
  USD: (item) => item.currency === 'USD',
};

export const Sort_Map = {
  '-date': (a, b) => new Date(b.spent_at) - new Date(a.spent_at),
  date: (a, b) => new Date(a.spent_at) - new Date(b.spent_at),
  '-amount': (a, b) => b.amount - a.amount,
  amount: (a, b) => a.amount - b.amount,
};
