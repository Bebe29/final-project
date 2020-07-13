import React, { Component } from "react";
import "./Shop.css";

import Navbar from "react-bootstrap/Navbar";
import Axios from "axios";
import { Link } from "react-router-dom";

import { API_URL } from "../../../constants/API";
import ProductCard from "../../components/ProductCard/ProductCard";

class Shop extends Component {
  state = {
    categoryList: [],
    productDataList: [],
    categoryId: 0,
    searchItem: "",
    sortBy: "",
  };

  componentDidMount() {
    this.getCategoryData();
    this.getProductData();
  }

  getCategoryData = () => {
    Axios.get(`${API_URL}/categories`)
      .then((res) => {
        this.setState({ categoryList: res.data });
        // console.log(this.state.categoryList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getProductData = (id) => {
    if (!id) {
      Axios.get(`${API_URL}/products`)
        .then((res) => {
          this.setState({
            productDataList: res.data,
            categoryId: 0,
            sortBy: "",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Axios.get(`${API_URL}/categories/${id}/products`)
        .then((res) => {
          this.setState({
            productDataList: res.data,
            categoryId: id,
            sortBy: "",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  inputHandler = (e) => {
    const { value } = e.target;
    this.setState({ searchItem: value });
  };

  sortHandler = (e) => {
    console.log(this.state.categoryId);
    const { value } = e.target;
    if (this.state.categoryId === 0) {
      if (value !== "") {
        Axios.get(`${API_URL}/products/sort/${value}`)
          .then((res) => {
            this.setState({ productDataList: res.data, sortBy: value });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        Axios.get(`${API_URL}/products`)
          .then((res) => {
            this.setState({ productDataList: res.data, sortBy: value });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      if (value !== "") {
        Axios.get(`${API_URL}/products/sort/${this.state.categoryId}/${value}`)
          .then((res) => {
            this.setState({ productDataList: res.data, sortBy: value });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        Axios.get(`${API_URL}/categories/${this.state.categoryId}/products`)
          .then((res) => {
            this.setState({ productDataList: res.data, sortBy: value });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  renderCategory = () => {
    return this.state.categoryList.map((val) => {
      const { id, categoryName } = val;
      return (
        <div
          key={`category-${id}`}
          className="category pr-3"
          onClick={() => this.getProductData(id)}
        >
          {categoryName}
        </div>
      );
    });
  };

  renderProductCard = () => {
    if (this.state.productDataList.length === 0) {
      return (
        <div>
          <h1>{`Sorry :(`}</h1>
          <h3>{`We don't have a product in this category yet`}</h3>
        </div>
      );
    } else {
      return this.state.productDataList.map((val) => {
        if (
          val.productName
            .toLowerCase()
            .includes(this.state.searchItem.toLowerCase())
        ) {
          return (
            <Link
              to={`/product/${val.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
              key={`card-${val.id}`}
            >
              <ProductCard data={val} />
            </Link>
          );
        }
        return null;
      });
    }
  };

  render() {
    return (
      <>
        <Navbar className="shop-navbar-container">
          <div className="category-container ml-3">
            <div
              className="category pr-2"
              onClick={() => this.getProductData()}
            >
              All
            </div>
            {this.renderCategory()}
          </div>
          <input
            type="text"
            placeholder="Search your need in here"
            className="shop-input mr-3 ml-3"
            onChange={(e) => this.inputHandler(e)}
          />
        </Navbar>
        <div className="row">
          <div className="col">
            <div className="short-container content-md pl-5 mt-3 mb-3">
              <div className="mr-2">Sort by:</div>
              <div style={{ width: "25%" }}>
                <select
                  className="custom-select input-group"
                  value={this.state.sortBy}
                  // onChange={(e) => this.sortHandler(e)}
                  onChange={(e) => this.sortHandler(e)}
                >
                  <option defaultValue value="">
                    None
                  </option>
                  <option value="nameAsc">{`Name (a-z)`}</option>
                  <option value="nameDesc">{`Name (z-a)`}</option>
                  <option value="priceAsc">{`Price (low-high)`}</option>
                  <option value="priceDesc">{`Price (high-low)`}</option>
                </select>
              </div>
            </div>
            <center>{this.renderProductCard()}</center>
          </div>
        </div>
      </>
    );
  }
}

export default Shop;
