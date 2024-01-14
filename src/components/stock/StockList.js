// StockList.jsx

import React, { useCallback, useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { FaInfo } from 'react-icons/fa';
import { GrUpdate } from 'react-icons/gr';
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
    <div className="stock-list-container">
      <div className="stock-header">
        <h2 className="stock-title">Lista de Existencias</h2>
        <button onClick={openModal} className="add-stock-button">Agregar productos</button>
        <div className={`modal ${isModalOpen ? 'open' : ''}`} onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>&times;</span>
            <NewProduct closeModal={closeModal} />
          </div>
        </div>
      </div>

      <div className="stock-list">
        <div className="controls">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Buscar producto..."
              value={searchTerm}
              onChange={handleSearch}
              className="input-style"
            />
          </div>
          <div className="category-dropdown">
            <select onChange={handleCategoryChange} value={selectedCategory} className="input-style">
              {uniqueCategories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="product-count">
            {allProducts.length} Productos
          </div>
        </div>
        {productsToDisplay ? (
          productsToDisplay.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad </th>
                  <th>Precio Tiendas</th>
                  <th>Precio Final</th>
                  <th>Caja</th>
                  <th>Opciones</th>
                  <th>Ultima fecha</th>
                </tr>
              </thead>
              <tbody>
                {productsToDisplay.map((product, index) => (
                  <tr key={index}>
                    <td>{product.name}</td>
                    <td className="stock-cell">
                    
                      <span className={`stock-indicator ${getStockIndicator(product.stock)}`}></span>
                      <span className="stock-space"></span> 
                      <span className="stock-number">{product.stock}</span>
                    </td>
                    <td>{product.price}</td>
                    <td>{product.price}</td>
                    <td>{product.box}</td>
                    <td>
                      <button onClick={() => openUpdateModal(product)} className="icon-button"><GrUpdate /></button>
                      <button onClick={() => openDescriptionModal(product)} className="icon-button green"><FaInfo /></button>
                      <button onClick={() => openDeleteModal(product)} className="icon-button red"><AiOutlineDelete /></button>
                    </td>
                    <td>{formatDate(product.updatedAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No se encontraron productos que coincidan con los criterios de búsqueda.</p>
          )
        ) : (
          <p>Ingresa un término de búsqueda para mostrar productos.</p>
        )}
      </div>

      {isUpdateModalOpen && selectedProduct && (
        <div className="modal open" onClick={closeUpdateModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <span className="close" onClick={closeUpdateModal}>&times;</span>
            <UpdateProductModal product={selectedProduct} onClose={closeUpdateModal} />
          </div>
        </div>
      )}

      {isDescriptionModalOpen && selectedProduct && (
        <div className="modal open" onClick={closeDescriptionModal}>
          <div className="modal-content description-modal" onClick={e => e.stopPropagation()}>
            <span className="close" onClick={closeDescriptionModal}>&times;</span>
            <h3>{selectedProduct.name} - Descripción</h3>
            <p>{selectedProduct.description}</p>
          </div>
        </div>
      )}

      {isDeleteModalOpen && selectedProduct && (
        <div className="modal open" onClick={closeDeleteModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <span className="close" onClick={closeDeleteModal}>&times;</span>
            <h3>Eliminar Producto</h3>
            <p>¿Estás seguro de que quieres eliminar el producto {selectedProduct.name}?</p>
            <div>
              <label htmlFor="password">Contraseña:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {!isPasswordCorrect && <p className="error-message">Contraseña incorrecta. Inténtalo de nuevo.</p>}
            <div className="button-container">
              <button onClick={() => handleDeleteProduct(selectedProduct._id)} className="delete-button">Eliminar</button>
              <button onClick={closeDeleteModal} className="cancel-button">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockList;
