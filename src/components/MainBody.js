import { useState, useRef } from "react";
import HeroSection from "./HeroSection";
import Timer from './Timer';
import ProductCard from './ProductCard'
import Category from './Category';
import { Icon } from "@iconify/react";
import AiChatbot from "./AiChatbot";


function MainBody(prop) {


    const productArray = prop.data


    const productArrayItems = productArray.map(product =>  
      <ProductCard 
      key={product.id} 
      productObject = {product}
      id={product.id} 
      description = {product.description}
      image = {product.image}
      price = {product.price}
      rating = {product.rating.rate}
      count = {product.rating.count}
      title = {product.title}
/>
    )

    // Code for scrolling left and right of flex container
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef(null);

  const handleScrollLeft = () => {
    if (containerRef.current) {
      const newPosition = Math.max(scrollPosition - 100, 0); // Prevent scrolling beyond the left edge
      setScrollPosition(newPosition);
      containerRef.current.scrollLeft = newPosition;
    }
  };

  const handleScrollRight = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.scrollWidth;
      const maxScroll = containerWidth - containerRef.current.clientWidth;
      const newPosition = Math.min(scrollPosition + 100, maxScroll); 
      setScrollPosition(newPosition);
      containerRef.current.scrollLeft = newPosition;
    }
  };


    // Code for generating four random products as Best Selling

    const randomBestSeller = productArray.sort(() => 0.5 - Math.random());

  const bestSellingItems = randomBestSeller.slice(0, 4).map(product =>  
    <ProductCard 
      key={product.id} 
      productObject = {product}
      id={product.id} 
      description = {product.description}
      image = {product.image}
      price = {product.price}
      rating = {product.rating.rate}
      count = {product.rating.count}
      title = {product.title}
      category = {product.category}
      // product = {product.}
/>)


const [currentSection, setCurrentSection] = useState(null)


// Function to crete the categories array
  function removeDuplicates(arr) {
    return arr.reduce((unique, item) => {
      if (!unique.includes(item.category)) {
        unique.push(item.category);
      }
      return unique;
    }, []); 
  }


  const categoriesArray = removeDuplicates(productArray)

  // console.log(categoriesArray)

  // Categories array sorted alphabetically
  const sortedCategoriesArray = categoriesArray.slice().sort(); 

  const categories = sortedCategoriesArray.map(category =>  
      <Category category={category} 
      wasClicked={clicked}
      currentSection={currentSection}
      />
    )

  function clicked(cat)  {
    if (currentSection === cat) {
    setCurrentSection(null)} 
    else {
      setCurrentSection(cat)
    }
  }


const categoriesProductArrayItems = productArray
  .filter((product) => product.category === currentSection) // Filter products based on the current section
  .map((product) => (
    <ProductCard
      key={product.id}
      productObject={product}
      id={product.id}
      description={product.description}
      image={product.image}
      price={product.price}
      rating={product.rating.rate}
      count={product.rating.count}
      title={product.title}
    />
  ));

  
  const [bestSelling, setBestSelling] = useState(true)

  function viewAll() {
    setBestSelling( (prev) => !prev)
  }

