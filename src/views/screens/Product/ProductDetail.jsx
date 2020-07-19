import React, { Component } from "react";
import "./ProductDetail.css";

import Axios from "axios";
import { Link } from "react-router-dom";

import { API_URL } from "../../../constants/API";
import ButtonUI from "../../components/Button/Button";
import { connect } from "react-redux";
import swal from "sweetalert";

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

  addToCart = () => {
    if (this.props.user.id > 0) {
      Axios.get(`${API_URL}/carts`, {
        params: {
          userId: this.props.user.id,
          productId: this.props.match.params.productId,
        },
      })
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            Axios.put(
              `${API_URL}/carts/user/${this.props.user.id}/product/${this.props.match.params.productId}`,
              {
                id: res.data.id,
                quantity: res.data.quantity + 1,
              }
            )
              .then((res) => {
                swal(
                  "Success!",
                  "The product has been added to your cart",
                  "success"
                );
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            Axios.post(
              `${API_URL}/carts/user/${this.props.user.id}/product/${this.props.match.params.productId}`,
              {
                quantity: 1,
              }
            )
              .then((res) => {
                swal(
                  "Success!",
                  "The product has been added to your cart",
                  "success"
                );
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      swal("Can't add to Cart!", "Please Log In or Register first", "error");
    }
  };

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
          <h3 className="mt-3" style={{ color: "#645954" }}>
            {stock ? null : "Sold out!"}
          </h3>
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
            {stock ? (
              <>
                <ButtonUI className="mr-3" type="outline-dark">
                  <Link
                    to="/shop"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Back to Shop
                  </Link>
                </ButtonUI>
                <ButtonUI type="contain-dark" onClick={this.addToCart}>
                  Add to Cart
                </ButtonUI>
              </>
            ) : (
              <>
                <ButtonUI className="mr-3" type="outline-dark">
                  <Link
                    to="/shop"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Back to Shop
                  </Link>
                </ButtonUI>
                <ButtonUI type="disable">Add to Cart</ButtonUI>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(ProductDetail);
