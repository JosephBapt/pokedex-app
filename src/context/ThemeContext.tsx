import { createContext, useState, useMemo, useContext, type ReactNode } from 'react'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'

interface ThemeContextType {
  toggleColorMode: () => void
  mode: 'light' | 'dark'
}

const ColorModeContext = createContext<ThemeContextType>({ toggleColorMode: () => {}, mode: 'dark' })

export const ColorModeProvider = ({ children }: { children: ReactNode }) => {
  
  const [mode, setMode] = useState<'light' | 'dark'>(() => {
    const savedMode = localStorage.getItem('theme-mode')
    return (savedMode === 'light' || savedMode === 'dark') ? savedMode : 'dark'
  })

  
  const toggleColorMode = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme-mode', newMode); 
      return newMode
    })
  }

  
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode, 
          ...(mode === 'light'
            ? {
                
                background: { default: '#f5f5f5', paper: '#ffffff' },
                primary: { main: '#1976d2' },
              }
            : {
                
                background: { default: '#121212', paper: '#1e1e1e' },
                primary: { main: '#90caf9' },
              }),
        },
      }),
    [mode]
  )

  return (
    <ColorModeContext.Provider value={{ toggleColorMode, mode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export const useColorMode = () => {
  const context = useContext(ColorModeContext)
  if (!context) {
    throw new Error('useColorMode debe usarse dentro de un ColorModeProvider')
  }
  return context
}

