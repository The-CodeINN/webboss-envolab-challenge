export const getTodoItemsFromLocalStorage = (key) => {
  const value = localStorage.getItem(key);

  if (value) {
    try {
      return JSON.parse(value);
    } catch (error) {
      console.error("Error parsing stored tasks:", error);
    }
  }

  return [];
};

export const saveTodoItemsToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Error storing tasks in LocalStorage:", error);
  }
};
