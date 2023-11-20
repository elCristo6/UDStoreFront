import React, { useCallback, useEffect, useState } from 'react';
import { FaInfo } from 'react-icons/fa';
import { GrUpdate } from 'react-icons/gr';
import { getProducts } from '../../service/productService';
import NewProduct from '../modal/newProduct';
import './StockList.css';

const StockList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Todas');
    const [allProducts, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const filterProducts = useCallback((term, category) => {
        const results = allProducts.filter(product => 
            product.name.toLowerCase().includes(term.toLowerCase()) &&
            (category === 'Todas' || category === 'CATEGORIAS' || product.category === category)
        );
        setFilteredProducts(results);
    }, [allProducts]);

    useEffect(() => {
        fetchProducts();
    }, []); // Este useEffect se encarga de obtener los productos al montar el componente.

    const fetchProducts = async () => {
        try {
          const response = await getProducts();
          if (response.success) {
            setProducts(response.data); // Utiliza response.data en lugar de response
          } else {
            console.error("Error fetching products:", response.message);
          }
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
      

    useEffect(() => {
        filterProducts(searchTerm, selectedCategory);
    }, [filterProducts, searchTerm, selectedCategory]); // Este useEffect se encarga de filtrar los productos según términos de búsqueda y categoría.


    
    const openModal = () => {
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
        fetchProducts(); 
    };
    
    const handleSearch = event => {
        setSearchTerm(event.target.value);
        filterProducts(event.target.value, selectedCategory); 
    };

    const handleCategoryChange = event => {
        setSelectedCategory(event.target.value);
        filterProducts(searchTerm, event.target.value);
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
    const productsToDisplay = filteredProducts.length > 0 ? filteredProducts : allProducts;

    return (
        <div className="stock-list-container">
            <div className="stock-header">
                <h2 className="stock-title">Lista de Existencias</h2>
                <button onClick={openModal} className="add-stock-button">Agregar productos</button>
                <div className={`modal ${isModalOpen ? 'open' : ''}`} onClick={closeModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <span className="close" onClick={closeModal}>&times;</span>
                        <NewProduct onClose={closeModal} />
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
                                    <span className="stock-number">{product.stock}</span>
                                    <span className={`stock-indicator ${getStockIndicator(product.stock)}`}></span>
                                </td>
                                <td>{product.price}</td>
                                <td>{product.price}</td>
                                <td>{product.box}</td>
                                <td>
                                    <button className="icon-button"><GrUpdate /></button>
                                    <button className="icon-button green"><FaInfo /></button>
                                </td>
                                <td>{formatDate(product.updatedAt)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StockList;
