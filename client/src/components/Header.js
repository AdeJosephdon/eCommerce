import { useMatch } from "react-router-dom";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "./DataContext.js";

function Header() {
  const navigateHome = useNavigate();

  const matchHome = useMatch("/home");
  const matchContact = useMatch("/contact");
  const matchAbout = useMatch("/about");
  const matchSignup = useMatch("/signup");

  const [navOpen, setNavOPen] = useState(false);
  const [accountClicked, setAccountClicked] = useState(false);
  const {
    data,
    wishlistArray,
    cartArray,
    setAuth,
    currentUser,
    setCurrentUser,
  } = useContext(DataContext);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  function accountButtonClicked() {
    setAccountClicked((prevAccount) => !prevAccount);
  }
  // console.log(currentUser );
  const [query, setQuery] = useState("");

  const filteredArray = filterFunction(query, data) || [];

  function filterFunction(query, data) {
    if (!query) {
      return "";
    }
    return data.filter((item) => item.title.includes(query));
  }

  const buttonsDisplayed =
    filteredArray.length > 0
      ? filteredArray.map((product) => (
          <li key={product.id}>
            <Link to={`/itemdescription/${product._id}`}>
              <button
                className="search-bar-list-button"
                onClick={() => setQuery("")}
              >
                {product.title}
              </button>
            </Link>
          </li>
        ))
      : null;

  const accountClickedStyles = {
    backgroundColor: "black",
    color: "white",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    handleResize();

    if (windowWidth > 767) {
      setNavOPen(true);
    } else {
      setNavOPen(false);
    }

    return () => window.removeEventListener("resize", handleResize);
  }, [windowWidth]);

  const logout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();
      console.log("authSata:", data);

      if (data.success) {
        setAuth({
          loading: true,
          authenticated: false,
          user: null,
        });

        console.log("✅ Logged out:", data);

        setCurrentUser(null);

        setAccountClicked((prevAccount) => !prevAccount);

        navigateHome("/");
        // console.log("✅ Authenticated Auth:", auth);
      } else {
        console.log("🚫 Not logged out");
      }
    } catch (error) {
      console.error("❌ Log out failed:", error);
    }
  };

  return (
    <header className="header">
      <h1>Exclusive</h1>

      {navOpen ? (
        ""
      ) : (
        <button onClick={() => setNavOPen((prevNav) => !prevNav)}>
          {" "}
          <Icon icon="radix-icons:dropdown-menu" width="50" height="50" />
        </button>
      )}

      {navOpen ? (
        <div className="header-div">
          {windowWidth < 769 ? (
            <button onClick={() => setNavOPen((prevNav) => !prevNav)}>
              {" "}
              <Icon icon="mdi:close-outline" width="24" height="24" />
            </button>
          ) : (
            ""
          )}
          <nav className="header-navigation">
            <Link to="/home">
              <div className={matchHome ? "linkUnderline" : ""}>Home</div>
            </Link>
            <Link to="/contact">
              <div className={matchContact ? "linkUnderline" : ""}>Contact</div>
            </Link>
            <Link to="/about">
              <div className={matchAbout ? "linkUnderline" : ""}>About</div>
            </Link>
            <Link to="/signup">
              <div className={matchSignup ? "linkUnderline" : ""}>Sign Up</div>
            </Link>
          </nav>

          <div className="header-buttons">
            <form>
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="header-input"
                />
                <button type="submit">
                  <Icon
                    icon="heroicons:magnifying-glass"
                    width="24"
                    height="24"
                  />
                </button>
              </div>
            </form>

            {buttonsDisplayed ? (
              <ul className="search-bar-list">{buttonsDisplayed}</ul>
            ) : (
              ""
            )}

            <button className="wishlist-button-number">
              <Link to="/wishlist">
                {wishlistArray.length ? (
                  <p className="wishlist-number">{wishlistArray.length}</p>
                ) : (
                  ""
                )}
                <Icon icon="mingcute:heart-line" width="24" height="24" />
              </Link>
            </button>
            <button className="wishlist-button-number">
              <Link to="/cart">
                {cartArray.length ? (
                  <p className="wishlist-number">{cartArray.length}</p>
                ) : (
                  ""
                )}

                <Icon icon="mdi:cart-outline" width="24" height="24" />
              </Link>
            </button>
            <button
              onClick={accountButtonClicked}
              style={accountClicked ? accountClickedStyles : null}
            >
              {currentUser && currentUser.user && currentUser.user.name ? (
                <span
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    fontSize: "16px",
                    width: "24px",
                    height: "24px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "50%",
                  }}
                >
                  {currentUser.user.name.charAt(0).toUpperCase()}
                </span>
              ) : (
                <Icon icon="line-md:account" width="24" height="24" />
              )}
            </button>
          </div>

          {accountClicked && (
            <ul className="header-account-list">
              <li classname="account-list">
                <a href="/account">
                  {" "}
                  <Icon icon="line-md:account" width="24" height="24" />{" "}
                  <span>Manage my Account</span>
                </a>
              </li>
              <li classname="account-list">
                <a href="/cart">
                  {" "}
                  <Icon
                    icon="icon-park-outline:mall-bag"
                    width="24"
                    height="24"
                  />{" "}
                  <span>My Order</span>
                </a>
              </li>
              <li classname="account-list">
                <a href="/">
                  {" "}
                  <Icon
                    icon="material-symbols:cancel-outline-rounded"
                    width="24"
                    height="24"
                  />{" "}
                  <span>My Cancellations</span>
                </a>
              </li>
              <li classname="account-list">
                <a href="/">
                  {" "}
                  <Icon icon="mingcute:star-line" width="24" height="24" />{" "}
                  <span>My Reviews</span>
                </a>
              </li>
              <li
                classname="account-list"
                style={{ cursor: "pointer" }}
                onClick={() => logout()}
              >
                <a>
                  {" "}
                  <Icon icon="solar:logout-2-outline" width="24" height="24" />
                  <span> Logout</span>
                </a>
              </li>
            </ul>
          )}
        </div>
      ) : (
        ""
      )}
    </header>
  );
}

export default Header;
