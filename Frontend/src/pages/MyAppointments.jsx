// import { useContext, useEffect, useState } from "react";
// import { AppContext } from "../context/AppContext";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import MoveUpOnRender from "../components/MoveUpOnRender";

// const MyAppointments = () => {
//   const { backendUrl, token, getDoctorsData } = useContext(AppContext);
//   const [appointments, setAppointments] = useState([]);
//   const navigate = useNavigate();
//   useEffect(() => {
//     if (token) {
//       getUserAppointments();
//     }
//   }, [token]);
//   const months = [
//     "",
//     "Jan",
//     "Feb",
//     "Mar",
//     "Apr",
//     "May",
//     "Jun",
//     "Jul",
//     "Aug",
//     "Sep",
//     "Oct",
//     "Nov",
//     "Dec",
//   ];

//   const slotDateFormat = (slotDate) => {
//     const dataArray = slotDate.split("_");
//     return (
//       dataArray[0] + " " + months[Number(dataArray[1])] + " " + dataArray[2]
//     );
//   };

//   const getUserAppointments = async () => {
//     try {
//       const { data } = await axios.get(backendUrl + "/api/user/appointments", {
//         headers: { token },
//       });

//       if (data.success) {
//         setAppointments(data.appointments.reverse());
//       }
//     } catch (error) {
//       console.log("error:", error);
//       toast.error(error.message);
//     }
//   };

//   // const cancelAppointment = async (appointmentId) => {
//   //   try {
//   //     const { data } = await axios.post(
//   //       backendUrl + "/api/user/cancle-appointment",
//   //       { appointmentId },
//   //       { headers: { token } }
//   //     );
//   //     if (data.success) {
//   //       toast.success(data.message);
//   //       getUserAppointments();
//   //       getDoctorsData();
//   //     } else {
//   //       toast.error(data.message);
//   //     }
//   //   } catch (error) {
//   //     console.log("error:", error);
//   //     toast.error(error.message);
//   //   }
//   // };

//   // handle razorpay payment
//   // const initPay = (order) => {
//   //   const options = {
//   //     key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//   //     amount: order.amount,
//   //     currency: order.currency,
//   //     name: "Appointment payment",
//   //     description: "Appointment Payment",
//   //     order_id: order.id,
//   //     receipt: order.receipt,
//   //     handler: async (response) => {
//   //       try {
//   //         const { data } = await axios.post(
//   //           backendUrl + "/api/user/verify-razorpay",
//   //           response,
//   //           { headers: { token } }
//   //         );
//   //         if (data.success) {
//   //           getUserAppointments();
//   //           navigate("/my-appointments");
//   //         }
//   //       } catch (error) {
//   //         console.log("error:", error);
//   //         toast.error(error.message);
//   //       }
//   //     },
//   //   };

//   //   const rzp = new window.Razorpay(options);

//   //   rzp.open();
//   // };

//   // // handle razorpay payment
//   // const appointmentRazorpay = async (appointmentId) => {
//   //   try {
//   //     const { data } = await axios.post(
//   //       backendUrl + "/api/user/payment-razorpay",
//   //       { appointmentId },
//   //       { headers: { token } }
//   //     );

//   //     if (data.success) {
//   //       initPay(data.order);
//   //     } else {
//   //       toast.error(data?.message);
//   //     }
//   //   } catch (error) {
//   //     console.log("error:", error);
//   //     toast.error(error.message);
//   //   }
//   // };

//   //handle navigation
  
  
  
//   const cancelAppointment = async (appointmentId) => {
//   try {
//     const { data } = await axios.post(
//       backendUrl + "/api/user/cancle-appointment", // Fixed typo
//       { appointmentId },
//       { headers: { token } }
//     );
//     if (data.success) {
//       toast.success(data.message);
//       await getUserAppointments(); // Add await
//       await getDoctorsData(); // Add await
//     } else {
//       toast.error(data.message);
//     }
//   } catch (error) {
//     console.log("error:", error);
//     toast.error(error.response?.data?.message || error.message);
//   }
// };
  
  
  
//   const handleNavigation = (docId) => {
//     navigate(`/appointment/${docId}`);
//   };

//   return (
//     <div>
//       <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
//         My appointments
//       </p>

//       <MoveUpOnRender id="my-appointments">
//         {appointments.map((item, index) => (
//           <div
//             className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
//             key={index}
//           >
//             <div onClick={() => handleNavigation(item?.docData?._id)}>
//               <img
//                 className="w-32 bg-indigo-50"
//                 src={item?.docData?.image}
//                 alt=""
//               />
//             </div>
//             <div className="flex-1 text-sm text-zinc-500">
//               <p className="text-neutral-800 font-semibold">
//                 {item?.docData?.name}
//               </p>
//               <p>{item?.docData?.speciality}</p>
//               <p className="text-zinc-700 font-medium mt-1">Address:</p>
//               <p className="text-xs">{item?.docData?.address?.line1}</p>
//               {/* <p className="text-xs">{item?.docData?.address?.line1}</p> */}
//               <p className="text-xs mt-1">
//                 <span className="text-sm text-neutral-700 font-medium">
//                   Date & Time :
//                 </span>
//                 {slotDateFormat(item?.slotDate)} | {item.slotTime}
//               </p>
//             </div>
//             <div></div>

