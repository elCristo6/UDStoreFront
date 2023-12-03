import React from 'react';
import {
  FaBox,
  FaChartPie,
  FaClipboardList,
  FaCog,
  FaTachometerAlt,
  FaUsers
} from 'react-icons/fa';
import './sideBar.css';

const Sidebar = ({ expandedMenu, setExpandedMenu }) => {
  
  const toggleMenu = (menuName) => {
      setExpandedMenu(menuName);
  };

  return (
    <div className="top-sidebar">
      <div className="top-sidebar-menu">
        <div className="menu-item" onClick={() => toggleMenu('dashboard')}>
          <FaTachometerAlt />
          Dashboard
        </div>
        <div className="menu-item" onClick={() => toggleMenu('clientes')}>
          <FaUsers />
          Clientes
        </div>
        <div className="menu-item" onClick={() => toggleMenu('productos')}>
          <FaBox />
          Productos
        </div>
        <div className="menu-item" onClick={() => toggleMenu('inventario')}>
          <FaClipboardList />
          Inventario
        </div>
        <div className="menu-item" onClick={() => toggleMenu('controlDiario')}>
          <FaClipboardList />
          Control diario
        </div>
        <div className="menu-item" onClick={() => toggleMenu('nuevaFactura')}>
          <FaChartPie />
          Nueva factura
        </div>
        <div className="menu-item" onClick={() => toggleMenu('configuracion')}>
          <FaCog />
          Configuracion
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
