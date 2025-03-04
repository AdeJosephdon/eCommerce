import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import PageStructure from "./PageStructure";


function About() {


  return (

      <PageStructure>
      <main className="about-container">
        <div className="route"><span><Link to="/">Home / </Link></span>About</div>


          <div className="story"> 
            <div className="story-leftside">
              <h2>Our Story </h2>
              <div>
                <p>Launced in 2015, Exclusive is South Asia’s premier online shopping makterplace with an active presense in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sallers and 300 brands and serves 3 millioons customers across the region. </p> 
              
              <p>Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assotment in categories ranging  from consumer.</p>
              </div>
            </div>

            <div className="story-container">
              <img src="/African women.png" alt="portrait-two-african-females-holding-shopping-bags-while-reacting-something-their-smartphone 1" />
            </div>

          </div>

          <div className="reach-container"> 
            <button className="reach-button">
              <div className="reach-button-outer">
                <div className="reach-button-inner">
                  <Icon icon="circum:shop" width="24" height="24" />
                </div>
              </div>

              <p className="reach-number">10.5k</p>
              <p className="reach-description">Sellers active on our site</p>
            </button>

            <button className="reach-button">
              <div className="reach-button-outer">
                <div className="reach-button-inner">
                  <Icon icon="solar:dollar-linear" width="24" height="24" />
                </div>
              </div>

              <p className="reach-number">33k</p>
              <p className="reach-description">Monthly Product Sale</p>
            </button>

            <button className="reach-button">
              <div className="reach-button-outer">
                <div className="reach-button-inner">
                  <Icon icon="fluent:shopping-bag-20-regular" width="20" height="20" />
                </div>
              </div>

              <p className="reach-number">45.5k</p>
              <p className="reach-description">Customer active in our site</p>
            </button>

            <button className="reach-button">
              <div className="reach-button-outer">
                <div className="reach-button-inner">
                  <Icon icon="tabler:moneybag" width="24" height="24" />
                </div>
              </div>

              <p className="reach-number">25k</p>
              <p className="reach-description">Anual gross sale in our site</p>
            </button>

          </div>

          <div className="people"> 
            <div className="person">
              <img src="/image 46.png" alt="Tom Cruise" />
              <p className="person-name">Tom Cruise</p>
              <p>Founder and Chairman</p>
              <p className="socials">
                <span>
                  <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                        <Icon icon="basil:instagram-outline" width="24" height="24" />
                      </a>
                </span>

                <span>
                  <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                  <Icon icon="iconoir:twitter" width="24" height="24" />
                  </a>
                  
                </span>
                
                <span>
                  <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                    <Icon icon="streamline:linkedin-solid" width="14" height="14" />
                  </a>
                  
                </span>
                </p>
            </div>
            
            <div className="person">
              <img src="/image 47.png" alt="Emma Watson" />
              <p>Emma Watson</p>
              <p>Manaing Director</p>
              <p className="socials">
                <span>
                  <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
        <Icon icon="basil:instagram-outline" width="24" height="24" />
      </a>
</span>
                <span>
                  
<a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                  <Icon icon="iconoir:twitter" width="24" height="24" />
      </a>
                  
                  </span>
                <span>
                  
<a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
<Icon icon="streamline:linkedin-solid" width="14" height="14" />
      </a>
                  
                  </span>
                </p>
            </div>

            <div className="person">
              <img src="/image 51.png" alt="Emma Watson" />
              <p>Will Smith</p>
              <p>Product Designer</p>
              <p className="socials">
                <span>
                  <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
        <Icon icon="basil:instagram-outline" width="24" height="24" />
      </a>
</span>
                <span>
                  
<a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                  <Icon icon="iconoir:twitter" width="24" height="24" />
      </a>
                  
                  </span>
                <span>
                  
<a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
<Icon icon="streamline:linkedin-solid" width="14" height="14" />
      </a>
                  
                  </span>
                </p>
            </div>



          </div>

          <div className="services-outer-container servicePlus"> 
            <div className="service-container">
              <div className="reach-button-outer">
                <div className="reach-button-inner">
                  <Icon icon="carbon:delivery" width="32" height="32" />
                </div>
              </div>

              <p className="reach-number">FREE AND FAST DELIVERY</p>
              <p className="reach-description">Free delivery for all orders over $140</p>
            </div>

            <div className="service-container">
              <div className="reach-button-outer">
                <div className="reach-button-inner">
                  <Icon icon="streamline:customer-support-1" width="32" height="32" />
                </div>
              </div>

              <p className="reach-number">24/7 CUSTOMER SERVICE</p>
              <p className="reach-description">Friendly 24/7 customer support</p>
            </div>

            <div className="service-container">
              <div className="reach-button-outer">
                <div className="reach-button-inner">
                  <Icon icon="tdesign:secured" width="24" height="24" />
                </div>
              </div>

              <p className="reach-number">MONEY BACK GUARANTEE</p>
              <p className="reach-description">We return money within 30 days</p>
            </div>

          </div>

      </main>
      </PageStructure>

  );
}

export default About;