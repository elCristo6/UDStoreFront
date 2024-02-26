
import React, { useState } from 'react';
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import { addBill } from '../../service/newBillService';

import { Button, Col, Container, ListGroup, Row } from 'reactstrap';


import './InvoicePreview.css';

// Componente ProductItem que representa un elemento de producto en la factura
function ProductItem(props) {
  const { product, onRemoveProduct, onIncrement, onDecrement } = props;
  
  return (
    <Row className="item">
      <Col xs={6} className="product-info">
        <span className="item-name">{product.name}</span>
        <span className="item-price">${product.price}</span>
      </Col>
      <Col xs={4} className="quantity">
        <Button color="danger" size="sm" onClick={() => onRemoveProduct(product._id)}>
          <FaTrash />
        </Button>
        <Button color="primary" size="sm" onClick={() => onDecrement(product._id)}>
          <FaMinus />
        </Button>
        <span>{product.quantity}</span>
        <Button color="primary" size="sm" onClick={() => onIncrement(product._id)}>
          <FaPlus />
        </Button>
      </Col>
      <Col xs={2} className="text-right">
        <span className="item-total">${product.price * product.quantity}</span>
      </Col>
    </Row>
  );
}

// Componente InvoicePreview que muestra la factura completa
function InvoicePreview({ clienteData, productosData, onRemoveProduct, onIncrement, onDecrement, invoiceNumber, totalOrder, currentDate,resetState,paymentDetails ,fetchLastInvoiceConsecutive}) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleFinishInvoice = async () => {
    const formattedProducts = productosData.map((item) => ({
      productId: item._id,
      quantity: item.quantity
    }));

    const invoiceData = {
      name: clienteData.name, // Usar el nombre real del cliente
      cc: clienteData.nitCedula, // Añadir NIT o cédula
      phone: clienteData.phoneNumber, // Añadir número de teléfono
      email: clienteData.email, // Añadir correo electrónico
      detalles: clienteData.detalles, // Añadir detalles si es necesario y está disponible
      products: formattedProducts,
      totalAmount: totalOrder,
      medioPago: paymentDetails.paymentMethod,
      cambio:paymentDetails.change,
      pagaCon:paymentDetails.amountPaid

    };

    try {
      const response = await addBill(invoiceData);
      if (response) {
        setShowConfirmation(true);
        setTimeout(() => {
          alert('Factura enviada exitosamente.');
          setShowConfirmation(false);
          resetState(); // Asegúrate de implementar esta función en tu componente padre para restablecer el estado
          fetchLastInvoiceConsecutive();
        }, 2000); // Duración de la animación de confirmación
      } else {
        alert('Error al enviar la factura.');
      }
    } catch (error) {
      alert('Error al enviar la factura: ' + error.message);
    }
  };

  return (
    <Container fluid className="invoice-preview">
        {showConfirmation && (
        <div className="confirmation-animation">✔</div> // Reemplaza esto con tu animación CSS
      )}
      <Row className="invoice-header">
        <Col className="text-center">
          <h3>Factura #{invoiceNumber}</h3>
        </Col>
      </Row>
      <Row>
        <Col className="invoice-date text-right">Fecha: {currentDate}</Col>
      </Row>
      <Row className="client-details">
        <Col xs={12}>
          <div className="client-name">{clienteData.name}</div>
          <div className="client-info">{clienteData.nitCedula}</div>
          <div className="client-info">{clienteData.phoneNumber}</div>
          <div className="client-info">{clienteData.email}</div>
        </Col>
      </Row>
      <ListGroup flush className="items-list">
        {productosData.length > 0 ? (
          productosData.map((item) => (
            <ProductItem
              key={item._id}
              product={item}
              onRemoveProduct={onRemoveProduct}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
            />
          ))
        ) : (
          <div className="empty-state">No hay productos en la factura.</div>
        )}
      </ListGroup>
     
      <Row className="finish-invoice-button">

      <Row className="justify-content-end total-section">
        <Col xs="auto" className="total-label">Medio de pago:</Col>
        <Col xs="auto" className="total-amount">{paymentDetails.paymentMethod}</Col>
      </Row>
      <Row className="justify-content-end total-section">
        <Col xs="auto" className="total-label">Paga con:</Col>
        <Col xs="auto" className="total-amount">${paymentDetails.amountPaid}</Col>
      </Row>
      <Row className="justify-content-end total-section">
        <Col xs="auto" className="total-label">Total Factura:</Col>
        <Col xs="auto" className="total-amount">${totalOrder}</Col>
      </Row>
      <Row className="justify-content-end total-section">
        <Col xs="auto" className="total-label">Cambio:</Col>
        <Col xs="auto" className="total-amount">${paymentDetails.change}</Col>
      </Row>
        <Col className="text-center">
          <Button color="primary" onClick={handleFinishInvoice}>Finalizar Factura</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default InvoicePreview;