// src/services/userService.js
export const updateStudent = async (formData) => {
    try {
      const response = await fetch("http://devmachape.tail0547c7.ts.net:8080/api/student/update/group", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: formData.id,
          group_id: formData.group_id
        }),
      });
  
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }
      console.log(`DATA: ${response.json}`);
      return await response.json();
    } catch (error) {
      console.error("Error durante el registro:", error);
      throw error;
    }
  };
  