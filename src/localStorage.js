export const readLocalStorage = (setting) => JSON.parse(localStorage.getItem(setting))

export const setLocalStorage = (setting, value) =>
    localStorage.setItem(setting, JSON.stringify(value))