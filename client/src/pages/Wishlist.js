// import { useState, useRef } from "react";
// import { Icon } from "@iconify/react";
import WishlistCard from '../components/WishlistCard';
// import ApiData from './ApiData';
import PageStructure from '../components/PageStructure';
import { useContext, useState } from "react";
import { DataContext } from "../components/DataContext";

function Wishlist() {

  const { data, wishlistArray, moveWishlistToCart } = useContext(DataContext);

  // const { data } = useContext(DataContext);


  const wishListContent = wishlistArray.map(product =>  
    <WishlistCard 
      key={product.id} 
      id={product.id} 
      description = {product.description}
      image = {product.image}
      price = {product.price}
      rating = {product.rating.rate}
      count = {product.rating.count}
      title = {product.title}
      productObject = {product}
      section = "wishlist"
/>)

  const [allItemsActive, setAllItemsActive] = useState(false)

  function viewAllExplore() {
    setAllItemsActive( (prev) => !prev)
  }

  const forYouItems = data.slice(0, 4).map(product =>  
    <WishlistCard 
      key={product.id} 
      id={product.id} 
      description = {product.description}
      image = {product.image}
      price = {product.price}
      rating = {product.rating.rate}
      count = {product.rating.count}
      title = {product.title}
      section = "forYou"
      productObject = {product}
/>)

  const allItems = data.map(product =>  
    <WishlistCard 
      key={product.id} 
      id={product.id} 
      description = {product.description}
      image = {product.image}
      price = {product.price}
      rating = {product.rating.rate}
      count = {product.rating.count}
      title = {product.title}
      section = "forYou"
      productObject = {product}
/>)



return (

<PageStructure>
    <main className="wishlist-main-container">
        <div className="wishlist-container">
          <div className="wishlist-text-container">
            <p className="today-block"></p><h2>Wishlist ({wishlistArray.length})</h2>
          </div>

          <div className="product-card-container"  >
              
              {
                wishlistArray.length  ? 
                wishListContent :
                <p className='no-items-in-container'> No item in wishlist</p>
              }
          </div>

          <div className="wishlist-button-container">
            <button onClick={moveWishlistToCart}>Move All To Bag</button>
          </div>
        </div>



        <div className="wishlist-container">
          <div className="wishlist-text-container">
            <p className="today-block"></p><h2 >Just for you</h2>
          </div>

          <div className="just-for-you-items-container">
              {allItemsActive ? allItems : forYouItems}
          </div>

          <div className="wishlist-button-container">
            <button onClick={() => viewAllExplore()}> {allItemsActive ? "Just For You" : "See All"}</button>
          </div>
        </div>
    </main>
</PageStructure>

  );
}

export default Wishlist;