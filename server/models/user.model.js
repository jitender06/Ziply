import mongoose, { Types } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      Types: String,
      require: [true, "Name is required"],
    },
    email: {
      Types: String,
      require: [true, "Email is required"],
      unique: true,
    },
    password: {
      Types: String,
      require: [true, "password is required"],
    },
    avatar: {
      Types: String,
      default: "",
    },
    mobile: {
      Types: Number,
      default: null,
    },
    refresh_token: {
      Types: String,
      default: "",
    },
    verify_email: {
      Types: Boolean,
      default: false,
    },
    last_login_date: {
      Type: Date,
      default: "",
    },
    status: {
      Type: String,
      enum: ["Active", "Inactive", "Suspended"],
      default: "Active",
    },
    address_details: [
      {
        Type: mongoose.Schema.ObjectId,
        ref: "address",
      },
    ],
    shopping_cart: [
      {
        Type: mongoose.Schema.ObjectId,
        ref: "cartProduct",
      },
    ],
    orderHistory: [
      {
        Type: mongoose.Schema.ObjectId,
        ref: "order",
      },
    ],
    forgot_password_otp: {
      type: String,
      default: null,
    },
    forgot_password_expiry: {
      type: Date,
      default: "",
    },
    role: {
      Type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("Users", userSchema);

export default UserModel;