import { API_BASE_URL } from '../api/api';

export const addProduct = async (productData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productData)
    });
    
    const responseData = await response.json();
    if (!response.ok) {
      // Lanzar el mensaje que viene del servidor
      throw new Error(responseData.message);
    }
    return responseData;

  } catch (error) {
    throw error;
  }
};

export const getProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/products`);
    
    const responseData = await response.json();
    if (!response.ok) {
      // Lanzar el mensaje que viene del servidor
      throw new Error(responseData.message);
    }
    return responseData;

  } catch (error) {
    throw error;
  }
};
