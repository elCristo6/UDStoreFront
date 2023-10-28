import React, { useState } from "react";
import "./addProductForm.css";

const AddProductForm = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    box: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes hacer la llamada a la API para guardar el producto
    console.log("Producto:", product);
  };

  return (
    <div className="form-container">
      <h1>Añadir nuevo producto</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre del Producto"
          name="name"
          value={product.name}
          onChange={handleChange}
        />
        <textarea
          placeholder="Descripción"
          name="description"
          value={product.description}
          onChange={handleChange}
        ></textarea>
        <input
          type="number"
          placeholder="Precio"
          name="price"
          value={product.price}
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="Stock"
          name="stock"
          value={product.stock}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Box"
          name="box"
          value={product.box}
          onChange={handleChange}
        />
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default AddProductForm;
