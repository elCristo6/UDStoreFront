import React from 'react';
import { FaEnvelope, FaIdCard, FaPhone, FaSearch, FaUser } from 'react-icons/fa';
import { Button, Col, Container, Form, FormGroup, Input, Row } from 'reactstrap';
import { consultarPorTelefono } from '../../service/authService';

import './ClientForm.css';

class ClientForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
      email: '',
      clientDescription: '',
      name: '', 
      nitCedula: '',
      selectedProduct: 'prod1', // Valor por defecto seleccionado: 'Cliente'
      products: [
        { id: 'prod1', name: 'Cliente' },
        { id: 'prod2', name: 'Mostrador' },
      ],
      isLoading: false,
      error: null, // Nuevo estado para el mensaje de error
    };
  }

  componentDidMount() {
    // Recuperar los datos del almacenamiento local si existen
    const storedData = sessionStorage.getItem('clientFormData');

    if (storedData) {
      this.setState(JSON.parse(storedData), () => {
        // Después de establecer el estado, llama a la función para actualizar los datos en InvoicePreview
        this.props.onDataChange(this.state);
      });
    }
  }

  componentDidUpdate() {
    // Almacenar los datos del formulario en el almacenamiento local
    sessionStorage.setItem('clientFormData', JSON.stringify(this.state));
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => {
      // Después de establecer el estado, llama a la función para actualizar los datos en InvoicePreview
      this.props.onDataChange(this.state);
    });
  };

  handleSearchClick = async () => {
    const { phoneNumber, selectedProduct } = this.state;
    this.setState({ isLoading: true, error: null });

    try {
      // Realizar la consulta solo si el producto seleccionado es "Cliente"
      if (selectedProduct === 'prod1') {
        const result = await consultarPorTelefono(phoneNumber);

        if (result) {
          // Autocompletar los campos con los datos obtenidos
          this.setState({
            name: result.name || '',
            email: result.email || '',
            nitCedula: result.cc || '',
            detalles:result.detalles||''
            // Agrega más campos según los datos que recibas
          }, () => {
            // Después de establecer el estado, llama a la función para actualizar los datos en InvoicePreview
            this.props.onDataChange(this.state);
          });
        } else {
          // Limpiar los campos si no se encuentra ningún resultado y mostrar mensaje de error
          this.setState({
            name: '',
            email: '',
            nitCedula: '',
            clientDescription:'',
            error: 'El usuario no existe.', // Mensaje de error
            // Limpia otros campos según sea necesario
          }, () => {
            // Después de establecer el estado, llama a la función para actualizar los datos en InvoicePreview
            this.props.onDataChange(this.state);
          });
        }
      } else {
        // Si el producto es "Mostrador", establecer el nombre predeterminado y limpiar otros campos
        this.setState({
          name: selectedProduct,
          email: '',
          nitCedula: '',
          clientDescription:''
        }, () => {
          // Después de establecer el estado, llama a la función para actualizar los datos en InvoicePreview
          this.props.onDataChange(this.state);
        });
      }
    } catch (error) {
      console.error('Error al realizar la consulta:', error);
      this.setState({ error: 'Ocurrió un error al realizar la consulta.' }, () => {
        // Después de establecer el estado, llama a la función para actualizar los datos en InvoicePreview
        this.props.onDataChange(this.state);
      }); // Mensaje de error
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handlePhoneKeyUp = (event) => {
    if (event.key === 'Enter') {
      this.handleSearchClick();
    }
  };

  handleProductSelect = (productId) => {
    if (productId === 'prod2') { // Verifica si el producto seleccionado es 'Mostrador'
      this.setState({
        selectedProduct: productId,
        name: 'mostrador', // Configura el campo 'name' con 'MOSTRADOR'
        phoneNumber: '', // Vacía el campo de teléfono
        email: '', // Vacía el campo de correo electrónico
        nitCedula: '', // Vacía el campo de NIT/Cédula
        clientDescription: '', // Vacía la descripción del cliente
        error: null, // Limpia cualquier mensaje de error
      }, () => {
        // Después de establecer el estado, llama a la función para actualizar los datos en InvoicePreview
        this.props.onDataChange(this.state);
      });
    } else {
      // Si no es 'Mostrador', actualiza el estado como lo hacías anteriormente
      this.setState({ selectedProduct: productId }, () => {
        this.props.onDataChange(this.state);
      });
    }
  };
  render() {
    return (
      <Container className="clientForm-container">
        <Form>
          <Row className="mb-4">
            <Col>
              <h5 className="clientForm-section-title">1. Información General</h5>
            </Col>
          </Row>
          
          <Row form>
            {this.state.products.map((product) => (
              <Col md={6} key={product.id}>
                <Button
                  color={this.state.selectedProduct === product.id ? "primary" : "secondary"}
                  onClick={() => this.handleProductSelect(product.id)}
                  className="mb-3"
                  block
                >
                  {product.name}
                </Button>
              </Col>
            ))}
          </Row>

          <FormGroup>
            <Row>
              <Col xs="10">
                <div className="clientForm-input-group">
                  <FaPhone className="clientForm-input-icon" />
                  <Input
                    type="tel"
                    name="phoneNumber"
                    id="phone-input"
                    className="clientForm-input" 
                    value={this.state.phoneNumber}
                    onChange={this.handleInputChange}
                    onKeyUp={this.handlePhoneKeyUp}
                    placeholder="Número de Teléfono"
                  />
                </div>
              </Col>
              <Col xs="2">
                <Button className="clientForm-search-button" onClick={this.handleSearchClick}>
                  <FaSearch />
                </Button>
              </Col>
            </Row>
          </FormGroup>

          {this.state.error && (
            <Row>
              <Col>
                <div className="clientForm-error">{this.state.error}</div>
              </Col>
            </Row>
          )}

          <FormGroup>
            <div className="clientForm-input-group">
              <FaUser className="clientForm-input-icon" />
              <Input
                type="text"
                name="name"
                id="name-input"
                className="clientForm-input" 
                value={this.state.name}
                onChange={this.handleInputChange}
                placeholder="Nombre Completo"
              />
            </div>
          </FormGroup>

          <FormGroup>
            <div className="clientForm-input-group">
              <FaEnvelope className="clientForm-input-icon" />
              <Input
                type="email"
                name="email"
                id="email-input"
                className="clientForm-input" 
                value={this.state.email}
                onChange={this.handleInputChange}
                placeholder="Correo Electrónico"
              />
            </div>
          </FormGroup>

          <FormGroup>
            <div className="clientForm-input-group">
              <FaIdCard className="clientForm-input-icon" />
              <Input
                type="text"
                name="nitCedula"
                id="nit-cedula-input"
                className="clientForm-input" 
                value={this.state.nitCedula}
                onChange={this.handleInputChange}
                placeholder="NIT/Cédula"
              />
            </div>
          </FormGroup>
          <FormGroup>
          <Row>
            <Col>
              <h5 className="clientForm-section-title">2. Detalles del Cliente</h5>
              <Input
                type="textarea"
                name="detalles"
                id="client-description"
                className="clientForm-input" 
                value={this.state.detalles}
                onChange={this.handleInputChange}
                placeholder="Descripción del cliente"
                rows="3"
              />
            </Col>
          </Row>
          </FormGroup>
          {this.state.isLoading && (
            <Row> 
              <Col className="text-center">
                <div className="clientForm-loading">Cargando...</div>
              </Col>
            </Row>
          )}
        </Form>
      </Container>
    );
  }
}

export default ClientForm;
