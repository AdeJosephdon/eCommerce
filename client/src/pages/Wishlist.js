// import { useState, useRef } from "react";
// import { Icon } from "@iconify/react";
import WishlistCard from "../components/WishlistCard";
// import ApiData from './ApiData';
import PageStructure from "../components/PageStructure";
import { useContext, useState } from "react";
import { DataContext } from "../components/DataContext";

function Wishlist() {
  const { data, wishlistArray, moveWishlistToCart } = useContext(DataContext);

  const allData = data || [];

  // const { data } = useContext(DataContext);

  const wishList = allData.filter((product) =>
    wishlistArray.some((item) => item.product === product._id)
  );

  // console.log("wishlistArray: ", wishList);

  const wishListContent = wishList.map((productObject) => (
    <WishlistCard
      key={productObject._id}
      id={productObject._id}
      description={productObject.description}
      image={productObject.image}
      price={productObject.price}
      count={productObject.count}
      title={productObject.title}
      productObject={productObject}
      section="wishlist"
    />
  ));

  const [allItemsActive, setAllItemsActive] = useState(false);

  function viewAllExplore() {
    setAllItemsActive((prev) => !prev);
  }

  const forYouItems = allData
    .slice(0, 4)
    .map((product) => (
      <WishlistCard
        key={product._id}
        id={product._id}
        description={product.description}
        image={product.image}
        price={product.price}
        count={product.count}
        title={product.title}
        section="forYou"
        productObject={product}
      />
    ));

  const allItems = allData.map((product) => (
    <WishlistCard
      key={product._id}
      id={product._id}
      description={product.description}
      image={product.image}
      price={product.price}
      count={product.count}
      title={product.title}
      section="forYou"
      productObject={product}
    />
  ));

  // console.log("wishList: ", wishList);

  return (
    <PageStructure>
      <main className="wishlist-main-container">
        <div className="wishlist-container">
          <div className="wishlist-text-container">
            <p className="today-block"></p>
            <h2>Wishlist ({wishList.length})</h2>
          </div>

          <div className="product-card-container">
            {wishList.length ? (
              wishListContent
            ) : (
              <p className="no-items-in-container"> No item in wishlist</p>
            )}
          </div>

          <div className="wishlist-button-container">
            <button onClick={moveWishlistToCart}>Move All To Bag</button>
          </div>
        </div>

        <div className="wishlist-container">
          <div className="wishlist-text-container">
            <p className="today-block"></p>
            <h2>Just for you</h2>
          </div>

          <div className="just-for-you-items-container">
            {allItemsActive ? allItems : forYouItems}
          </div>

          <div className="wishlist-button-container">
            <button onClick={() => viewAllExplore()}>
              {" "}
              {allItemsActive ? "Just For You" : "See All"}
            </button>
          </div>
        </div>
      </main>
    </PageStructure>
  );
}

export default Wishlist;
