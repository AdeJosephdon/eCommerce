import { useContext, useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { DataContext } from "./DataContext";
import { motion } from "framer-motion";

function ExploreProductesContainer() {
  // let bodyData

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
      console.log("Explore rendered", "RandomData useEffect ran: ");
    }
  }, [copiedData]);

  // Running the code "const randomBestSeller = data.sort(() => 0.5 - Math.random());" made the component rerender on each interaction with each interaction with the product cards, I had to use the useEffects above to solve the issue .

  const exploreProductsItems = randomBestSeller.slice(0, 8).map((product) => (
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

  const [exploreProducts, setExploreProducts] = useState(true);

  function viewAllExplore() {
    setExploreProducts((prev) => !prev);
  }

  const productArrayItems = copiedData.map((product) => (
    <ProductCard
      key={product._id}
      productObject={product}
      id={product._id}
      description={product.description}
      image={product.image}
      price={product.price}
      count={product.count}
      title={product.title}
    />
  ));

  return (
    <div className="explore-our-product-sales-container">
      <div className="today-text-container">
        <p className="today-block"></p>
        <h2>Our Products</h2>
      </div>

      <div className="timer-container">
        <p className="timer-semibold">Explore Our Products</p>
      </div>


      <motion.div  
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }} className="explore-our-product-card-container">
        {exploreProducts ? exploreProductsItems : productArrayItems}
      </motion.div>

      <div className="explore-our-product-button">
        <button onClick={() => viewAllExplore()} aria-label="view all products or collapse view">
          {exploreProducts ? "View All Products" : "Collapse View"}
        </button>
      </div>
    </div>
  );
}

export default ExploreProductesContainer;
