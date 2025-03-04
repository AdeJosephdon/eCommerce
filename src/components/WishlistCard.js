// import { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useContext } from "react";
import { DataContext } from "./DataContext";
import AddToCart from "./AddToCart";


function WishlistCard(prop) {

    const { removeFromWishlistArray } = useContext(DataContext);

    // console.log(prop.id)

  return (
    <div 
    className="wishlistCard"
    >
        <span className="discount">-40%</span>
        <div className="product-floating-buttons">

         { prop.section === "wishlist" ? <button onClick={() => removeFromWishlistArray(prop.productObject.id)}><Icon icon="fluent-mdl2:delete" width="24" height="24" /></button> :
            <Link to={`/itemdescription/${prop.id}`}><button><Icon icon="lets-icons:eye-light" width="24" height="24" /></button></Link>}
        </div>

      <div className="product-image-container"> <img src={prop.image} alt={prop.title}/> 
      </div>

 
      <AddToCart productObject={prop.productObject}/>
      
      <div className="product-name">{prop.title}</div>
      <div><span className="discounted-price">$ {Math.round(prop.price * 0.8 * 100) / 100} </span> <span className="real-price"> $ {prop.price}</span></div>

      <div>{prop.rating}/5 <span>({prop.count})</span></div>      

    </div>
  );
}

export default WishlistCard;