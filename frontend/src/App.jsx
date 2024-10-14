import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/navbar/Navbar'
import SignUp from './pages/signup/SignUp'
import SignIn from './pages/signin/SignIn'
import HeroSection from './components/home/HeroSection'
import AboutUs from './components/aboutus/AboutUs'
import FAQ from './components/FAQ/FAQ'
import EventForm from './components/event/EventForm'
import EventScreen from './pages/event/EventScreen'
import EventDetail from './pages/event/EventDetails'
import BookingForm from './pages/booking/BookingForm'
import { MyEvents } from './pages/my-events/MyEvents'

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
        <Route path='/events' element={<EventScreen />} />
        <Route path='/event/:eventId' element={<EventDetail />} />
        <Route path='/my-events' element={<MyEvents />} />



      </Routes>
    </>
  )
}

export default App
