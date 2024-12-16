const mongoose = require('mongoose');

let UserOtpVerificationSchema = new mongoose.Schema(
    {


        email: {
            type: String,
            required: true,
            unique: true
        },
        otp: {
            type: String,
            required: true,
        },
        expiresAt: {
            type: Number,
            required: true,

        }

    },
    {
        timestamps: true
    }
);

UserOtpVerificationSchema = mongoose.model("UserOtpVerificationSchema", UserOtpVerificationSchema);
module.exports = UserOtpVerificationSchema;
