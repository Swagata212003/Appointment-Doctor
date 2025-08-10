// import express from "express";
// const doctorRouter = express.Router();
// import {
//   appointmentCancel,
//   appointmentComplete,
//   appointmentsDoctor,
//   doctorDashboard,
//   doctorList,
//   doctorLogin,
//   doctorProfile,
//   updateDoctorProfile,
// } from "../controllers/doctorController.js";
// import authDoctor from "../middlewares/authDoctor.js";

// // all doctor api
// doctorRouter.get("/list", doctorList);
// doctorRouter.post("/login", doctorLogin);
// doctorRouter.get("/appointments", authDoctor, appointmentsDoctor);
// doctorRouter.post("/complete-appointment", authDoctor, appointmentComplete);
// doctorRouter.post("/cancel-appointment", authDoctor, appointmentCancel);
// doctorRouter.get("/dashboard", authDoctor, doctorDashboard);
// doctorRouter.get("/profile", authDoctor, doctorProfile);
// doctorRouter.post("/update-profile", authDoctor, updateDoctorProfile);
// export default doctorRouter;







import express from "express";
const doctorRouter = express.Router();
import {
  doctorRegister,  // Add this import
  appointmentCancel,
  appointmentComplete,
  appointmentsDoctor,
  doctorDashboard,
  doctorList,
  doctorLogin,
  doctorProfile,
  updateDoctorProfile,
} from "../controllers/doctorController.js";
import authDoctor from "../middlewares/authDoctor.js";

// Public routes
doctorRouter.get("/list", doctorList);
doctorRouter.post("/login", doctorLogin);
doctorRouter.post("/register", doctorRegister);  // Add this route

// Protected routes (require doctor auth)
doctorRouter.use(authDoctor);  // Apply auth middleware to all routes below
doctorRouter.get("/appointments", appointmentsDoctor);
doctorRouter.post("/complete-appointment", appointmentComplete);
doctorRouter.post("/cancel-appointment", appointmentCancel);
doctorRouter.get("/dashboard", doctorDashboard);
doctorRouter.get("/profile", doctorProfile);
doctorRouter.post("/update-profile", updateDoctorProfile);

export default doctorRouter;