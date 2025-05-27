import { useEffect, useContext, useState, useRef } from "react";
import ProductCard from "./ProductCard";
import { DataContext } from "./DataContext";
import Timer from "./Timer";
import { Icon } from "@iconify/react/dist/iconify.js";

function TodayContainer() {
  const { data } = useContext(DataContext);

  const [copiedData, setCopiedData] = useState([]);

  useEffect(() => {
    if (data) {
      const newData = [...data];
      setCopiedData(newData);
    }
  }, [data]);

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
    <div className="todays-sales todays-sales-container">
      <div className="today-text-container">
        <p className="today-block"></p>
        <h2>Today's</h2>
      </div>

      <div className="header-and-navigation-buttons todays-sales-header-and-navigation-buttons">
        <div className="timer-container">
          <p className="timer-semibold">Flash Sales</p>
          <div className="timer-display">
            <Timer />
          </div>
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

      <div className="product-card-container" ref={containerRef}>
        {productArrayItems}
      </div>
    </div>
  );
}

export default TodayContainer;
