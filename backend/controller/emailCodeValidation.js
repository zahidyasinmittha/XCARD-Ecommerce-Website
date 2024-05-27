const nodemailer = require("nodemailer");
const User = require("../models/userSignUpModel");
const verificationCodeModel = require("../models/verificationCodeModel");

async function emailCodeSendingController(req, res) {
  try {
    if (!process.env.VERIFICATION_CODE_SENDING_EMAIL || !process.env.VERIFICATION_CODE_SENDING_PASSWORD) {
      console.error("Email sending credentials are not set");
      throw new Error("Something went wrong");
    }

    const { email, check } = req.body;
    console.log(email, check);
    if (!email) throw new Error("Email is required");

    if (check === undefined) {
      const user = await User.findOne({ email });
      if (!user) throw new Error("User does not exist");
    }

    const codesend = await verificationCodeModel.findOne({ email });
    if (codesend) throw new Error("Verification code is already sent to your email. Try again after 5 minutes.");

    const getEmailService = (email) => {
      let domain = email.split("@")[1];
      domain = domain.split(".")[0].toLowerCase();
      if (domain) return domain;
      else throw new Error("This Email Type is not acceptable");
    };

    const service = getEmailService(email);

    const transporter = nodemailer.createTransport({
      service: service,
      auth: {
        user: process.env.VERIFICATION_CODE_SENDING_EMAIL,
        pass: process.env.VERIFICATION_CODE_SENDING_PASSWORD,
      },
    });

    const verificationCode = Math.floor(100000 + Math.random() * 900000);

    const mailOptions = {
      from: process.env.VERIFICATION_CODE_SENDING_EMAIL,
      to: email,
      subject: "Verification Code",
      text: `Your verification code is: ${verificationCode} \nNote: This code will expire after 5 minutes.`,
    };

    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        return res.json({
          message: "An error occurred while sending the verification code",
          codeSend: false,
          error: true,
          success: false,
        });
      }

      try {
        const verificationCodeData = new verificationCodeModel({
          email: email,
          verificationCode: verificationCode,
        });

        await verificationCodeData.save();

        res.json({
          message: "Verification code sent successfully",
          codeSend: true,
          error: false,
          success: true,
        });
      } catch (saveError) {
        console.error("Error saving verification code:", saveError);
        res.json({
          message: "Something went wrong while saving the verification code",
          codeSend: false,
          error: true,
          success: false,
        });
      }
    });
  } catch (error) {
    console.error("Error in emailCodeSendingController:", error);
    res.json({
      message: error.message || "An error occurred while sending the verification code",
      codeSend: false,
      error: true,
      success: false,
    });
  }
}

async function emailCodeValidationController(req, res) {
  try {
    const { email, verificationCode } = req.body;
    if (!email) throw new Error("Email is required");
    if (!verificationCode) throw new Error("Verification code is required");
    const user = await verificationCodeModel.findOne({ email });
    if (!user)
      throw new Error("User does not exist or first send the code on email");
    console.log(user.verificationCode)
    if (user.verificationCode !== verificationCode)
      throw new Error("Invalid verification code");
    else {
      const updateResult = await verificationCodeModel.updateOne(
        { email: email },
        { $set: { isvarified: true } }
      );
      if (!updateResult.acknowledged) throw new Error("something went wrong");
      if (updateResult.modifiedCount === 0) {
        throw new Error("Already verified! Try again after sometime");
      }
      res.json({
        message: "Email verified successfully",
        error: false,
        success: true,
      });
    }
  } catch (error) {
    res.json({
      message: error.message || "An error occurred while verifying the email",
      error: true,
      success: false,
    });
  }
}

module.exports = { emailCodeSendingController, emailCodeValidationController };
