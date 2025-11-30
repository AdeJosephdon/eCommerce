import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from "./HeroSection";
import { Icon } from "@iconify/react";
import AiChatbot from "./AiChatbot";
import TodayContainer from "./TodayContainer";
import CategoriesContainer from "./CategoriesContainer";
import BestSellingContainer from "./BestSellingContainer";
import ExploreProductesContainer from "./ExploreProductesContainer";
import { motion } from "framer-motion";

function MainBody() {
  const navigateCreateProduct = useNavigate();

  const scrollToView = useRef(null);

  const scrollFunction = () => {
    scrollToView.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Pop up and close  AI chat
  const [aiChatOpen, setAiChatOpen] = useState(false);

  function toggleAiChat() {
    setAiChatOpen((AiChatStatus) => !AiChatStatus);
  }

  // console.log("Home rendered");

  return (
    <div ref={scrollToView}>
      <HeroSection />

      {/* Today's sale */}
      <TodayContainer />

      <main className="main-body">
        <hr />
        {/* Browse by category */}
        <CategoriesContainer />

        <hr />

        {/* Best Selling Products */}
        <BestSellingContainer />

        {/* Today's sale */}
        <div
          className="buyNowContainer">
          <img src="/Frame 600.png" alt="buy now" />
        </div>

        {/* Explore Products Items */}
        <ExploreProductesContainer />

        {/* New Arrival Items */}
        <div className="explore-our-product-sales-container">
          <div className="today-text-container">
            <p className="today-block"></p>
            <h2>Featured</h2>
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
            <p className="service-description">
              Free delivery for all orders over $140
            </p>
          </div>

          <div className="service-container">
            <div className="reach-button-outer">
              <div className="reach-button-inner">
                <Icon
                  icon="streamline:customer-support-1"
                  width="14"
                  height="14"
                />
              </div>
            </div>

            <p className="service-number">24/7 CUSTOMER SERVICE</p>
            <p className="service-description">
              Friendly 24/7 customer support
            </p>
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

      {aiChatOpen ? (
        <div
          className={
            aiChatOpen ? "floating-buttons remove-buttons" : "floating-buttons"
          }
        >
          <button onClick={() => navigateCreateProduct("/add-product-page")} aria-label="add a product">
            <Icon icon="akar-icons:edit" width="24" height="24" />
          </button>
          <button onClick={toggleAiChat} aria-label="toggle AI chat">
            <Icon icon="iconoir:cancel" width="24" height="24" />
          </button>
        </div>
      ) : (
        <div className="floating-buttons">
          <button onClick={() => navigateCreateProduct("/add-product-page")} aria-label="add a product">
            <Icon icon="akar-icons:edit" width="24" height="24" />
          </button>
          <button onClick={toggleAiChat} aria-label="toggle AI chat">
            <Icon icon="hugeicons:ai-chat-02" width="24" height="24" />
          </button>
          <button onClick={scrollFunction} aria-label="scroll to top">
            <Icon icon="fluent-mdl2:up" width="24" height="24" />
          </button>
        </div>
      )}

      {aiChatOpen ? <AiChatbot toggleAiChat={toggleAiChat} /> : ""}
    </div>
  );
}

export default MainBody;
