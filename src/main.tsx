import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ColorModeProvider } from './context/ThemeContext.tsx'
import { FavoritesProvider } from './context/FavoritesContext.tsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ColorModeProvider>
            <FavoritesProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </FavoritesProvider>
        </ColorModeProvider>
    </StrictMode>,
)
