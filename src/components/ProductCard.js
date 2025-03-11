import { memo, useState, useContext } from "react";
import { Icon } from "@iconify/react";
import { DataContext } from "./DataContext";
import AddToCart from "./AddToCart";
import { Link } from 'react-router-dom';


const ProductCard = memo(({ id, productObject, price, rating, count, title, image}) =>  {

  const { wishlistArray, addToWishlistArray , removeFromWishlistArray } = useContext(DataContext);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const productInWishlist = wishlistArray.some((item) => item.id === id);


  function buttonClicked() {
    console.log("Wishlist button clicked")

    if (productInWishlist) {
      removeFromWishlistArray(id);
    } else {
      addToWishlistArray(productObject);
  }
  }

  // Code for rating 
  const maxRating = 5;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  // const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);

  const remainder = rating % fullStars

const displayPercent = {
  width: `${(remainder.toFixed(1) * 100)}%`,
};

  

  const getStarColor = (starIndex) => {
    if (starIndex < fullStars) {
      return 'gold'; 
    } else if (hasHalfStar && starIndex === fullStars) {
      return 'lightgray'; 
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
                ...displayPercent, 
                position: 'absolute',
                overflow: 'hidden',
                color: 'gold',
              }}
            >
              &#9733;
            </span>

            &#9733;
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
    className="productCard"
    onMouseEnter={handleMouseEnter} 
    onMouseLeave={handleMouseLeave}
    >
        <span className="discount">-40%</span>
        <div className="product-floating-buttons">

          
              <button onClick={() => buttonClicked()}>
                {productInWishlist ? <Icon icon="flat-color-icons:like" width="24" height="24" /> :
                <Icon icon="solar:heart-linear" width="24" height="24" />}

              </button> 
              
            
            <Link to={`/itemdescription/${id}`}><button><Icon icon="lets-icons:eye-light" width="24" height="24" /></button></Link>
        </div>

      <div className="product-image-container"> <img src={image} alt={title}/> 
      </div>

      {isHovered 
      && 
        <AddToCart productObject={productObject}/>
      } 
      
      <div className="product-name"><Link to={`/itemdescription/${id}`}>{title}</Link></div>
      <div><span className="discounted-price">$ {Math.round(price * 0.8 * 100) / 100} </span> <span className="real-price"> $ {price}</span></div>

      <div> {renderStars()} ({rating}/5) <span>({count})</span></div>      
     

    </div>
  );
})

export default ProductCard;