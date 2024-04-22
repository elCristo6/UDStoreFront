import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import { getBills } from '../../service/newBillService';
import { NavigationContext } from '../context/contextNewBill';
import HistoryBill from '../historyBill/historyBill';
import Sidebar from '../sideBar/sideBar';
import Stock from '../stock/StockList';
import ClientForm from './ClientForm';
import InvoicePreview from './InvoicePreview';
import './NewBill.css';
import ProductList from './ProductSeleccionList';
import SendOrderForm from './SendOrderForm';

class NewBill extends Component {
  static contextType = NavigationContext;

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
      impresionesData: [],
      serviciosData: [],
      orderData: {},
      lastInvoiceConsecutive: 0,
    };
  }

  componentDidMount() {
    this.fetchLastInvoiceConsecutive();
  }

  renderActiveForm() {
    const { activeScreen } = this.context;
    const totalOrder = this.calculateTotal();

    switch (activeScreen) {
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
            onProductSelect={this.handleProductSelect}
            onImpresionSubmit={this.handleImpresionSubmit}
            onServicioSubmit={this.handleServicioSubmit}
          />
        );
      case 'enviar':
        return (
          <SendOrderForm
            paymentDetails={this.state.paymentDetails}
            totalOrder={totalOrder}
            onPaymentMethodChange={this.updatePaymentDetails}
          />
        );
      case 'stock':
        return <Stock />;
      case 'historyBill':
        return <HistoryBill />;
      default:
        return null;
    }
  }

  fetchLastInvoiceConsecutive = async () => {
    try {
      const bills = await getBills();
      if (bills && bills.length > 0) {
        const lastBill = bills[bills.length - 1];
        const lastConsecutive = parseInt(lastBill.consecutivo, 10);
        const nextConsecutive = !isNaN(lastConsecutive) ? lastConsecutive : 1;
        this.setState({ lastInvoiceConsecutive: nextConsecutive });
      } else {
        this.setState({ lastInvoiceConsecutive: 1 });
      }
    } catch (error) {
      console.error('Error fetching last invoice consecutive:', error);
    }
  };

  resetState = () => {
    this.setState({
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
      impresionesData: [],
      serviciosData: [],
      orderData: {},
    });
  };

  updatePaymentDetails = (method, amountPaid, change) => {
    this.setState({
      paymentDetails: {
        paymentMethod: method,
        amountPaid: amountPaid,
        change: change,
      },
    });
  };

  handleClientDataChange = (data) => {
    this.setState((prevState) => ({
      clientData: { ...prevState.clientData, ...data },
    }));
  };

  calculateTotal = () => {
    const { productData, impresionesData, serviciosData } = this.state;
    const productsTotal = productData.reduce((total, product) => total + (product.price * product.quantity), 0);
    const impresionesTotal = impresionesData.reduce((total, impresion) => total + impresion.total, 0);
    const serviciosTotal = serviciosData.reduce((total, servicio) => total + servicio.valor, 0);
    return productsTotal + impresionesTotal + serviciosTotal;
  };

  handleRemoveImpresion = (impresionId) => {
    this.setState(prevState => ({
      impresionesData: prevState.impresionesData.filter(impresion => impresion.id !== impresionId)
    }));
  };

  handleServicioSubmit = (servicioData) => {
    this.setState(prevState => ({
      serviciosData: [...prevState.serviciosData, { ...servicioData, id: Date.now() }]
    }));
  };

  handleRemoveServicio = (servicioId) => {
    this.setState(prevState => ({
      serviciosData: prevState.serviciosData.filter(servicio => servicio.id !== servicioId)
    }));
  };

  handleRemoveProduct = (productId) => {
    const productIndex = this.state.productData.findIndex((product) => product._id === productId);
    if (productIndex !== -1) {
      const updatedProductData = [...this.state.productData];
      updatedProductData.splice(productIndex, 1);
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
      const isProductAdded = prevState.productData.some(item => item._id === product._id);
      if (!isProductAdded) {
        return {
          productData: [...prevState.productData, { ...product, quantity: 1 }],
        };
      } else {
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
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  handleImpresionSubmit = (impresionData) => {
    this.setState(prevState => ({
      impresionesData: [...prevState.impresionesData, { ...impresionData, id: Date.now() }]
    }));
  };

  render() {
    const { activeScreen } = this.context;
    const totalOrder = this.calculateTotal();
    const currentDate = this.getCurrentDate();
    const invoiceNumber = this.state.lastInvoiceConsecutive + 1;

    const mainContentColSize = activeScreen === 'stock' || activeScreen === 'historyBill' ? '10' : '6';

    return (
      <Row>
        <Sidebar />
        <Col md={mainContentColSize} lg={mainContentColSize} xs={mainContentColSize} className="newBillMainContent main-content">
          <div>
            {this.renderActiveForm()}
          </div>
        </Col>
        {(activeScreen !== 'stock' && activeScreen !== 'historyBill') && (
          <Col className="invoicePreviewContainer">
            <InvoicePreview
              clienteData={this.state.clientData}
              productosData={this.state.productData}
              onRemoveProduct={this.handleRemoveProduct}
              onIncrement={this.increaseQuantity}
              onDecrement={this.decreaseQuantity}
              invoiceNumber={invoiceNumber}
              currentDate={currentDate}
              totalOrder={totalOrder}
              resetState={this.resetState}
              paymentDetails={this.state.paymentDetails}
              fetchLastInvoiceConsecutive={this.fetchLastInvoiceConsecutive}
              impresionesData={this.state.impresionesData}
              onRemoveImpresion={this.handleRemoveImpresion}
              serviciosData={this.state.serviciosData}
              onRemoveServicio={this.handleRemoveServicio}
            />
          </Col>
        )}
      </Row>
    );
  }
}

export default NewBill;
