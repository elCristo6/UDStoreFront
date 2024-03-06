//sideBar.js
import React from 'react';
import { FaCashRegister, FaProductHunt, FaTools, FaUser } from 'react-icons/fa';
import { Button, Col } from 'reactstrap';

function Sidebar({ activeMenu, setActiveMenu }) {
  return (
    <Col md="2" lg="2" xs="2" className="menuSide">
      <Button
        color="primary"
        className={`newBillMenuItem ${activeMenu === 'cliente' ? 'active' : ''}`}
        onClick={() => setActiveMenu('cliente')}
      >
        <FaUser className="newBillIcon" />
      </Button>
      <Button
              color="secondary"
              className={`newBillMenuItem ${activeMenu === 'productos' ? 'active' : ''}`}
              onClick={() => setActiveMenu('productos')}
            >
              <FaProductHunt className="newBillIcon" />
            </Button>
      <Button
              color="success"
              className={`newBillMenuItem ${activeMenu === 'enviar' ? 'active' : ''}`}
              onClick={() => setActiveMenu('enviar')}
            >
              <FaCashRegister className="newBillIcon" />
      </Button> 
      <Button
        color="warning"
        className={`newBillMenuItem ${activeMenu === 'servicios' ? 'active' : ''}`}
        onClick={() => setActiveMenu('servicios')}
      >
        <FaTools className="newBillIcon" />
      </Button>
    </Col>
  );
}

export default Sidebar;
