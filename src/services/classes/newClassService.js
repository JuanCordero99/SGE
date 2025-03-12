
export const newClassService = async (formData) => {
    try {
      const response = await fetch("https://gse-backend.zeabur.app/api/class/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            subject: {
              name: formData.subjectName,
              term: parseInt(formData.term)
            },
            teacher: {id: formData.workerId},
            groupId: formData.groupId,
            day: formData.day,
            in_hour: formData.in_hour,
            fn_hour: formData.fn_hour,
            status: 1
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
  