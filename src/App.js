import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './Components/Navigation'; // Import your Navigation component
import Home from './pages/Home';
import PortfolioPage from './pages/portfolio';

function App() {
  return (
    <Router>
      <Navigation /> {/* Add Navigation here, outside Routes but inside Router */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        {/* Add more routes here later, like <Route path="/about" element={<About />} /> */}
      </Routes>
    </Router>
  );
}

export default App;