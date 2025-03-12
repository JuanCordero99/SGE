// services/classes/getClassService.js
import axios from 'axios';

export const getClassService = async (id) => {
  try {
    const response = await axios.get(`https://gse-backend.zeabur.app//api/class/getById/${id}`); // Asegúrate de que esta ruta exista en tu backend
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener los datos de la clase: " + error.message);
  }
};
