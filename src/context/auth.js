import { useState, createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async (user) => {
    let data = { ...user, type: "gmail" };

    await fetch(
      `${process.env.REACT_APP_PUBLIC_BACKEND_URL}/adminProfile/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.error == false) {
          localStorage.setItem("token", res.token);

          setUser(res.token);
        }
        else{
          alert(res.message)
        }
      })
      .then(() => navigate("/"));
  };

  const logout = () => {
    setUser(null);
    localStorage.clear();
    navigate("/login")
  };

  useEffect(() => {
    const user = localStorage.getItem("token");
    setUser(user);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
