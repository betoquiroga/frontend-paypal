const TOKEN_VALUE = import.meta.env.VITE_TOKEN_VALUE

export const getToken = () => localStorage.getItem(TOKEN_VALUE)
export const setToken = value => localStorage.setItem(TOKEN_VALUE, value)
export const removeToken = () => localStorage.removeItem(TOKEN_VALUE)