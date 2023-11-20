import React, { useState } from 'react';
import { FaBox, FaClipboard, FaDollarSign, FaRegListAlt } from 'react-icons/fa';
import { addProduct } from '../../service/productService';
import './newProduct.css';

function NewProduct({ closeModal }) {
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [box, setBox] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState('');

    // Ejemplo de categorías. En una aplicación real, podrías obtener estas desde tu API.
    const categories = ['Electrónica', 'Impresion 3D', 'Robotica', 'Kits Educativos','Sensores','Componentes','Amplificadores'];
    
    const resetForm = () => {
        setProductName('');
        setDescription('');
        setPrice('');
        setBox('');
        setCategory('');
        setStock('');
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        // Convierte los valores a sus respectivos tipos de datos
        const productPrice = Number(price);
        const productStock = Number(stock);
        const productBox = box.split(',').map(Number); // Asume que introduces las cajas separadas por comas
    
        const productData = {
            name: productName, // Corregido a "name"
            description,
            price: productPrice,
            box: productBox,
            stock: productStock,
            category
        };
    
        try {
            await addProduct(productData);
            alert('Producto agregado exitosamente!');
            resetForm();        // Limpia los campos
            closeModal();       // Cierra el modal
        } catch (error) {
            alert("Error al agregar el producto:", error.message);
        }
    };
    

    return (
        <div className="form-container">
            <h2>Agregar Producto</h2>
            <form onSubmit={handleSubmit}>
                {/* ... Los campos existentes ... */}
                <div className="input-group">
                    <FaRegListAlt className="input-icon"/>
                    <input 
                        type="text" 
                        name="productName" 
                        placeholder="Nombre del producto" 
                        value={productName} 
                        onChange={e => setProductName(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <FaClipboard className="input-icon"/>
                    <textarea 
                        name="description" 
                        placeholder="Descripción del producto"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <div className="input-group">
                    <FaDollarSign className="input-icon"/>
                    <input 
                        type="number" 
                        name="price" 
                        placeholder="Precio" 
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <FaBox className="input-icon"/>
                    <input 
                        type="text" 
                        name="box" 
                        placeholder="Caja" 
                        value={box}
                        onChange={e => setBox(e.target.value)}
                    />
                </div>

                {/* Desplegable para la selección de Categoría */}
                <div className="input-group">
                    <FaRegListAlt className="input-icon"/>
                    <select name="category" value={category} onChange={e => setCategory(e.target.value)}>
                        <option value="" disabled>Selecciona una categoría</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                {/* Campo para Stock */}
                <div className="input-group">
                    <FaBox className="input-icon"/>
                    <input 
                        type="number" 
                        name="stock" 
                        placeholder="Stock" 
                        value={stock}
                        onChange={e => setStock(e.target.value)}
                    />
                </div>
                
                <button type="submit" className="save-button">Guardar</button>
            </form>
        </div>
    );
}

export default NewProduct;
