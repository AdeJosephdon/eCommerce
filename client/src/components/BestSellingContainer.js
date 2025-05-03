import { useContext, useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { DataContext } from "./DataContext";



function BestSellingContainer() {

    const { data } = useContext(DataContext);

    const [copiedData, setCopiedData] = useState([]);
    const [randomBestSeller, setRandomBestSeller] = useState([]);

    useEffect(() => {
      if (data) {
        const newData = [...data];
        setCopiedData(newData);
      }
    }, [data]);

        // Code for generating four random products as Best Selling
      useEffect(() => {
      if (copiedData.length > 0) {
        // Create a new shuffled array (only once)
        const shuffled = [...copiedData].sort(() => 0.5 - Math.random());
        setRandomBestSeller(shuffled);
        console.log("Explore rendered", "RandomData useEffect ran: ",)

      }
    }, [copiedData]);


    // Running the code "const randomBestSeller = data.sort(() => 0.5 - Math.random());" made the component rerender on each interaction with each interaction with the product cards, I had to use the useEffects above to solve the issue.


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


  const [bestSelling, setBestSelling] = useState(true)

  function viewAll() {
    setBestSelling( (prev) => !prev)
  }


    const productArrayItems = copiedData.map(product =>  
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

  return (
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
              {bestSelling ? "View All" : "View Best"}
              </button>
          </div>
          </div>



          { bestSelling ? 
          <div className="best-selling-card-container"  >
              {bestSellingItems}
          </div> : 
          <div className="product-card-container"  >
              {productArrayItems}
          </div>
          }
          

        </div>

  );
}

export default BestSellingContainer;