// ServiciosModal.js
import React, { useState } from 'react';
import { Button, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import './serviciosModal.css';

const ServiciosModal = ({ isOpen, toggle, onSubmit }) => {
  const [formData, setFormData] = useState({
    descripcion: '',
    valor: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    // Validación simple de los datos
    if (formData.descripcion.trim() && formData.valor) {
      const dataToSubmit = {
        ...formData,
        valor: parseFloat(formData.valor),
        id: Date.now() // Genera un ID único para cada servicio
      };
      onSubmit(dataToSubmit);
      toggle(); // Cierra el modal después de enviar
      setFormData({ descripcion: '', valor: '' }); // Resetea el formulario
    } else {
      alert("Por favor, complete todos los campos correctamente.");
    }
   
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle} className="svc-modal-header">Servicios</ModalHeader>
      <ModalBody className="svc-modal-body">
        <FormGroup>
          <Label for="descripcion" className="svc-modal-label">Descripción</Label>
          <Input
            type="textarea"
            name="descripcion"
            id="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            className="svc-modal-input"
          />
        </FormGroup>
        <FormGroup>
          <Label for="valor" className="svc-modal-label">Valor</Label>
          <Input
            type="number"
            name="valor"
            id="valor"
            value={formData.valor}
            onChange={handleChange}
            className="svc-modal-input"
          />
        </FormGroup>
      </ModalBody>
      <ModalFooter className="svc-modal-footer">
        <Button color="primary" onClick={handleSubmit}>Guardar</Button>{' '}
        <Button color="secondary" onClick={toggle}>Cancelar</Button>
      </ModalFooter>
    </Modal>
  );
};

export default ServiciosModal;
