import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import APTGroupPage from './pages/apt-groups';
import SearchPage from './pages/target-search';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="container">
      <Router>
        <header>
          <h1>GBAD Frontend</h1>
          <nav>
            <ul className="navbar">
              <li className="navbar-item">
                <Link to="/" className="navbar-link">
                  Home
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/groups" className="navbar-link">
                  APT Groups
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/search" className="navbar-link">
                  Target Search
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/groups" element={<APTGroupPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/" element={<h2>Welcome to the APT Groups Frontend</h2>} />
          </Routes>
        </main>
      </Router>
    </div>
  );
};

export default App;
