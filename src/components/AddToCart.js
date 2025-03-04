import { useContext, useState } from "react";
import { DataContext } from "./DataContext";


function AddToCart(prop) {

  const { cartArray, addToCartArray, removeFromCartArray } = useContext(DataContext);

  const [productInCart, setProductInCart] = useState(cartArray.some((item) => item.id === prop.productObject.id));


  function buttonClicked() {
    if (productInCart) {
      removeFromCartArray(prop.productObject.id);
      setProductInCart((prevProduct) => !prevProduct);
    } else {
      addToCartArray(prop.productObject);
      setProductInCart((prevProduct) => !prevProduct);
    }
  }


  return (
    <button className="add-to-cart" onClick={() => {buttonClicked()}}>
          {productInCart ? <span className="remove-from-cart">Remove From Cart</span> : "Add To Cart" }
    </button>
  );
}

export default AddToCart;