import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
    Container, 
    Grid, 
    Paper, 
    Typography, 
    Box, 
    Chip, 
    LinearProgress, 
    Button,
    CircularProgress,
    IconButton,
    // Divider,
    // IconButton
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import HeightIcon from '@mui/icons-material/Height';
import ScaleIcon from '@mui/icons-material/Scale';
import StarIcon from '@mui/icons-material/Star';

import { getPokemonDetailsById } from '../services/api';
import { type Pokemon } from '../types/pokemon'; // La interfaz completa
import { useFavorites } from '../context/FavoritesContext';

// Colores oficiales para los tipos (UX visual)
const typeColors: Record<string, string> = {
    fire: '#F08030',
    water: '#6890F0',
    grass: '#78C850',
    electric: '#F8D030',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    steel: '#B8B8D0',
    fairy: '#EE99AC',
    normal: '#A8A878',
};

export const PokemonDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [loading, setLoading] = useState(true);

    const { addFavorite, removeFavorite, isPokemonFavorite } = useFavorites();
    const isFavorite = id ? isPokemonFavorite(id) : false;

    const [isShinySelected, setIsShinySelected] =  useState(false)

    useEffect(() => {
        const fetchDetails = async () => {
            if (!id) return;
            setLoading(true);
            const data = await getPokemonDetailsById(id);
            setPokemon(data);
            setLoading(false);
        };
        fetchDetails();
    }, [id]);
    const handleToggleFavorite = () => {
        if (!pokemon || !id) return;
        if (isFavorite) {
            removeFavorite(id);
        } else {
            addFavorite({ name: pokemon.name, url: `https://pokeapi.co/api/v2/pokemon/${id}/` });
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!pokemon) {
        return <Container><Typography variant="h5">Pokémon no encontrado</Typography></Container>;
    }

    return (
        <Container maxWidth="md"  sx={{ py: 2, position: 'relative' }}>
            <Button 
                onClick={() => navigate(-1)} 
                sx={{ position: 'absolute' }}
            >

                <Chip 
                    label='Volver' 
                    avatar={<ArrowBackIcon sx={{pb: 0.4}}/>}
                    variant='outlined' 

                    sx={{ textTransform: 'capitalize', mb: 1, paddingTop: 0.4}}
                />

            </Button>

            <Paper elevation={3} sx={{ p: 2, borderRadius: 4 }}>
                <Grid container spacing={2}>
                    <Grid container spacing={3} sx={{marginX: 'auto', justifyContent:'center'}} size={12}>
                        <Grid sx={{ textAlign: 'center'}}>
                            <Box sx={{ position: 'relative' }} >
                                <Box 
                                    component="img"
                                    src={
                                        isShinySelected 
                                            ? pokemon.sprites.other?.['official-artwork'].front_shiny ?? ''
                                            : pokemon.sprites.other?.['official-artwork'].front_default ?? ''
                                    }
                                    alt={pokemon.name}
                                    sx={{ 
                                        width: '100%', 
                                        maxWidth: 320, 
                                        height: 'auto',
                                        filter: 'drop-shadow(0px 10px 10px rgba(0,0,0,0.2))'
                                    }}
                                />

                                    <IconButton 
                                        onClick={() => {setIsShinySelected(!isShinySelected)}}
                                        size='large'
                                        sx={{ 
                                            position: 'absolute', 
                                            top: 0, 
                                            right: 8, 
                                            zIndex: 10,
                                            color: isShinySelected ? 'gold' : 'inherit',
                                        }}
                                    >
                                        <StarIcon sx={{fontSize: '60px'}}/>
                                    </IconButton>
                            </Box>

                            <Typography variant="h3" sx={{ textTransform: 'capitalize', fontWeight: 'bold' }}>
                                {pokemon.name}
                            </Typography>

                            <Typography variant="h5" color="text.secondary">
                                #{String(pokemon.id).padStart(3, '0')}
                            </Typography>

                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                                {pokemon.types.map((t) => (
                                    <Chip 
                                        key={t.type.name} 
                                        label={t.type.name.toUpperCase()} 
                                        sx={{ 
                                            backgroundColor: typeColors[t.type.name] || '#777',
                                            color: 'white',
                                            fontWeight: 'bold',
                                            paddingTop: 0.6
                                        }} 
                                    />
                                ))}
                            </Box>

                            <Box sx={{ mt: 1 }}>
                                <Button
                                    variant={isFavorite ? "contained" : "outlined"}
                                    color={isFavorite ? "error" : "inherit"}
                                    startIcon={isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                                    onClick={handleToggleFavorite}
                                    size="large"
                                >

                                    <Box sx={{ paddingTop: 0.5}}>
                                        {isFavorite ? "Quitar de Favoritos" : "Agregar a Favoritos"}
                                    </Box>
                                </Button>
                            </Box>
                        </Grid>

                        <Grid>
                            <Typography variant="h5" gutterBottom sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                Características
                            </Typography>

                            <Grid container spacing={2} sx={{ mt: 1 }}>
                                <Grid >
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <HeightIcon color="action" />
                                        <Typography>Altura: {pokemon.height / 10} m</Typography>
                                    </Box>
                                </Grid>
                                <Grid >
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <ScaleIcon color="action" />
                                        <Typography>Peso: {pokemon.weight / 10} kg</Typography>
                                    </Box>
                                </Grid>
                            </Grid>

                            <Box sx={{ mt: 4 }}>
                                <Typography variant="h5" gutterBottom sx={{borderBottom: 1, borderColor: 'divider'}}>Habilidades</Typography>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    {pokemon.abilities.map((a) => (
                                        <Chip 
                                            key={a.ability.name} 
                                            label={a.ability.name} 
                                            variant="outlined" 
                                            sx={{ textTransform: 'capitalize', mb: 1, paddingTop: 0.4}}
                                        />
                                    ))}
                                </Box>
                            </Box>

                            <Box sx={{ mt: 4 }}>
                                <Typography variant="h5" gutterBottom sx={{borderBottom: 1, borderColor: 'divider'}}>Estadísticas Base</Typography>
                                {pokemon.stats.map((s) => (
                                    <Box key={s.stat.name} sx={{ mb: 1 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                            <Typography 
                                                variant="body2" 
                                                sx={{ textTransform: 'capitalize', fontWeight: 'bold', color: 'text.secondary' }}
                                            >
                                                {s.stat.name.replace('-', ' ')}
                                            </Typography>
                                            <Typography variant="body2" fontWeight="bold">{s.base_stat}</Typography>
                                        </Box>
                                        <LinearProgress 
                                            variant="determinate" 
                                            value={(s.base_stat / 255) * 100} 
                                            sx={{ 
                                                height: 10, 
                                                borderRadius: 5,
                                                backgroundColor: 'rgba(255,255,255,0.1)',
                                                '& .MuiLinearProgress-bar': {
                                                    backgroundColor: s.base_stat > 100 ? '#4caf50' : s.base_stat > 60 ? '#ff9800' : '#f44336'
                                                }
                                            }} 
                                        />
                                    </Box>
                                ))}
                            </Box>
                        </Grid>
                    </Grid>


                    <Grid margin={'auto'}>
                        <Box sx={{ mt: 0 }}>
                            <Typography variant="h5" gutterBottom sx={{textAlign: 'center', borderBottom: 1, borderColor: 'divider'}}>
                                Movimientos({pokemon.moves.length})
                            </Typography>

                            <Box 
                                sx={{ 
                                    display: 'flex', 
                                    flexWrap: 'wrap', 
                                    gap: 1, 
                                    maxHeight: 200, 
                                    maxWidth: 600,
                                    overflowY: 'auto',
                                    padding: 1,
                                    borderRadius: 2,
                                    backgroundColor: 'rgba(0,0,0,0.03)',
                                    border: '1px solid',
                                    borderColor: 'divider'
                                }}
                            >
                                {pokemon.moves.map((moveEntry) => (
                                    <Chip 
                                        key={moveEntry.move.name} 
                                        label={moveEntry.move.name.replace('-', ' ')} 
                                        size="small" 
                                        variant="outlined"
                                        sx={{ textTransform: 'capitalize', mb: 1, paddingTop: 0.4}}
                                    />
                                ))}
                            </Box>
                        </Box>
                    </Grid>

                </Grid>
            </Paper>
        </Container>
    );
};
