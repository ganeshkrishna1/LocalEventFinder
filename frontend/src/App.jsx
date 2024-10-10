import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/navbar/Navbar'
import SignUp from './pages/signup/SignUp'
import SignIn from './pages/signin/SignIn'
import HeroSection from './components/home/HeroSection'
import AboutUs from './components/aboutus/AboutUs'
import FAQ from './components/FAQ/FAQ'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<HeroSection />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/frequently-asked-questions' element={<FAQ />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
      </Routes>
    </>
  )
}

export default App
