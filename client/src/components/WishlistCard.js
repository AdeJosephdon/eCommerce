import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useContext } from "react";
import { DataContext } from "./DataContext.js";
import AddToCart from "./AddToCart.js";
import RateProduct from "./RateProduct.js";
function WishlistCard(prop) {
  const { removeFromWishlistArray, wishlistLoading, currentUser } =
    useContext(DataContext);

  // console.log("id:", prop.id);
  // console.log("wishlistcard rendered");

  const [rating, setRating] = useState(null);

  useEffect(() => {
    // I noticed the code fetched the data twice so I added the code bellow to correct it.
    // if (hasFetched.current) return;
    // hasFetched.current = true;
    // I noticed the code fetched the data twice so I added the code aboveto correct it.

    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/rating/stats/${prop.id}`
        );
        const data = await response.json();
        // console.log("Data: ", data);

        setRating(data.data.avgRating);
        // console.log("FetchData: ", data)
      } catch (error) {
        console.error("Error fetching rating:", error);
      }
    };

    fetchData();
  }, []);

  const [isRatingHovered, setIsRatingHovered] = useState(false);

  const handleRatingMouseEnter = () => {
    setIsRatingHovered(true);
  };

  const handleRatingMouseLeave = () => {
    setIsRatingHovered(false);
  };

  const rate = rating ? rating : 0;
  // Code for rating
  const maxRating = 5;
  const fullStars = Math.floor(rate);
  const hasHalfStar = rate % 1 !== 0;
  // const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);

  const remainder = rate % fullStars;

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
          <span key={i} style={{ color: color, position: "relative" }}>
            <span
              style={{
                ...displayPercent, // Spread the displayPercent object
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
    <div className="wishlistCard" onMouseLeave={handleRatingMouseLeave}>
      <span className="discount">-40%</span>
      <div className="product-floating-buttons">
        {prop.section === "wishlist" ? (
          <button
            onClick={() => removeFromWishlistArray(prop.id)}
            disabled={wishlistLoading}
          >
            <Icon icon="fluent-mdl2:delete" width="24" height="24" />
          </button>
        ) : (
          <Link to={`/itemdescription/${prop.id}`}>
            <button>
              <Icon icon="lets-icons:eye-light" width="24" height="24" />
            </button>
          </Link>
        )}
      </div>

      <div className="product-image-container">
        {" "}
        <img src={prop.image} alt={prop.title} />
      </div>

      <AddToCart productId={prop.id} />

      <div className="product-name">
        <Link to={`/itemdescription/${prop.id}`}>{prop.title}</Link>
      </div>
      <div>
        <span className="discounted-price">
          $ {Math.round(prop.price * 0.8 * 100) / 100}{" "}
        </span>{" "}
        <span className="real-price"> $ {prop.price}</span>
      </div>

      <div onMouseEnter={handleRatingMouseEnter}>
        {" "}
        {renderStars()} ({rate}/5) <span>({prop.count})</span>
      </div>

      {currentUser && isRatingHovered && <RateProduct id={prop.id} />}
    </div>
  );
}

export default WishlistCard;
