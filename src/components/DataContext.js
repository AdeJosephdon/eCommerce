import React, { useRef, createContext, useState, useEffect } from "react";

export const DataContext = createContext();

function DataProvider({ children }) {

    const hasFetched = useRef(false); //To initialize that the data has not been fetched

    const [data, setData] = useState(null);

    useEffect(() => {
      // I noticed the code fetched the data twice so I added the code bellow to correct it.
        if (hasFetched.current) return; 
        hasFetched.current = true; 
      // I noticed the code fetched the data twice so I added the code aboveto correct it.


    const fetchData = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setData(data);
        // console.log("FetchData: ", data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 


  // WishlistArray 
    const [wishlistArray, setWishlistArray] = useState([]);
    const addToWishlistArray = (item) => {
        console.log(item)
        // console.log(wishlistArray)
        setWishlistArray((prevArray) => [...prevArray, item]);
    };
    const removeFromWishlistArray = (id) => {
        console.log("Removing item with id:", id);
        setWishlistArray((prevArray) => prevArray.filter((item) => item.id !== id));
    };
  // CartArray 
    const [cartArray, setCartArray] = useState([]);

        useEffect(() => {
            setCartArray((prevArray) =>
                prevArray.some((item) => !item.hasOwnProperty("quantity"))
                    ? prevArray.map((item) => ({
                          ...item,
                          quantity: item.hasOwnProperty("quantity") ? item.quantity : 1,
                      }))
                    : prevArray 
            );
        }, [cartArray]);


    const addToCartArray = (item) => {
      console.log(cartArray)
        if (!cartArray.some((cartItem) => cartItem.id === item.id)) {
        setCartArray((prevArray) => [...prevArray, item]);
        }};
    const removeFromCartArray = (id) => {
        console.log("Removing item with id:", id);
        setCartArray((prevArray) => prevArray.filter((item) => item.id !== id));
    };


        function increaseQuantity(id) {
            setCartArray((prevArray) =>
                prevArray.map((item) =>
                    item.id === id ? { ...item, quantity: item.quantity + 1 } : item
                )
            );
        }

        function decreaseQuantity(id) {
            setCartArray((prevArray) =>
                prevArray.map((item) =>
                    item.id === id && item.quantity > 1
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
            );
        }

    function moveWishlistToCart() {
      setCartArray((prevArray) => [...prevArray, ...wishlistArray]);
      setWishlistArray([]);
    };

  return (
    <DataContext.Provider
            value={{
                data,
                wishlistArray,
                addToWishlistArray,
                removeFromWishlistArray,
                // cartArray,
                addToCartArray,
                removeFromCartArray,
                moveWishlistToCart,
                cartArray,
                decreaseQuantity,
                increaseQuantity
            }}
        >
            {children}
        </DataContext.Provider>

  );
}

export default DataProvider;