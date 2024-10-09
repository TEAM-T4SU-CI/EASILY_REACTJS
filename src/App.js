import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Authperson from '../src/pages/auth_perso/index.jsx';
import Authteleph from './pages/auth_tele/auth.jsx';
import Loadingpae from './pages/loading/index.jsx';
import HomePage from './pages/home/index.jsx';
import Auteleph from './pages/auth_tele/auteleph.jsx';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/personelauth" element={<Authperson />} />   
        <Route path="/connexi"  element={<Authteleph />}  />
        <Route path="/" element={<Loadingpae />} />
        <Route path="/home" element={<HomePage/>} />
        <Route path="/connx" element ={<Auteleph/>}/>
      </Routes>
    </Router>
  );
};

export default App;
