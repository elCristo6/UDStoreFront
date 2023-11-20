import React from 'react';
import { FaCashRegister, FaProductHunt, FaUser } from 'react-icons/fa';
import ClientForm from './ClientForm';
import './NewBill.css';
import ProductList from './ProductList';
import SendOrderForm from './SendOrderForm';

class NewBill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMenu: 'cliente',
      clientData: {
        selectedProduct: '',
        phoneNumber: '',
        email: '',
        name: '',
        nitCedula: '',
        clientDescription: '',
      },
      productData: {
        // Aquí puedes almacenar los datos relacionados con los productos
      },
      orderData: {
        // Aquí puedes almacenar los datos relacionados con el pedido
      },
    };
  }

  setActiveMenu = (menu) => {
    this.setState({ activeMenu: menu });
  };

  handleClientDataChange = (data) => {
    this.setState({ clientData: { ...this.state.clientData, ...data } });
  };

  handleProductDataChange = (data) => {
    this.setState({ productData: { ...this.state.productData, ...data } });
  };

  handleOrderDataChange = (data) => {
    this.setState({ orderData: { ...this.state.orderData, ...data } });
  };

  renderActiveForm = () => {
    const { activeMenu } = this.state;
    switch (activeMenu) {
      case 'cliente':
        return (
          <ClientForm
            data={this.state.clientData}
            onDataChange={this.handleClientDataChange}
          />
        );
      case 'productos':
        return (
          <ProductList
            data={this.state.productData}
            onDataChange={this.handleProductDataChange}
          />
        );
      case 'enviar':
        return (
          <SendOrderForm
            clientData={this.state.clientData}
            productData={this.state.productData}
            orderData={this.state.orderData}
            onDataChange={this.handleOrderDataChange}
          />
        );
      default:
        return null;
    }
  };

  render() {
    const { activeMenu } = this.state;

    return (
      <div className="newBillContainer">
        <div className="menu">
          <button
            className={`menuItem ${activeMenu === 'cliente' ? 'active' : ''}`}
            onClick={() => this.setActiveMenu('cliente')}
          >
            <FaUser className="icon" /> Datos Cliente
          </button>
          <button
            className={`menuItem ${activeMenu === 'productos' ? 'active' : ''}`}
            onClick={() => this.setActiveMenu('productos')}
          >
            <FaProductHunt className="icon" /> Productos
          </button>
          <button
            className={`menuItem ${activeMenu === 'enviar' ? 'active' : ''}`}
            onClick={() => this.setActiveMenu('enviar')}
          >
            <FaCashRegister className="icon" /> Enviar Orden
          </button>
        </div>
        <div className="content">
          {this.renderActiveForm()}
        </div>
      </div>
    );
  }
}

export default NewBill;
