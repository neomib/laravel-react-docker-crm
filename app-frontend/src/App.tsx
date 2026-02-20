import { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import { ScrollToTop } from "./components/common/ScrollToTop";
import AppLayout from "./layout/AppLayout";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import ContactInfoPage from "./pages/ContactInfo/ContactInfoPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import { authConfig } from "./services/authService";

export default function App() {
  useEffect(() => {
    authConfig();
  }, []);
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Dashboard />} />

            {/* Others Page */}
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/contacts/:contactId" element={<ContactInfoPage />} />
           
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />

        </Routes>

        <ToastContainer position="bottom-center" autoClose={7000} theme="colored" />
      </Router>
    </>
  );
}
