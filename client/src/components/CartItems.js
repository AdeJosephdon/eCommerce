import { useState, useContext } from "react";
import { DataContext } from "./DataContext";
import { Icon } from "@iconify/react/dist/iconify.js";

function Cart(prop) {
  const { removeFromCartArray, decreaseQuantity, increaseQuantity } =
    useContext(DataContext);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // console.log(prop.quantity)

  const productPrice = parseFloat((prop.quantity * prop.price).toFixed(2));

  return (
    <div
      class="cart-table-row"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div class="cart-table-cell">
        <p class="cart-table-cell-title">
          <div>
            {isHovered && (
              <button
                className="remove-cart-item"
                onClick={() => removeFromCartArray(prop.id)}
              >
                x
              </button>
            )}

            <img
              src={prop.image}
              alt={prop.description}
              width="54px"
              height="54px"
            />
          </div>{" "}
          <div> {prop.title} </div>
        </p>
      </div>
      <div class="cart-table-cell">
        <p>$ {prop.price}</p>
      </div>
      <div class="cart-table-cell">
        <p class="cart-quantity">
          <p>{prop.quantity}</p>
          <div className="cart-quantity-change-buttons">
            <button onClick={() => increaseQuantity(prop.id)}>
              <Icon icon="lsicon:up-outline" width="16" height="16" />
            </button>
            <button onClick={() => decreaseQuantity(prop.id)}>
              <Icon icon="lsicon:down-outline" width="16" height="16" />
            </button>
          </div>
        </p>
      </div>
      <div class="cart-table-cell">
        <p>$ {productPrice}</p>
      </div>
    </div>
  );
}

export default Cart;
