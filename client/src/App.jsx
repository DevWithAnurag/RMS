import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./pages/context/AuthContext";

import "./App.css";

const App = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;
