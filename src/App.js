import './App.css';
import {Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Signup from './pages/auth/signup'
import Signin from './pages/auth/Signin';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkmail from './pages/auth/Checkmail';
import Book from './pages/Book';


function App() {
  return (
    <Routes>
      <Route exact path="/" element={ <Landing />} />
      <Route path="/signup" element={ <Signup />} />
      <Route path="/check" element={ <Checkmail />} />
      <Route path="/signin" element={ <Signin />} />
      <Route path="/home" element={ <Home />} />
      <Route path="/bookdetails/:id" element={ <Book />} />
      <Route path="/cart/:id" element={ <Cart />} />
    </Routes>
  );
}

export default App;
