// Sidebar.js
import React from 'react';
import { FaCashRegister, FaProductHunt, FaTools, FaUser } from 'react-icons/fa';
import { Button, Col } from 'reactstrap';
import { useNavigation } from '../context/contextNewBill'; // Asegúrate de tener la ruta correcta al contexto

function Sidebar() {
  const { activeScreen, changeScreen } = useNavigation(); // Usando el contexto

  return (
    <Col md="2" lg="2" xs="2" className="menuSide">
      <Button
        color="primary"
        className={`newBillMenuItem ${activeScreen === 'cliente' ? 'active' : ''}`}
        onClick={() => changeScreen('cliente')}
      >
        <FaUser className="newBillIcon" />
      </Button>
      <Button
        color="secondary"
        className={`newBillMenuItem ${activeScreen === 'productos' ? 'active' : ''}`}
        onClick={() => changeScreen('productos')}
      >
        <FaProductHunt className="newBillIcon" />
      </Button>
      <Button
        color="success"
        className={`newBillMenuItem ${activeScreen === 'enviar' ? 'active' : ''}`}
        onClick={() => changeScreen('enviar')}
      >
        <FaCashRegister className="newBillIcon" />
      </Button>
      <Button
        color="warning"
        className={`newBillMenuItem ${activeScreen === 'stock' ? 'active' : ''}`}
        onClick={() => changeScreen('stock')}
      >
        <FaTools className="newBillIcon" />
      </Button>
    </Col>
  );
}

export default Sidebar;
