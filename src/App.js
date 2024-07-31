import './App.css';
import Signup from './Signup';
import Signin from './Signin';
import Dashboard from './Dashbord';
import { BrowserRouter, Routes, Route, Navigate, HashRouter } from 'react-router-dom';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/Signup" />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Dashboard" element={< Dashboard/>}/> 
      </Routes>
    </HashRouter>
  );
}

export default App;
