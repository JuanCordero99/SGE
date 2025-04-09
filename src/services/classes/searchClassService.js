export const searchClassesByGroup = async (formData) => {
  try {
    const response = await fetch("http://devmachape.tail0547c7.ts.net:8080/api/class/find/ByGroup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ groupId: formData.group_id }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }

    return await response.json();
  } catch (error) {
    console.error("Error al obtener las clases:", error);
    throw error;
  }
};
