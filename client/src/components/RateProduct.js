import { useContext, useState } from "react";
import { DataContext } from "./DataContext.js";
import AlertPopup from "./../components/AlertPopup.js";

function RateProduct(prop) {
  const maxStars = 5;

  const { isAlertPopupOpen, closeAlertPopup, openAlertPopup } =
    useContext(DataContext);

  const [rating, setRating] = useState(null);
  const [review, setReview] = useState("");

  const handleRatingChange = (newRating) => {
    if (!rating) {
      setRating(newRating);
      console.log("Rating:", newRating);
    } else {
      setRating(null);
      console.log("Rating removed");
    }
  };

  const submitRatings = async (e) => {
    e.preventDefault();

    const ratingObject = {
      productId: prop.id,
      rating: rating,
      comment: review,
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/rating/rate`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(ratingObject),
        }
      );

      const data = await response.json();

      if (data.success) {
        console.log("Rating submitted successfully:", data);
        openAlertPopup("Rating submitted successfully", "success");
      }
      // console.log("Server response:", data);
    } catch (error) {
      openAlertPopup(error.message, "failure");
      console.error("Error rating product:", error);
    }
  };

  return (
    <div className="rate-product">
      {Array.from({ length: maxStars }, (_, i) => i + 1).map((numStars) => (
        <button
          key={numStars}
          className="rate-product-button"
          onClick={() => handleRatingChange(numStars)}
          style={{ background: rating === numStars ? "green" : "" }}
        >
          <span>
            {numStars} star{numStars !== 1 ? "s" : ""}
          </span>
          {Array.from({ length: numStars }, (_, starIndex) => (
            <span
              key={starIndex}
              style={{
                color: "gold",
              }}
            >
              &#9733;
            </span>
          ))}
        </button>
      ))}

      <form onSubmit={submitRatings}>
        <label htmlFor="review">Write a review:</label>
        <textarea
          id="review"
          name="review"
          rows="4"
          cols="50"
          onChange={(e) => setReview(e.target.value)}
          value={review}
          placeholder="Write your review here..."
        ></textarea>

        <button type="submit" className="submit-review-button">
          Submit Review
        </button>
      </form>

      <AlertPopup
        isOpen={isAlertPopupOpen.alertState}
        onClose={closeAlertPopup}
        type={isAlertPopupOpen.type}
      >
        <div>{isAlertPopupOpen.message}</div>
      </AlertPopup>
    </div>
  );
}

export default RateProduct;