//             <div className="flex flex-col gap-2 justify-end">
//               {/* {!item.cancelled && item.payment && !item.isCompleted && (
//                 <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border bg-indigo-50">
//                   Paid
//                 </button>
//               )}
//               {!item.cancelled && !item.payment && !item.isCompleted && (
//                 <button
//                   onClick={() => appointmentRazorpay(item?._id)}
//                   className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-primary hover:text-white tranisal duration-300"
//                 >
//                   Pay Online
//                 </button>
//               )} */}
//               {!item.cancelled && !item.isCompleted && (
//                 <button
//                   onClick={() => cancelAppointment(item._id)}
//                   className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-red-600 hover:text-white tranisal duration-300"
//                 >
//                   Cancel Appointment
//                 </button>
//               )}

//               {item.cancelled && !item.isCompleted && (
//                 <button className="sm:min-w-48 py-2 border border-red-500 rounded tex-red-500">
//                   Appointment cancelled
//                 </button>
//               )}
//               {item.isCompleted && (
//                 <button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500 ">
//                   Completed
//                 </button>
//               )}
//             </div>
//           </div>
//         ))}
//       </MoveUpOnRender>
//     </div>
//   );
// };

// export default MyAppointments;














import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MoveUpOnRender from "../components/MoveUpOnRender";

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  const months = [
    "", "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const slotDateFormat = (slotDate) => {
    if (!slotDate) return "Date not available";
    const dataArray = slotDate.split("_");
    if (dataArray.length < 3) return "Invalid date format";
    return `${dataArray[0]} ${months[Number(dataArray[1])]} ${dataArray[2]}`;
  };

  const getUserAppointments = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { token },
      });
      if (data.success) {
        setAppointments(data.appointments?.reverse() || []);
      }
    } catch (error) {
      console.log("error:", error);
      toast.error(error.response?.data?.message || error.message);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  // const cancelAppointment = async (appointmentId) => {
  //   try {
  //     setLoading(true);
  //     const { data } = await axios.post(
  //       backendUrl + "/api/user/cancle-appointment",
  //       { appointmentId },
  //       { headers: { token } }
  //     );
  //     if (data.success) {
  //       toast.success(data.message);
  //       await getUserAppointments();
  //       await getDoctorsData();
  //     } else {
  //       toast.error(data.message);
  //     }
  //   } catch (error) {
  //     console.log("error:", error);
  //     toast.error(error.response?.data?.message || error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };


const cancelAppointment = async (appointmentId) => {
  try {
    setLoading(true);
    const { data } = await axios.post(
      `${backendUrl}/api/user/cancle-appointment`,
      { appointmentId },
      { headers: { token } }
    );

    // Immediately update the UI without any toasts
    setAppointments(prevAppointments => 
      prevAppointments.map(appt => 
        appt._id === appointmentId 
          ? { ...appt, cancelled: true } 
          : appt
      )
    );
    
    // Refresh doctors data silently
    await getDoctorsData();
    
  } catch (error) {
    // Silently handle errors - no toast
    console.error("Cancellation failed:", error);
  } finally {
    setLoading(false);
  }
};


  const handleNavigation = (docId) => {
    if (docId) {
      navigate(`/appointment/${docId}`);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        My appointments
      </p>

      {loading ? (
        <div className="flex justify-center items-center py-8">
          <p>Loading...</p>
        </div>
      ) : appointments.length === 0 ? (
        <div className="flex justify-center items-center py-8">
          <p>No appointments found</p>
        </div>
      ) : (
        <MoveUpOnRender id="my-appointments">
          {appointments.map((item) => (
            <div
              className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b"
              key={item._id}
            >
              <div 
                onClick={() => handleNavigation(item?.docData?._id)}
                className="cursor-pointer"
              >
                <img
                  className="w-32 h-32 object-cover bg-indigo-50 rounded"
                  src={item?.docData?.image || "/default-doctor.png"}
                  alt={item?.docData?.name || "Doctor"}
                />
              </div>
              <div className="flex-1 text-sm text-zinc-500">
                <p className="text-neutral-800 font-semibold">
                  {item?.docData?.name || "Doctor name not available"}
                </p>
                <p>{item?.docData?.speciality || "Speciality not specified"}</p>
                <p className="text-zinc-700 font-medium mt-1">Address:</p>
                <p className="text-xs">
                  {item?.docData?.address?.line1 || "Address not available"}
                </p>
                <p className="text-xs">
                  {item?.docData?.address?.line2 || ""}
                </p>
                <p className="text-xs mt-1">
                  <span className="text-sm text-neutral-700 font-medium">
                    Date & Time:{" "}
                  </span>
                  {slotDateFormat(item?.slotDate)} | {item.slotTime || "Time not specified"}
                </p>
              </div>

              <div className="flex flex-col gap-2 justify-end">
                {!item.cancelled && !item.isCompleted && (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-red-600 hover:text-white transition duration-300"
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Cancel Appointment"}
                  </button>
                )}

                {item.cancelled && !item.isCompleted && (
                  <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">
                    Appointment cancelled
                  </button>
                )}
                {item.isCompleted && (
                  <button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500">
                    Completed
                  </button>
                )}
              </div>
            </div>
          ))}
        </MoveUpOnRender>
      )}
    </div>
  );
};

export default MyAppointments;