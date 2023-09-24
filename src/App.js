import './App.css';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Signup from './pages/auth/signup'
import Signin from './pages/auth/Signin';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkmail from './pages/auth/Checkmail';
import React from 'react';

const LazyHome = React.lazy(() => import('./pages/Home'));

const HomeSuspense = () => (
  <React.Suspense fallback={<div>Loading...</div>}>
    <LazyHome />
  </React.Suspense>
);

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Landing />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/check" element={<Checkmail />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/home" element={<HomeSuspense />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}

export default App;
