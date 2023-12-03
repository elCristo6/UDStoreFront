import React from 'react';
import { FaCashRegister, FaProductHunt, FaUser } from 'react-icons/fa';
import ClientForm from './ClientForm';
import InvoicePreview from './InvoicePreview'; // Importa el componente InvoicePreview
import './NewBill.css';
import ProductList from './ProductSeleccionList';
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
      productData: [], // Inicializa productData como una matriz vacía
      orderData: {
        // Aquí puedes almacenar los datos relacionados con el pedido
      },
      showInvoicePreview: false,
    };
  }

  setActiveMenu = (menu) => {
    this.setState({ activeMenu: menu });
  };

  handleClientDataChange = (data) => {
    this.setState((prevState) => ({
      clientData: { ...prevState.clientData, ...data },
      showInvoicePreview: true, // Activa la vista previa al cambiar los datos del cliente
    }));
  };

  handleProductDataChange = (newProduct) => {
    this.setState((prevState) => ({
      productData: [...prevState.productData, newProduct],
      showInvoicePreview: true, // Activa la vista previa al agregar productos
    }));
  };

  handleRemoveProduct = (productId) => {
    this.setState((prevState) => ({
      productData: prevState.productData.filter((product) => product.id !== productId),
      showInvoicePreview: true, // Activa la vista previa al eliminar productos
    }));
  };

  handleOrderDataChange = (data) => {
    this.setState({ orderData: { ...this.state.orderData, ...data } });
  };
  
  handleProductSelect = (product) => {
    // Agrega el producto seleccionado a la lista productData
    this.setState((prevState) => ({
      productData: [...prevState.productData, product],
      showInvoicePreview: true,
    }));
  };

  // Función para ocultar InvoicePreview
  hideInvoicePreview = () => {
    this.setState({ showInvoicePreview: false });
  };

  renderActiveForm = () => {
    const { activeMenu, showInvoicePreview } = this.state;

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
              remisionData={this.state.remisionData} 

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
              remisionData={this.state.remisionData} // Asegúrate de que esta propiedad tenga datos definidos
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
            hideInvoicePreview={this.hideInvoicePreview} // Pasa la función para ocultar InvoicePreview
          />
           <InvoicePreview
              clienteData={this.state.clientData}
              productosData={this.state.productData}
              remisionData={this.state.remisionData} // Asegúrate de que esta propiedad tenga datos definidos
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
