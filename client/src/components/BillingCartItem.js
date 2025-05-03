
function BillingCartItem(prop) {


  return (
    <div className="billing-cart-item">
      <div className="cart-item-mini">
        <div className="cart-image-cover">
            <img src={prop.image} alt="pad" width="54px" height="54px"/>
        </div>
      <span>{prop.name}</span>
      </div>

      <p><span>$</span> <span>{prop.price}</span> </p>
    </div>
  );
}

export default BillingCartItem;