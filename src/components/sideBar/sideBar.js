import React from 'react';
import {
  FaAngleDown,
  FaAngleRight,
  FaBox,
  FaChartPie,
  FaClipboardList,
  FaCog,
  FaTachometerAlt,
  FaUser,
  FaUsers
} from 'react-icons/fa';
import './sideBar.css';

const Sidebar = ({ expandedMenu, setExpandedMenu }) => {
  
  const toggleMenu = (menuName) => {
      setExpandedMenu(menuName);
  };

  return (
    <div className="sidebar">
      <div className="icon-container">
        <div className="profile-container">
          <FaUser size={50} />
          <div className="profile-info">
            <h2>Administrador 1</h2>
            <p>cgonzalezsuta@gmail.com</p>
          </div>
        </div>
      </div>
      <div className="expanded-menu">
        <div className="menu-item" onClick={() => toggleMenu('dashboard')}>
          <FaTachometerAlt /> 
          Dashboard
        </div>
        <div className="menu-item">
          <FaUsers /> 
          Clientes
        </div>

        <div className="menu-item" onClick={() => toggleMenu('productos')}>
          <FaBox />
          Productos
        </div>
        
        <div className="menu-item" onClick={() => toggleMenu('existencias')}>
          <FaClipboardList />
          Inventario
          {expandedMenu === 'existencias' ? <FaAngleDown /> : <FaAngleRight />}
        </div>
        
        {expandedMenu === 'existencias' && (
          <>
            <div className="submenu-item">Submenu Existencia 1</div>
            <div className="submenu-item">Submenu Existencia 2</div>
          </>
        )}

        <div className="menu-item">
          <FaClipboardList /> 
          Control diario
        </div>

        <div className="menu-item" onClick={() => toggleMenu('nuevaFactura')}>
          <FaChartPie /> 
          Nueva factura
        </div>
        
        <div className="menu-item">
          <FaCog /> 
          Configuracion
        </div>

        
      </div>
    </div>
  );
};

export default Sidebar;
