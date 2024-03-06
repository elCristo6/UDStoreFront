import React, { useState } from 'react';
import { Button, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import './impresionesModal.css';

const ImpresionesModal = ({ isOpen, toggle, onSubmit }) => {
  const [formData, setFormData] = useState({
    pesoGramos: '',
    valorGramo: '',
    descripcionImpresion: '',
    total: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    setFormData((prev) => {
      // Calcula el total solo si ambos valores, pesoGramos y valorGramo, están presentes.
      const newFormData = { ...prev, [name]: updatedValue };
      if (name === 'pesoGramos' || name === 'valorGramo') {
        const peso = name === 'pesoGramos' ? parseFloat(updatedValue) : parseFloat(prev.pesoGramos);
        const valor = name === 'valorGramo' ? parseFloat(updatedValue) : parseFloat(prev.valorGramo);
        const total = !isNaN(peso) && !isNaN(valor) ? peso * valor : 0;
        newFormData.total = total;
      }
      return newFormData;
    });
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(formData);
    }
    toggle(); // Cierra el modal después de enviar
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle} className="imp-modal-header">Impresiones</ModalHeader>
      <ModalBody className="imp-modal-body">
        <FormGroup>
          <Label for="pesoGramos" className="imp-modal-label">Peso en gramos</Label>
          <Input type="number" name="pesoGramos" id="pesoGramos" value={formData.pesoGramos} onChange={handleChange} className="imp-modal-input" />
        </FormGroup>
        <FormGroup>
          <Label for="valorGramo" className="imp-modal-label">Valor por gramo</Label>
          <Input type="number" name="valorGramo" id="valorGramo" value={formData.valorGramo} onChange={handleChange} className="imp-modal-input" />
        </FormGroup>
        <FormGroup>
          <Label for="descripcionImpresion" className="imp-modal-label">Descripción</Label>
          <Input type="textarea" name="descripcionImpresion" value={formData.descripcionImpresion} onChange={handleChange} className="imp-modal-input" id="descripcionImpresion" />
        </FormGroup>
        <FormGroup>
          <Label for="total" className="imp-modal-label">Total</Label>
          <Input type="number" name="total" value={formData.total} className="imp-modal-input" id="total" readOnly />
        </FormGroup>
      </ModalBody>
      <ModalFooter className="imp-modal-footer">
        <Button color="primary" onClick={handleSubmit}>Imprimir</Button>{' '}
        <Button color="secondary" onClick={toggle}>Cancelar</Button>
      </ModalFooter>
    </Modal>
  );
};

export default ImpresionesModal;
