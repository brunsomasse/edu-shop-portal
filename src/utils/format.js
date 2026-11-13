/** Formatting helpers. 0.17 is a fixed CNY to USD rate: replace with a live rate for production. */

export const fmt = (yuan) => `${yuan.toLocaleString('en-US')}¥ ($${Math.round(yuan * 0.17).toLocaleString('en-US')})`;
export const unsplash = (id, w = 1200) => `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;
