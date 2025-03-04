import ApiData from './ApiData';
import BillingCartItem from './BillingCartItem';
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import PageStructure from './PageStructure';


function Billing() {

  function SignUp() {
    alert('You clicked me');
}

    console.log(ApiData);

const allBillingItems = ApiData.map((item) =>  
      <BillingCartItem key={item.id} image={item.image} price ={item.price} name={item.title}/>
    );

const pricesArray = ApiData.map((item) => item.price);



function sumPrices(arr) {
  if (arr.length === 0) {
    return 0; 
  }

  return arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}

const subtotal = sumPrices(pricesArray); 

console.log(subtotal);

  return (
    <PageStructure>
      <main className="billing-container">

        <div className="cart-route"><span> <Link to="/">Home /</Link> </span>Cart</div>

        <h1 className="billing-title">Billing Details</h1>

        <div className="billing-left-right">
        <form action={SignUp} className="billing-form">
              <label htmlFor="firstName">First Name <span className="required-star">*</span></label> 
              <input id="firstName" type="text" name="firstName" className="billing-input" required/>

              <label htmlFor="companyName">Company Name</label> 
              <input id="companyName" type="text" name="companyName" className="billing-input" />

              <label htmlFor="streetAddress">Street Address <span className="required-star">*</span></label> 
              <input id="streetAddress" type="text" name="streetAddress" className="billing-input" required/>

              <label htmlFor="apartment">Apartment, floor, etc. (optional)</label> 
              <input id="apartment" type="text" name="apartment" className="billing-input"/>

              <label htmlFor="town">Town/City <span className="required-star">*</span></label> 
              <input id="town" type="text" name="town" className="billing-input" required/>

              <label htmlFor="phone">Phone Number <span className="required-star">*</span></label> 
              <input id="phone" type="text" name="phone" className="billing-input" required/>

              <label htmlFor="email">Email Address <span className="required-star">*</span></label> 
              <input id="email" type="email" name="email" className="billing-input" required/>

              <div>Save this information for faster check-out next time</div>

        </form>


        <div className="items-bought">
            {allBillingItems}

        <div className="billing-subtotal">
            <div className="billing-subtotal-text">
              Subtotal:
            </div>
            <p><span>$</span> <span>{subtotal}</span> </p>
          </div>

          <hr />

          <div className="billing-subtotal">
            <div className="billing-subtotal-text">
              Shipping:
            </div>
            <p>Free </p>
          </div>

          <hr />

          <div className="billing-subtotal">
            <div className="billing-subtotal-text">
              Total:
            </div>
            <p><span>$</span> <span>{subtotal}</span> </p>
          </div>

          <form >
            <div> <span>Bank</span>
            <span >
              <Icon icon="arcticons:bkash" width="28" height="28" />
              <Icon icon="logos:visa" width="100" height="28" />
              <Icon icon="logos:mastercard" width="100" height="28" />
              <Icon icon="logos:visa" width="100" height="28" />
            </span>
            </div>

            <br />

            <div> <span>Cash on delivery</span> </div>
          </form>

          <form className="coupon-form">
            <input id="couponCode" type="text" name="couponCode"  placeholder="Coupon Code"  className="coupon-code-input" required/>

            <button className="coupon-button">Apply Coupon</button>
          </form>


          <button className="billing-button">Place Order</button>
        </div>
        </div>


      </main>

    </PageStructure>


  );
}

export default Billing;