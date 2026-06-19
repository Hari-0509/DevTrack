import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import Analytics from "./pages/Analytics";

function App() {
  const token =
    localStorage.getItem(
      "token"
    );

  return (
    <Routes>
      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
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
          <Analytics />
        }
      />
    </Routes>
  );
}

export default App;