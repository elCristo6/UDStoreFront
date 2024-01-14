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
     
      paymentMethod: '', // Inicialmente vacío
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


  calculateTotal = () => {
    const { productData } = this.state;
    return productData.reduce((total, product) => total + (product.price * product.quantity), 0);
  };
  
  handleRemoveProduct = (productId) => {
    // Encuentra el índice del producto que deseas eliminar
    const productIndex = this.state.productData.findIndex((product) => product._id === productId);

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
    const { productData } = this.state;
    const product = productData.find((product) => product._id === productId);
  
    if (product && product.quantity < product.stock) {
      this.setState((prevState) => ({
        productData: prevState.productData.map((item) => {
          if (item._id === productId) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        }),
      }));
    }
  };
  
  decreaseQuantity = (productId) => {
    const { productData } = this.state;
    const product = productData.find((product) => product._id === productId);
  
    if (product && product.quantity > 1) {
      this.setState((prevState) => ({
        productData: prevState.productData.map((item) => {
          if (item._id === productId) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        }),
      }));
    }
  };
  
  getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Agrega un cero delante si es necesario
    const day = String(today.getDate()).padStart(2, '0'); // Agrega un cero delante si es necesario
    return `${year}-${month}-${day}`;
  }
  
  renderActiveForm = () => {
    const { activeMenu } = this.state;
    const totalOrder = this.calculateTotal(); // Calcular el total
    const currentDate = this.getCurrentDate();
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
              invoiceNumber="12345"
              currentDate={currentDate}
              totalOrder={totalOrder}
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
              invoiceNumber="12345"
              currentDate={currentDate}
              totalOrder={totalOrder}
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
              totalOrder={totalOrder}
              
            />
            <InvoicePreview
              clienteData={this.state.clientData}
              productosData={this.state.productData}
              onRemoveProduct={this.handleRemoveProduct} // Agregamos la función para eliminar productos
              onIncrement={this.increaseQuantity}
              onDecrement={this.decreaseQuantity}
              invoiceNumber="12345"
              currentDate={currentDate}
              totalOrder={totalOrder}
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