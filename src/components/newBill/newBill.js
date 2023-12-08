import React, { Component } from 'react';
import { FaCashRegister, FaProductHunt, FaUser } from 'react-icons/fa';
import ClientForm from './ClientForm';
import InvoicePreview from './InvoicePreview';
import './NewBill.css';
import ProductList from './ProductSeleccionList';
import SendOrderForm from './SendOrderForm';

class NewBill extends Component {
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
      productData: [],
      orderData: {},
      quantities: {},
    };
  }

  setActiveMenu = (menu) => {
    this.setState({ activeMenu: menu });
  };

  handleClientDataChange = (data) => {
    this.setState((prevState) => ({
      clientData: { ...prevState.clientData, ...data },
    }));
  };

  handleProductDataChange = (newProduct) => {
    this.setState((prevState) => ({
      productData: [...prevState.productData, newProduct],
      quantities: {
        ...prevState.quantities,
        [newProduct.id]: 1,
      },
    }));
  };

  handleRemoveProduct = (productId) => {
    // Encuentra el índice del producto que deseas eliminar
    const productIndex = this.state.productData.findIndex((product) => product.id === productId);

    if (productIndex !== -1) {
      // Crea una copia de la lista de productos sin el producto que deseas eliminar
      const updatedProductData = [...this.state.productData];
      updatedProductData.splice(productIndex, 1);

      // Actualiza el estado con la lista de productos actualizada
      this.setState({
        productData: updatedProductData,
      });
    }
  };

  handleOrderDataChange = (data) => {
    this.setState({ orderData: { ...this.state.orderData, ...data } });
  };

  handleProductSelect = (product) => {
    this.setState((prevState) => ({
      productData: [...prevState.productData, product],
      quantities: {
        ...prevState.quantities,
        [product.id]: 1,
      },
    }));
  };

  increaseQuantity = (productId) => {
    this.setState((prevState) => ({
      quantities: {
        ...prevState.quantities,
        [productId]: prevState.quantities[productId] + 1,
      },
    }));
  };

  decreaseQuantity = (productId) => {
    if (this.state.quantities[productId] > 1) {
      this.setState((prevState) => ({
        quantities: {
          ...prevState.quantities,
          [productId]: prevState.quantities[productId] - 1,
        },
      }));
    }
  };

  renderActiveForm = () => {
    const { activeMenu, quantities } = this.state;

    switch (activeMenu) {
      case 'cliente':
        return (
          <>
            <ClientForm
              data={this.state.clientData}
              onDataChange={this.handleClientDataChange}
            />
            <InvoicePreview
              clienteData={this.state.clientData}
              productosData={this.state.productData}
              onRemoveProduct={this.handleRemoveProduct} // Agregamos la función para eliminar productos
              quantities={quantities}
              increaseQuantity={this.increaseQuantity}
              decreaseQuantity={this.decreaseQuantity}
            />
          </>
        );
      case 'productos':
        return (
          <>
            <ProductList
              data={this.state.productData}
              onDataChange={this.handleProductDataChange}
              onProductSelect={this.handleProductSelect}
              quantities={quantities}
              increaseQuantity={this.increaseQuantity}
              decreaseQuantity={this.decreaseQuantity}
              onRemoveProduct={this.handleRemoveProduct} // Agregamos la función para eliminar productos
            />
            <InvoicePreview
              clienteData={this.state.clientData}
              productosData={this.state.productData}
              quantities={quantities}
              onRemoveProduct={this.handleRemoveProduct} // Agregamos la función para eliminar productos
              increaseQuantity={this.increaseQuantity}
              decreaseQuantity={this.decreaseQuantity}
            />
          </>
        );
      case 'enviar':
        return (
          <>
            <SendOrderForm
              clientData={this.state.clientData}
              productData={this.state.productData}
              orderData={this.state.orderData}
              onDataChange={this.handleOrderDataChange}
            />
            <InvoicePreview
              clienteData={this.state.clientData}
              productosData={this.state.productData}
              quantities={quantities}
              onRemoveProduct={this.handleRemoveProduct} // Agregamos la función para eliminar productos
              increaseQuantity={this.increaseQuantity}
              decreaseQuantity={this.decreaseQuantity}
            />
          </>
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
            className={`newBillMenuItem ${activeMenu === 'cliente' ? 'active' : ''}`}
            onClick={() => this.setActiveMenu('cliente')}
          >
            <FaUser className="newBillIcon" /> Datos Cliente
          </button>
          <button
            className={`newBillMenuItem ${activeMenu === 'productos' ? 'active' : ''}`}
            onClick={() => this.setActiveMenu('productos')}
          >
            <FaProductHunt className="newBillIcon" /> Productos
          </button>
          <button
            className={`newBillMenuItem ${activeMenu === 'enviar' ? 'active' : ''}`}
            onClick={() => this.setActiveMenu('enviar')}
          >
            <FaCashRegister className="newBillIcon" /> Enviar Orden
          </button>
        </div>

        <div className="newBillMainContent">
          {this.renderActiveForm()}
        </div>
      </div>
    );
  }
}

export default NewBill;
