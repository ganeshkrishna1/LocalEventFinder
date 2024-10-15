import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/Navbar';
import SignUp from './pages/signup/SignUp';
import SignIn from './pages/signin/SignIn';
import HeroSection from './components/home/HeroSection';
import AboutUs from './components/aboutus/AboutUs';
import FAQ from './components/FAQ/FAQ';
import EventForm from './components/event/EventForm';
import EventScreen from './pages/event/EventScreen';
import EventDetail from './pages/event/EventDetails';
import  MyEvents  from './pages/my-events/MyEvents';
import ProtectedRoute from './components/ProtectedRoute';
import PaymentPage from './pages/booking/PaymentPage';
import BookingSummary from './pages/booking/BookingSummary';
import ConfirmationPage from './pages/booking/ConfirmationPage';
import EditEventForm from './components/event/EditEventForm';
import AdminDashboard from './components/admindashboard/AdminDashboard';
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/frequently-asked-questions" element={<FAQ />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/events" element={<EventScreen />} />
        <Route path="/event/:eventId" element={<EventDetail />} />
        <Route path="/create-payment" element={<PaymentPage />} />
        <Route path="/booking-summary/:eventId" element={<BookingSummary />} />
        <Route path="/payment/:bookingId" element={<PaymentPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path='/addEvent' element={<EventForm />}/>
        <Route path='/editEvent/:id' element={<EditEventForm />} />
        <Route path='/admin-dashboard' element={<AdminDashboard />} />
      
        <Route 
          path="/my-events" 
          element={
            <ProtectedRoute role="user">
              <MyEvents />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute role="admin">
              <h1>Admin Dashboard</h1>
            </ProtectedRoute>
          } 
        />
      </Routes>
    </>
  );
}

export default App;
