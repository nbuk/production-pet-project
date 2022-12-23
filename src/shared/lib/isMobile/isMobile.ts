export const isMobile = () => {
  if (!window.matchMedia) return false;
  const device = window.matchMedia("(pointer:coarse)");

  return device.matches;
};
