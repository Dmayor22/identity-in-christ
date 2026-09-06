import { scriptures } from "../data";

export const categories = [
  "All",
  ...Array.from(new Set(scriptures.map((s) => s.category))),
];

export const dayNumber = () => {
  const now = new Date();
  return Math.floor(
    Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / 86400000,
  );
};

export const dailyIndex = () => {
  return (
    ((dayNumber() % scriptures.length) + scriptures.length) % scriptures.length
  );
};

export const getTimeUntilMidnight = () => {
  const now = new Date();
  const next = new Date(now);
  next.setHours(24, 0, 0, 0);
  const ms = next - now;
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};
