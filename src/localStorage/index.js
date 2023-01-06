export const setDataToStorage = (key, item) => {
  return localStorage.setItem(key, JSON.stringify(item));
};

export const getDataFromStorage = (key) => {
  return localStorage.getItem(key);
};
