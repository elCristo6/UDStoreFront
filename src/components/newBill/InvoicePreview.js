import React, { useEffect, useState } from 'react';
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import './InvoicePreview.css';

function ProductItem(props) {
  const { product, onRemoveProduct, onIncrement, onDecrement } = props;
  const [quantity, setQuantity] = useState(product.quantity);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
    onIncrement(product.id);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      onDecrement(product.id);
    }
  };

  return (
    <div className="item">
      <div className="product-info">
        <span className="item-name">{product.name}</span>
        <span className="item-price">${product.price}</span>
      </div>
      <div className="quantity">
        <button onClick={handleDecrement}>
          <FaMinus />
        </button>
        <span>{quantity}</span>
        <button onClick={handleIncrement}>
          <FaPlus />
        </button>
      </div>
      <div className="item-total">
        ${product.price * quantity}
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
  const { clienteData, productosData, onRemoveProduct } = props;
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    // Initialize productData with quantities from productosData
    const initialProductData = productosData.map((item) => ({
      ...item,
      quantity: 0,
    }));
    setProductData(initialProductData);
  }, [productosData]);

  const handleIncrement = (productId) => {
    const updatedProductData = productData.map((item) => {
      if (item.id === productId) {
        // Incrementa la cantidad del producto seleccionado
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    // Actualiza el estado de productData con los datos actualizados
    setProductData(updatedProductData);
  };

  const handleDecrement = (productId) => {
    const updatedProductData = productData.map((item) => {
      if (item.id === productId && item.quantity > 0) {
        // Disminuye la cantidad del producto seleccionado
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    // Actualiza el estado de productData con los datos actualizados
    setProductData(updatedProductData);
  };

  const calculateTotal = () => {
    let total = 0;
    productData.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
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
          {productData.map((item) => (
            <ProductItem
              key={item.id}
              product={item}
              onRemoveProduct={onRemoveProduct}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
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
