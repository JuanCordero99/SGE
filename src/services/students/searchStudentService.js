export const searchUser = async (formData) => {
    try {
        const response = await fetch("http://devmachape.tail0547c7.ts.net:8080/api/student/find", {
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
