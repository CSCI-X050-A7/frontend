import { useEffect, useState } from 'react'
import { toggleTheme, initTheme } from 'utils/theme'

const useTheme = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme'))

  useEffect(() => {
    initTheme()
  }, [])

  const handleToggleTheme = () => {
    setTheme(toggleTheme())
  }

  return { theme, toggleTheme: handleToggleTheme }
}

export default useTheme
