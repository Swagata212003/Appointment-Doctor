// import mongoose from "mongoose";

// const doctorSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     image: { type: String, required: true },
//     speciality: { type: String, required: true },
//     degree: { type: String, required: true },
//     experience: { type: String, required: true },
//     about: { type: String, required: true },
//     available: { type: Boolean, default: true },
//     fees: { type: Number, required: true },
//     address: { type: Object, required: true },
//     date: { type: Number, required: true },
//     slots_booked: { type: Object, default: {} },
//   },
//   { minimize: false }
// );

// //minimize false allows to add empty object {} in schema

// const doctorModel =
//   mongoose.models.doctor || mongoose.model("doctor", doctorSchema);

// export default doctorModel;





import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  line1: { type: String, required: true },
  line2: { type: String, default: "" },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
  country: { type: String, default: "India" }
});

const slotSchema = new mongoose.Schema({
  date: { type: String, required: true }, // Format: "DD_MM_YYYY"
  times: { type: [String], default: [] }  // Array of booked times
});

const doctorSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: [true, "Doctor name is required"],
      trim: true,
      maxlength: [50, "Name cannot exceed 50 characters"]
    },
    email: { 
      type: String, 
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"]
    },
    password: { 
      type: String, 
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false // Never return password in queries
    },
    image: { 
      type: String, 
      required: [true, "Profile image is required"],
      default: "https://res.cloudinary.com/demo/image/upload/v1633456328/default_doctor.jpg"
    },
    speciality: { 
      type: String, 
      required: [true, "Speciality is required"],
      enum: [
        "Cardiology", 
        "Dermatology", 
        "Neurology", 
        "Pediatrics", 
        "Orthopedics", 
        "Gynecology",
        "General Physician"
      ]
    },
    degree: { 
      type: String, 
      required: [true, "Degree is required"],
      maxlength: [100, "Degree cannot exceed 100 characters"]
    },
    experience: { 
      type: String, 
      required: [true, "Experience is required"],
      default: "0 years"
    },
    about: { 
      type: String, 
      required: [true, "About information is required"],
      maxlength: [500, "About cannot exceed 500 characters"]
    },
    available: { 
      type: Boolean, 
      default: true 
    },
    fees: { 
      type: Number, 
      required: [true, "Consultation fee is required"],
      min: [0, "Fees cannot be negative"]
    },
    address: { 
      type: addressSchema,
      required: [true, "Address is required"]
    },
    date: { 
      type: Number, 
      default: () => Date.now() 
    },
    slots_booked: { 
      type: [slotSchema],
      default: []
    },
    ratings: {
      type: Number,
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
      default: 5
    },
    verified: {
      type: Boolean,
      default: false
    },
    languages: {
      type: [String],
      default: ["English"]
    }
  },
  { 
    minimize: false,
    timestamps: true // Adds createdAt and updatedAt fields
  }
);

// Pre-save hook to hash password
doctorSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare passwords
doctorSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Virtual for doctor's full address
doctorSchema.virtual('fullAddress').get(function() {
  return `${this.address.line1}, ${this.address.line2}, ${this.address.city}, ${this.address.state} - ${this.address.zip}`;
});

// Indexes for better query performance
doctorSchema.index({ email: 1 }); // Index on email field
doctorSchema.index({ speciality: 1 }); // Index on speciality field
doctorSchema.index({ available: 1 }); // Index on availability

const Doctor = mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);

export default Doctor;