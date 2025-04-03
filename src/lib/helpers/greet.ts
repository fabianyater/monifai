export const greet = (name: string) => {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "buenos días" : hour < 18 ? "buenas tardes" : "buenas noches";

  return `¡${greeting}, ${name}!`;
};
