import React from "react";
import "./Shop.css";
import Navbar from "react-bootstrap/Navbar";
import ProductCard from "../../components/ProductCard/ProductCard";

const Shop = () => {
  return (
    <div className="row">
      <div className="col pr-0">
        <Navbar className="shop-navbar-container">
          Search bar and category
        </Navbar>
        <ProductCard
          data={{
            image:
              "https://i.pinimg.com/originals/f0/65/73/f06573ec6b3c15205f0dce2a645002a0.jpg",
          }}
        />
        <h1>Shop</h1>
      </div>
    </div>
  );
};

export default Shop;
