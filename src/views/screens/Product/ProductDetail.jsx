import React, { Component } from "react";
import "./ProductDetail.css";

import Axios from "axios";
import { Link } from "react-router-dom";

import { API_URL } from "../../../constants/API";
import ButtonUI from "../../components/Button/Button";

class ProductDetail extends Component {
  state = {
    productData: {
      productName: "",
      price: "",
      stock: "",
      productDescription: "",
      image: "",
      categoryName: "",
    },
  };

  componentDidMount() {
    Axios.get(`${API_URL}/products/${this.props.match.params.productId}`)
      .then((res) => {
        this.setState({
          productData: {
            productName: res.data.productName,
            price: res.data.price,
            stock: res.data.stock,
            productDescription: res.data.productDescription,
            image: res.data.image,
            categoryName: res.data.category.categoryName,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const {
      productName,
      price,
      stock,
      productDescription,
      image,
      categoryName,
    } = this.state.productData;

    return (
      <div className="product-container">
        <div className="product-img">
          <img src={image} alt="" />
        </div>
        <div className="product-detail">
          <h3>{productName}</h3>
          <h6 className="product-detail-price mt-3">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(price)}
          </h6>
          {/* <div className="content-md mt-5 mb-5 text-justify">
            {`${productDescription} `}
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias
            atque, natus mollitia reprehenderit dolorum quam nisi repudiandae
            provident accusantium ut inventore et, earum molestias voluptatibus
            ab vitae laudantium? Rem, optio!
          </div> */}
          <div className="content-md mt-5 mb-5 text-justify">
            {productDescription}
          </div>
          <div className="subtitle-md detail mb-2">{`Stock : ${stock}`}</div>
          <div className="subtitle-md detail mb-4">{`Category : ${categoryName}`}</div>
          <div className="d-flex flex-row justify-content-center align-items-center">
            <ButtonUI className="mr-3" type="outline-dark">
              Add to Wishlist
            </ButtonUI>
            <ButtonUI type="contain-dark">Add to Cart</ButtonUI>
          </div>
          <div className="d-flex flex-row justify-content-center align-items-center">
            <ButtonUI className="mt-4" type="contain">
              <Link
                to="/shop"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Back to Shop
              </Link>
            </ButtonUI>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductDetail;
