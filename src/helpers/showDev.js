export const showDev = () => {
  if (
    localStorage.getItem("showDev") === true ||
    localStorage.getItem("showDev") === "true"
  ) {
    return true;
  }
  return false;
};
