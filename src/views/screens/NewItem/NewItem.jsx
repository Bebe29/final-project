import React, { Component } from "react";
import "./NewItem.css";
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";

class NewItem extends Component {
  state = {
    newData: [],
  };

  componentDidMount() {
    this.getNewData();
  }

  getNewData = () => {
    Axios.get(`${API_URL}/products/newest`)
      .then((res) => {
        this.setState({ newData: res.data });
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderNewData = () => {
    return this.state.newData.map((val) => {
      return (
        <Link
          to={`/product/${val.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
          key={`card-${val.id}`}
        >
          <ProductCard data={val} />
        </Link>
      );
    });
  };

  render() {
    return (
      <>
        <div className="row">
          <div className="col pr-0 mt-5 mb-5 p-5">
            <center>
              <h1>New Item</h1>
              <div>{this.renderNewData()}</div>
            </center>
          </div>
        </div>
      </>
    );
  }
}

export default NewItem;
