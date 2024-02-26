import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { FaCashRegister, FaProductHunt, FaUser } from 'react-icons/fa';
import { Button, Col, Row } from 'reactstrap';
import { getBills } from '../../service/newBillService';
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
        phoneNumber: '',
        email: '',
        name: '',
        nitCedula: '',
        detalles: '',
      },
      paymentDetails: {
        paymentMethod: '',
        amountPaid: 0,
        change: 0,
      },
      productData: [],
      orderData: {},
      lastInvoiceConsecutive: 0,
     
    };
  }
  componentDidMount() {
    this.fetchLastInvoiceConsecutive();
}

fetchLastInvoiceConsecutive = async () => {
  try {
      const bills = await getBills();
      if (bills && bills.length > 0) {
          const lastBill = bills[bills.length - 1]; // Obtener la última factura
          // Asegurarse de que consecutivo es un número antes de incrementarlo
          const lastConsecutive = parseInt(lastBill.consecutivo, 10);
          const nextConsecutive = !isNaN(lastConsecutive) ? lastConsecutive : 1; // Asumir el próximo consecutivo
          this.setState({ lastInvoiceConsecutive: nextConsecutive });
      } else {
          // Si no hay facturas, comenzar desde 1
          this.setState({ lastInvoiceConsecutive: 1 });
      }
  } catch (error) {
      console.error('Error fetching last invoice consecutive:', error);
      // Manejar el error adecuadamente, quizás estableciendo el estado para mostrar un mensaje de error
  }
};



  resetState = () => {
    this.setState({
      // Restablece a los valores iniciales deseados
      clientData: {
        phoneNumber: '',
        email: '',
        name: '',
        nitCedula: '',
        detalles: '',
      },
      paymentDetails: {
        paymentMethod: '',
        amountPaid: 0,
        change: 0,
      },
      productData: [],
      orderData: {},
      // Cualquier otro estado que necesites restablecer
    });
  }
  updatePaymentDetails = (method, amountPaid, change) => {
    this.setState({
      paymentDetails: {
        paymentMethod: method,
        amountPaid: amountPaid,
        change: change,
      }
    });
  };
  
    
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

    switch (activeMenu) {
      case 'cliente':
        return (
          <>
            <ClientForm
              data={this.state.clientData}
              onDataChange={this.handleClientDataChange}
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
            
          </>
        );
      case 'enviar':
        return (
          <>
            <SendOrderForm
            
            onPaymentMethodChange={(method, amountPaid, change) => this.updatePaymentDetails(method, amountPaid, change)}

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
    const totalOrder = this.calculateTotal(); // Calcular el total
    const currentDate = this.getCurrentDate();
    const invoiceNumber = this.state.lastInvoiceConsecutive + 1;
    return (
      
      <Row className="g-0">
          <Col md="2" lg = "2" xs = "2" className="menuSide">
            {/* Aquí utilizamos el componente Button de reactstrap */}
            <Button
              color="primary"
              className={`newBillMenuItem ${activeMenu === 'cliente' ? 'active' : ''}`}
              onClick={() => this.setActiveMenu('cliente')}
            >
              <FaUser className="newBillIcon" />
            </Button>
            <Button
              color="secondary"
              className={`newBillMenuItem ${activeMenu === 'productos' ? 'active' : ''}`}
              onClick={() => this.setActiveMenu('productos')}
            >
              <FaProductHunt className="newBillIcon" />
            </Button>
            <Button
              color="success"
              className={`newBillMenuItem ${activeMenu === 'enviar' ? 'active' : ''}`}
              onClick={() => this.setActiveMenu('enviar')}
            >
              <FaCashRegister className="newBillIcon" />
            </Button>
            {/* ... más botones si los tienes ... */}
          </Col>
          <Col md="6"  lg = "6" xs = "6"className="newBillMainContent">
            <div>
            {this.renderActiveForm()}
            </div>
            
          </Col>
          
          <Col  className="invoicePreviewContainer">

          <InvoicePreview
              clienteData={this.state.clientData}
              productosData={this.state.productData}
              onRemoveProduct={this.handleRemoveProduct} // Agregamos la función para eliminar productos
              onIncrement={this.increaseQuantity}
              onDecrement={this.decreaseQuantity}
              invoiceNumber={invoiceNumber}
              currentDate={currentDate}
              totalOrder={totalOrder}
              resetState={this.resetState}
              paymentDetails={this.state.paymentDetails}
              fetchLastInvoiceConsecutive={this.fetchLastInvoiceConsecutive}
            />
          </Col>
        </Row>
     
    );
  }
}

export default NewBill;