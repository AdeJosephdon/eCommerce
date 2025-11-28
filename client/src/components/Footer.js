import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";



function Footer() {
  return (
    <footer className="footer">
      <div className="footer-item">
        <h1>Exclusive</h1>
        <Link href="/signup">Subscribe</Link>
        <p>Get 10% off your first order</p>
          <form >
            <div className="bottom-search-bar">
              <input 
                type="text" 
                placeholder="Enter your email" 
                className="footer-input"
              />
              <button type="submit" aria-label="send email for subscribe">
                  <Icon icon="material-symbols-light:send-outline" width="32" height="32" />
              </button>
            </div>
          </form>
      </div>
      
      <div className = "footer-item">
        <h2>Support</h2>
        <p>111 Bijoy sarani, Dhaka,  DH 1515, Bangladesh.</p>
        <a href="/" type="email">exclusive@gmail.com</a>
        <p>+88015-88888-9999</p>
      </div>

      <div className = "footer-item">
        <h2>Account</h2>
        <nav>
          <ul>
            <li><Link href="/account">My Account</Link></li>
            <li><Link href="/signup">Login / Register</Link></li>
            <li><Link href="/cart">Cart</Link></li>
            <li><Link href="/wishlist">Wishlist</Link></li>
            <li><Link href="/">Shop</Link></li>
          </ul>
        </nav>
      </div>

      <div className = "footer-item">
        <h2>Quick link</h2>
        <nav>
          <ul>
            <li><Link href="/">Privacy Policy</Link></li>
            <li><Link href="/">Terms Of Use</Link></li>
            <li><Link href="/">FAQ</Link></li>
            <li><a href="/contact">contact</a></li>
          </ul>
        </nav>
      </div>

      <div className = "footer-item">
        <h2>Download App</h2>
        <small>Save $3 with App New User Only</small>

        <img src="/Frame 719.webp" alt="Get Application"/>

        <div className="socials-icons">
          <a href="www.facebook.com">  
          <Icon icon="la:facebook-f" width="30" height="30" />
          </a>
          <a href="www.twitter.com">  
          <Icon icon="ri:twitter-line" width="30" height="30" />
          </a>
          <a href="www.twitter.com" >  
          <Icon icon="uil:instagram" width="30" height="30" />
          </a>
          <a href="www.linkedin.com">  
          <Icon icon="dashicons:linkedin" width="30" height="30" />
          </a>

        </div>
      </div>

    </footer>
  );
}

export default Footer;