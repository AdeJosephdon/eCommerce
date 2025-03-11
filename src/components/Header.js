import { useMatch } from 'react-router-dom';
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useState, useContext } from "react";
import { DataContext } from "./DataContext";


function Header() {

  const matchHome = useMatch('/');
  const matchContact = useMatch('/contact');
  const matchAbout = useMatch('/about');
  const matchSignup = useMatch('/signup');

  const [accountClicked, setAccountClicked] = useState(false);
  const { data, wishlistArray, cartArray } = useContext(DataContext);
  
  function accountButtonClicked() {
    setAccountClicked(prevAccount => !prevAccount)
  }
  // console.log(data)
  const [query, setQuery] = useState('')

  const filteredArray = filterFunction(query, data) || [];

  
  function filterFunction(query, data) {
    if (!query) {
      return ""
    }
    return data.filter(item => item.title.includes(query))
  }

const buttonsDisplayed = filteredArray.length > 0 ? (
  filteredArray.map((product) => (
    <li key={product.id}>
      <Link to={`/itemdescription/${product.id}`}>
        <button className="search-bar-list-button" onClick={() => setQuery('')}>{product.title}</button>
      </Link>
    </li>
  ))
) : null; 
                
const accountClickedStyles = { backgroundColor: "red", borderRadius: "50%", width: "40px", height:"40px" }

  return (
    <header className="header">

        <h1>Exclusive</h1>

        <nav className="header-navigation">
                  <Link to="/"><div className={matchHome ? "linkUnderline" : ""}>Home</div></Link>  
                  <Link to="/contact" ><div className={matchContact ? "linkUnderline" : ""}>Contact</div></Link>  
                  <Link to="/about"><div className={matchAbout ? "linkUnderline" : ""}>About</div></Link>  
                  <Link to="/signup"><div className={matchSignup ? "linkUnderline" : ""}>Sign Up</div></Link>  
        </nav>

        <div className="header-buttons">
          <form>
            <div className="search-bar">
              <input 
                type="text" 
                placeholder="What are you looking for?" 
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="header-input"
              />
              <button type="submit">
                  <Icon icon="heroicons:magnifying-glass" width="24" height="24" />
              </button>
            </div>
          </form>

          {buttonsDisplayed ? <ul className="search-bar-list">
              {buttonsDisplayed}
            </ul> :
            ""
          }

          <button className="wishlist-button-number">
            <Link to="/wishlist" >
            {wishlistArray.length ? <p className="wishlist-number">{wishlistArray.length}</p> : ""}
            <Icon icon="mingcute:heart-line" width="24" height="24" />
            </Link>
                  
          </button>
          <button className="wishlist-button-number">
            <Link to="/cart">
            {cartArray.length ? <p className="wishlist-number">{cartArray.length}</p> : ""}

              <Icon icon="mdi:cart-outline" width="24" height="24" />
            </Link>
          </button>
          <button onClick={accountButtonClicked} style={accountClicked ? accountClickedStyles : null}>
                  <Icon icon="line-md:account" width="24" height="24" />
          </button>

      </div>


      {accountClicked && 
      <ul className="header-account-list">
        <li classname="account-list"><a href="/account" > <Icon icon="line-md:account" width="24" height="24" /> <span>Manage my Account</span></a></li>
        <li classname="account-list"><a href="/cart" > <Icon icon="icon-park-outline:mall-bag" width="24" height="24" /> <span>My Order</span></a></li>
        <li classname="account-list"><a href="/" > <Icon icon="material-symbols:cancel-outline-rounded" width="24" height="24" /> <span>My Cancellations</span></a></li>
        <li classname="account-list"><a href="/" > <Icon icon="mingcute:star-line" width="24" height="24" /> <span>My Reviews</span></a></li>
        <li classname="account-list"><a href="/signup" > <Icon icon="solar:logout-2-outline" width="24" height="24" /><span> Logout</span></a></li>
      </ul>
      }



    </header>
  );
}

export default Header;