import React from 'react';
import { FaEnvelope, FaIdCard, FaPhone, FaSearch, FaUser } from 'react-icons/fa';
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
      this.setState(JSON.parse(storedData));
    }
  }

  componentDidUpdate() {
    // Almacenar los datos del formulario en el almacenamiento local
    sessionStorage.setItem('clientFormData', JSON.stringify(this.state));
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    this.props.onDataChange({ [name]: value });
  };

  handleSearchClick = async () => {
    const { phoneNumber } = this.state;
    this.setState({ isLoading: true, error: null });

    try {
      const result = await consultarPorTelefono(phoneNumber);

      if (result) {
        // Autocompletar los campos con los datos obtenidos
        this.setState({
          name: result.name || '',
          email: result.email || '',
          nitCedula: result.nitCedula || '',
          // Agrega más campos según los datos que recibas
        });
      } else {
        // Limpiar los campos si no se encuentra ningún resultado y mostrar mensaje de error
        this.setState({
          name: '',
          email: '',
          nitCedula: '',
          error: 'El usuario no existe.', // Mensaje de error
          // Limpia otros campos según sea necesario
        });
      }
    } catch (error) {
      console.error('Error al realizar la consulta:', error);
      this.setState({ error: 'Ocurrió un error al realizar la consulta.' }); // Mensaje de error
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handlePhoneKeyUp = (event) => {
    if (event.key === 'Enter') {
      this.handleSearchClick();
    }
  };

  render() {
    return (
      <div className="clientForm-container">
        <div className="clientForm-section">
          <div className="clientForm-section-title">1. Información General</div>

          <div className="clientForm-form-row">
            <label className="clientForm-label" htmlFor="phone-input"></label>
            <div className="clientForm-input-group">
              <FaPhone className="clientForm-input-icon" />
              <input
                className="clientForm-input"
                type="tel"
                id="phone-input"
                name="phoneNumber"
                value={this.state.phoneNumber}
                onChange={this.handleInputChange}
                onKeyUp={this.handlePhoneKeyUp} // Agregar el manejador de eventos
                placeholder="Phone Number"
                pattern="[0-9]*"
              />
              <button className="clientForm-search-button" onClick={this.handleSearchClick}>
                <FaSearch className="clientForm-search-icon" />
              </button>
            </div>
          </div>

          {this.state.error && (
            <div className="clientForm-error">
              <p>{this.state.error}</p>
            </div>
          )}

          <div className="clientForm-form-row">
            <label className="clientForm-label" htmlFor="name-input"></label>
            <FaUser className="clientForm-input-icon" />
            <input
              className="clientForm-input"
              type="text"
              id="name-input"
              name="name"
              value={this.state.name}
              onChange={this.handleInputChange}
              placeholder="Full Name"
            />
          </div>
          <div className="clientForm-form-row">
            <label className="clientForm-label" htmlFor="email-input"></label>
            <div className="clientForm-input-group">
              <FaEnvelope className="clientForm-input-icon" />
              <input
                className="clientForm-input"
                type="email"
                id="email-input"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChange}
                placeholder="example@domain.com"
              />
            </div>
          </div>
          
          <div className="clientForm-form-row">
            <label className="clientForm-label" htmlFor="nit-cedula-input"></label>
            <FaIdCard className="clientForm-input-icon" />
            <input
              className="clientForm-input"
              type="text"
              id="nit-cedula-input"
              name="nitCedula"
              value={this.state.nitCedula}
              onChange={this.handleInputChange}
              placeholder="NIT or Cédula"
              pattern="[0-9]*"
            />
          </div>
        </div>
        <div className="clientForm-section">
          <div className="clientForm-section-title">2. Detalles del Cliente</div>
          <div className="clientForm-form-row">
            <textarea
              className="clientForm-textarea"
              id="client-description"
              name="clientDescription"
              value={this.state.clientDescription}
              onChange={this.handleInputChange}
              placeholder="Ingrese una descripción o alguna nota del cliente"
            />
          </div>
        </div>

        {this.state.isLoading && (
          <div className="clientForm-loading">
            <p>Cargando...</p>
          </div>
        )}
      </div>
    );
  }
}

export default ClientForm;
