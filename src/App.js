import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RootLayout from './Layout/RootLayout';
import Home from './Pages/Home';
import Store from './Pages/Store';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path='/store' element={<Store/>}/>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
