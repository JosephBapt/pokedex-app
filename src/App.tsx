import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home.tsx'
import { Navbar } from './components/Navbar.tsx'
import { Favorites } from './pages/Favorites.tsx'
import { PokemonDetails } from './pages/PokemonDetails.tsx'
import { Container } from '@mui/material'

function App () {
  return (
    <Container maxWidth='lg' sx={{ mt: 4 }}>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/pokemon/:id' element={<PokemonDetails />} />
          <Route path='/favorites' element={<Favorites />} />
        </Routes>
    </Container>
  )
}

export default App
