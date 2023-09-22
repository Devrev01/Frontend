import './App.css';
import {Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Signup from './pages/auth/signup'
import Signin from './pages/auth/Signin';
import Home from './pages/Home';


function App() {
  return (
    <Routes>
      <Route exact path="/" element={ <Landing />} />
      <Route path="/signup" element={ <Signup />} />
      <Route path="/signin" element={ <Signin />} />
      <Route path="/home" element={ <Home />} />
    </Routes>
  );
}

export default App;
