export const searchUser = async (formData) => {
    try {
        const response = await fetch("http://localhost:8080/api/teacher/find", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({id: formData.id}),
        });
    
        if (!response.ok) {
          const error = await response.text();
          throw new Error(error);
        }
    
        return await response.json();
      } catch (error) {
        console.error("Error durante el registro:", error);
        throw error;
      }
};
