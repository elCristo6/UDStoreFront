import React, { useEffect, useState } from 'react';
import { FaBox, FaClipboard, FaDollarSign, FaLock, FaRegListAlt } from 'react-icons/fa';
import { getProductById, updateProduct } from '../../../service/productService';
import './updateStock.css';

function UpdateProductModal({ product, onClose }) {
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [box, setBox] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const categories = ['Electrónica', 'Impresion 3D', 'Robotica', 'Kits Educativos', 'Sensores', 'Componentes', 'Amplificadores'];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getProductById(product._id);
                if (response.success) {
                    const fetchedProduct = response.data;
                    setProductName(fetchedProduct.name);
                    setDescription(fetchedProduct.description);
                    setPrice(String(fetchedProduct.price));
                    setBox(fetchedProduct.box.join(', '));

                    // Establecer automáticamente la categoría
                    setCategory(fetchedProduct.category);

                    setStock(String(fetchedProduct.stock));
                } else {
                    console.error("Error fetching product:", response.message);
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        fetchData();
    }, [product._id]);

    const resetForm = () => {
        setProductName('');
        setDescription('');
        setPrice('');
        setBox('');
        setCategory('');
        setStock('');
        setPassword('');
        setPasswordError('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validar la contraseña
        if (password !== '6038') {
            setPasswordError('Contraseña incorrecta');
            return;
        }

        // Restablecer el error de contraseña
        setPasswordError('');

        // Convierte los valores a sus respectivos tipos de datos
        const productPrice = parseFloat(price);
        const productStock = parseInt(stock, 10);
        const productBox = box.split(',').map(Number);

        const updatedProductData = {
            id: product._id,
            name: productName,
            description,
            price: productPrice,
            box: productBox,
            stock: productStock,
            category
        };

        try {
            await updateProduct(updatedProductData);
            alert('Producto actualizado exitosamente!');
            resetForm();
            onClose();
        } catch (error) {
            alert("Error al actualizar el producto: " + error.message);
        }
    };

    return (
        <div className="update-stock-form-container update-stock-modal">
            <h2>Actualizar Producto</h2>
            <form onSubmit={handleSubmit}>
                <div className="update-stock-input-group">
                    <FaRegListAlt className="update-stock-input-icon" />
                    <input
                        type="text"
                        name="productName"
                        placeholder="Nombre del producto"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="update-stock-input"
                    />
                </div>
                {/* ... (otros campos del formulario) */}
                <div className="update-stock-input-group">
                    <FaBox className="update-stock-input-icon" />
                    <input
                        type="text"
                        name="box"
                        placeholder="Caja"
                        value={box}
                        onChange={(e) => setBox(e.target.value)}
                        className="update-stock-input"
                    />
                </div>
                <div className="update-stock-input-group">
                    <FaDollarSign className="update-stock-input-icon" />
                    <input
                        type="number"
                        name="price"
                        placeholder="Precio"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="update-stock-input"
                    />
                </div>
                <div className="update-stock-input-group">
                    <FaRegListAlt className="update-stock-input-icon" />
                    <select
                        name="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="update-stock-select"
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="update-stock-input-group">
                    <FaClipboard className="update-stock-input-icon" />
                    <textarea
                        name="description"
                        placeholder="Descripción del producto"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="update-stock-textarea"
                    ></textarea>
                </div>
                <div className="update-stock-input-group">
                    <FaBox className="update-stock-input-icon" />
                    <input
                        type="number"
                        name="stock"
                        placeholder="Stock"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        className="update-stock-input"
                    />
                </div>
                <div className="update-stock-input-group">
                    <FaLock className="update-stock-input-icon" />
                    <input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="update-stock-input"
                    />
                </div>
                {passwordError && <p className="error-message">{passwordError}</p>}
                <button type="submit" className="update-stock-save-button">
                    Guardar
                </button>
            </form>
        </div>
    );
}

export default UpdateProductModal;
