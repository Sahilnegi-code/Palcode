const axios = require('axios');
const jwt = require('jsonwebtoken');
const { oauth2Client } = require('../util/googleConfig');
const User = require('../modals/userModal');

/* GET Google Authentication API. */
exports.googleAuth = async (req, res, next) => {
    console.log('Hi')
    const code = req.query.code;
    console.log(code);
    try {
        const googleRes = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(googleRes.tokens);
        const userRes = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
        );
        const { email, name, picture } = userRes.data;
        console.log( "email",email);
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
        res.status(200).json({
            message: 'success',
            token,
            user,
        });
    } catch (err) {
        res.status(500).json({
            message: err
        })
    }
};