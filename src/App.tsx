import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './App.css'; // Assuming you want to keep the existing App.css

// Import the components from the new components folder
import Przychody from './components/Przychody';
import Rozchody from './components/Rozchody';
import Bilans from './components/Bilans';
import Slowniki from './components/Slowniki';
import Administrator from './components/Administrator';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <ul style={{ display: 'flex', listStyle: 'none', padding: 0 }}>
              <li style={{ margin: '0 10px' }}>
                <NavLink to="/przychody" className={({ isActive }) => (isActive ? "active-link" : "inactive-link")}>Przychody</NavLink>
              </li>
              <li style={{ margin: '0 10px' }}>
                <NavLink to="/rozchody" className={({ isActive }) => (isActive ? "active-link" : "inactive-link")}>Rozchody</NavLink>
              </li>
              <li style={{ margin: '0 10px' }}>
                <NavLink to="/bilans" className={({ isActive }) => (isActive ? "active-link" : "inactive-link")}>Bilans</NavLink>
              </li>
              <li style={{ margin: '0 10px' }}>
                <NavLink to="/slowniki" className={({ isActive }) => (isActive ? "active-link" : "inactive-link")}>Słowniki</NavLink>
              </li>
              <li style={{ margin: '0 10px' }}>
                <NavLink to="/administrator" className={({ isActive }) => (isActive ? "active-link" : "inactive-link")}>Administrator</NavLink>
              </li>
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/przychody" element={<Przychody />} />
            <Route path="/rozchody" element={<Rozchody />} />
            <Route path="/bilans" element={<Bilans />} />
            <Route path="/slowniki" element={<Slowniki />} />
            <Route path="/administrator" element={<Administrator />} />
            <Route path="/" element={<h2>Wybierz zakładkę powyżej</h2>} /> {/* Default route */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
