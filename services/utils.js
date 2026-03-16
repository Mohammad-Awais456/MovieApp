export function formatDate(inputDate) {
  // Create a Date object
  const date = new Date(inputDate);

  // Array of month names
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthName = months[date.getMonth()]; // getMonth() is 0-indexed
  const day = date.getDate();
  const year = date.getFullYear();

  return `${monthName} ${day} ${year}`;
}
export const calculateRating = (vote) => {
  const star_rating = ((vote / 10) * 5).toFixed(2);
  return star_rating;
};
export function formatMoney(value) {
  if (!value) return "$0";

  const abs = Math.abs(value);

  if (abs >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(1)}B`;
  }

  if (abs >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`;
  }

  if (abs >= 1_000) {
    return `$${(value / 1_000).toFixed(1)}K`;
  }

  return `$${value}`;
}
