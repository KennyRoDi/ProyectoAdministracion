// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/Landing';
import AboutPage from './pages/About';
import CalendarPage from './pages/Calendar';
import MenuPage from './pages/Menu';
import ShoppingPage from './pages/Shopping';
import CheckoutPage from './pages/Checkout';
import AdminPage from './pages/Admin';
import LoginPage from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route 
        path="/shopping" 
        element={
          <ProtectedRoute>
            <ShoppingPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/checkout" 
        element={
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute adminOnly>
            <AdminPage />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}

export default App;