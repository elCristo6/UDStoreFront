/*import React from 'react';
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import { addBill } from '../../service/newBillService';

import { Button, Card, CardBody, CardHeader, Col, Container, ListGroup, Row } from 'reactstrap';


import './InvoicePreview.css';

// Componente ProductItem que representa un elemento de producto en la factura
function ProductItem(props) {
  const { product, onRemoveProduct, onIncrement, onDecrement } = props;
  return (
    <Row className="item">
      <Col className="product-info" md={6}>
        <span className="item-name">{product.name}</span>
        <span className="item-price">${product.price}</span>
      </Col>
      <Col className="quantity" md={4}>
        <Button color="primary" onClick={() => onDecrement(product._id)}>
          <FaMinus />
        </Button>
        <span>{product.quantity}</span>
        <Button color="primary" onClick={() => onIncrement(product._id)}>
          <FaPlus />
        </Button>
      </Col>
      <Col md={2}>
        <span className="item-total">${product.price * product.quantity}</span>
      </Col>
      <Col md={2}>
        <Button color="danger" onClick={() => onRemoveProduct(product._id)}>
          <FaTrash />
        </Button>
      </Col>
    </Row>
  );
}

// Componente InvoicePreview que muestra la factura completa
function InvoicePreview(props) {
  const { clienteData, productosData, onRemoveProduct, onIncrement, onDecrement, invoiceNumber, totalOrder, currentDate } = props;
  const handleFinishInvoice = async () => {
    
    const formattedProducts = productosData.map((item) => {
      return {
        productId: item._id,
        quantity: item.quantity,
      };
    });

    const invoiceData = {
      name: "mostrador",
      products: formattedProducts,
      totalAmount: totalOrder,
    };

    try {
      const response = await addBill(invoiceData);

      if (response) {
        alert('Factura enviada exitosamente.');
      } else {
        alert('Error al enviar la factura.');
      }
    } catch (error) {
      alert('Error al enviar la factura: ' + error.message);
    }
  };

  return (
    <Container fluid className="invoice-preview">
      <Card>
        <CardHeader className="text-center" color="primary">Factura #{invoiceNumber}</CardHeader>
        <CardBody>
          <Row>
            <Col className="invoice-date text-right">Fecha: {currentDate}</Col>
          </Row>
          <Row>
            <Col className="client-info">
              <p>Cliente: {clienteData.name}</p>
              <p>NIT/Cédula: {clienteData.nitCedula}</p>
              <p>Teléfono: {clienteData.phoneNumber}</p>
              <p>Email: {clienteData.email}</p>
            </Col>
          </Row>
          <ListGroup flush className="items-list">
            {productosData.map((item) => (
              <ProductItem
                key={item._id}
                product={item}
                onRemoveProduct={onRemoveProduct}
                onIncrement={onIncrement}
                onDecrement={onDecrement}
              />
            ))}
          </ListGroup>
          <Row className="justify-content-end">
            <Col xs="auto" className="total-label">Total Factura:</Col>
            <Col xs="auto" className="total-amount">${totalOrder}</Col>
          </Row>
          <Row>
            <Col className="text-center">
              <Button color="success" onClick={handleFinishInvoice}>Finalizar Factura</Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Container>
  );
}

export default InvoicePreview;
*/











import React from 'react';
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
function InvoicePreview(props) {
  const { clienteData, productosData, onRemoveProduct, onIncrement, onDecrement, invoiceNumber, totalOrder, currentDate } = props;
  const handleFinishInvoice = async () => {
    
    const formattedProducts = productosData.map((item) => {
      return {
        productId: item._id,
        quantity: item.quantity,
      };
    });

    const invoiceData = {
      name: "mostrador",
      products: formattedProducts,
      totalAmount: totalOrder,
    };

    try {
      const response = await addBill(invoiceData);

      if (response) {
        alert('Factura enviada exitosamente.');
      } else {
        alert('Error al enviar la factura.');
      }
    } catch (error) {
      alert('Error al enviar la factura: ' + error.message);
    }
  };

  return (
    <Container fluid className="invoice-preview">
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
        <Col xs="auto" className="total-label">Total Factura:</Col>
        <Col xs="auto" className="total-amount">${totalOrder}</Col>
      </Row>
        <Col className="text-center">
          <Button color="primary" onClick={handleFinishInvoice}>Finalizar Factura</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default InvoicePreview;