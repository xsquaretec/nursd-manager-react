import React from "react";
import { useAuth } from "./context/auth";
import AuthRoutes from "./routes/AuthRoutes";
import MainRoutes from "./routes/MainRoutes";

const App = () => {
  const auth = useAuth();

  return auth.user ? <MainRoutes /> : <AuthRoutes />;
};

export default App;
