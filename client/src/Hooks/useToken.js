import { useEffect, useState } from "react";

export const useToken = () => {
  const [istoken, setisToken] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token === null) {
      window.open("http://localhost:6005/logout", "_self");
      setisToken(false);
    } else {
      console.log("Token found:", token);
      setisToken(true);
    }
  }, []);
};
