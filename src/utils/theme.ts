/** @enum {string} */
export const THEME = {
  LIGHT: 'light',
  DARK: 'dark'
}

const getDefaultTheme = () =>
  window.matchMedia('(prefers-color-scheme: dark)').matches
    ? THEME.DARK
    : THEME.LIGHT

const getPreferredTheme = () => {
  const storedTheme = localStorage.getItem('theme')
  if (storedTheme) return storedTheme

  const defaultTheme = getDefaultTheme()
  localStorage.setItem('theme', defaultTheme)

  return defaultTheme
}

export function setTheme(theme: string) {
  document.documentElement.dataset.bsTheme = theme
  localStorage.setItem('theme', theme)
}

export function resetTheme() {
  setTheme(getDefaultTheme())
}

export function toggleTheme() {
  const nextTheme =
    document.documentElement.dataset.bsTheme === THEME.DARK
      ? THEME.LIGHT
      : THEME.DARK
  setTheme(nextTheme)
}

export function initTheme() {
  setTheme(getPreferredTheme())
}
