import { Alert, Box, CircularProgress, Container, Grid, InputAdornment, TextField, Typography } from '@mui/material'
import { usePokemonsList } from '../hooks/usePokemonsList'
import { PokemonCard } from '../components/PokemonCard'
import { useEffect, useState } from 'react'
import { Navigation } from '../components/Navigation.tsx'
import SearchIcon from '@mui/icons-material/Search'
import { getPokemonIdFromUrl } from '../services/api.ts'

export const Home = () => {
    const { pokemons, loading, error } = usePokemonsList({ limit: 251 })
    const [navigation, setNavigation] = useState(Number(localStorage.getItem('navigation') ?? 0))
    const setNavigationWrapper = (index: number ) => {
        localStorage.setItem('navigation', index.toString())
        setNavigation(index)
    }

    const [searchTerm, setSearchTerm] = useState('');
    const filteredPokemons = pokemons.filter(pokemon => {
        const pokemonId = getPokemonIdFromUrl(pokemon.url)
        return pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) || pokemonId.startsWith(searchTerm.replace(/^0+/, ''))
    });

    useEffect(() => {
        setNavigationWrapper(1)
    }, [searchTerm])

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <CircularProgress size={60} thickness={4} />
            </Box>
        )
    }

    if (error) {
        return (
            <Container sx={{ mt: 5 }}>
                <Alert severity='error'>{error}</Alert>
            </Container>
        )
    }

    return (
        <Container maxWidth='xl' sx={{ py: 4 }}>
            <Box sx={{
                minWidth: '100%',
                display: 'flex',
                justifyContent: 'center',
                mb: 2
            }}>
                <TextField
                    label="Buscar Pokémon"
                    variant="outlined"
                    placeholder='Ej: 001, Pikachu'
                    fullWidth
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ maxWidth: 500, bgcolor: 'background.paper', borderRadius: 1 }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon color="action" />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>
            <Grid container spacing={3}>
                {filteredPokemons.slice((navigation - 1) * 10, (navigation - 1) * 10 + 10).map((pokemon) => (
                    <Grid key={pokemon.name} size={{xs: 12, md: 4, lg: 2.3}}>
                        <PokemonCard pokemon={pokemon} />
                    </Grid>
                ))}
            </Grid>

            {filteredPokemons.length === 0 && (
                <Box sx={{ width: '100%', textAlign: 'center', mt: 4 }}>
                    <Typography variant="h6" color="text.secondary">
                        No se encontraron Pokémon con ese nombre.
                    </Typography>
                </Box>
            )}

            <Navigation size={filteredPokemons.length} onChange={(_, value) => {setNavigationWrapper(value)}}/>
        </Container>
    )
}
