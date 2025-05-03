// import { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useContext } from "react";
import { DataContext } from "./DataContext";
import AddToCart from "./AddToCart";


function WishlistCard(prop) {

    const { removeFromWishlistArray } = useContext(DataContext);

  // Code for rating 
  const maxRating = 5;
  const fullStars = Math.floor(prop.rating);
  const hasHalfStar = prop.rating % 1 !== 0;
  // const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);

  const remainder = prop.rating % fullStars

const displayPercent = {
  width: `${(remainder.toFixed(1) * 100)}%`,
};

  

  const getStarColor = (starIndex) => {
    if (starIndex < fullStars) {
      return 'gold'; 
    } else if (hasHalfStar && starIndex === fullStars) {
      return 'gold'; 
    } else {
      return 'lightgray';
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < maxRating; i++) {
      const color = getStarColor(i);
      if (hasHalfStar && i === fullStars){
        stars.push(
          <span key={i} style={{ color: color, position:'relative'}}>
            <span
              style={{
                ...displayPercent, // Spread the displayPercent object
                position: 'absolute',
                overflow: 'hidden',
                color: 'gold',
              }}
            >
              &#9733;
            </span>

            &#9734;
          </span>

        )
      } else {
        stars.push(<span key={i} style={{ color: color }}>&#9733;</span>);
      }

    }
    return stars;
  };

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
      
      <div className="product-name"><Link to={`/itemdescription/${prop.id}`}>{prop.title}</Link></div>
      <div><span className="discounted-price">$ {Math.round(prop.price * 0.8 * 100) / 100} </span> <span className="real-price"> $ {prop.price}</span></div>

      <div> {renderStars()} ({prop.rating}/5) <span>({prop.count})</span></div>     

    </div>
  );
}

export default WishlistCard;