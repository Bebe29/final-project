import React from "react";
import "./Shop.css";
import Navbar from "react-bootstrap/Navbar";
import ProductCard from "../../components/ProductCard/ProductCard";

const Shop = () => {
  return (
    <div className="row">
      <div className="col pr-0">
        <Navbar className="shop-navbar-container">
          <div className="category-container">
            <div className="category pr-2">All</div>
            <div className="category pr-2">Food</div>
            <div className="category pr-2">Treats</div>
            <div className="category pr-2">Toys</div>
            <div className="category pr-2">Medicine</div>
            <div className="category pr-2">Grooming</div>
            <div className="category pr-2">Supplies</div>
            <div className="category pr-2">Accessories</div>
          </div>
          <input
            type="text"
            placeholder="Search your need in here"
            className="shop-input"
          />
        </Navbar>
        <div>Short by:</div>
        <ProductCard
          data={{
            id: 1,
            productName: "Plastic",
            price: 25000,
            image:
              "https://i.pinimg.com/originals/f0/65/73/f06573ec6b3c15205f0dce2a645002a0.jpg",
          }}
        />
      </div>
    </div>
  );
};

export default Shop;
