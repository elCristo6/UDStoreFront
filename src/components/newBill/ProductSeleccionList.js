import React, { useEffect, useState } from 'react';
import { getProducts } from '../../service/productService';
import './ProductSelectionList.css';

const ProductSelectionList = ({ onProductClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [allProducts, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      if (response.success) {
        setProducts(response.data);
      } else {
        console.error('Error fetching products:', response.message);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
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
    // Llama a la función onProductClick pasando el producto seleccionado
    onProductClick(product);
  };

  return (
    <div className="product-selection-container">
      <div className="product-selection-header">
        <h2 className="product-selection-title">Seleccione los Productos</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar producto..."
            value={searchTerm}
            onChange={handleSearch}
            className="input-style"
          />
        </div>
      </div>

      <div className="product-selection-list">
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product, index) => (
              <tr
                key={index}
                onClick={() => handleProductClick(product)} // Maneja el clic en el producto
                style={{ cursor: 'pointer' }} // Cambia el cursor al puntero para indicar que es interactivo
              >
                <td className="product-name">{product.name}</td>
                <td>${product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductSelectionList;
