import express from "express";
// import  from "../controller/product.controller.js";
import productControllerObject from "../controller/product.controller.js";
const productRouter = express.Router();

productRouter.get("/", productControllerObject.getAllProducts);

productRouter.post("/", productControllerObject.createProduct);

productRouter.put("/:id", productControllerObject.editAProduct);

productRouter.delete("/:id", productControllerObject.deleteProduct);

export default productRouter;
