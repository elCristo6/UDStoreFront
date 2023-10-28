import React, { useState } from 'react';
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

const Sidebar = () => {
  const [expandedMenu, setExpandedMenu] = useState('');

  const toggleMenu = (menuName) => {
    if (expandedMenu === menuName) {
      setExpandedMenu('');
    } else {
      setExpandedMenu(menuName);
    }
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
        <div className="menu-item">
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
          {expandedMenu === 'productos' ? <FaAngleDown /> : <FaAngleRight />}
        </div>
        
        {expandedMenu === 'productos' && (
          <>
            <div className="submenu-item">Lista de Productos</div>
            <div className="submenu-item">Control de stock</div>
          </>
        )}
        
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
        <div className="menu-item">
          <FaChartPie /> 
          Reportes
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
