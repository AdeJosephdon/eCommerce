import { Icon } from "@iconify/react";
// import { Component } from "react";


function Category(prop) {

   function icon() {
    if (prop.category === "electronics") {
      return <Icon icon="map:electronics-store" width="24" height="24" />;
    } else if (prop.category === "jewelery") {
      return <Icon icon="map:jewelry-store" width="24" height="24" />;
  } else if (prop.category === "men's clothing") {
      return  <Icon icon="icon-park-outline:men-jacket" width="24" height="24" />;
  } else if (prop.category === "women's clothing") {
      return  <Icon icon="icon-park-outline:women" width="24" height="24" />;
  }
}


  return (
    <>
    {
      prop.currentSection === prop.category ? <button className="category-colored" onClick={() => prop.wasClicked(prop.category)}>
      {icon()}
      <div className="category-name">{prop.category}</div> </button> : 
      <button className="category" onClick={() => prop.wasClicked(prop.category)}>
      {icon()}
      <div className="category-name">{prop.category}</div>

    </button>
    }
    </>

  );
}

export default Category;