//   function allButtonsAlert() {
//   window.alert("This section already has all the data. Click on the next 'All Products' button to view more products.");
// }


  const exploreProductsItems = randomBestSeller.slice(0, 8).map(product =>  
    <ProductCard 
      key={product.id} 
      productObject = {product}
      id={product.id} 
      description = {product.description}
      image = {product.image}
      price = {product.price}
      rating = {product.rating.rate}
      count = {product.rating.count}
      title = {product.title}
      category = {product.category}
      // product = {product.}
/>)

  const [exploreProducts, setExploreProducts] = useState(true)

  function viewAllExplore() {
    setExploreProducts( (prev) => !prev)
  }


  const scrollToView = useRef(null);

  const scrollFunction = () => {
    scrollToView.current?.scrollIntoView({ behavior: 'smooth' }); 
  };


  // Pop up and close  AI chat
  const [aiChatOpen, setAiChatOpen] = useState(false)

  function toggleAiChat() {
    setAiChatOpen(AiChatStatus => !AiChatStatus)
  }

  return (
    <main ref={scrollToView}>

        <HeroSection />

{/* Today's sale */}
        <div className="todays-sales todays-sales-container" >
          <div className="today-text-container">
            <p className="today-block"></p><h2>Today's</h2>
          </div>

          <div className="header-and-navigation-buttons todays-sales-header-and-navigation-buttons">
          <div className="timer-container">
            <p className="timer-semibold">Flash Sales</p>
            <div className='timer-display'>
              <Timer />
            </div>
          </div>

          <div className="product-button-container">
            <button onClick={handleScrollLeft}><Icon icon="bitcoin-icons:arrow-left-filled" width="24" height="24" /></button>
            <button onClick={handleScrollRight}><Icon icon="bitcoin-icons:arrow-right-filled" width="24" height="24" /></button>
          </div>
          </div>


          <div className="product-card-container" ref={containerRef} >
              {productArrayItems}
          </div>

        </div>

        <hr />

<main className="main-body">
{/* Browse by category */}
        <div className="todays-sales-container">
          <div className="today-text-container">
            <p className="today-block"></p><h2>Categories</h2>
          </div>

          <div className="header-and-navigation-buttons">
          <div className="timer-container">
            <p className="timer-semibold">Browse by Category</p>
          </div>

          <div className="product-button-container">
            <button onClick={handleScrollLeft}><Icon icon="bitcoin-icons:arrow-left-filled" width="24" height="24" /></button>
            <button onClick={handleScrollRight}><Icon icon="bitcoin-icons:arrow-right-filled" width="24" height="24" /></button>
          </div>
          </div>

          <div className="categories-buttons" ref={containerRef} >
              {categories}
          </div>

          <div className="product-card-container" ref={containerRef} >
              {categoriesProductArrayItems}
          </div>

        </div>
        
        <hr />

{/* Best Selling Products */}
        <div className="todays-sales-container">
          <div className="today-text-container">
            <p className="today-block"></p><h2>This Month</h2>
          </div>

          <div className="header-and-navigation-buttons">
          <div className="timer-container">
            <p className="timer-semibold">Best Selling Products</p>
          </div>

          <div className="all-product-button">
            <button onClick={() => viewAll()}>
              View All
              </button>
          </div>
          </div>



          { bestSelling ? 
          <div className="best-selling-card-container" ref={containerRef} >
              {bestSellingItems}
          </div> : 
          <div className="product-card-container" ref={containerRef} >
              {productArrayItems}
          </div>
          }
          

        </div>

{/* Today's sale */}
        <div className="buyNowContainer"> 
            <img src="/Frame 600.png" alt="buy now" />
        </div>

{/* Explore Products Items */}
        <div className="explore-our-product-sales-container">
          <div className="today-text-container">
            <p className="today-block"></p><h2>Our Products</h2>
          </div>

          <div className="timer-container">
            <p className="timer-semibold">Explore Our Products</p>
          </div>

          <div className="explore-our-product-card-container">
              {exploreProducts ? exploreProductsItems : productArrayItems}
          </div>

          <div className="explore-our-product-button">
            <button onClick={() => viewAllExplore()}>View All Products</button>
          </div>
        </div>

{/* New Arrival Items */}
        <div className="explore-our-product-sales-container">
          <div className="today-text-container">
            <p className="today-block"></p><h2>Featured</h2>
          </div>

          <div className="timer-container">
            <p className="timer-semibold">New Arrival</p>
          </div>

          <div className="new-arrivals-image-container">
            <div class="grid-item playstation">
              <h2>PlayStation 5</h2>
              <p>Black and White version of the PS5 coming out on sale.</p>
              <a href="www.google.com">Shop Now</a>
            </div>
            <div class="grid-item womens-collections">
              <h2>Women's Collections</h2>
              <p>Featured woman collections that give you another vibe.</p>
              <a href="www.google.com">Shop Now</a>
            </div>
            <div class="grid-item speakers">
              <h2>Speakers</h2>
              <p>Amazon wireless speakers</p>
              <a href="www.google.com">Shop Now</a>
            </div>
            <div class="grid-item perfume">
              <h2>Perfume</h2>
              <p>GUCCI INTENSE OUD EDP</p>
              <a href="www.google.com">Shop Now</a>
            </div>
          </div>


        </div>

{/* Services Section */}
          <div className="services-outer-container"> 
            <div className="service-container">
              <div className="reach-button-outer">
                <div className="reach-button-inner">
                  <Icon icon="carbon:delivery" width="32" height="32" />
                </div>
              </div>

              <p className="service-number">FREE AND FAST DELIVERY</p>
              <p className="service-description">Free delivery for all orders over $140</p>
            </div>

            <div className="service-container">
              <div className="reach-button-outer">
                <div className="reach-button-inner">
                  <Icon icon="streamline:customer-support-1" width="14" height="14" />
                </div>
              </div>

              <p className="service-number">24/7 CUSTOMER SERVICE</p>
              <p className="service-description">Friendly 24/7 customer support</p>
            </div>

            <div className="service-container">
              <div className="reach-button-outer">
                <div className="reach-button-inner">
                  <Icon icon="tdesign:secured" width="24" height="24" />
                </div>
              </div>

              <p className="service-number">MONEY BACK GUARANTEE</p>
              <p className="service-description">We return money within 30</p>
            </div>

          </div>
</main>


          {aiChatOpen ?
          <div className="floating-buttons">
            <button onClick={toggleAiChat}><Icon icon="iconoir:cancel" width="24" height="24" /></button>
          </div>
          :
          <div className="floating-buttons">
            <button onClick={toggleAiChat}><Icon icon="hugeicons:ai-chat-02" width="24" height="24" /></button>
            <button onClick={scrollFunction}><Icon icon="fluent-mdl2:up" width="24" height="24" /></button>
          </div>}

          {
            aiChatOpen ? <AiChatbot toggleAiChat={toggleAiChat}/> : ""
          }

          

    </main>
  );
}

export default MainBody;