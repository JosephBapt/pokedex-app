import { useEffect, useState } from "react"
import type { NamedAPIResource } from "../types/common"
import { getPokemonList } from "../services/api"


interface usePokemonsListProps {
  limit: number
}

export function usePokemonsList({limit = 251}: usePokemonsListProps) {
    const [pokemons, setPokemons] = useState<NamedAPIResource[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    
    useEffect(() => {
        const loadPokemons = async () => {
            try {
                setLoading(true)
                const data = await getPokemonList(limit)
                setPokemons(data)
            } catch (err) {
                setError('Ocurrió un error al cargar la Pokédex. Intenta de nuevo.')
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        loadPokemons()
    }, [])

    return { pokemons, loading, error }
}

