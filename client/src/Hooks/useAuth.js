import { useEffect, useState } from "react";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch(
            "http://localhost:6005/users/protected",
            {
              method: "GET",
              headers: {
                Authorization: token,
              },
            }
          );

          if (response.ok) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
            localStorage.removeItem("token");
            window.open("http://localhost:6005/logout", "_self");
          }
        } catch (error) {
          console.error("Error fetching protected data:", error);
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  return isAuthenticated;
};
