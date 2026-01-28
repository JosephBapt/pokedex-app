import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { type NamedAPIResource } from '../types/common.ts'
import { getPokemonIdFromUrl } from '../services/api'

interface FavoritesContextType {
    favorites: NamedAPIResource[]
    addFavorite: (pokemon: NamedAPIResource) => void
    removeFavorite: (id: string) => void
    isPokemonFavorite: (id: string) => boolean
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
    const [favorites, setFavorites] = useState<NamedAPIResource[]>(() => {
        const stored = localStorage.getItem('poke-favorites')
        return stored ? JSON.parse(stored) : []
    })

    useEffect(() => {
        localStorage.setItem('poke-favorites', JSON.stringify(favorites))
    }, [favorites])

    const isPokemonFavorite = (id: string) => {
        return favorites.some(p => getPokemonIdFromUrl(p.url) === id)
    }

    const addFavorite = (pokemon: NamedAPIResource) => {
        if (!isPokemonFavorite(getPokemonIdFromUrl(pokemon.url))) {
            const oldFavorites = [...favorites, pokemon]
            const newFavorites = oldFavorites.sort((a, b) => {
                const ida = Number(getPokemonIdFromUrl(a.url))
                const idb = Number(getPokemonIdFromUrl(b.url))
                return ida - idb
            })
            setFavorites(newFavorites)
        }
    }

    const removeFavorite = (id: string) => {
        setFavorites(favorites.filter(p => getPokemonIdFromUrl(p.url) !== id))
    }

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isPokemonFavorite }}>
            {children}
        </FavoritesContext.Provider>
    )
}

export const useFavorites = () => {
    const context = useContext(FavoritesContext)
    if (!context) {
        throw new Error('useFavorites debe usarse dentro de un FavoritesProvider')
    }
    return context
}
