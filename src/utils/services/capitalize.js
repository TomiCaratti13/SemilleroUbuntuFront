//Capitalize
export const capitalizeTrim = str => {
  return str.charAt(0).toUpperCase().trim() + str.slice(1).trim().toLowerCase();
};
