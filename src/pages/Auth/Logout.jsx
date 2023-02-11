import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";

const Logout = () => {
  useEffect(() => {
    auth.logout();
    navigate("/login");
  }, []);

  const auth = useAuth();

  let navigate = useNavigate();

  return "";
};

export default Logout;
