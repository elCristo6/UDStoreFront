import React, { useState } from 'react';
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import './SendOrderForm.css'; // Importa el archivo CSS

const SendOrderForm = ({ totalOrder, onPaymentMethodChange }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Efectivo');
  const [cantidadPaga, setCantidadPaga] = useState('');
  const [cambio, setCambio] = useState('');

  const handlePaymentMethodClick = (method) => {
    setSelectedPaymentMethod(method);
    // Envía el método de pago seleccionado al componente padre si es necesario
    if(onPaymentMethodChange) {
      onPaymentMethodChange(method);
    }
  };

  const handleCantidadPagaChange = (event) => {
    const amount = event.target.value;
    setCantidadPaga(amount);
    const calculatedChange = parseFloat(amount) - totalOrder;
    const finalChange = calculatedChange > 0 ? calculatedChange.toString() : '0';
    setCambio(finalChange);

    // Aquí actualizamos el estado en NewBill
    onPaymentMethodChange(selectedPaymentMethod, amount, finalChange);
  };

  return (
    <Container className="sof-container">
      <h2 className="sof-titulo">Confirma tu Pedido</h2>
      <Form>
        <Row>
          <Col>
            <p>Su Total es de: ${totalOrder.toString()}</p>
          </Col>
        </Row>
        <Row className="sof-medio-pago">
          <Col>
            <p>Medio de Pago:</p>
            {['Efectivo', 'Nequi', 'Daviplata', 'Bancolombia'].map((method, index) => (
              <Button
                key={index}
                className={`sof-button ${selectedPaymentMethod === method ? 'seleccionado' : ''}`}
                onClick={() => handlePaymentMethodClick(method)}
              >
                {method}
              </Button>
            ))}
          </Col>
        </Row>
        <FormGroup>
          <Label for="cantidadPaga">Paga con:</Label>
          <Input
            type="number"
            id="cantidadPaga"
            value={cantidadPaga}
            onChange={handleCantidadPagaChange}
            className="sof-input"
            placeholder="Ingrese la cantidad pagada"
          />
        </FormGroup>
        <Row>
          <Col>
            <p>Cambio: <span className="sof-cambio-amount">${cambio}</span></p>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default SendOrderForm;
