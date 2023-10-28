import React from 'react';
import { FaBox, FaClipboard, FaDollarSign, FaRegListAlt } from 'react-icons/fa';
import './newProduct.css';
//import { createProduct } from './service/productService';
function NewProduct() {
    
    return (
        <div className="form-container">
            <h2>Agregar Producto</h2>
            <form>
                <div className="input-group">
                    <FaRegListAlt className="input-icon"/>
                    <input type="text" name="productName" placeholder="Nombre del producto" />
                </div>

                <div className="input-group">
                    <FaClipboard className="input-icon"/>
                    <textarea name="description" placeholder="Descripción del producto"></textarea>
                </div>

                <div className="input-group">
                    <FaDollarSign className="input-icon"/>
                    <input type="number" name="price" placeholder="Precio" />
                </div>

                <div className="input-group">
                    <FaBox className="input-icon"/>
                    <input type="text" name="box" placeholder="Caja" />
                </div>
                
                <button type="submit" className="save-button">Guardar</button>
            </form>
        </div>
    );
}

export default NewProduct;
