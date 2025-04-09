// services/classes/getClassService.js
import axios from 'axios';

export const getClassService = async (id) => {
  try {
    const response = await axios.get(`http://devmachape.tail0547c7.ts.net:8080/api/class/getById/${id}`); // Asegúrate de que esta ruta exista en tu backend
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener los datos de la clase: " + error.message);
  }
};
