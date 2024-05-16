import { Routes, Route } from "react-router-dom";
import Layout from "../components/shared/Layout";
import ForgotPassword from "../pages/guest/ForgotPassword";
import GuestView from "../pages/guest/GuestView";
import ResetPassword from "../pages/guest/ResetPassword";
import Courses from "../pages/sharedTrainee/Courses";
import SignUp from "../pages/SignUp";
import CoursePage from "../pages/sharedTrainee/CoursePage";
import ViewInstructor from "../pages/ViewInstructor";
import NotFound from "../pages/NotFound";
import SignIn from "../pages/SignIn";

export function GuestRoutes() {
  return (
    <>
      <Routes>
        <Route path="" element={<Layout />}>
          <Route path="" element={<GuestView />} />
          <Route path="signUp" element={<SignUp />} />
          <Route path="login" element={<SignIn />} />
          <Route path="courses" element={<Courses />} />
          <Route path="forgotPassword" element={<ForgotPassword />} />
          <Route path="resetPassword" element={<ResetPassword />} />
          <Route path="courses/:id" element={<CoursePage />} />
          <Route path="viewInstructor/:id" element={<ViewInstructor />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
