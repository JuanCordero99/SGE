// src/services/userService.js
export const deleteStudent = async (formData) => {
    try {
      const response = await fetch("http://localhost:8080/api/student/delete", {
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
  