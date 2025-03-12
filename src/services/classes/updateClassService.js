import axios from 'axios';

export const updateClassService = async (classData) => {
  try {
    const response = await axios.post('https://gse-backend.zeabur.app/api/class/update', classData); // Asegúrate de que la ruta sea correcta
    return response.data;
  } catch (error) {
    throw new Error("Error al actualizar la clase: " + error.message);
  }
};