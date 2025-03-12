// src/services/authService.js

export const authService = async (email, password) => {
    try {
      const response = await fetch("https://gse-backend.zeabur.app/api/users/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
  
      if (response.ok) {
        const result = await response.json();
        return result;
      } else {
        console.error("Login failed:", response.statusText);
        return null; // O lanza un error si prefieres manejarlo así
      }
    } catch (error) {
      console.error("Error during login:", error);
      return null; // O lanza un error si prefieres manejarlo así
    }
  };
  