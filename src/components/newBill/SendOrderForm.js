import React, { useState } from 'react';
import './SendOrderForm.css'; // Importa el archivo CSS
import { Button, Container, Row, Col, Input, FormGroup, Form, Label } from 'reactstrap';

const SendOrderForm = (props) => {
  const {totalOrder}= props;
  const [selectedButton, setSelectedButton] = useState(1);
  const [cantidadPaga, setCantidadPaga] = useState('50000'); // Valor inventado
  const [cambio, setCambio] = useState('0'); // Valor inicial de cambio

  const handleButtonClick = (buttonNumber) => {
    setSelectedButton(buttonNumber);
  };

  const handleCantidadPagaChange = (event) => {
    const nuevaCantidadPaga = event.target.value;
    setCantidadPaga(nuevaCantidadPaga);

    // Calcular el cambio (valor de ejemplo)
    
    const cambioCalculado = nuevaCantidadPaga - totalOrder;
    setCambio(cambioCalculado.toString()); // Convertir a cadena
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

  };

  return (
    <Container className="sof-container">
      <h2 className="sof-titulo">Confirma tu Pedido</h2>
      <Form onSubmit={handleSubmit}>
      <Row >
        <Col>
          <p>Su Total es de:</p>
          <p className="sof-total-amount">${totalOrder}</p>
        </Col>
      </Row>
      <Row className="sof-medio-pago">
        <Col>
        <p>Medio de Pago:</p>
        </Col>
        <div className="sof-buttons">
          <Button
            className={`sof-button ${selectedButton === 1 ? 'seleccionado' : ''}`}
            onClick={() => handleButtonClick(1)}
          >
            Efectivo
          </Button>
          <Button
            className={`sof-button ${selectedButton === 2 ? 'seleccionado' : ''}`}
            onClick={() => handleButtonClick(2)}
          >
            Nequi
          </Button>
          <Button
            className={`sof-button ${selectedButton === 3 ? 'seleccionado' : ''}`}
            onClick={() => handleButtonClick(3)}
          >
            Daviplata
          </Button>
          <Button
            className={`sof-button ${selectedButton === 4 ? 'seleccionado' : ''}`}
            onClick={() => handleButtonClick(4)}
          >
            Bancolombia
          </Button>
        </div>
      </Row>
           <FormGroup>
          <Label for="cantidadPaga">Paga con:</Label>
          <Input
            type="text"
            id="cantidadPaga"
            value={cantidadPaga}
            onChange={handleCantidadPagaChange}
            className="sof-input"
          />
        </FormGroup>
        <Row className="sof-amounts">
          <Col>
            <p>Total: <span className="sof-total-amount">${totalOrder}</span></p>
            <p>Cambio: <span className="sof-cambio-amount">${cambio}</span></p>
          </Col>
        </Row>
     
      </Form>
    </Container>
  );
};

export default SendOrderForm;
