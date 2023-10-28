import React from 'react';
import logo from '../../images/UD.png';
import cartIcon from '../../images/cart.png'; // Asume que el icono del carrito está en esta ubicación
import menuIcon from '../../images/menu-icon.svg';
import searchIcon from '../../images/search-icon.png';
import userIcon from '../../images/users.png'; // Asegúrate de que la ruta sea la correcta

import './NavBarComponent.css';

const Navbar = ({ onShowLoginModal }) => {
  const cartCount = 0; // Este valor puede venir de tu estado o store
 
  return (
    <div className="navbar">
      <div className="logo-container">
        <img src={logo} alt="UDElectronics logo" className="logo"/>
      </div>
      <div className="search-container">
      <button className="menu-button">
          <img src={menuIcon} alt="Menu" />
        </button>
        <input 
          type="text" 
          placeholder="Buscar productos, marcas y mas.." 
          className="search-bar"
        />
        <button className="search-button">
          <img src={searchIcon} alt="Search" />
      </button>
      </div>
      <ul className="navbar-nav">
        <li className="nav-item account-item">
          <img src={userIcon} alt="User" className="user-icon" />
          <span className="user-text">Mi cuenta</span>
          <div className="account-dropdown">
            <div className="dropdown-message">Bienvenid@ a UDelectronics.net</div>
            <div className="dropdown-buttons">
            <button className="dropdown-button" onClick={() => onShowLoginModal('login')}>
            Identifícate
            </button>
            <button className="dropdown-button" onClick={() => onShowLoginModal('register')}>
            Regístrate</button>
            </div>
          </div>
        </li>
        <li className="nav-item">
          <img src={cartIcon} alt="Carrito" className="cart-icon" />
          {cartCount >= 0 && <span className="cart-count">{cartCount}</span>}
          <span className="cart-text">Carrito</span>
        </li>
      </ul>
    </div> 
  );
};

export default Navbar;
