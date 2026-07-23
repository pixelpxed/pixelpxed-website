export function createShortCode() {
  const shortCode = Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, "0");
  return shortCode;
}
