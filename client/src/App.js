import { Route, Routes } from "react-router-dom";
import { AdminRoutes } from "./routes/AdminRoutes";
import { InstructorRoutes } from "./routes/InstructorRoutes";
import { TraineeRoutes } from "./routes/TraineeRoutes";
import { CorporateTraineeRoutes } from "./routes/CorporateTraineeRoutes";
import { GuestRoutes } from "./routes/GuestRoutes";
import { RedirectToHome } from "./components/shared/RedirectToHome";
import NotFound from "./pages/NotFound";
import { CompleteSignUpRoutes } from "./routes/CompleteSignUpRoutes";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { logout } from "./redux/userSlice";

function App() {
  const token = useSelector((state) => state.userReducer.token);
  const userType = useSelector((state) => state.userReducer.type);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkBan = async () => {
      const config = {
        method: "POST",
        url: "http://localhost:4000/api/users/check-banned",
        headers: { authorization: `Bearer ${token}` },
      };

      try {
        const response = await axios(config);

        if (response.data.message === "Вы забанены") {
          dispatch(logout());
        }
      } catch (e) {
        console.log(e.response.data.message);
      }
    };

    if (token && userType !== "Administrator") {
      checkBan();
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<RedirectToHome />} />
        <Route path="/home/*" element={<RedirectToHome />} />
        <Route path="/guest/*" element={<GuestRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/instructor/*" element={<InstructorRoutes />} />
        <Route path="/trainee/*" element={<TraineeRoutes />} />
        <Route
          path="/corporateTrainee/*"
          element={<CorporateTraineeRoutes />}
        />
        <Route path="/completeSignUp/*" element={<CompleteSignUpRoutes />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
