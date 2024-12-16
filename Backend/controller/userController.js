const UserOtpVerificationSchema = require("../modals/UserOtpVerification");
const nodemailer = require("nodemailer");
const socialSchemaLogins = require('../modals/userModal');
const jwt = require('jsonwebtoken');
const {google} = require('googleapis')
const transporter = nodemailer.createTransport({
  service:'Gmail',
  port:465,
  host:"smtp.gmail.com",
  secure : true,
  auth: {
    user: process.env.AUTH_EMAIL,
    // pass: "qgnb qzjp nkmj pumg",
    pass: process.env.AUTH_PASSWORD
  },
});
async function main(mailOption) {
    // send mail with defined transport object
    const info = await transporter.sendMail(mailOption);
  
}
  
const sendOtpVerificationEmail =async (req  , res ) =>{
    const {email} = req.body;
    let otp =  `${ Math.floor( 1000 + Math.random()*9000)}`;
    try{
    const mailOption = {
        from :process.env.AUTH_EMAIL,
        to:email,
        subject: "Verify your email",
        html:`
         <p> Enter <b> ${otp}</b> in the app to verify your email address .</p>
         <p> This code <b> expires in one hour </b>.</p>
        `
    }
   

    const userOtp = await UserOtpVerificationSchema.create({
            email:email,
            otp : String(otp),
            expiresAt: Date.now() + 3600000
})
await main(mailOption);
        return res.status(200).json({
            status :"Pending",
            message:"Verification otp email sent",
            
        })
    }
catch(err){
   return  res.status(500).json({
        message:err
    })
}
}
const verifyOtp = async( req , res) =>{
    let { email , dataOtp:otp } = req.body;
    if( !otp){
      throw new Error("Empty otp details are not allowed.");
      return;
    }
    try{
        const UserOtpVerificationRecords = await UserOtpVerificationSchema.find({
            email
        });
        const {expiresAt }= UserOtpVerificationRecords[0];
        const hashedOtp = UserOtpVerificationRecords[0]?.otp;
    
        if( expiresAt < Date.now()){
            await UserOtpVerificationSchema.deleteMany({email});
            throw new Error('Code has Expired')
        }
    
        if(otp !== hashedOtp){
            throw new Error('Invalid Code passed');
        }
    
        let user = await socialSchemaLogins.find({email});
        let _id = Object.keys(user).length ? user[0]?._id:UserOtpVerificationRecords[0]?._id;
        let token =  jwt.sign({ _id , email },
            process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_TIMEOUT,
  });
        if( !Object.keys(user)?.length){
            _id  = UserOtpVerificationRecords[0]._id;
            token = jwt.sign({ _id , email },
                      process.env.JWT_SECRET, {
                      expiresIn: process.env.JWT_TIMEOUT,
            });
        }
        await UserOtpVerificationSchema.deleteMany({email});
    
        res.status(200).json({
            token,
            status :"Verified"
        })
    }
    catch(err){
        res.status(500).json({
            message:err
        }) 
    }

}
    async function fetchAllPlaylists() {
        const  client_id  = process.env.client_id;
        const  client_secret = process.env.client_secret
        const  redirect_uris = process.env.redirect_uris
        const oauth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
        const scopes = ['https://www.googleapis.com/auth/youtube.readonly'];
    const authUrl = oauth2Client.generateAuthUrl({ access_type: 'offline', scope: scopes });

   let temp =  oauth2Client.getToken('AIzaSyDhrKeO-nePw90Z5Ykijxz0hTjAk_6fRZE', async (err, tokens) => {
        if (err) {
          console.error('Error retrieving access token:', err);
          return;
        }
        oauth2Client.setCredentials(tokens);
    })
    console.log(temp);
    
      


        const youtube =  google.youtube({
            version: 'v3',
            auth: oauth2Client,
        });
            const response = await youtube.playlists.list({
                part: 'snippet,contentDetails',
            mine: true  
            });
    
            let playlists = response.data.items;
            
        
            return res.status(200).json(playlists);
        
    
    }
module.exports =  {sendOtpVerificationEmail ,  verifyOtp ,fetchAllPlaylists};