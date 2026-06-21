import {
  createContext,
  useState,
  useEffect,
} from "react";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./theme.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";

export const ThemeContext =
  createContext();

function App() {
  const token =
    localStorage.getItem(
      "token"
    );

  const [
    darkMode,
    setDarkMode,
  ] = useState(
    localStorage.getItem(
      "darkMode"
    ) === "true"
  );

  useEffect(() => {
  if (darkMode) {
    document.body.classList.add(
      "dark"
    );
  } else {
    document.body.classList.remove(
      "dark"
    );
  }
  }, [darkMode]);
  
  const toggleTheme = () => {
  const next =
    !darkMode;

  setDarkMode(next);

  localStorage.setItem(
    "darkMode",
    next
  );

  if (next) {
    document.body.classList.add(
      "dark"
    );
  } else {
    document.body.classList.remove(
      "dark"
    );
  }
  };

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        toggleTheme,
      }}
    >
      <Routes>
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={
            <Register />
          }
        />

        <Route
          path="/"
          element={
            token ? (
              <Dashboard />
            ) : (
              <Navigate
                to="/login"
              />
            )
          }
        />

        <Route
          path="/projects"
          element={
            token ? (
              <Projects />
            ) : (
              <Navigate
                to="/login"
              />
            )
          }
        />

        <Route
          path="/tasks"
          element={
            token ? (
              <Tasks />
            ) : (
              <Navigate
                to="/login"
              />
            )
          }
        />

        <Route
          path="/analytics"
          element={
            token ? (
              <Analytics />
            ) : (
              <Navigate
                to="/login"
              />
            )
          }
        />
        <Route
  path="/profile"
  element={
    token ? (
      <Profile />
    ) : (
      <Navigate
        to="/login"
      />
    )
  }
/>

      </Routes>
    </ThemeContext.Provider>
  );
}

export default App;