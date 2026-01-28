import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { darken, lighten } from '@mui/material/styles'
import { 
    Card, 
    CardActionArea, 
    CardContent, 
    CardMedia, 
    Typography, 
    IconButton, 
    Chip,
} from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import type { NamedAPIResource } from '../types/common.ts'
import { getPokemonIdFromUrl, getPokemonImageUrl } from '../services/api'
import { useFavorites } from '../context/FavoritesContext'

interface PokemonCardProps {
    pokemon: NamedAPIResource
}

export const PokemonCard = ({ pokemon }: PokemonCardProps) => {
    const navigate = useNavigate()
    const id = getPokemonIdFromUrl(pokemon.url)
    const imageUrl = getPokemonImageUrl(id)

    const { addFavorite, removeFavorite, isPokemonFavorite } = useFavorites()
    const [isFavorite, setIsFavorite] = useState(isPokemonFavorite(id))

    const handleCardClick = () => {
        navigate(`/pokemon/${id}`)
    }

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (isFavorite) {
            removeFavorite(id)
        } else {
            addFavorite(pokemon)
        }
        setIsFavorite(!isFavorite)
        console.log(`Toggle favorite: ${pokemon.name}`)
    }

    return (
        <Card 
            sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                position: 'relative',
                borderRadius: 4,
                transition: 'transform 0.2s',
                '&:hover': {
                    transform: 'scale(1.03)',
                    boxShadow: 6
                },
            }}
        >
            <IconButton 
                onClick={handleFavoriteClick}
                sx={{ 
                    position: 'absolute', 
                    top: 8, 
                    right: 8, 
                    zIndex: 10,
                    color: isFavorite ? 'error.main' : 'text.secondary',
                    backgroundColor: 'background.default',
                    '&:hover': { 
                        backgroundColor: (theme) => {
                            if (theme.palette.mode === 'light')
                                return  darken(theme.palette.background.default, 0.2)
                                else
                                return lighten(theme.palette.background.default, 0.2)
                        } 
                    }
                }}
            >
                {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>

            <CardActionArea onClick={handleCardClick} sx={{ flexGrow: 1, pt: 4 }}>

                <CardMedia
                    component="img"
                    image={imageUrl}
                    alt={pokemon.name}
                    sx={{ 
                        height: 180, 
                        width: '100%',
                        objectFit: 'contain',
                        filter: 'drop-shadow(5px 5px 5px rgba(0,0,0,0.3))',
                    }}
                    loading="lazy" 
                />

                <CardContent sx={{ textAlign: 'center' }}>
                    <Chip 
                        label={`#${id.padStart(3, '0')}`} 
                        size="small" 
                        variant="outlined" 
                        sx={{ mb: 0.5, fontWeight: 'bold', opacity: 0.7, paddingTop: 0.4 }}
                    />

                    <Typography 
                        gutterBottom 
                        variant="h5" 
                        component="div" 
                        sx={{ textTransform: 'capitalize', fontWeight: 'bold', mb: 0}}
                    >
                        {pokemon.name}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
