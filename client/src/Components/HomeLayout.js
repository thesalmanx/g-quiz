import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import { useNavigate, useLocation } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");
    const expires = searchParams.get("expires");

    if (token && expires) {
      localStorage.setItem("token", token);
      localStorage.setItem("expires", expires);
      navigate(location.pathname, { replace: true });
    }
  }, [location.search, navigate]);

  return (
    <div>
      <main>
        <Nav />
        <Outlet />
      </main>
    </div>
  );
}
