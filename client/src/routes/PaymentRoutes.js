// import "../css/payment.css";
import Payment from "../pages/corporateTrainee/Payment";
import Completion from "../pages/corporateTrainee/Completion";

import {Routes, Route } from "react-router-dom";

function PaymentRoutes() {
  return (
    
        <Routes>
          <Route path="" element={<Payment />} />
          <Route path="/completion" element={<Completion />} />
        </Routes>
      
    
  );
}

export default PaymentRoutes;
