import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RootLayout from './Layout/RootLayout';
import Home from './Pages/Home';
import Store from './Pages/Store';
import Login from './Pages/Login';
import ForgotPassword from './Pages/ForgotPassword';
import Signup from './Pages/Signup';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path='/store' element={<Store/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/forgotpassword' element={<ForgotPassword/>}/>
            <Route path='/signup' element={<Signup/>}/>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
