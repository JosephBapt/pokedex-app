import { useNavigate } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'
import { PokemonCard } from '../components/PokemonCard'
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import {
  Container,
  Typography,
  Grid,
  Button,
  Paper
} from '@mui/material'
import { useState } from 'react'
import { Navigation } from '../components/Navigation'

export const Favorites = () => {
  const { favorites } = useFavorites()
  const navigate = useNavigate()

    const [navigation, setNavigation] = useState(Number(localStorage.getItem('navigation') ?? 0))
    const setNavigationWrapper = (index: number ) => {
        localStorage.setItem('navigation', index.toString())
        setNavigation(index)
    }

  // Cuando no hay favoritos
  if (favorites.length === 0) {
    return (
      <Container maxWidth='sm' sx={{ mt: 8, textAlign: 'center' }}>
        <Paper
          elevation={3}
          sx={{
            p: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 4
          }}
        >
          <SentimentDissatisfiedIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
          <Typography variant='h5' gutterBottom fontWeight='bold'>
            No tienes favoritos aún
          </Typography>
          <Typography variant='body1' color='text.secondary' sx={{ mb: 3 }}>
            Ve al inicio y marca algunos Pokémon con el corazón para verlos aquí.
          </Typography>
          <Button
            variant='contained'
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/')}
          >
            Ir al home
          </Button>
        </Paper>
      </Container>
    )
  }

  return (
    <Container maxWidth='xl' sx={{ py: 4 }}>
        <Container maxWidth='xl' sx={{ py: 4 }}>
            <Grid container spacing={3}>
                {favorites.slice((navigation - 1) * 10, (navigation - 1) * 10 + 10).map((pokemon) => (
                    <Grid key={pokemon.name} size={{xs: 12, md: 4, lg: 2.3}}>
                        <PokemonCard pokemon={pokemon} />
                    </Grid>
                ))}

            </Grid>

                {
                    favorites.length !== 0 ? 
                        <Navigation size={favorites.length} onChange={(_, value) => {setNavigationWrapper(value)}}/>
                        : <></>
                }
        </Container>
    </Container>
  )
}
