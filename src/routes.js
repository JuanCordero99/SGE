import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RegisterUserPage from "./pages/RegisterUserPage";
import ManageUsersPage from "./pages/ManageUsersPage";
import RegisterClassPage from "./pages/RegisterClassPage";
import ManageClassesPage from "./pages/ManageClassesPage";
import ReportsPage from "./pages/ReportsPage";
import GraphsPage from "./pages/GraphsPage";
import SelectionUserPage from "./pages/SelectionUserPage";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/register-user" element={<RegisterUserPage />} />
        <Route path="/select-user" element={<SelectionUserPage />} />
        <Route path="/manage-users" element={<ManageUsersPage />} />
        <Route path="/register-class" element={<RegisterClassPage />} />
        <Route path="/manage-classes" element={<ManageClassesPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/graphs" element={<GraphsPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
