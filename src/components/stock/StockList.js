// StockList.jsx

import React, { useCallback, useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { FaInfo } from 'react-icons/fa';
import { GrUpdate } from 'react-icons/gr';
import { Button, Col, Container, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row, Table } from 'reactstrap';
import { deleteProduct, getProducts } from '../../service/productService';
import NewProduct from '../modal/newProduct/newProduct';
import UpdateProductModal from '../modal/updateStock/updateStock';
import './StockList.css';

const StockList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [allProducts, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(true);

  const filterProducts = useCallback((term, category) => {
    const results = allProducts.filter(product =>
      product.name.toLowerCase().includes(term.toLowerCase()) &&
      (category === 'Todas' || category === 'CATEGORIAS' || product.category === category)
    );
    setFilteredProducts(results);
  }, [allProducts]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      if (response.success) {
        setProducts(response.data);
      } else {
        console.error("Error fetching products:", response.message);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    filterProducts(searchTerm, selectedCategory);
  }, [filterProducts, searchTerm, selectedCategory]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    fetchProducts();
  };

  const openUpdateModal = (product) => {
    setSelectedProduct(product);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    fetchProducts();
  };

  const openDescriptionModal = (product) => {
    setSelectedProduct(product);
    setIsDescriptionModalOpen(true);
  };

  const closeDescriptionModal = () => {
    setIsDescriptionModalOpen(false);
  };

  const openDeleteModal = (product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    fetchProducts();
    setIsPasswordCorrect(true);
    setPassword('');
  };

  const handleSearch = event => {
    setSearchTerm(event.target.value);
    filterProducts(event.target.value, selectedCategory);
  };

  const handleCategoryChange = event => {
    setSelectedCategory(event.target.value);
    filterProducts(searchTerm, event.target.value);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      if (password !== '6038') {
        setIsPasswordCorrect(false);
        return;
      }

      const response = await deleteProduct(productId);
      if (response.success) {
        console.log("Product deleted successfully");
        closeDeleteModal();
      } else {
        console.error("Error deleting product:", response.message);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const getStockIndicator = stock => {
    if (stock <= 0) return 'red';
    if (stock <= 8) return 'yellow';
    return 'green';
  };

  const formatDate = dateString => {
    const months = [
      'ENE', 'FEB', 'MAR', 'Abril', 'Mayo', 'Junio',
      'Julio', 'AGO', 'SEP', 'OCT', 'NOV', 'DEC'
    ];

    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} de ${year}`;
  };

  const uniqueCategories = ['CATEGORIAS', ...new Set(allProducts.map(product => product.category))];
  const productsToDisplay = filteredProducts.length > 0 ? filteredProducts : null;

  return (
    <Container className="themed-container stock-list-main-container" fluid={true}>
      
          <Row>
    <Col xs = "12">
      <div className="stock-header d-flex justify-content-between align-items-center">
        <h2 className="stock-title">Lista de Existencias</h2>
        <Button color="primary" onClick={openModal}>Agregar productos</Button>
      </div>
    </Col>
  </Row>

        {/* Modal de Reactstrap para agregar productos */}
        <Modal isOpen={isModalOpen} toggle={closeModal}>
          <ModalHeader toggle={closeModal}>Agregar Producto</ModalHeader>
          <ModalBody>
            <NewProduct closeModal={closeModal} />
          </ModalBody>
        </Modal>
                  <div className="stock-list-container">
    

                  <div className="stock-list">
                  <Row className="mb-3">
                      <Col md="4">
                        <FormGroup>
                          <Input
                            type="text"
                            name="search"
                            id="productSearch"
                            placeholder="Buscar producto..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="search-input"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <Input
                            type="select"
                            name="category"
                            id="productCategory"
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            className="search-input"
                          >
                            {uniqueCategories.map((category, index) => (
                              <option key={index} value={category}>{category}</option>
                            ))}
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md="4" className="d-flex align-items-center justify-content-md-end">
                        {allProducts.length} Productos
                      </Col>
                    </Row>
                    {productsToDisplay ? (
        productsToDisplay.length > 0 ? (
          <Table dark responsive>
            <thead>
            <th className="col-md-4">Producto</th>
            <th className="col-md-2">Cantidad</th>
            <th className="col-md-1">Precio Tiendas</th>
            <th className="col-md-1">Precio Final</th>
            <th className="col-md-1">Caja</th>
            <th className="col-md-2">Opciones</th>
            <th className="col-md-2">Última fecha</th>
            </thead>
            <tbody>
              {productsToDisplay.map((product, index) => (
                <tr key={index}>
                  <td data-tooltip={product.name}>{product.name}</td>
                  <td>
                    <span className={`stock-indicator ${getStockIndicator(product.stock)}`}></span>
                    <span>{product.stock}</span>
                  </td>
                  <td>{product.price}</td>
                  <td>{product.finalPrice}</td>
                  <td>{product.box}</td>
                  <td>
                    <Button color="warning" size="sm" onClick={() => openUpdateModal(product)}>
                      <GrUpdate />
                    </Button>
                    {' '}
                    <Button color="info" size="sm" onClick={() => openDescriptionModal(product)}>
                      <FaInfo />
                    </Button>
                    {' '}
                    <Button color="danger" size="sm" onClick={() => openDeleteModal(product)}>
                      <AiOutlineDelete />
                    </Button>
                  </td>
                  <td>{formatDate(product.updatedAt)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No se encontraron productos que coincidan con los criterios de búsqueda.</p>
        )
      ) : (
        <p>Ingresa un término de búsqueda para mostrar productos.</p>
      )}

            </div>

            {isUpdateModalOpen && selectedProduct && (
  <Modal isOpen={isUpdateModalOpen} toggle={closeUpdateModal}>
    <ModalHeader toggle={closeUpdateModal}>Actualizar Producto</ModalHeader>
    <ModalBody>
      <UpdateProductModal product={selectedProduct} onClose={closeUpdateModal} />
    </ModalBody>
  </Modal>
)}

{isDescriptionModalOpen && selectedProduct && (
  <Modal isOpen={isDescriptionModalOpen} toggle={closeDescriptionModal}>
    <ModalHeader toggle={closeDescriptionModal}>Descripción del Producto</ModalHeader>
    <ModalBody>
      <h3>{selectedProduct.name}</h3>
      <p>{selectedProduct.description}</p>
    </ModalBody>
  </Modal>
)}

{isDeleteModalOpen && selectedProduct && (
  <Modal isOpen={isDeleteModalOpen} toggle={closeDeleteModal}>
    <ModalHeader toggle={closeDeleteModal}>Eliminar Producto</ModalHeader>
    <ModalBody>
      <p>¿Estás seguro de que quieres eliminar el producto {selectedProduct.name}?</p>
      <FormGroup>
        <Label for="password">Contraseña:</Label>
        <Input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormGroup>
      {!isPasswordCorrect && <p className="error-message">Contraseña incorrecta. Inténtalo de nuevo.</p>}
      <Button color="danger" onClick={() => handleDeleteProduct(selectedProduct._id)}>Eliminar</Button>{' '}
      <Button color="secondary" onClick={closeDeleteModal}>Cancelar</Button>
    </ModalBody>
  </Modal>
)}

          </div>
       
      </Container>
  );
};

export default StockList;
