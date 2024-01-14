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
