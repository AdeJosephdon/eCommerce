import { useState, useContext } from "react";
import { DataContext } from "../components/DataContext";
import AlertPopup from "./../components/AlertPopup.js";

import PageStructure from "../components/PageStructure";

function AddProductPage() {
  const { isAlertPopupOpen, closeAlertPopup, openAlertPopup } =
    useContext(DataContext);

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productNumber, setProductNumber] = useState("");

  const createProject = async (e) => {
    e.preventDefault();

    const product = {
      title: productName,
      price: productPrice,
      description: productDescription,
      category: productCategory,
      image: productImage,
      count: productNumber,
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/products`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            // Add auth token or cookies if required
          },
          body: JSON.stringify(product),
        }
      );

      const data = await response.json();
      console.log("Server response:", data);

      if (data.success) {
        console.log(`${data.data} was successfully added.`);

        // Clear input
        setProductName("");
        setProductPrice("");
        setProductDescription("");
        setProductCategory("");
        setProductImage("");
        setProductNumber("");

        // Display alert
        openAlertPopup(`"${data.data.title}" successfully added.`, "success");
        // window.location.href = "/home";
        // console.log("auth", auth);
      } else {
        openAlertPopup(`Problem adding "${productName}".`, "failure");
        console.log("Failed");
      }
    } catch (error) {
      openAlertPopup(`"${error.message}`, "failure");
      console.error("Error creating product:", error);
    }
  };

  return (
    <PageStructure>
      <main className="add-product-page">
        <h1>Add a Product</h1>
        <form onSubmit={createProject}>
          <div className="form-group">
            <label htmlFor="product-name">Product Name:</label>
            <input
              type="text"
              id="product-name"
              name="product-name"
              onChange={(e) => setProductName(e.target.value)}
              value={productName}
              placeholder="Enter product name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="product-price">Product Price:</label>
            <input
              type="number"
              id="product-price"
              name="product-price"
              onChange={(e) => setProductPrice(e.target.value)}
              value={productPrice}
              placeholder="Enter product price"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="product-description">Product Description:</label>
            <textarea
              id="product-description"
              name="product-description"
              onChange={(e) => setProductDescription(e.target.value)}
              value={productDescription}
              placeholder="Enter product description"
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="product-category">Product category:</label>
            <input
              type="text"
              id="product-category"
              name="product-category"
              onChange={(e) => setProductCategory(e.target.value)}
              value={productCategory}
              placeholder="Enter product category"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="product-image">Product image:</label>
            <input
              type="text"
              id="product-image"
              name="product-image"
              onChange={(e) => setProductImage(e.target.value)}
              value={productImage}
              placeholder="Enter product image URL"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="product-number">
              How many products are available?
            </label>
            <input
              type="number"
              id="product-number"
              name="product-number"
              onChange={(e) => setProductNumber(e.target.value)}
              value={productNumber}
              placeholder="Enter number of products available"
              required
            />
          </div>
          <button type="submit">Add Product</button>
        </form>
        <AlertPopup
          isOpen={isAlertPopupOpen.alertState}
          onClose={closeAlertPopup}
          type={isAlertPopupOpen.type}
        >
          <div>{isAlertPopupOpen.message}</div>
        </AlertPopup>
      </main>
    </PageStructure>
  );
}

export default AddProductPage;
