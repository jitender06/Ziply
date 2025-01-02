import UserModel from "../models/user.model";
import bcryptjs from "bcryptjs";
import sendEmail from "../config/sendEmail.js"
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";

export async function registerUserController(request, response) {
  try {
    const { name, email, password } = request.body;
    if (!name || !email || !password) {
      throw response.status(400).json({
        message: "Provide name, email and password",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findOne({ email });
    if (user) {
      return response.json({
        message: "Emial is already exist",
        error: true,
        success: false,
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const payload = {
      name,
      email,
      password: hashPassword,
    };

    const newUser = new UserModel(payload); 
    const save = await newUser.save();
    const VerifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save._id}}`
    const verifyEmail = await sendEmail({
        sendTo: email,
        subject: "Verify email from ziply",
        html: verifyEmailTemplate({name, url: VerifyEmailUrl}),
    })

    return response.json({
        message:"User register successfully",
        error: false,
        success: true,
        data: save
    })

  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      success: false,
    });
  }
}

