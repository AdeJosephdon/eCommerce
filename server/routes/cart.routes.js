import express from "express";
import userAuth from "../middleware/user.auth.js";
import {
  addToCart,
  getUserCart,
  reduceCartProductQuantity,
  deleteCartProduct,
  addMultipleToCart,
  deleteAllCartProducts,
  cartCheckout,
} from "../controller/cart.controller.js";

const cartRouter = express.Router();

cartRouter.post("/add-to-cart", userAuth, addToCart);
cartRouter.post(
  "/reduce-cart-product-quantity",
  userAuth,
  reduceCartProductQuantity
);
cartRouter.post("/delete-cart-product", userAuth, deleteCartProduct);
cartRouter.post("/add-multiple-to-cart", userAuth, addMultipleToCart);
cartRouter.post("/delete-all-cart-products", userAuth, deleteAllCartProducts);
cartRouter.get("/", userAuth, getUserCart);
cartRouter.post("/create-checkout-session", userAuth, cartCheckout);

export default cartRouter;
