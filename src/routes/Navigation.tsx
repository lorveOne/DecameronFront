import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink, Redirect } from 'react-router-dom';
import logo from '../image.png';
import { CreateHabita } from '../page/habitaciones/CreateHabita';
import { UpdateHabita } from '../page/habitaciones/UpdateHabita';
import { ListaHotel } from '../page/hoteles/ListaHotel';
import { FormCreateHotel } from '../page/hoteles/FormCreateHotel ';
import { ListaHabitaciones } from '../page/habitaciones/ListaHabitaciones';

export const Navigation = () => { 
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Verificar al cargar
    checkScreenSize();
    
    // Escuchar cambios de tamaño
    window.addEventListener('resize', checkScreenSize);
    
    // Limpiar el event listener al desmontar
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    if (isMobile) {
      setMenuOpen(false);
    }
  };

  return (
    <Router>
      <div className="main-layout">
        <nav>
          <div className="nav-header">
            <img src={logo} alt="React Logo" />
            {isMobile && (
              <button 
                className="hamburger-btn" 
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                {menuOpen ? '✕' : '☰'}
              </button>
            )}
          </div>
          
          <ul className={`nav-menu ${menuOpen ? 'open' : ''}`}>
            <li>
              <NavLink 
                to="/register" 
                activeClassName="nav-active" 
                exact 
                onClick={closeMenu}
              >
                Register Hotel
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/ListaHotel" 
                activeClassName="nav-active" 
                onClick={closeMenu}
              >
                Lista Hoteles
              </NavLink>
            </li>
          </ul>
        </nav>

        <Switch>
        <Route path="/" exact>
          <Redirect to="/register" />
        </Route>
          <Route path="/register" exact>
            <FormCreateHotel />
          </Route>
          <Route path="/habitaciones/:idHotel/:nombre">
            <CreateHabita />
          </Route>
          <Route path="/habitacionesUpdate/:idHotel/:nombre/:idHabitacion">
            <UpdateHabita />
          </Route>
          <Route path="/ListaHotel">  
            <ListaHotel />
          </Route>
          <Route path="/ListaHabitaciones/:idHotel">  
            <ListaHabitaciones />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};