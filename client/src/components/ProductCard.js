import { memo, useState, useContext, useEffect } from "react";
import { Icon } from "@iconify/react";
import { DataContext } from "./DataContext";
import AddToCart from "./AddToCart";
import { Link } from "react-router-dom";
import RateProduct from "./RateProduct.js";

const ProductCard = memo(
  ({ id, productObject, price, count, title, image }) => {
    const {
      wishlistArray,
      addToWishlistArray,
      removeFromWishlistArray,
      currentUser,
    } = useContext(DataContext);

    // Importing rating

    // console.log("ProductID: ", id);

    const [rating, setRating] = useState(null);

    // I noticed the code fetched the data twice so I added the code bellow to correct it.
    // if (hasFetched.current) return;
    // hasFetched.current = true;
    // I noticed the code fetched the data twice so I added the code aboveto correct it.

    const fetchRating = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/rating/stats/${id}`
        );
        const data = await response.json();
        // console.log("Data: ", data);

        setRating(data.data.avgRating);
        // console.log("FetchData: ", data)
      } catch (error) {
        console.error("Error fetching rating:", error);
      }
    };

    useEffect(() => {
      fetchRating();
    }, []);

    const [isHovered, setIsHovered] = useState(false);

    const [isRatingHovered, setIsRatingHovered] = useState(false);

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    const handleRatingMouseEnter = () => {
      setIsRatingHovered(true);
    };

    const handleRatingMouseLeave = () => {
      setIsRatingHovered(false);
    };
    const handleCombinedMouseLeave = () => {
      handleMouseLeave();
      handleRatingMouseLeave();
    };

    const productInWishlist = wishlistArray.some((item) => item.product === id);

    // console.log(id, "Product in wishlist:", productInWishlist);

    function wishlistButtonClicked() {
      // console.log("Wishlist button clicked");

      if (productInWishlist) {
        removeFromWishlistArray(id);
      } else {
        addToWishlistArray(id);
      }
    }

    // Code for rating
    const maxRating = 5;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    // const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);

    const remainder = rating % fullStars;

    const displayPercent = {
      width: `${remainder.toFixed(1) * 100}%`,
    };

    const getStarColor = (starIndex) => {
      if (starIndex < fullStars) {
        return "gold";
      } else if (hasHalfStar && starIndex === fullStars) {
        return "gold";
      } else {
        return "lightgray";
      }
    };

    const renderStars = () => {
      const stars = [];
      for (let i = 0; i < maxRating; i++) {
        const color = getStarColor(i);
        if (hasHalfStar && i === fullStars) {
          stars.push(
            <span
              key={i}
              style={{
                color: color,
                position: "relative",
              }}
            >
              <span
                style={{
                  ...displayPercent,
                  position: "absolute",
                  overflow: "hidden",
                  color: "gold",
                }}
              >
                &#9733;
              </span>
              &#9734;
            </span>
          );
        } else {
          stars.push(
            <span key={i} style={{ color: color }}>
              &#9733;
            </span>
          );
        }
      }
      return stars;
    };

    return (
      <div
        className="productCard"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleCombinedMouseLeave}
      >
        <span className="discount">-40%</span>
        <div className="product-floating-buttons">
          <button onClick={() => wishlistButtonClicked()}>
            {productInWishlist ? (
              <Icon icon="flat-color-icons:like" width="24" height="24" />
            ) : (
              <Icon icon="solar:heart-linear" width="24" height="24" />
            )}
          </button>

          <Link to={`/itemdescription/${id}`}>
            <button>
              <Icon icon="lets-icons:eye-light" width="24" height="24" />
            </button>
          </Link>
        </div>

        <div className="product-image-container">
          {" "}
          <img src={image} alt={title} />
        </div>

        {isHovered && <AddToCart productId={id} />}

        <div className="product-name">
          <Link to={`/itemdescription/${id}`}>{title}</Link>
        </div>
        <div>
          <span className="discounted-price">
            $ {Math.round(price * 0.8 * 100) / 100}{" "}
          </span>{" "}
          <span className="real-price"> $ {price}</span>
        </div>

        <div onMouseEnter={handleRatingMouseEnter}>
          {" "}
          {renderStars()} ({rating}/5) <span>({count})</span>
        </div>

        {currentUser && isRatingHovered && <RateProduct id={id} />}
      </div>
    );
  }
);

export default ProductCard;
