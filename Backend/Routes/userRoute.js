import { Router } from "express";
// import upload from "../Middelware/CloudinaryStorage.js";
import { Register ,Login,AddCart, addWishlist,DeletetheWish,DeleteProduct,UserloginLogOut,Logout,AddedAllProducts, updatedQuantity,updatedQuantityminus,getallwislistproducts,GoogleAuthentication,adminpanel} from "../Controllers/UserDetails.js";
import { User } from "../Models/userModel.js";
import { verifyuser } from "../Middelware/jwtVerify.js";
import { GoogleVerify } from "../Middelware/GoogleVerify.js";


const UserRouter=Router()


UserRouter.post('/register',Register)
UserRouter.post("/userlogin",Login)
// UserRouter.post('/Admin',adminpanel)
UserRouter.post('/auth/google',GoogleAuthentication)
UserRouter.get("/UserAuth",verifyuser,UserloginLogOut)
UserRouter.post("/LogOuttheweb",Logout)
UserRouter.post("/AddTOWishlist/:id",verifyuser,addWishlist)
UserRouter.get("/addedtoallWishlist",verifyuser,getallwislistproducts)
UserRouter.post("/AddtoCart",verifyuser,AddCart)
UserRouter.put("/UpdateQuantity/:id",verifyuser,updatedQuantity)
UserRouter.put("/UpdateQuantityminus/:id",verifyuser,updatedQuantityminus)
UserRouter.delete('/DeleteTOWishlist/:id',verifyuser,DeletetheWish)
UserRouter.delete("/DeleteTOCatProduct/:id",verifyuser,DeleteProduct)
UserRouter.get("/CartAllProduct",verifyuser,AddedAllProducts)




export {UserRouter}