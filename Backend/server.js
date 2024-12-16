const express =  require("express");
const dotenv = require('dotenv'); 
const cors = require("cors");
const connectDB = require("./config/db");
const authRouter = require('./routes/authRouter.js')
const layoutRouter = require('./routes/LayoutRouter.js');
const path = require('path');
const app = express();
dotenv.config();
connectDB();
app.use(cors());
app.use(express.json());
// deployment 
__dirname = path.resolve();
// console.log(process.env.NODE_ENV)
// console.log(path.resolve(__dirname , "../my-app", "build" , "index.html"));
// if( process.env.NODE_ENV === 'production'){
//     console.log("tr")
//     app.use(express.static(path.join(__dirname, '../my-app/build')))
//     app.get('*', (req , res)=>{
//         console.log("hello")
//         res.sendFile(path.resolve(__dirname , "../my-app", "build" , "index.html"));
//     })
// }
// else{
//     console.log("not working")
// }

// deployment
app.use('/auth',authRouter);
app.use('/api',layoutRouter);



const PORT = process.env.PORT ;
app.listen( PORT , console.log(`server started on port  `));

