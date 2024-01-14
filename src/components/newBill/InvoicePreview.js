import React from 'react';
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import { addBill } from '../../service/newBillService';

import './InvoicePreview.css';

// Componente ProductItem que representa un elemento de producto en la factura
function ProductItem(props) {
  const { product, onRemoveProduct, onIncrement, onDecrement } = props;

  return (
    <div className="item">
      <div className="product-info">
        <span className="item-name">{product.name}</span> {/* Nombre del producto */}
        <span className="item-price">${product.price}</span> {/* Precio del producto */}
      </div>
      <div className="quantity">
        <button onClick={() => onDecrement(product._id)}> {/* Botón para decrementar la cantidad */}
          <FaMinus /> {/* Icono de resta */}
        </button>
        <span>{product.quantity}</span> {/* Cantidad actual del producto */}
        <button onClick={() => onIncrement(product._id)}> {/* Botón para incrementar la cantidad */}
          <FaPlus /> {/* Icono de suma */}
        </button>
      </div>
      <div className="item-total">${product.price * product.quantity}</div> {/* Precio total del producto */}
      <div className="delete-button">
        <button onClick={() => onRemoveProduct(product._id)}> {/* Botón para eliminar el producto */}
          <FaTrash /> {/* Icono de basura */}
        </button>
      </div>
    </div>
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
    <div className="invoice-preview">
      <div className="invoice-header">
        <h3>Factura #{invoiceNumber}</h3> {/* Número de factura */}
      </div>
      <div className="invoice-date">
        Fecha: {currentDate} {/* Fecha de la factura */}
      </div>
      <div className="client-info">
        <p>Cliente: {clienteData.name}</p> {/* Nombre del cliente */}
        <p>NIT/Cédula: {clienteData.nitCedula}</p> {/* NIT/Cédula del cliente */}
        <p>Teléfono: {clienteData.phoneNumber}</p> {/* Teléfono del cliente */}
        <p>Email: {clienteData.email}</p> {/* Email del cliente */}
      </div>
      <div className="invoice-details">
        <div className="items-list">
          {productosData.map((item) => (
            <ProductItem
              key={item._id}
              product={item}
              onRemoveProduct={onRemoveProduct}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
            />
          ))} {/* Lista de productos con sus detalles */}
        </div>
        <div className="total-label">Total Factura:</div> {/* Etiqueta de total de factura */}
        <div className="total-amount">${totalOrder}</div> {/* Total de la factura */}
      </div>
      <div className="finish-invoice-button">
        <button onClick={handleFinishInvoice}>Finalizar Factura</button>
      </div>
    </div>
  );
}

export default InvoicePreview;
