import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Sidebar from './Components/Sidebar/Sidebar';
import Home from './Pages/Home';
import About from './Pages/About';
import Products from './Pages/Products';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="d-flex">
        <Sidebar />
      
       <div className=" main-content p-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About/>} />
            <Route path="/product" element={<Products/>} />

          </Routes>
        </div>
       </div>
    
    </BrowserRouter>
  );
}

export default App;
