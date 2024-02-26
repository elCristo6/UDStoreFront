import React, { useEffect, useState } from 'react';
import { FaPrint, FaSearch } from 'react-icons/fa';
import { Button, Card, CardBody, CardFooter, Col, Container, Input, Row } from 'reactstrap';
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
              <Button color="info" size="sm" className="search-button"><FaSearch /></Button>
              <Button color="primary" size="sm" className="search-button"><FaPrint /></Button>
            
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
    </Container>
  );
};

export default ProductSelectionList;
