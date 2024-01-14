import React, { useState } from 'react';
import './SendOrderForm.css'; // Importa el archivo CSS

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
    <div className="sof-container">
      <h2 className="sof-titulo">Confirma tu Pedido</h2>
      <form onSubmit={handleSubmit}>
      <div className="sof-total">
        <p>Su Total es de:</p>
        <p className="sof-total-amount">${totalOrder}</p>
      </div>
      <div className="sof-medio-pago">
        <p>Medio de Pago:</p>
        <div className="sof-buttons">
          <button
            className={`sof-button ${selectedButton === 1 ? 'seleccionado' : ''}`}
            onClick={() => handleButtonClick(1)}
          >
            Efectivo
          </button>
          <button
            className={`sof-button ${selectedButton === 2 ? 'seleccionado' : ''}`}
            onClick={() => handleButtonClick(2)}
          >
            Nequi
          </button>
          <button
            className={`sof-button ${selectedButton === 3 ? 'seleccionado' : ''}`}
            onClick={() => handleButtonClick(3)}
          >
            Daviplata
          </button>
          <button
            className={`sof-button ${selectedButton === 4 ? 'seleccionado' : ''}`}
            onClick={() => handleButtonClick(4)}
          >
            Bancolombia
          </button>
        </div>
      </div>
      <form className="sof-form">
        <fieldset>
          <legend>Paga con:</legend>
          <input
            type="text"
            id="cantidadPaga"
            value={cantidadPaga}
            onChange={handleCantidadPagaChange}
            className="sof-input"
          />
        </fieldset>
        <div className="sof-amounts">
          <p>Total: <span className="sof-total-amount">${totalOrder}</span></p>
          <p>Cambio: <span className="sof-cambio-amount">${cambio}</span></p>
        </div>
      </form>
      <button className="sof-terminar-button">Terminar</button>
      </form>
    </div>
  );
};

export default SendOrderForm;
