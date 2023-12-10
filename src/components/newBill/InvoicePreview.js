import React from 'react';
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import './InvoicePreview.css';

function ProductItem(props) {
  const { product, onRemoveProduct, onIncrement, onDecrement } = props;

  return (
    <div className="item">
      <div className="product-info">
        <span className="item-name">{product.name}</span>
        <span className="item-price">${product.price}</span>
      </div>
      <div className="quantity">
      <button onClick={() => onDecrement(product._id)}>
        <FaMinus />
      </button>
      <span>{product.quantity}</span>
      <button onClick={() => onIncrement(product._id)}>
        <FaPlus />
      </button>

      </div>
      <div className="item-total">
        ${product.price * product.quantity}
      </div>
      <div className="delete-button">
        <button onClick={() => onRemoveProduct(product.id)}>
          <FaTrash />
        </button>
      </div>
    </div>
  );
}

function InvoicePreview(props) {
  const { clienteData, productosData, onRemoveProduct, onIncrement, onDecrement } = props;

  const calculateTotal = () => {
    return productosData.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="invoice-preview">
      <div className="invoice-header">
        <h3>Factura</h3>
      </div>
      <div className="client-info">
        <p>Cliente: {clienteData.name}</p>
        <p>NIT/Cédula: {clienteData.nitCedula}</p>
        <p>Teléfono: {clienteData.phoneNumber}</p>
        <p>Email: {clienteData.email}</p>
      </div>
      <div className="invoice-details">
        <div className="items-list">
          <div className="item item-header">
            <div className="product-info">Descripción</div>
            <div className="quantity">Cantidad</div>
            <div className="item-total">Total</div>
            <div className="delete-button"></div>
          </div>
          {productosData.map((item) => (
            <ProductItem
              key={item._id}
              product={item}
              onRemoveProduct={onRemoveProduct}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
            />
          ))}
        </div>
        <div className="total-label">Total Factura:</div>
        <div className="total-amount">${calculateTotal()}</div>
      </div>
    </div>
  );
}

export default InvoicePreview;
