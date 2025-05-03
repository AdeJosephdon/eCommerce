
function HeroSection() {

  function slideImage() {
    const randomIndex = Math.floor(Math.random() * 4);
  return (
  <img src={`/slidingImage${randomIndex}.png`} alt="Sliding display" className="hero-image"/>
  );
  }

  // console.log("Hero Rendered")


  return (
    <div className="hero-section">
        <nav>
          <ul>
            <li><a href="/">Women's Fashion</a></li>
            <li><a href="/">Men's Fashion</a></li>
            <li><a href="/">Electronics</a></li>
            <li><a href="/">Home and Lifestyle</a></li>
            <li><a href="/">Medicine</a></li>
            <li><a href="/">Sports and Outdoor</a></li>
            <li><a href="/">Baby's & Toys</a></li>
            <li><a href="/">Groceries & Pets</a></li>
            <li><a href="/">Health & Beauty</a></li>
          </ul>
        </nav>

        <div>
          {slideImage()}
        </div>
        
    </div>
  );
}

export default HeroSection;