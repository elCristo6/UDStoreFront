import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardFooter, Col, Container, Input, Row } from 'reactstrap';
import { getProducts } from '../../service/productService';

import './ProductSelectionList.css';

const ProductSelectionList = ({ onProductSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [allProducts, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);
/*
  const getStockIndicator = stock => {
    if (stock <= 0) return 'red';
    if (stock <= 8) return 'yellow';
    return 'green';
  };
*/
 
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await getProducts();
      if (response.success) {
        setProducts(response.data);
      } else {
        console.error('Error fetching products:', response.message);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }finally {
      setIsLoading(false); // Desactiva el spinner independientemente del resultado.
    }
  };

  useEffect(() => {
    const results = allProducts.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
  }, [allProducts, searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleProductClick = (product) => {
    if (product.stock > 0) {
      // Verificar si la cantidad es mayor que cero antes de agregarlo
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
        <Col md={{ size: 12, offset: 1}}>
          <div className="search-bar-container">
            <Input
              type="text"
              placeholder="Buscar producto..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
          </div>
          <div className="product-cards-scrollable">
            <Row ms="3" md="3" className="product-selection-list">
              {filteredProducts.map((product) => (
               
                    <Col key={product._id} className="mb-4">
                      <Card className="product-card" onClick={() => handleProductClick(product)}>
                        <CardBody className ="d-flex justify-content-center align-items-center">
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
  </Container>
);

};

export default ProductSelectionList;
