import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';  // Import ProtectedRoute
import Navbar from './components/NavbarComponent';
import { HomePage } from './pages/homePage';
import { EventPage } from './pages/EventsPage';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
// import CreateEvent from './components/CreateEventAdmin';
// import io from 'socket.io-client';
// import { useEffect, useState } from 'react';
import { AdminDashboard } from './pages/AdminDashboard';

// const socket = io('http://localhost:8080');

function App() {
  // const [notifications, setNotifications] = useState([]);

  // useEffect(() => {
  //   socket.on('newEventNotification', (notification) => {
  //     setNotifications((prevNotifications) => [
  //       ...prevNotifications,
  //       notification,
  //     ]);
  //   });

  //   return () => {
  //     socket.off('newEventNotification');
  //   };
  // }, []);


  return (
    <>
      <Navbar/>  {/* Navbar is included here so it  appears on all pages */} 
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="Admin">  {/* Admin-only access */}
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
