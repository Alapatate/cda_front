import React, { useEffect } from "react";
import { Loading } from "@/components/loading";

const Context = React.createContext();

export const AuthContext = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await fetch(
          `http://${import.meta.env.VITE_API_URL}/api/users/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            method: "GET",
          }
        );
        if (!response.ok) {
          localStorage.removeItem("token");
          setUser(null);
          setLoading(false);
          return;
        }
        const data = await response.json();
        setUser({ token, ...data });
      }
      setLoading(false);
    };
    init();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const login = async (email, password) => {
    const response = await fetch(
      `http://${import.meta.env.VITE_API_URL}/api/users/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    setUser(data);
    localStorage.setItem("token", data.token);
  };

  const contextValues = {
    user,
    login,
    logout,
    loading,
  };
  return (
    <Context value={contextValues}>{loading ? <Loading /> : children}</Context>
  );
};

export const useAuth = () => {
  return React.useContext(Context);
};
