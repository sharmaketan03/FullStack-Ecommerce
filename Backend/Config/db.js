import mongoose from "mongoose";
import { adminpanel } from "../Controllers/UserDetails.js";
async function Connectdb(){
      try{
            await mongoose.connect(process.env.Mongoose_connect)
            console.log('shi chlra h')
            await adminpanel()
      }catch(err){
        console.log("error:",err)
      }
}
export default Connectdb