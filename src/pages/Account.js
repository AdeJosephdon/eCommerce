import { Link } from "react-router-dom";
import PageStructure from "../components/PageStructure";



function Account() {


  return (
      <PageStructure>
              <main className="account-container">
        <div className="account-top">
        <div className="cart-route"><span> <Link to="/">Home /</Link> </span>My Account</div>
        <div className="name-welcome"> Welcome! <span>Josephdon</span></div>
        </div>



        <div className="account-left-right">

        <div className="account-links">
        <div>Manage My Account</div>
        <ul>
          <li>My Profile</li>
          <li>Address Book</li>
          <li>My Payment Options</li>
        </ul>
        <div>My Orders</div>
        <ul>
          <li>My Returns</li>
          <li>My Cancellations</li>
        </ul>
        <div>My WishList</div>
        </div>

        <form 
        // action={} 
        className="account-form"
        >
          <div className="edit-profile-text">Edit Your Profile</div>

            <div className="edit-profile-form">
              <p>
                <label for="firstName">First Name <span class="required-star">*</span></label>
                <input id="firstName" type="text" name="firstName" class="account-input" placeholder="First Name" required />
              </p>

              <p>
                <label for="lastName">Last Name</label>
                <input id="lastName" type="text" name="lastName" class="account-input" placeholder="Last Name" />
              </p>

              <p>
                <label for="email">Email <span class="required-star">*</span></label>
                <input id="email" type="email" name="email" class="account-input" placeholder="YourEmail@gmail.com" required />
              </p>

              <p>
                <label for="address">Address</label>
                <input id="address" type="text" name="address" class="account-input" placeholder="Kingston, 5236, United State" />
              </p>
            </div>

            <div className="password-inputs">
              <label htmlFor="town">Password Changes <span className="required-star">*</span></label> 
              <input id="town" type="text" name="town" className="account-input" placeholder="Current Password" required/>

              <input id="phone" type="text" name="phone" className="account-input" placeholder="New Password" required/>

              <input id="email" type="email" name="email" className="account-input" placeholder="Confirm New Password" required/>
            </div>

            <div className="account-buttons">
              <button>Cancel</button>
              <button className="save-changes">Save Changes</button>

            </div>



        </form>

        
        </div>


      </main>
      </PageStructure>

  );
}

export default Account;