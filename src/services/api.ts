import type { NamedAPIResourceList, NamedAPIResource } from '../types/common.ts'
import type { Pokemon, } from '../types/pokemon.ts'

const API_URL = 'https://pokeapi.co/api/v2'

export const getPokemonList = async (limit: number = 251): Promise<NamedAPIResource[]> => {
  try {
    const response = await fetch(`${API_URL}/pokemon?limit=${limit}`)
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`)
    }

    const data = await response.json() as NamedAPIResourceList
    return data.results
  } catch (error) {
    console.error("Error fetching pokemon list:", error)
    return []
  }
}

export const getPokemonDetailsById = async (id: string): Promise<Pokemon | null> => {
  try {
    const response = await fetch(`${API_URL}/pokemon/${id}`)
    
    if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`)
    }

    const data = await response.json() as Pokemon
    return data
  } catch (error) {
    console.error(`Error fetching details for pokemon ${id}:`, error)
    return null
  }
}

export const getPokemonDetailsByName = async (name: string): Promise<Pokemon | null> => {
  try {
    const response = await fetch(`${API_URL}/pokemon/${name}`)
    
    if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`)
    }

    const data = await response.json() as Pokemon
    return data
  } catch (error) {
    console.error(`Error fetching details for pokemon ${name}:`, error)
    return null
  }
}

export const getPokemonIdFromUrl = (url: string): string => {
  const parts = url.split('/')
  return parts[parts.length - 2]
}

export const getPokemonImageUrl = (id: string): string => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
}
