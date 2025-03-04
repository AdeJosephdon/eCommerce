import { useState, useContext } from "react";
import { Icon } from "@iconify/react";
import { DataContext } from "./DataContext";
import AddToCart from "./AddToCart";
import { Link } from 'react-router-dom';


function ProductCard(prop) {

  const { wishlistArray, addToWishlistArray , removeFromWishlistArray } = useContext(DataContext);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const [productInWishlist, setProductInWishlist] = useState(wishlistArray.some((item) => item.id === prop.id));


  function buttonClicked() {
    if (productInWishlist) {
      removeFromWishlistArray(prop.id);
      setProductInWishlist((prevProduct) => !prevProduct);
    } else {
      addToWishlistArray(prop.productObject);
      setProductInWishlist((prevProduct) => !prevProduct);
  }
  }



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
              
            
            <Link to={`/itemdescription/${prop.id}`}><button><Icon icon="lets-icons:eye-light" width="24" height="24" /></button></Link>
        </div>

      <div className="product-image-container"> <img src={prop.image} alt={prop.title}/> 
      </div>

      {isHovered 
      && 
        <AddToCart productObject={prop.productObject}/>
      } 
      
      <div className="product-name">{prop.title}</div>
      <div><span className="discounted-price">$ {Math.round(prop.price * 0.8 * 100) / 100} </span> <span className="real-price"> $ {prop.price}</span></div>

      <div>{prop.rating}/5 <span>({prop.count})</span></div>      

    </div>
  );
}

export default ProductCard;