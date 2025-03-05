export const searchUser = async (formData) => {
    try {
        const response = await fetch("https://gse.zeabur.app/api/student/find", {
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
