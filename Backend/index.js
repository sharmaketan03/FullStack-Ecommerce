import express from  "express"
import mongoose, { connect } from "mongoose"


import "dotenv/config"
import { UserRouter } from "./Routes/userRoute.js"
import { Products } from "./Routes/product.js"
import Connectdb from "./Config/db.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import { adminpanel } from "./Controllers/UserDetails.js"  

const app=express()
const port=process.env.PORT
Connectdb()
app.use(express.json())
app.use(cookieParser())


 const corsOptions={
     origin:process.env.FRONTEND_URL,

   methods:["GET","POST","DELETE","PUT"],
     credentials: true
 }

// app.use((req, res, next) => {
//   res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
//   res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
//    res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
//   next();
// });
app.use(cors(corsOptions))


app.use(express.urlencoded({ extended: true }))
app.use("/app/details",UserRouter)
app.use("/app/detail",Products)





app.listen(port,(req,res)=>{
    console.log(`server start with ${port}`)
})

// import express from "express";
// import mongoose from "mongoose";
// import "dotenv/config";
// import { UserRouter } from "./Routes/userRoute.js";
// import { Products } from "./Routes/product.js";
// import Connectdb from "./Config/db.js";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import { adminpanel } from "./Controllers/UserDetails.js";

// const app = express();
// const port = process.env.PORT || 4000;

// // Connect to MongoDB
// Connectdb();

// app.use(express.json());
// app.use(cookieParser());

// // CORS Configuration
// const allowedOrigins = [
//   'http://localhost:5173',
//   'https://fullstack-ecommerce-qam1.onrender.com'
// ];

// const corsOptions = {
//   origin: function(origin, callback){
//     if (!origin || allowedOrigins.indexOf(origin) !== -1){
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   methods: ["GET", "POST", "DELETE", "PUT"],
//   credentials: true
// };

// app.use(cors(corsOptions));

// // Optional: you can remove or comment this block if not needed
// /*
// app.use((req, res, next) => {
//   res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
//   res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
//   next();
// });
// */

// app.use(express.urlencoded({ extended: true }));

// // Routes
// app.use("/app/details", UserRouter);
// app.use("/app/detail", Products);

// // Start server
// app.listen(port, () => {
//   console.log(`Server started on port ${port}`);
// });
