export function formatPopulation(n) {
  try {
    return new Intl.NumberFormat().format(n);
  } catch {
    return `${n}`;
  }
}

export function formatCurrencies(c) {
  if (!c) return '—';
  // c is an object map: { USD: { name, symbol }, ... }
  const list = Object.entries(c).map(([code, info]) => {
    const nm = info?.name ?? code;
    const sym = info?.symbol ? ` (${info.symbol})` : '';
    return `${nm}${sym}`;
  });
  return list.join(', ');
}
