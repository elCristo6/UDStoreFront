import React from 'react';
import './InvoicePreview.css';

function InvoicePreview(props) {
  const { clienteData, productosData, onRemoveProduct } = props;

  // Función para eliminar un producto
  const removeItem = (itemId) => {
    onRemoveProduct(itemId);
  };

  return (
    <div className="invoice-preview">
      <h3>Vista Previa de la Factura</h3>
      <div className="client-info">
        <p>Cliente: {clienteData.name}</p>
        <p>Teléfono: {clienteData.phoneNumber}</p>
        <p>Email: {clienteData.email}</p>
        <p>NIT/Cédula: {clienteData.nitCedula}</p>
      </div>
      <div className="items-list">
        {productosData.map(item => (
          <div key={item.id} className="item">
            <span>{item.name} - ${item.price}</span>
            <button onClick={() => removeItem(item.id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InvoicePreview;
