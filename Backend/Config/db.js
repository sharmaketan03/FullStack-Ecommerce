import mongoose from "mongoose";

async function Connectdb(){
      try{
            await mongoose.connect(process.env.Mongoose_connect)
            console.log('shi chlra h')
      }catch(err){
        console.log("error:",err)
      }
}
export default Connectdb