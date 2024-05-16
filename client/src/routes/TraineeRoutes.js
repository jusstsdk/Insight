import { Routes, Route } from "react-router-dom";
import CoursePage from "../pages/sharedTrainee/CoursePage";
import TraineeView from "../pages/trainee/TraineeHome";
import Layout from "../components/shared/Layout";
import Payment from "../pages/trainee/stripe/Payment";
import Protected from "../components/shared/Protected";
import Courses from "../pages/sharedTrainee/Courses";
import ChangePassword from "../components/shared/ChangePassword";
import ContinueCourse from "../pages/ContinueCourse";
import ViewInstructor from "../pages/ViewInstructor";
import MyReports from "../pages/MyReports";
import NotFound from "../pages/NotFound";
import MyCoursesPage from "../pages/sharedTrainee/MyCoursesPage";
import Profile from "../pages/Profile";
import TraineeEditProfile from "../pages/trainee/TraineeEditProfile";

export function TraineeRoutes() {
  return (
    <>
      <Protected authorizedUserType={"Trainee"}>
        <Routes>
          <Route path="" element={<Layout />}>
            <Route path="" element={<TraineeView />} />
            <Route path="courses" element={<Courses />} />
            <Route path="myCourses" element={<MyCoursesPage />} />
            <Route path="courses/:id" element={<CoursePage />} />{" "}
            <Route path="profile" element={<Profile />} />
            <Route path="courses/:id/payment" element={<Payment />} />
            <Route path="editProfile" element={<TraineeEditProfile />} />
            <Route
              path="courses/:id/continueCourse"
              element={<ContinueCourse />}
            />
            <Route path="changePassword" element={<ChangePassword />} />
            <Route path="viewInstructor/:id" element={<ViewInstructor />} />
            <Route path="myReports" element={<MyReports />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Protected>
    </>
  );
}
