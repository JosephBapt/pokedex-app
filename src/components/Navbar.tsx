import { useNavigate, useLocation } from 'react-router-dom'
import { useColorMode } from '../context/ThemeContext'
import { useFavorites } from '../context/FavoritesContext'
import { AppBar, Toolbar, Typography, Button, Box, Badge, IconButton } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import HomeIcon from '@mui/icons-material/Home';

export const Navbar = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { favorites } = useFavorites()
    const { toggleColorMode, mode } = useColorMode()

    const isActive = (path: string) => location.pathname === path

    return (
        <AppBar position='sticky' color='default' sx={{ borderBottom: 1, borderColor: 'divider', paddingX: { xs: 2, md: 2}, width: { xs: '100%'}}}>
            <Toolbar disableGutters>
                <Box
                    sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', flexGrow: 1 }}
                    onClick={() => {
                        localStorage.setItem('navigation', '1') 
                        navigate('/')}
                    }
                >
                    <CatchingPokemonIcon sx={{ mr: 1, color: mode === 'dark' ? '#ffcb05' : '#e3350d' }} />
                    <Typography
                        variant='h6'
                        component='div'
                        fontSize={{xs: 16}}
                        sx={{
                            fontWeight: 'bold', 
                            letterSpacing: '.1rem' ,
                            height: '100%',
                            pt: '5px',
                            display:'flex',
                            alignItems:'center'
                        }}
                    >

                        POKÉDEX
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>

                    <IconButton onClick={toggleColorMode} color='inherit'>
                        {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>

                    <Button
                        sx={{ 
                            borderBottom: isActive('/') ? '3px solid' : '3px solid transparent',
                            borderColor: isActive('/') ? (mode === 'dark' ? '#ffcb05' : 'primary.main') : 'transparent',
                            borderRadius: 0,
                            transition: 'border-color 0.3s',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            alignContent: 'center',
                            justifyContent:  'center'
                        }}
                        color='inherit'
                        onClick={() => {
                            localStorage.setItem('navigation', '1') 
                            navigate('/')}
                        }
                    >
                        <Box sx={{ display: 'flex', justifyContent: 'space-evenly'}}>
                            <HomeIcon sx={{marginRight: {xs: '0px', md:'8px'}, marginLeft: {xs: '0px', md: '-4px'} }}/>
                            <Box 
                                component="span" 
                                sx={{ 
                                    display: { xs: 'none', sm: 'flex' },
                                    alignItems: 'center',
                                    height: '100%',
                                    pt: '2px'
                                }}
                            >
                                Home
                            </Box>
                        </Box>
                    </Button>

                    <Button
                        color='inherit'
                        sx={{ 
                            borderBottom: isActive('/favorites') ? '3px solid' : '3px solid transparent',
                            borderColor: isActive('/favorites') ? (mode === 'dark' ? '#ffcb05' : 'primary.main') : 'transparent',
                            borderRadius: 0,
                            transition: 'border-color 0.3s'
                        }}
                        onClick={() => {
                            localStorage.setItem('navigation', '1') 
                            navigate('/favorites')}
                        }
                    >
                        <Box sx={{ display: 'flex', justifyContent: 'space-evenly'}}>
                            <Badge badgeContent={favorites.length} color='error' sx={{marginRight: {xs: '0px', md:'8px'}, marginLeft: {xs: '0px', md: '-4px'} }}>
                                <FavoriteIcon />
                            </Badge>
                            <Box 
                                component="span" 
                                sx={{ 
                                    display: { xs: 'none', sm: 'flex' },
                                    alignItems: 'center',
                                    height: '100%',
                                    pt: '2px'
                                }}
                            >
                                Favoritos
                            </Box>
                        </Box>
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    )
}
