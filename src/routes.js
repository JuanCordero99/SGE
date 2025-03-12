// src/routes.js

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute"; // Importamos PrivateRoute

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ManageStudentPage from "./pages/ManageStudentPage";
import ManageTeacherPage from "./pages/ManageTeacherPage";
import ManageUsersPage from "./pages/ManageUsersPage";
import ManageClassesPage from "./pages/ManageClassesPage";
import RegisterClassPage from "./pages/RegisterClassPage";
import SearchClassPage from "./pages/SearchClassPage";
import UpdateClassPage from "./pages/UpdateClassPage";
import ReportsPage from "./pages/ReportsPage";
import GraphsPage from "./pages/GraphsPage";
import SelectionUserPage from "./pages/SelectionUserPage";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        
        {/* Rutas protegidas con PrivateRoute */}
        <Route
          path="/home"
          element={<PrivateRoute element={<HomePage />} />}
        />
        <Route
          path="/register-user"
          element={<PrivateRoute element={<ManageStudentPage />} />}
        />
        <Route
          path="/manage-teacher"
          element={<PrivateRoute element={<ManageTeacherPage />} />}
        />
        <Route
          path="/select-user"
          element={<PrivateRoute element={<SelectionUserPage />} />}
        />
        <Route
          path="/manage-users"
          element={<PrivateRoute element={<ManageUsersPage />} />}
        />
        <Route
          path="/manage-classes"
          element={<PrivateRoute element={<ManageClassesPage />} />}
        />
        <Route
          path="/register-class"
          element={<PrivateRoute element={<RegisterClassPage />} />}
        />
        <Route
          path="/search-class"
          element={<PrivateRoute element={<SearchClassPage />} />}
        />
        <Route
          path="/update-class/:idClase"
          element={<PrivateRoute element={<UpdateClassPage />} />}
        />
        <Route
          path="/reports"
          element={<PrivateRoute element={<ReportsPage />} />}
        />
        <Route
          path="/graphs"
          element={<PrivateRoute element={<GraphsPage />} />}
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
