import { API_BASE_URL } from '../api/api';

export const addBill = async (billData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/newBill`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(billData)
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


// Función para obtener todas las facturas
export const getBills = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/newBill`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Asegúrate de incluir cualquier otro encabezado necesario, como tokens de autenticación.
      },
    });

    if (!response.ok) {
      throw new Error('Error fetching bills');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching bills:', error);
    throw error;
  }
};


