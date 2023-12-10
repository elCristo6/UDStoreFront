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
    this.setState((prevState) => {
      // Verifica si el producto ya está en la lista por su _id
      const isProductAdded = prevState.productData.some(item => item._id === product._id);
      if (!isProductAdded) {
        // Si no está, añade el producto a la lista
        return {
          productData: [...prevState.productData, { ...product, quantity: 1 }],
        };
      } else {
        // Opcionalmente, podrías querer manejar el caso cuando el producto ya está añadido
        return {};
      }
    });
  };
  
  
  increaseQuantity = (productId) => {
    console.log('Incrementing product with ID:', productId);
    this.setState((prevState) => ({
      productData: prevState.productData.map((product) => {
        console.log('Current product ID:', product.id);
        if (product._id === productId) {
          const newQuantity = product.quantity ? product.quantity + 1 : 1;
          console.log('New quantity for product:', newQuantity);
          return { ...product, quantity: newQuantity };
        }
        return product;
      }),
    }), () => console.log(this.state.productData));
  };
  
  
  decreaseQuantity = (productId) => {
    console.log('Increasing quantity for product ID:', productId);
    this.setState((prevState) => ({
      productData: prevState.productData.map((product) => {
        if (product._id === productId && product.quantity > 1) {
          const newQuantity = product.quantity - 1;
          return { ...product, quantity: newQuantity };
        }
        return product;
      }),
    }));
  };
  

  renderActiveForm = () => {
    const { activeMenu } = this.state;

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
              onDecrement={this.decreaseQuantity}
              onIncrement={this.increaseQuantity}
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
            />
            <InvoicePreview
            
              clienteData={this.state.clientData}
              productosData={this.state.productData}
              onRemoveProduct={this.handleRemoveProduct} // Agregamos la función para eliminar productos
              onIncrement={this.increaseQuantity}
              onDecrement={this.decreaseQuantity}
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
              onRemoveProduct={this.handleRemoveProduct} // Agregamos la función para eliminar productos
              onIncrement={this.increaseQuantity}
              onDecrement={this.decreaseQuantity}
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