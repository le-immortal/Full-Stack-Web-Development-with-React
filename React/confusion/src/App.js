import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Navbar, NavbarBrand} from "reactstrap";
import Menu  from './components/MenuComponent';
import { DISHES } from './shared/dishes';


class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      dishes:DISHES,
      selectedDish: null

    }
  }

  render (){
  return(  
    <div >
      <Navbar dark color="primary">
        <div className="container">
          <NavbarBrand href='/'>Ristorante Con Fusion</NavbarBrand>
          <NavbarBrand href='/'>Hello</NavbarBrand>
          <NavbarBrand href='/'>Hi</NavbarBrand>
        </div>
      </Navbar>
      <Menu dishes={this.state.dishes}/>
    </div>
  )};
}

export default App;
