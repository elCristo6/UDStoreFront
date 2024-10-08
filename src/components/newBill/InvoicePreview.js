import React, { useEffect, useState } from 'react';
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import { Button, Col, Container, FormGroup, Input, Label, ListGroup, Row } from 'reactstrap';
import { addBill } from '../../service/newBillService';
import { registerPrint } from '../../service/registerService';
import './InvoicePreview.css';
// Componente ProductItem que representa un elemento de producto en la factura
function ProductItem(props) {
  const { product, onRemoveProduct, onIncrement, onDecrement,onPriceChange } = props;
  const [updatedPrice, setUpdatedPrice] = useState(product.price); // State to hold the updated price

  const handlePriceChange = (event) => {
    const newPrice = parseFloat(event.target.value);
    setUpdatedPrice(newPrice); // Update the state with the new price
    onPriceChange(product._id, newPrice);
  };
  return (
    <Row className="item align-items-center">
      <Col xs={5} className="product-info">
        <span className="item-name">{product.name}</span>
      </Col>
      <Col xs={2} className="d-flex align-items-center">
        <Input
          type="number"
          className="item-price-input"
          value={updatedPrice}
          onChange={handlePriceChange}
        />
      </Col>
      <Col xs={2} className="quantity d-flex align-items-center">
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
        <span className="item-total">${updatedPrice * product.quantity}</span>
      </Col>
    </Row>
  );
}
function ImpresionItem(props) {
  const { impresion, onRemoveImpresion } = props;

  return (
    <Row className="item">
      <Col xs={6} className="product-info">
        <span className="item-name">{impresion.descripcionImpresion}</span>
      </Col>
      <Col xs={4} className="quantity">
        <Button color="danger" size="sm" onClick={() => onRemoveImpresion(impresion.id)}>
          <FaTrash />
        </Button>
        {/* Asumiendo que no hay incremento ni decremento para impresiones */}
      </Col>
      <Col xs={2} className="text-right">
        <span className="item-total">${impresion.total}</span>
      </Col>
    </Row>
  );
}

function ServicioItem({ servicio, onRemoveServicio }) {
  return (
    <Row className="item">
      <Col xs={6} className="product-info">
        <span className="item-name">{servicio.descripcion}</span>
        {/* Mover el precio a la misma columna que la descripción para consistencia */}
      </Col>
      <Col xs={4} className="text-right quantity">
        {/* Mover el botón de eliminar a la derecha completamente, similar a los otros items */}
        <Button color="danger" size="sm" onClick={() => onRemoveServicio(servicio.id)}>
          <FaTrash />
        </Button>
      </Col>
      <Col xs={2} className="text-right">
      <span className="item-total">${servicio.valor}</span>
      </Col>
      
    </Row>
  );
}



