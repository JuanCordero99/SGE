// src/services/userService.js
export const deleteTeacher = async (formData) => {
    try {
      const response = await fetch("http://devmachape.tail0547c7.ts.net:8080/api/teacher/update/Status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: formData.id,
          user: {
            status: 0
          }
        }),
      });
  
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }
      console.log(`DATA: ${response.json}`);
      return await response.json();
    } catch (error) {
      console.error("Error al realizar la peticion :", error);
      throw error;
    }
  };
  