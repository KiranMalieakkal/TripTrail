import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import { createContext, useState } from "react";
// import { AuthProvider } from "./components/AuthProvider";

type IsAuthenticatedContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: (x: boolean) => void;
};

export const isAuthenticatedContext = createContext<IsAuthenticatedContextType>(
  {
    isAuthenticated: false,
    setIsAuthenticated: () => {},
  }
);

function App() {
  const [username, setUsername] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  return (
    <>
      <isAuthenticatedContext.Provider
        value={{ isAuthenticated, setIsAuthenticated }}
      >
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<Login username={username} setUsername={setUsername} />}
            />
            <Route
              path="/dashboard/*"
              element={<Dashboard username={username} />}
            />
          </Routes>
        </BrowserRouter>
      </isAuthenticatedContext.Provider>
    </>
  );
}
export default App;
