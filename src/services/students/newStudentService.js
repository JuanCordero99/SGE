// src/services/userService.js
export const registerUser = async (formData) => {
    try {
      const response = await fetch("http://localhost:8080/api/student/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: formData.id,
          name: formData.name,
          surname: formData.surname,
          group_id: formData.group_id,
          term: formData.term,
          user: {
            profile: 2,
            password: formData.id,
            status: 1
          },
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
  