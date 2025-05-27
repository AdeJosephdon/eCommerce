import { Link } from "react-router-dom";
import CartItems from "../components/CartItems";
// import ApiData from './ApiData';
import PageStructure from "../components/PageStructure";
import { useContext } from "react";
import { DataContext } from "../components/DataContext";

function Cart() {
  const { cartArray } = useContext(DataContext);

  // console.log("cartArray", cartArray);

  const cart = cartArray || [];

  const shipping = "free";

  const individualCartItems = cart.map((product) => (
    <CartItems
      key={product.product._id}
      id={product.product._id}
      description={product.product.description}
      image={product.product.image}
      price={product.product.price}
      count={product.product.count}
      title={product.product.title}
      section="wishlist"
      quantity={product.quantity}
    />
  ));

  const totalAmount = parseFloat(
    cart
      .reduce((acc, item) => acc + item.product.price * item.quantity, 0)
      .toFixed(2)
  );

  return (
    <PageStructure>
      <main className="cart-main-container">
        <div className="cart-route">
          <span>
            {" "}
            <Link to="/">Home /</Link>{" "}
          </span>
          Cart
        </div>

        {cart.length ? (
          <div class="cart-table-box">
            <div class="cart-table-row table-head">
              <div class="cart-table-cell">
                <p>Product</p>
              </div>
              <div class="cart-table-cell">
                <p>Price</p>
              </div>
              <div class="cart-table-cell">
                <p>Quantity</p>
              </div>
              <div class="cart-table-cell">
                <p>Subtotal</p>
              </div>
            </div>

            {individualCartItems}
          </div>
        ) : (
          <div className="no-items-in-container">
            {" "}
            <p>No item in cart</p>
          </div>
        )}

        <div className="cart-routing-buttons">
          <Link to="/">
            {" "}
            <button>Return To shop</button>
          </Link>
          <Link to="/cart">
            <button>Update Cart</button>{" "}
          </Link>
        </div>

        <div className="cart-coupons-subtotal">
          <form className="coupon-form">
            <input
              id="couponCode"
              type="text"
              name="couponCode"
              placeholder="Coupon Code"
              className="coupon-code-input"
              required
            />

            <button className="coupon-button">Apply Coupon</button>
          </form>

          <div className="cart-subtotal">
            <div className="cart-subtotal-text">Cart Total</div>
            <div className="billing-subtotal">
              <div className="billing-subtotal-text">Subtotal:</div>
              <p>
                <span>$</span> <span>{totalAmount}</span>{" "}
              </p>
            </div>

            <hr />

            <div className="billing-subtotal">
              <div className="billing-subtotal-text">Shipping:</div>
              <p> {shipping} </p>
            </div>

            <hr />

            <div className="billing-subtotal">
              <div className="billing-subtotal-text">Total:</div>
              <p>
                <span>$</span>{" "}
                <span>
                  {" "}
                  {shipping === "free" ? totalAmount : shipping + totalAmount}
                </span>{" "}
              </p>
            </div>

            <div className="proceed-to-cart-button-container">
              <Link to={"/billing"}>
                <button className="proceed-to-cart-button">
                  Process to checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </PageStructure>
  );
}

export default Cart;
