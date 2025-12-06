import './App.css'
import {Routes, Route} from 'react-router-dom';
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';

import HomePage from './Pages/Home'
import Navbar from './Components/Navbar';
import LoginPage from './Pages/Login';
import SignUpPage from './Pages/Signup';
import EventDetailsPage from './Pages/Details';
import EditEventPage from './Pages/EditEvent';
import Footer from './Components/Footer';
import Events from './Pages/Events/Events';
import { Logout } from '@mui/icons-material';
import IsAnon from './Components/isAnon';
import IsPrivate from './Components/isPrivate';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<Events />} />
        <Route
          path="/events/edit/:eventId"
          element={
            <IsPrivate>
              <EditEventPage />
            </IsPrivate>
          }
        />
        <Route path="/events/:eventId" element={<EventDetailsPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <div className="App">
        <Footer />
      </div>
    </div>
  );
}

export default App
