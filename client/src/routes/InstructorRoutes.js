import { Routes, Route } from "react-router-dom";
import InstructorHome from "../pages/instructor/InstructorHome";
import CreateCourse from "../pages/instructor/CreateCourse";
import InstructorEditProfile from "../pages/instructor/InstructorEditProfile";
import ViewInstructorReviews from "../pages/instructor/ViewInstructorReviews";
import ViewInstructorCourses from "../pages/instructor/ViewInstructorCourses";
import Protected from "../components/shared/Protected";
import Layout from "../components/shared/Layout";
import Courses from "../pages/sharedTrainee/Courses";
import Promotion from "../pages/admin/Promotion";
import ViewInstructor from "../pages/ViewInstructor";
import ChangePassword from "../components/shared/ChangePassword";
import MyReports from "../pages/MyReports";
import CoursePage from "../pages/sharedTrainee/CoursePage";
import NotFound from "../pages/NotFound";
import Profile from "../pages/Profile";
import ViewInstructorReports from "../pages/instructor/ViewInstructorReports";
import ViewInstructorCourseReports from "../pages/instructor/ViewInstructorCourseReports";

export function InstructorRoutes() {
  return (
    <>
      <Protected authorizedUserType={"Instructor"}>
        <Routes>
          <Route path="" element={<Layout />}>
            <Route path="courses/:id" element={<CoursePage />} />
            <Route path="" element={<InstructorHome />} />
            <Route
              path="courses"
              element={<Courses searchInInstructorCourses={false} />}
            />
            <Route path="profile" element={<Profile />} />
            <Route path="createCourse" element={<CreateCourse />} />
            <Route path="editProfile" element={<InstructorEditProfile />} />
            <Route path="changePassword" element={<ChangePassword />} />
            <Route
              path="viewInstructorReviews"
              element={<ViewInstructorReviews />}
            />{" "}
            <Route
              path="viewInstructorReports"
              element={<ViewInstructorReports />}
            />
            <Route
              path="viewInstructorCourseReports"
              element={<ViewInstructorCourseReports />}
            />
            <Route
              path="viewInstructorCourses"
              element={<ViewInstructorCourses />}
            />
            <Route path="viewInstructor/:id" element={<ViewInstructor />} />
            <Route path="promotion" element={<Promotion />} />
            <Route path="myReports" element={<MyReports />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Protected>
    </>
  );
}
