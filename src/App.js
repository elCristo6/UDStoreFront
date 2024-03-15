/*
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/NavBarComponent';
import BannerComponent from './components/banner/BannerComponent';
import LoginModal from './components/login/LoginComponent';

import 'bootstrap/dist/css/bootstrap.min.css';

import NewBill from './components/newBill/newBill';
import Sidebar from './components/sideBar/sideBar';
import StockList from './components/stock/StockList';

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState('nuevaFactura');
  const [modalType, setModalType] = useState('login');

  const handleShowLoginModal = (type) => {
    setModalType(type);
    setShowLoginModal(true);
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  return (
    <div className="App">
      <div className="sticky-top">
        <BannerComponent />
        <Navbar onShowLoginModal={handleShowLoginModal} />
      </div>
      <div className="main-container">
        <Sidebar expandedMenu={expandedMenu} setExpandedMenu={setExpandedMenu} />
          {expandedMenu === 'productos' && <StockList />}
          {expandedMenu === 'nuevaFactura' && <NewBill />}
          
      </div>
      
      
      <LoginModal show={showLoginModal} onClose={handleCloseLoginModal} initialFormType={modalType} />
    </div>
  );
}

export default App;
*/

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React from 'react';
import './App.css';
import { NavigationProvider } from './components/context/contextNewBill';
import NewBill from './components/newBill/newBill';

function App() {

  return (
    <div className="App">
      
      <NavigationProvider>
      <NewBill />
    </NavigationProvider>
    </div>
  );
}

export default App;
