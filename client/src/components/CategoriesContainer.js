import { useEffect, useContext, useState, useRef } from "react";
import ProductCard from "./ProductCard";
import { DataContext } from "./DataContext";
import { Icon } from "@iconify/react/dist/iconify.js";
import Category from "./Category";

function CategoriesContainer() {
  const { data } = useContext(DataContext);

  const [copiedData, setCopiedData] = useState([]);

  useEffect(() => {
    if (data) {
      const newData = [...data];
      setCopiedData(newData);
    }
  }, [data]);

  const productArray = copiedData;

  const categoriesArray = removeDuplicates(productArray);

  const [currentSection, setCurrentSection] = useState(null);

  // Function to crete the categories array
  function removeDuplicates(arr) {
    return arr.reduce((unique, item) => {
      if (!unique.includes(item.category)) {
        unique.push(item.category);
      }
      return unique;
    }, []);
  }

  // I was thinking of using use state and useEffect to store the data of each category but the data is not much so I left it like that. An there's no re-render.

  // Categories array sorted alphabetically
  const sortedCategoriesArray = categoriesArray.slice().sort();

  const categories = sortedCategoriesArray.map((category) => (
    <Category
      category={category}
      wasClicked={clicked}
      currentSection={currentSection}
    />
  ));

  function clicked(cat) {
    if (currentSection === cat) {
      setCurrentSection(null);
    } else {
      setCurrentSection(cat);
    }
  }

  const categoriesProductArrayItems = productArray
    .filter((product) => product.category === currentSection) // Filter products based on the current section
    .map((product) => (
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

  return (
    <div className="todays-sales-container">
      <div className="today-text-container">
        <p className="today-block"></p>
        <h2>Categories</h2>
      </div>

      <div className="header-and-navigation-buttons">
        <div className="timer-container">
          <p className="timer-semibold">Browse by Category</p>
        </div>

        <div className="product-button-container">
          <button onClick={handleScrollLeft}>
            <Icon
              icon="bitcoin-icons:arrow-left-filled"
              width="24"
              height="24"
            />
          </button>
          <button onClick={handleScrollRight}>
            <Icon
              icon="bitcoin-icons:arrow-right-filled"
              width="24"
              height="24"
            />
          </button>
        </div>
      </div>

      <div className="categories-buttons" ref={containerRef}>
        {categories}
      </div>

      <div className="product-card-container" ref={containerRef}>
        {categoriesProductArrayItems}
      </div>
    </div>
  );
}

export default CategoriesContainer;
