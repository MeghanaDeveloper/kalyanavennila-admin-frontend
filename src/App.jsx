import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminPrivateRoute from "./routes/privateRoute";
import LoginPage from "./pages/login/loginPage";
import ScrollToTop from "./components/common/scrollToTop";
import SidebarLayout from "./components/layout/sidebarLayout";
import Profile from "./pages/dashboard/profile";
import Dashboard from "./pages/dashboard/dashboard";
import Users from "./pages/dashboard/users";
import UserFullDetails from "./pages/dashboard/userFullDetails";

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />

        <Routes>
        <Route path="/" element={<Navigate to="/admin" replace />} />
        <Route path="admin" element={<LoginPage />} />
        <Route path="admin/login" element={<LoginPage />} />

<Route element={<AdminPrivateRoute/>}>
          <Route path="/admin" element={<SidebarLayout />}>

            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="users" element={<Users />} />
            <Route path="users/:id" element={<UserFullDetails />} />
          </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
