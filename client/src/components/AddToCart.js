import { useContext } from "react";
import { DataContext } from "./DataContext";

function AddToCart({ productId }) {
  const { cartArray, addToCartArray, removeFromCartArray } =
    useContext(DataContext);

  const productInCart = cartArray.some(
    (item) => item.product._id === productId
  );

  function handleButtonClick() {
    if (productInCart) {
      removeFromCartArray(productId);
    } else {
      addToCartArray(productId);
    }
  }

  return (
    <button className="add-to-cart" onClick={handleButtonClick}>
      {productInCart ? (
        <span className="remove-from-cart">Remove From Cart</span>
      ) : (
        "Add To Cart"
      )}
    </button>
  );
}

export default AddToCart;