// Componente InvoicePreview que muestra la factura completa
function InvoicePreview({ onPaymentMethodChange,clienteData, productosData, impresionesData,serviciosData,
  onRemoveServicio,onRemoveProduct, onIncrement, onDecrement,onRemoveImpresion, 
  onPriceChange, invoiceNumber, totalOrder, currentDate,resetState,paymentDetails ,fetchLastInvoiceConsecutive}) {

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [adjustedTotal, setAdjustedTotal] = useState(totalOrder);
  const [adjustedChange, setAdjustedChange] = useState(paymentDetails.change);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Efectivo');
  const [cantidadPaga, setCantidadPaga] = useState('');
  

  const handleCantidadPagaChange = (event) => {
    const amount = event.target.value;
    setCantidadPaga(amount);
    const calculatedChange = parseFloat(amount) - adjustedTotal;
    const finalChange = calculatedChange > 0 ? calculatedChange.toString() : '0';
  

    // Aquí actualizamos el estado en NewBill
    onPaymentMethodChange(selectedPaymentMethod, amount, finalChange);
  };

  const handlePaymentMethodClick = (method) => {
    setSelectedPaymentMethod(method);
    // Envía el método de pago seleccionado al componente padre si es necesario
    if(onPaymentMethodChange) {
      onPaymentMethodChange(method);
    }
  };

  useEffect(() => {
    const totalProducts = productosData.reduce((acc, product) => acc + product.price * product.quantity, 0);
    const totalImpresiones = impresionesData.reduce((acc, impresion) => acc + impresion.total, 0);
    const totalServicios = serviciosData.reduce((acc, servicio) => acc + servicio.valor, 0);
    const newTotal = totalProducts + totalImpresiones + totalServicios;
    setAdjustedTotal(newTotal);
    setAdjustedChange(paymentDetails.amountPaid - newTotal);
  }, [productosData, impresionesData, serviciosData, paymentDetails.amountPaid]);

  const handleAdjustTotal = (adjustValue) => {
    setAdjustedTotal((prevTotal) => {
      const newTotal = Math.max(0, prevTotal + adjustValue);
      // Calcular y establecer el nuevo cambio basado en el nuevo total ajustado
      setAdjustedChange(paymentDetails.amountPaid - newTotal);
      return newTotal;
    });
  };


  

  const handleFinishInvoice = async () => {
    const formattedProducts = productosData.map((item) => ({
      productId: item._id,
      quantity: item.quantity
    }));

    // Formateando impresiones, asumiendo que ya vienen preparadas en impresionesData
    const formattedImpresiones = impresionesData.map(impresion => ({// Estructura según lo necesario para tu backend
      descripcionImpresion: impresion.descripcionImpresion,
      pesoImpresion: impresion.pesoGramos,
      valorGramo: impresion.valorGramo,
      totalImpresion: impresion.total
    }));
     // Formateando servicios, asumiendo que ya vienen preparados en serviciosData
  const formattedServices = serviciosData.map(servicio => ({
    // Estructura según lo necesario para tu backend
    descripcionServicio: servicio.descripcion,
    precioServicio: servicio.valor
  }));
    const invoiceData = {
      name: clienteData.name, // Usar el nombre real del cliente
      cc: clienteData.nitCedula, // Añadir NIT o cédula
      phone: clienteData.phoneNumber, // Añadir número de teléfono
      email: clienteData.email, // Añadir correo electrónico
      detalles: clienteData.detalles, // Añadir detalles si es necesario y está disponible
      products: formattedProducts,
      impresiones: formattedImpresiones, 
      servicio: formattedServices,
      totalAmount: adjustedTotal,
      medioPago: paymentDetails.paymentMethod,
      cambio:paymentDetails.change,
      pagaCon:paymentDetails.amountPaid

    };

    try {
      const response = await addBill(invoiceData);
      if (response) {
      const printResponse = await registerPrint();
        if (printResponse.success === false) {
          console.log('La impresión falló, pero la factura se procesó correctamente:', printResponse.message);
        } else {
          console.log ('Respuesta de la impresión:', printResponse);
        }
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
      <div className="content-wrapper">
        {showConfirmation && (
        <div className="confirmation-animation">✔</div> // Reemplaza esto con tu animación CSS
      )}
      <Row className="invoice-header">
        <Col className="text-center">
          <h3>Factura de venta  #{invoiceNumber}</h3>
        </Col>
      </Row>
      <Row>
        <Col className="invoice-date text-left">Fecha: {currentDate}</Col>
      </Row>
      <Row className="client-details">
        <Col xs={6}>
          <div className="client-name">{clienteData.name}</div>
          <div className="client-info">{clienteData.nitCedula}</div>
          <div className="client-info">{clienteData.phoneNumber}</div>
          <div className="client-info">{clienteData.email}</div>
        </Col>
      </Row>
      <ListGroup flush className="items-list">
        {/* Combinar productos e impresiones en una sola lista para la renderización */}
        {productosData.length > 0 || impresionesData.length > 0  || serviciosData.length > 0 ?(
          <>
            {productosData.map((item) => (
              <ProductItem
                key={item._id}
                product={item}
                onRemoveProduct={onRemoveProduct}
                onIncrement={onIncrement}
                onDecrement={onDecrement}
                onPriceChange={onPriceChange} 
              />
            ))}
            {impresionesData.map((impresion, index) => (
              <ImpresionItem
                key={`impresion-${index}`}
                impresion={impresion}
                onRemoveImpresion={onRemoveImpresion}
              />
            ))}
            {serviciosData.map((servicio, index) => (
              <ServicioItem
                key={`servicio-${index}`}
                servicio={servicio}
                onRemoveServicio={onRemoveServicio}
              />
      ))}

          </>
        ) : (
          <div className="empty-state">No hay productos, impresiones ni servicios en la factura.</div>                                                     
        )}
      </ListGroup>

</div>
<div className="adjustment-buttons">
      {/* Botones de ajuste de la factura */}
      
      {['Efectivo', 'Nequi','Daviplata','Bancolombia'].map((method, index) => (
        <Button key={index} 
        className={`adjust-button-pago ${selectedPaymentMethod === method ? 'seleccionado' : ''}`}
        onClick={() => handlePaymentMethodClick(method)}
        >
          {method}
        </Button>
      ))}
 </div>

<div className="footer">

        <div>
          <FormGroup className="d-flex align-items-center">
            <Label for="amountPaidInput" className="mr-2 mb-0">Paga con:</Label>
            <Input
              id="amountPaidInput"
              type="number"
              placeholder="Introduce el monto"
              value={cantidadPaga}
             onChange={handleCantidadPagaChange}
              className="input-paga-con"
            />
            
          </FormGroup>
        </div>
    <div className="element-background adjustments-and-summary">
      <div className="adjustment-buttons-container">
        <div className="adjustment-buttons">
          {[1000, 2000, 5000].map((value, index) => (
            <Button key={index} className={`adjust-button ${value < 0 ? 'negative' : ''}`} onClick={() => handleAdjustTotal(value)}>
              {value >= 0 ? `+${value}` : value}
            </Button>
          ))}
        </div>
        <div className="adjustment-buttons">
          {[-1000, -2000, -5000].map((value, index) => (
            <Button key={index} className={`adjust-button negative`} onClick={() => handleAdjustTotal(value)}>
              {value}
            </Button>
          ))}
        </div>
      </div>

    
      <div className="payment-details">
        <span>Medio de pago: {paymentDetails.paymentMethod}</span>
        <span>Paga con: ${paymentDetails.amountPaid}</span>
        <span>Total Factura: ${adjustedTotal.toLocaleString()}</span>
        <span>Cambio: ${adjustedChange}</span>
      </div>
    </div>
  

<Button color="primary" className="finalize-invoice-button" onClick={handleFinishInvoice}>
  Finalizar Factura
</Button>
</div>
</Container>
  );
}

export default InvoicePreview;