const axios = require('axios');
const jwt = require('jsonwebtoken');
const { oauth2Client } = require('../util/googleConfig');
const jwt_decode=  require("jwt-decode");
const dotenv = require('dotenv'); 
dotenv.config();
const User = require('../modals/userModal');

/* GET Google Authentication API. */
exports.googleAuth = async (req, res, next) => {
    const code = req.query.code;
    console.log(code);
    try {
        // oauth2Client.setCredentials(googleRes.tokens);
        let userRes = jwt_decode.jwtDecode(code);
        const { email, name, picture } = userRes;
        // console.log(userRes);
        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                name,
                email,
                image: picture,
            });
        }
        console.log(user); 
        const { _id } = user;
        const token = jwt.sign({ _id, email },
            process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_TIMEOUT,
        });

     return   res.status(200).json({
            message: 'success',
            token,
            user,
        });
    } catch (err) {
       return  res.status(500).json({
            message: err
        })
    }
};