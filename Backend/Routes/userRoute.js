import { Router } from "express";
// import upload from "../Middelware/CloudinaryStorage.js";
import { Register ,Login,AddCart, addWishlist,DeletetheWish,DeleteProduct,UserloginLogOut,Logout,AddedAllProducts, updatedQuantity,updatedQuantityminus,getallwislistproducts,GoogleAuthentication,adminpanel} from "../Controllers/UserDetails.js";
import { User } from "../Models/userModel.js";
import { verifyuser } from "../Middelware/jwtVerify.js";
import { GoogleVerify } from "../Middelware/GoogleVerify.js";


const UserRouter=Router()




/**
 * @swagger
 * tags:
 *   name: User
 *   description: User related APIs
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */
UserRouter.post('/register', Register);

/**
 * @swagger
 * /userlogin:
 *   post:
 *     summary: Login user with email and password
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Invalid credentials
 */
UserRouter.post("/userlogin", Login);

/**
 * @swagger
 * /auth/google:
 *   post:
 *     summary: Authenticate user using Google OAuth
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Google authentication successful
 *       400:
 *         description: Google authentication failed
 */
UserRouter.post('/auth/google', GoogleAuthentication);

/**
 * @swagger
 * /UserAuth:
 *   get:
 *     summary: Get user authentication status or details
 *     tags: [User]
 *     responses:
 *       200:
 *         description: User authenticated
 *       401:
 *         description: Unauthorized
 */
UserRouter.get("/UserAuth", UserloginLogOut);

/**
 * @swagger
 * /LogOuttheweb:
 *   post:
 *     summary: Logout the user from website
 *     tags: [User]
 *     responses:
 *       200:
 *         description: User logged out successfully
 *       401:
 *         description: Unauthorized
 */
UserRouter.post("/LogOuttheweb", Logout);

/**
 * @swagger
 * /AddTOWishlist/{id}:
 *   post:
 *     summary: Add product to wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product added to wishlist
 *       401:
 *         description: Unauthorized
 */
UserRouter.post("/AddTOWishlist/:id", verifyuser, addWishlist);

/**
 * @swagger
 * /addedtoallWishlist:
 *   get:
 *     summary: Get all wishlist products for the user
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of wishlist products
 *       401:
 *         description: Unauthorized
 */
UserRouter.get("/addedtoallWishlist", verifyuser, getallwislistproducts);

/**
 * @swagger
 * /AddtoCart:
 *   post:
 *     summary: Add product to cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Product added to cart
 *       401:
 *         description: Unauthorized
 */
UserRouter.post("/AddtoCart", verifyuser, AddCart);

/**
 * @swagger
 * /UpdateQuantity/{id}:
 *   put:
 *     summary: Increase product quantity in cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Quantity updated successfully
 *       401:
 *         description: Unauthorized
 */
UserRouter.put("/UpdateQuantity/:id", verifyuser, updatedQuantity);

/**
 * @swagger
 * /UpdateQuantityminus/{id}:
 *   put:
 *     summary: Decrease product quantity in cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Quantity decreased successfully
 *       401:
 *         description: Unauthorized
 */
UserRouter.put("/UpdateQuantityminus/:id", verifyuser, updatedQuantityminus);

/**
 * @swagger
 * /DeleteTOWishlist/{id}:
 *   delete:
 *     summary: Remove a product from wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product removed from wishlist
 *       401:
 *         description: Unauthorized
 */
UserRouter.delete('/DeleteTOWishlist/:id', verifyuser, DeletetheWish);

/**
 * @swagger
 * /DeleteTOCatProduct/{id}:
 *   delete:
 *     summary: Delete a product from cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted from cart
 *       401:
 *         description: Unauthorized
 */
UserRouter.delete("/DeleteTOCatProduct/:id", verifyuser, DeleteProduct);

/**
 * @swagger
 * /CartAllProduct:
 *   get:
 *     summary: Get all products in user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of cart products
 *       401:
 *         description: Unauthorized
 */
UserRouter.get("/CartAllProduct", verifyuser, AddedAllProducts);



export {UserRouter}