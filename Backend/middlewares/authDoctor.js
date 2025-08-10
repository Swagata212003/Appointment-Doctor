// import jwt from "jsonwebtoken";

// //doctor authentication middleware

// const authDoctor = async (req, res, next) => {
//   try {
//     const { dtoken } = req.headers;
//     if (!dtoken) {
//       return res.json({
//         success: false,
//         message: "Not Authorized Login Again",
//       });
//     }

//     const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET);

//     req.body.docId = token_decode.id;

//     next();
//   } catch (error) {
//     console.log("error:", error);
//     res.json({ success: false, message: error.message });
//   }
// };

// export default authDoctor;





import jwt from "jsonwebtoken";

const authDoctor = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - No token provided",
      });
    }

    const dtoken = authHeader.split(' ')[1];
    const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET);

    // Attach doctor info to request
    req.doctor = {
      id: token_decode.id,
      // Add other decoded fields if needed
    };

    next();
  } catch (error) {
    console.error("Doctor auth error:", error);
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false, 
        message: "Session expired, please login again" 
      });
    }
    
    res.status(401).json({ 
      success: false, 
      message: "Not authorized" 
    });
  }
};

export default authDoctor;