const authService = async (email, password) => {
    try {
      const response = await fetch("http://devmachape.tail0547c7.ts.net:8080/api/users/auth", {
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
        return null; 
      }
    } catch (error) {
      console.error("Error during login:", error);
      return null;
    }
};


const logOutService = async (id) => {
  try {
    const response = await fetch("https://gse-backend.zeabur.app/api/users/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id
      }),
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      console.error("Logout failed:", response.statusText);
      return null; 
    }
  } catch (error) {
    console.error("Error during logout:", error);
    return null;
  }
};
  

const loginService={
  authService, logOutService
}

export default loginService;