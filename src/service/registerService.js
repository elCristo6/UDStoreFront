
// Utiliza fetch API para realizar la petición GET
export const registerPrint = async () => {
    try {
      const response = await fetch('http://localhost:3001/write', {
      //const response = await fetch('http://192.168.0.13:3001/write', {
        method: 'GET', // Especifica el método GET
      });
      if (!response.ok) {
        throw new Error('Error al realizar la petición GET a la impresora');
      }
      const data = await response.json(); // Asumiendo que esperas una respuesta en formato JSON
      return data; // Devuelve los datos recibidos
    } catch (error) {
      console.error('Error en registerPrint:', error);
      // En lugar de lanzar el error, devolver un valor que indique el fallo
      return { success: false, message: error.message };
    }
};
