export function calculateBrightness(hexColor: string) {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);

  return (r * 299 + g * 587 + b * 114) / 1000;
}

export function getContrastColor(hexColor: string) {
  const brightness = calculateBrightness(hexColor);
  return brightness > 125 ? "black" : "white";
}
