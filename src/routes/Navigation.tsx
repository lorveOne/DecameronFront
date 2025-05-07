import React from 'react';
import  {  BrowserRouter as Router,
  Switch,
  Route,
  NavLink } from 'react-router-dom';
import logo from '../image.png';
//import { FormHotel } from '../page/HotelForm';
import { CreateHabita } from '../page/habitaciones/CreateHabita';
import { UpdateHabita } from '../page/habitaciones/UpdateHabita';
import { ListaHotel } from '../page/hoteles/ListaHotel';
import { FormCreateHotel } from '../page/hoteles/FormCreateHotel ';
import  {ListaHabitaciones}  from '../page/habitaciones/ListaHabitaciones';
  export const Navigation = () => { 
    return (
      <Router>
        <div className="main-layout">
          <nav>
              <img src={ logo } alt="React Logo" />
            <ul>
              <li>
                <NavLink to="/register" activeClassName="nav-active" exact>Register Hotel</NavLink>
              </li>
              <li>
                <NavLink to="/ListaHotel" activeClassName="nav-active">Lista Hoteles</NavLink>
              </li>
              {/* <li>
                <NavLink to="/ListaHabitaciones/1" activeClassName="nav-active">Lista Habitaciones</NavLink>
              </li> */}
            </ul>
          </nav>
  
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/register">
                <FormCreateHotel></FormCreateHotel>
            </Route>
            <Route path="/habitaciones/:idHotel/:nombre">
               <CreateHabita></CreateHabita>
            </Route>
            <Route path="/habitacionesUpdate/:idHotel/:nombre/:idHabitacion">
               <UpdateHabita></UpdateHabita>
            </Route>
            <Route path="/ListaHotel">  
               <ListaHotel ></ListaHotel>
            </Route>
            <Route path="/ListaHabitaciones/:idHotel">  
               <ListaHabitaciones ></ListaHabitaciones>
            </Route>
          </Switch>
        </div>
      </Router>
    );
}
