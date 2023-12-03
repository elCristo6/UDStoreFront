import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/NavBarComponent';
import BannerComponent from './components/banner/BannerComponent';
import LoginModal from './components/login/LoginComponent';

import NewBill from './components/newBill/newBill';
import Sidebar from './components/sideBar/sideBar';
import StockList from './components/stock/StockList';

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState('productos');
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
