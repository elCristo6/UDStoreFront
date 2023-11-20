import { API_BASE_URL } from '../api/api';

export const loginUser = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  });

  const responseData = await response.json();

  if (!response.ok) {
    // Lanzar el mensaje que viene del servidor
    throw new Error(responseData.message);
  }

  return responseData;
};


export const registerUser = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    return await response.json();
  } catch (error) {
    throw error;
  }
};
export const consultarPorTelefono = async (telefono) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/${telefono}`);
    return await response.json();
  } catch (error) {
    throw error;
  }
};