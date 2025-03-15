// src/services/userService.js
export const newTeacher = async (formData) => {
    const secondname = formData.secondname || "";  
    try {
      const response = await fetch("https://gse-backend.zeabur.app/api/teacher/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: formData.id,
          name: formData.name + " " + secondname,
          surname: formData.middlename +" " + formData.surname,
          group_id: formData.group_id,
          term: formData.term,
          user: {
            email: formData.name +"."+ formData.middlename +"@uteq.edu.mx", 
            profile: 1,
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
  