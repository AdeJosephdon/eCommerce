import Cart from "../models/cart.model.js";
import Stripe from "stripe";
import transporter from "../config/nodemailer.js";
import { SUCCESSFUL_ORDER_TEMPLATE } from "../config/email.template.js";

export const addToCart = async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    cart.updatedAt = Date.now();
    await cart.save();

    const populatedCart = await cart.populate("items.product");

    res.status(200).json({
      success: true,
      data: populatedCart,
      message: "Product added to cart successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const addMultipleToCart = async (req, res) => {
  const userId = req.user.id;
  const { productIdsArray, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    for (const productId of productIdsArray) {
      const existingItemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );

      if (existingItemIndex > -1) {
        cart.items[existingItemIndex].quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }
    }

    await cart.save();

    const populatedCart = await cart.populate("items.product");

    return res.status(200).json({
      success: true,
      message: "Products added to cart successfully",
      data: populatedCart,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const reduceCartProductQuantity = async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ user: userId });

    // if (!cart) {
    //   cart = new Cart({ user: userId, items: [] });
    // }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        data: cart,
        message: "Product cannot be reduced as it is not in the cart",
      });
    }

    if (cart.items[itemIndex].quantity <= 1) {
      return res.status(400).json({
        success: false,
        data: cart,
        message: "Product in cart cannot be less than 1",
      });
    }

    cart.items[itemIndex].quantity -= quantity;
    cart.updatedAt = Date.now();

    await cart.save();

    const populatedCart = await cart.populate("items.product");

    res.status(200).json({
      success: true,
      data: populatedCart,
      message: "Product quantity updated",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteCartProduct = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();

    const populatedCart = await cart.populate("items.product");

    res.status(200).json({
      success: true,
      message: "Product removed from cart",
      data: populatedCart,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const deleteAllCartProducts = async (req, res) => {
  const userId = req.user.id;

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = [];
    cart.updatedAt = Date.now();

    await cart.save();

    const populatedCart = await cart.populate("items.product");

    res.status(200).json({
      success: true,
      message: "Product removed from cart",
      data: populatedCart,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserCart = async (req, res) => {
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    res.status(200).json({
      success: true,
      data: cart,
      message: "Cart successfully fetched",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const cartCheckout = async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const { products, email } = req.body;

  // console.log("products:", products);
  if (!products || products.length === 0) {
    return res.status(400).json({ error: "No products provided" });
  }

  const lineItems = products.map((product) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: product.product.title,
        images: [product.product.image],
      },
      unit_amount: Math.round(product.product.price * 100), // Convert to cents
    },
    quantity: product.quantity,
  }));
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:3000/successful-payment-page",
      cancel_url: "http://localhost:3000/billing",
    });

    sendMail(products, email);

    res.json({ success: true, id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const sendMail = async (product, email) => {
  const productTitlesList = product
    .map((item) => `${item.product.title}`)
    .join("");

  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: "Product(S) Successfully Ordered",
    html: SUCCESSFUL_ORDER_TEMPLATE.replace(
      "{{otp}}",
      productTitlesList
    ).replace("{{email}}", email),
  };

  await transporter.sendMail(mailOptions);
};
