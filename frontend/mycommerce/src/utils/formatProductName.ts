export const formatProductName = (name: string) => {
  return name.length > 15 ? name.slice(0, 15) + "..." : name;
};
