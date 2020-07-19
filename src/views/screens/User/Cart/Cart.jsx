import React, { Component } from "react";
import "./Cart.css";
import { Table } from "reactstrap";
import Axios from "axios";
import { API_URL } from "../../../../constants/API";
import { connect } from "react-redux";
import ButtonUI from "../../../components/Button/Button";
import swal from "sweetalert";

class Cart extends Component {
  state = {
    cartData: [],
    totalPrice: 0,
    shipping: "Standard",
  };

  componentDidMount() {
    this.getCartData();
  }

  getCartData = () => {
    Axios.get(`${API_URL}/carts/${this.props.user.id}`)
      .then((res) => {
        this.setState({ cartData: res.data });
        this.getTotalPrice();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getTotalPrice = () => {
    Axios.get(`${API_URL}/carts/totalPrice/${this.props.user.id}`)
      .then((res) => {
        this.setState({ totalPrice: res.data });
      })
      .catch((err) => {
        console.log("Cart empty");
      });
  };

  deleteFromCart = (id) => {
    Axios.delete(`${API_URL}/carts/user/${this.props.user.id}/product/${id}`)
      .then((res) => {
        this.getCartData();
        this.getTotalPrice();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderCartData = () => {
    return this.state.cartData.map((val, idx) => {
      const { product, quantity } = val;
      const { id, image, productName, price } = product;
      return (
        <tr key={`cart-data-${idx}`}>
          <td>
            <img src={image} alt="" className="cart-table-img" />
          </td>
          <td>{productName}</td>
          <td>
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(price)}
          </td>
          <td>{quantity}</td>
          <td>
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(price * quantity)}
          </td>
          <td>
            <div className="d-flex justify-content-center align-items-center">
              <ButtonUI
                type="outline-dark"
                onClick={() => this.deleteFromCart(id)}
              >
                Delete
              </ButtonUI>
            </div>
          </td>
        </tr>
      );
    });
  };

  selectOptionHandler = (e, field) => {
    const { value } = e.target;
    this.setState({
      [field]: value,
    });
  };

  renderPrice = (shipping) => {
    switch (shipping) {
      case "Standard":
        return 20000;
      case "Same Day":
        return 35000;
      case "Instant":
        return 50000;
      default:
        return 20000;
    }
  };

  checkoutHandler = () => {
    Axios.post(`${API_URL}/transactions/${this.props.user.id}`, {
      subTotalPrice:
        this.renderPrice(this.state.shipping) + this.state.totalPrice,
      status: "Waiting to pay",
    })
      .then((res) => {
        this.state.cartData.forEach((val) => {
          const { product, quantity } = val;
          const { id, price } = product;
          Axios.post(
            `${API_URL}/transactionDetails/${res.data.id}/product/${id}`,
            {
              price: price,
              quantity: quantity,
              total: quantity * price,
            }
          )
            .then((res) => {
              Axios.delete(`${API_URL}/carts/clear/${this.props.user.id}`)
                .then((res) => {
                  //   console.log(res.data);
                  this.setState({
                    cartData: [],
                    totalPrice: 0,
                    shipping: "Standard",
                  });
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              //   console.log(err);
              swal("Cart Empty!", "Please add item to the cart", "information");
            });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="cart-container">
        <h1 style={{ color: "#645954" }}>Cart</h1>
        <Table hover responsive>
          <thead>
            <tr key={`cart-head`}>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="">{this.renderCartData()}</tbody>
          <tfoot>
            <tr>
              <td colSpan={4} className="text-center">
                Total Price
              </td>
              <td colSpan={2}>
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(this.state.totalPrice)}
              </td>
            </tr>
            <tr>
              <td colSpan={4} className="text-center">
                Shipping methods
              </td>
              <td colSpan={2}>
                <select
                  className="custom-select input-group"
                  value={this.state.shipping}
                  onChange={(e) => this.selectOptionHandler(e, "shipping")}
                >
                  <option defaultValue value="Standard">
                    Standard
                  </option>
                  <option value="Same Day">Same Day</option>
                  <option value="Instant">Instant</option>
                </select>
              </td>
            </tr>
            <tr>
              <td colSpan={4} className="text-center">
                Shipping fee
              </td>
              <td colSpan={2}>
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(this.renderPrice(this.state.shipping))}
              </td>
            </tr>
            <tr>
              <td colSpan={4} className="text-center">
                Sub Total Price
              </td>
              <td colSpan={2}>
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(
                  this.renderPrice(this.state.shipping) + this.state.totalPrice
                )}
              </td>
            </tr>
            <tr>
              <td colSpan={6}>
                <div className="d-flex justify-content-center align-items-center">
                  <ButtonUI
                    type="contain"
                    onClick={() => this.checkoutHandler()}
                  >
                    Check Out
                  </ButtonUI>
                </div>
              </td>
            </tr>
          </tfoot>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Cart);
