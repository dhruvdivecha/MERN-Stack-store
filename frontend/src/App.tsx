import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Homepage from './pages/Homepage'
import CreatePage from './pages/CreatePage'
import { Box } from '@chakra-ui/react'
import { Toaster } from 'react-hot-toast'
import { useColorModeValue } from './components/ui/color-mode'
import './index.css'

function App() {    
  return (
    <>
      <Toaster />
      <Box bg={useColorModeValue("gray.350", "gray.900")} minH="100vh">
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
      </Box>
    </>
  )
}

export default App
