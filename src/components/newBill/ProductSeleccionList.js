import React, { useEffect, useState } from 'react';
import { FaPrint } from 'react-icons/fa';
import { GrConfigure } from "react-icons/gr";
import { Button, Card, CardBody, CardFooter, Col, Container, Input, Row } from 'reactstrap';
import { getProducts } from '../../service/productService';
import ImpresionesModal from '../modal/impresiones/impresionesModal';
import ServiciosModal from '../modal/servicios/serviciosModal';
import './ProductSelectionList.css';

const ProductSelectionList = ({ onProductSelect,onImpresionSubmit,onServicioSubmit }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [allProducts, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isServiciosModalOpen, setIsServiciosModalOpen] = useState(false);
  const [isImpresionesModalOpen, setIsImpresionesModalOpen] = useState(false);


 // Funciones para manejar la visibilidad de los modales
 const toggleServiciosModal = () => setIsServiciosModalOpen(!isServiciosModalOpen);
 const toggleImpresionesModal = () => setIsImpresionesModalOpen(!isImpresionesModalOpen);

 // Manejador para cuando se envía un servicio desde el modal
 const handleServicioSubmit = (servicioData) => {
  // Aquí llamas a onServicioSubmit, que debería ser una función en tu componente NewBill
  // para actualizar el estado global allí con los datos del nuevo servicio.
  onServicioSubmit(servicioData);
  toggleServiciosModal(); // Cierra el modal después de enviar
}

 const handleImpresionSubmit = (impresionData) => {
  onImpresionSubmit(impresionData); // Pasar datos al componente padre (NewBill)
};


  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await getProducts();
      setProducts(response.success ? response.data : []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setFilteredProducts(allProducts.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    ));
  }, [allProducts, searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleProductClick = (product) => {
    if (product.stock > 0) {
      onProductSelect(product);
    }
  };

  return (
    <Container fluid className="product-selection-container">
      {isLoading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <Row>
          <Col md={{ size: 12 }}>
            <div className="search-bar-container">
              <Input
                type="text"
                placeholder="Buscar producto..."
                value={searchTerm}
                onChange={handleSearch}
                className="search-input"
              />
              <Button color="info" size="sm" className="search-button" onClick={toggleServiciosModal}><GrConfigure /></Button>
              <Button color="primary" size="sm" className="search-button"onClick={toggleImpresionesModal}><FaPrint /></Button>
            
            </div>
            <div className="product-cards-scrollable">
              <Row ms="3" md="3" className="product-selection-list">
                {filteredProducts.map((product) => (
                  <Col key={product._id} className="mb-4">
                    <Card className="product-card" onClick={() => handleProductClick(product)}>
                      <CardBody className="d-flex justify-content-center align-items-center">
                        <div className="product-initial">{product.name[0]}</div>
                      </CardBody>
                      <CardFooter className="w-100 text-center product-footer">
                        <div className="product-name">{product.name.substring(0, 10)}...</div>
                        <div className="product-price">${product.price}</div>
                      </CardFooter>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </Col>
        </Row>
      )}
      <ServiciosModal isOpen={isServiciosModalOpen} toggle={toggleServiciosModal}  onSubmit={handleServicioSubmit}/>
      <ImpresionesModal isOpen={isImpresionesModalOpen} toggle={toggleImpresionesModal} onSubmit={handleImpresionSubmit}/>
    
    </Container>
  );
};

export default ProductSelectionList;
