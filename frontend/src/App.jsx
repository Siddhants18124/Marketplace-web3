import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Homepage from './pages/Homepage';
import Selldata from './pages/Selldata';
import PaymentPage from './pages/PaymentPage';
import Cart from './components/Cart';
import Products from './components/Products';
import Navbar from './components/Navbar';
import Buy from './components/Buy';
import Description from './components/Description';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/sell" element={<Selldata />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<Products />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/description" element={<Description />} />
      </Routes>
    </Router>
  );
}

export default App;
