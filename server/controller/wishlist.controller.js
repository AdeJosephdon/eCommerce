import wishlist from "../models/wishlist.model.js";

export const getUserWishlist = async (req, res) => {
  try {
    const userId = req.user.id;

    const Wishlist = await wishlist.findOne({ user: userId });

    if (!Wishlist) {
      return res
        .status(404)
        .json({ success: false, message: "Wishlist not found" });
    }

    res.status(200).json({ success: true, data: Wishlist.products });
  } catch (error) {
    console.log("error in fetching wishlists:", error.message);
    res.status(404).json({ success: false, message: "wishlists not found" });
  }
};

export const addToWishlist = async (req, res) => {
  // Worked
  try {
    const { productId } = req.body;
    const userId = req.user.id;

    const Wishlist = await wishlist.findOne({ user: userId });

    if (!Wishlist) {
      Wishlist = new wishlist({ user: userId, products: [] });
    }

    if (!productId) {
      return res
        .status(403)
        .json({ success: false, message: "Missing Product ID" });
    }

    const productExists = Wishlist?.products.some(
      (item) => item.product.toString() === productId
    );

    if (productExists) {
      return res.status(400).json({ message: "Product already in wishlist." });
    }

    Wishlist.products.push({ product: productId });

    await Wishlist.save();
    res.status(201).json({
      success: true,
      message: "Product added to wishlist",
      data: Wishlist.products,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    console.log("productId: ", productId);

    const userId = req.user.id;

    if (!productId) {
      return res.status(403).json({
        success: false,
        message: `Missing Product ID, productid is ${productId}`,
      });
    }

    const Wishlist = await wishlist.findOne({ user: userId });
    // console.log("Wishlist: ", Wishlist);

    if (!Wishlist) {
      return res
        .status(404)
        .json({ success: false, message: "Wishlist not found" });
    }

    Wishlist.products = Wishlist.products.filter(
      (item) => item.product.toString() !== productId
    );

    await Wishlist.save();

    res.status(200).json({
      success: true,
      message: "Product removed from wishlist",
      data: Wishlist.products,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const deleteAllWishlistProducts = async (req, res) => {
  try {
    const userId = req.user.id;

    const Wishlist = await wishlist.findOne({ user: userId });
    // console.log("Wishlist: ", Wishlist);

    if (!Wishlist) {
      return res
        .status(404)
        .json({ success: false, message: "Wishlist not found" });
    }

    Wishlist.products = [];
    Wishlist.updatedAt = Date.now();

    await Wishlist.save();

    res.status(200).json({
      success: true,
      message: "Products removed from wishlist",
      data: Wishlist.products,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
