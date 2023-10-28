

import React, { useEffect, useState } from 'react';
import { loginUser, registerUser } from '../../service/authService';

import './LoginComponent.css';

const LoginModal = ({ show, onClose, initialFormType }) => {
  const [formType, setFormType] = useState(initialFormType || "login");
  const [passwordType, setPasswordType] = useState("password");
  const [error, setError] = useState(null); // Añadido para manejar errores

  useEffect(() => {
    setFormType(initialFormType);
  }, [initialFormType]);
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    const formData = {
      email: e.target.email?.value,
      password: e.target.password?.value,
    };
    console.log("Datos del formulario:", formData);
  
    try {
      let result;
      if (formType === "login") {
        result = await loginUser(formData);
      } else {
        result = await registerUser(formData);
      }
  
      // Suponemos que "success" siempre viene en la respuesta, incluso si es "false"
      if (result.success) {
        onClose();
      } else {
        setError(result.message );
      }
    } catch (error) {
      // Si hay un problema técnico o el servidor devuelve un código de estado de error
      setError("Usuario o contraseña incorrectts");
    }
  };
  

  const handleFocus = (e) => {
    const label = document.getElementById(e.target.name + "Label");
    if (label) {
      label.classList.add("moved-label");
    } else {
      console.error("Label no encontrado");
    }
  };

  const handleBlur = (e) => {
    if (e.target.value === "") {
      const label = document.getElementById(e.target.name + "Label");
      if (label) {
        label.classList.remove("moved-label");
      }
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="form-selector">
            <span
              className={`form-title ${formType === "login" && "active"}`}
              onClick={() => setFormType("login")}
            >
              Iniciar sesión
            </span>
            <span className="form-title-separator"></span>
            <span
              className={`form-title ${formType === "register" && "active"}`}
              onClick={() => setFormType("register")}
            >
              Registrarse
            </span>
          </div>
          <span className="close-button" onClick={onClose}>&times;</span>
        </div>
        <div className="modal-body">
          {error && <div className="error-message">{error}</div>}
          {formType === "login" ? (
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <input type="email" id="email" name="email" placeholder="Email" required onFocus={handleFocus} onBlur={handleBlur}/>
              </div>
              <div className="form-group password-container">
                <input type={passwordType} id="password" name="password" placeholder="Contraseña" required />
                <span onClick={togglePasswordVisibility} className={`eye-icon ${passwordType}`}>
                  {passwordType === "password" ? "👁️" : "👁️‍🗨️"}
                </span>
              </div>
              <div className="forgot-password">
                <a href="#!">¿Has olvidado tu contraseña?</a>
              </div>
              <div className="form-group">
                <button type="submit">Iniciar sesión</button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <input type="text" id="full-name" name="full-name" placeholder="Nombre Completo" required onFocus={handleFocus} onBlur={handleBlur}/>
              </div>
              <div className="form-group">
                <input type="email" id="register-email" name="register-email" placeholder="Email" required onFocus={handleFocus} onBlur={handleBlur}/>
              </div>
              <div className="form-group">
                <input type="password" id="register-password" name="register-password" placeholder="Contraseña" required onFocus={handleFocus} onBlur={handleBlur}/>
              </div>
              <div className="form-group">
                <input type="password" id="confirm-password" name="confirm-password" placeholder="Confirmar Contraseña" required onFocus={handleFocus} onBlur={handleBlur}/>
              </div>
              <div className="form-group">
                <button type="submit">Registrarse</button>
              </div>
              <div className="terms-and-conditions">
                Al crear una cuenta estás aceptando los <a href="#!" target="_blank" rel="noreferrer">Términos y condiciones</a> de UDElectronics.net y la <a href="#!" target="_blank" rel="noreferrer">Política de Privacidad</a>.
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
