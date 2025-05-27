import { useContext } from "react";
import { DataContext } from "../components/DataContext";
import ProductCard from "../components/ProductCard";
// import ApiData from './ApiData';
import { Icon } from "@iconify/react";
import { Link, useParams } from "react-router-dom";
import PageStructure from "../components/PageStructure";

function ItemDescription() {
  const {
    data,
    addToWishlistArray,
    removeFromWishlistArray,
    wishlistArray,
    decreaseQuantity,
    addToCartArray,
    cartArray,
  } = useContext(DataContext);

  // console.log("Sata",data)

  const { productId } = useParams();

  const productInCart = cartArray.filter(
    (item) => item.product._id === productId
  );

  const productArrayIndex = cartArray.findIndex(
    (item) => item.product && item.product._id === productId
  );
  // const productid = parseInt(productId, 10);

  // console.log("Sata: ", productid);

  // const randomBestSeller = ApiData.sort(() => 0.5 - Math.random());

  // const itemDescribed = data.filter((prod) => prod._id === productId);

  const itemDescribed = data?.length
    ? data.filter((prod) => prod._id === productId)
    : [];

  const randomItem = itemDescribed[0];

  // console.log("randomItem", randomItem);

  // const randomItem = randomBestSeller[0]

  const similarItems = data?.length
    ? data.filter((item) => item.category === randomItem.category)
    : [];

  // console.log("similarItems: ", similarItems)

  const bestSellingItems = similarItems.slice(0, 4).map((product) => (
    <ProductCard
      key={product._id}
      productObject={product}
      id={product._id}
      description={product.description}
      image={product.image}
      price={product.price}
      count={product.count}
      title={product.title}
      category={product.category}
      // product = {product.}
    />
  ));

  // console.log("productId", productId);

  const productInWishlist = wishlistArray.some(
    (item) => item.product === productId
  );

  // console.log(id, "Product in wishlist:", productInWishlist);

  function wishlistButtonClicked() {
    // console.log("Wishlist button clicked");

    if (productInWishlist) {
      removeFromWishlistArray(productId);
    } else {
      addToWishlistArray(productId);
    }
  }

  // const [count, setCount] =

  return (
    <PageStructure>
      {data ? (
        <main className="actual-item-main-container">
          <div className="cart-route">
            <span>
              <Link to="/">Home / </Link> {randomItem.category} /
            </span>{" "}
            {randomItem.title}
          </div>

          <div className="item-properties">
            <div className="item-image-container">
              <img
                src={randomItem.image}
                alt={randomItem.description}
                width="170px"
                height="138px"
              />
              <img
                src={randomItem.image}
                alt={randomItem.description}
                width="170px"
                height="138px"
              />
              <img
                src={randomItem.image}
                alt={randomItem.description}
                width="170px"
                height="138px"
              />
              <img
                src={randomItem.image}
                alt={randomItem.description}
                width="170px"
                height="138px"
              />
              {/* <img src={randomItem.image} alt={randomItem.description} width='170px' height='138px'/> */}
              <img
                src={randomItem.image}
                alt={randomItem.description}
                width="500px"
                height="600px"
              />
            </div>

            <div className="item-description">
              <h2>{randomItem.title}</h2>
              <div className="item-in-stock-rating">
                rating (150 Reviews) |{" "}
                <span className="item-in-stock">In Stock</span>
              </div>
              <div className="item-in-stock-price">$ {randomItem.price}</div>
              <div className="item-in-stock-description">
                {randomItem.description}
              </div>

              <hr />

              <div className="colors-buttons">
                {" "}
                <span>Colours:</span> <button></button> <button></button>
              </div>

              <div className="sizes-buttons">
                {" "}
                <span>Size:</span>
                <button>XS</button>
                <button>S</button>
                <button>M</button>
                <button>L</button>
                <button>XL</button>
              </div>

              <div className="item-quantity-selected">
                <div className="item-quantity-change">
                  <button
                    onClick={() => decreaseQuantity(productId)}
                    disabled={
                      !productInCart ||
                      (productInCart &&
                        productArrayIndex !== -1 &&
                        cartArray[productArrayIndex].quantity === 1)
                    }
                  >
                    -
                  </button>
                  <span>
                    {productInCart && productArrayIndex !== -1
                      ? cartArray[productArrayIndex].quantity
                      : 0}
                  </span>
                  <button onClick={() => addToCartArray(productId)}>+</button>
                </div>

                <button
                  className="item-buy-now"
                  onClick={() => addToCartArray(productId)}
                >
                  Buy Now
                </button>

                <button
                  className="item-like-button"
                  onClick={() => wishlistButtonClicked()}
                >
                  {productInWishlist ? (
                    <Icon icon="flat-color-icons:like" width="24" height="24" />
                  ) : (
                    <Icon icon="solar:heart-linear" width="24" height="24" />
                  )}
                </button>
              </div>

              <div className="item-description-delivery-container">
                <div className="item-description-delivery">
                  <div>
                    <Icon icon="carbon:delivery" width="40" height="40" />
                  </div>
                  <div className="item-delivery-details">
                    <small>Free Delivery</small>
                    <small>
                      <Link to="/">
                        Enter Your postal code for Delivery Availability
                      </Link>
                    </small>
                  </div>
                </div>

                <div className="item-description-delivery">
                  <div>
                    <Icon icon="icon-park:return" width="40" height="40" />
                  </div>
                  <div className="item-delivery-details">
                    <small>Return Delivery</small>
                    <small>
                      {" "}
                      Free 30 Days Delivery Returns. <Link to="/">Details</Link>
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="today-text-container">
            <p className="today-block"></p>
            <h2>Related Item</h2>
          </div>
          <div className="actual-item-container">{bestSellingItems}</div>
        </main>
      ) : (
        <main>Loading...</main>
      )}
    </PageStructure>
  );
}

export default ItemDescription;
