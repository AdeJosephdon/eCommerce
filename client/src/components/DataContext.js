import React, { useRef, createContext, useState, useEffect } from "react";

export const DataContext = createContext();

function DataProvider({ children }) {
  const hasFetched = useRef(false); //To initialize that the data has not been fetched

  const [data, setData] = useState(null);

  const [auth, setAuth] = useState({
    loading: true,
    authenticated: false,
    user: null,
  });

  const [currentUser, setCurrentUser] = useState(null);

  const [isAlertPopupOpen, setIsAlertPopupOpen] = useState({
    alertState: false,
  });

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/products`
        );
        const result = await response.json();
        // console.log("📦 Products Data:", result);
        setData(result.data || []);
      } catch (error) {
        console.error("❌ Error fetching products:", error);
      }
    };

    fetchData();
  }, []);



const [authRefreshKey, setAuthRefreshKey] = useState(0);

const refetchAuth = () => {
  setAuthRefreshKey(prev => prev + 1);
};

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/auth/verify-user`,
          {
            method: "GET",
            credentials: "include", // Required to send cookies
          }
        );
        const result = await response.json();
        // console.log("🔐 Auth Verification Result:", result);

        if (result.success && result.user) {
          setAuth({
            loading: false,
            authenticated: true,
            user: result.user,
          });
        } else {
          setAuth({
            loading: false,
            authenticated: false,
            user: null,
          });
        }
      } catch (error) {
        console.error("❌ Auth verification failed:", error);
        setAuth({
          loading: false,
          authenticated: false,
          user: null,
        });
      }
    };

    fetchAuth();
  }, [authRefreshKey]); 


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/user/data`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const result = await response.json();
        // console.log("👤 User Data:", result);

        if (result.success && result.userData) {
          setCurrentUser({
            loading: false,
            authenticated: true,
            user: result.userData,
          });
        } else {
          setCurrentUser({
            loading: false,
            authenticated: false,
            user: null,
          });
        }
      } catch (error) {
        console.error("❌ User data fetch failed:", error);
        setCurrentUser({
          loading: false,
          authenticated: false,
          user: null,
        });
      }
    };

    if (!auth.loading && auth.authenticated) {
      fetchUserData();
    }
  }, [auth.loading, auth.authenticated]);

  // console.log("✅ Authenticated CurrentUser:", currentUser);

  // WishlistArray
  const [wishlistArray, setWishlistArray] = useState([]);

  const fetchWishlistArray = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/wishlist/get-user-wishlist`,
        {
          method: "GET",
          credentials: "include", // Required to send cookies
        }
      );
      const result = await response.json();
      // console.log("📦 Wishlist Data:", result);
      // ;
      if (result.success) {
        setWishlistArray(result.data);
      }
    } catch (error) {
      console.error("❌ Wishlist fetch failed:", error.message);
    }
  };

  useEffect(() => {
    fetchWishlistArray();
  }, []);

  const [wishlistLoading, setWishlistLoading] = useState(false);

  const addToWishlistArray = async (id) => {
    // const addToWishlistArray = (item) => {
    //   console.log(item);
    //   // console.log(wishlistArray)
    //   setWishlistArray((prevArray) => [...prevArray, item]);
    // };

    const productID = { productId: id };
    // console.log("Removing item with id:", productID);
    // setWishlistArray((prevArray) =>
    //   prevArray.filter((item) => item._id !== id)
    // );
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/wishlist/add-to-wishlist`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productID),
        }
      );
      const result = await response.json();
      // console.log("📦 Wishlist Data:", result);
      // ;
      if (result.success) {
        setWishlistArray(result.data);
      } else {
        console.log("❌ Error adding item to wishlist:", result.message);
      }
    } catch (error) {
      console.log("❌ Error adding item to wishlist:", error.message);
    }
  };

  const removeFromWishlistArray = async (id) => {
    setWishlistLoading(true);

    const productID = { productId: id };
    // console.log("Removing item with id:", productID);
    // setWishlistArray((prevArray) =>
    //   prevArray.filter((item) => item._id !== id)
    // );
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/wishlist/remove-from-wishlist`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productID),
        }
      );
      const result = await response.json();
      // console.log("📦 Wishlist Data:", result);
      // ;
      if (result.success) {
        setWishlistLoading(false);
        setWishlistArray(result.data);
      } else {
        setWishlistLoading(false);
        console.log("❌ Error removing item from wishlist:", result.message);
      }
    } catch (error) {
      setWishlistLoading(false);
      console.log("❌ Error removing item from wishlist:", error.message);
    }
  };

  // CartArray
  const [cartArray, setCartArray] = useState([]);

  const fetchCartArray = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/cart`,
        {
          method: "GET",
          credentials: "include", // Required to send cookies
        }
      );
      const result = await response.json();
      // console.log("📦 cart Data:", result);
      // ;
      if (result.success) {
        setCartArray(result.data.items);
      }
    } catch (error) {
      console.error("❌ Cart fetch failed:", error.message);
    }
  };

  useEffect(() => {
    fetchCartArray();
  }, []);

  // useEffect(() => {
  //   setCartArray((prevArray) =>
  //     prevArray.some((item) => !item.hasOwnProperty("quantity"))
  //       ? prevArray.map((item) => ({
  //           ...item,
  //           quantity: item.hasOwnProperty("quantity") ? item.quantity : 1,
  //         }))
  //       : prevArray
  //   );
  // }, [cartArray]);

  const addToCartArray = async (id) => {
    const productAndQuantity = { productId: id, quantity: 1 };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/cart/add-to-cart`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productAndQuantity),
        }
      );
      const result = await response.json();
      // ;
      if (result.success) {
        setCartArray(result.data.items);

        wishlistArray.forEach((item) => {
          item.product === id && removeFromWishlistArray(id);
        });
      } else {
        console.log("❌ Error adding item to cart:", result.message);
      }
    } catch (error) {
      console.log("❌ Error adding item to cart:", error.message);
    }
  };

  const removeFromCartArray = async (id) => {
    const productAndQuantity = { productId: id };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/cart/delete-cart-product`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productAndQuantity),
        }
      );
      const result = await response.json();
      // ;
      if (result.success) {
        setCartArray(result.data.items);
      } else {
        console.log("❌ Error adding item to cart:", result.message);
      }
    } catch (error) {
      console.log("❌ Error adding item to cart:", error.message);
    }
  };

  const increaseQuantity = async (id) => {
    const productAndQuantity = { productId: id, quantity: 1 };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/cart/add-to-cart`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productAndQuantity),
        }
      );
      const result = await response.json();
      // ;
      if (result.success) {
        setCartArray(result.data.items);
      } else {
        console.log("❌ Error adding item to cart:", result.message);
      }
    } catch (error) {
      console.log("❌ Error adding item to cart:", error.message);
    }
  };

  const decreaseQuantity = async (id) => {
    const productAndQuantity = { productId: id, quantity: 1 };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/cart/reduce-cart-product-quantity`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productAndQuantity),
        }
      );
      const result = await response.json();
      // ;
      if (result.success) {
        setCartArray(result.data.items);
      } else {
        // setCartArray(result.data.items);
        console.log("❌ Error adding item to cart:", result.message);
      }
    } catch (error) {
      console.log("❌ Error adding item to cart:", error.message);
    }
  };

  const moveWishlistToCart = async () => {
    const productIdsArray = wishlistArray.map((item) => item.product);

    console.log("Product IDs Array:", productIdsArray);

    const productArrayAndQuantity = {
      productIdsArray: productIdsArray,
      quantity: 1,
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/cart/add-multiple-to-cart`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productArrayAndQuantity),
        }
      );
      const result = await response.json();
      // ;
      if (result.success) {
        WishlistProductsToCart();
        setCartArray(result.data.items);
      } else {
        console.log("❌ Error adding products to cart:", result.message);
      }
    } catch (error) {
      console.log("❌ Error adding products to cart:", error.message);
    }
  };

  const WishlistProductsToCart = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/wishlist/delete-all-wishlist-products`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(),
        }
      );
      const result = await response.json();
      // console.log("📦 Wishlist Data:", result);
      // ;
      if (result.success) {
        setWishlistArray(result.data);
      } else {
        console.log(
          "❌ Error removing all items from wishlist:",
          result.message
        );
      }
    } catch (error) {
      console.log("❌ Error removing all items from wishlist:", error.message);
    }
  };
  const deleteAllCartProducts = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/cart/delete-all-cart-products`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(),
        }
      );
      const result = await response.json();
      // console.log("📦 Wishlist Data:", result);
      // ;
      if (result.success) {
        setCartArray([]);
      } else {
        console.log("❌ Error removing all items from cart:", result.message);
      }
    } catch (error) {
      console.log("❌ Error removing all items from cart:", error.message);
    }
  };

  //Alert Popup
  const openAlertPopup = (info, alertType) => {
    console.log("alert Open");
    setIsAlertPopupOpen({ alertState: true, message: info, type: alertType });
  };

  const closeAlertPopup = () => {
    setIsAlertPopupOpen({ alertState: false });
  };

  // console.log("Data:", data);
  // console.log("Wishlist Array:", wishlistArray);
  // console.log("cartArray: ", cartArray);

  return (
    <DataContext.Provider
      value={{
        data,
        wishlistLoading,
        wishlistArray,
        addToWishlistArray,
        moveWishlistToCart,
        removeFromWishlistArray,
        deleteAllCartProducts,
        // cartArray,
        addToCartArray,
        removeFromCartArray,
        WishlistProductsToCart,
        cartArray,
        decreaseQuantity,
        increaseQuantity,
        auth,
        setAuth,
        refetchAuth,
        currentUser,
        setCurrentUser,
        openAlertPopup,
        closeAlertPopup,
        setIsAlertPopupOpen,
        isAlertPopupOpen,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataProvider;
