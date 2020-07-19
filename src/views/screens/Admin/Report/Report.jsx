import React, { Component } from "react";
import "./Report.css";
import { Table } from "reactstrap";
import Axios from "axios";
import { API_URL } from "../../../../constants/API";

class Report extends Component {
  state = {
    purchaseData: [],
  };

  componentDidMount() {
    this.getProductData();
  }

  getProductData = () => {
    Axios.get(`${API_URL}/transactionDetails/purchase`)
      .then((res) => {
        console.log(res.data);

        this.setState({ purchaseData: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getData = (id) => {
    Axios.get(`${API_URL}/products/${id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderProductData = () => {
    return this.state.purchaseData.map((val, idx) => {
      return (
        <tr key={`report-${idx}`}>
          <td>{idx + 1}</td>
          <td>{val[0]}</td>
          <td>{val[1]}</td>
        </tr>
      );
    });
  };

  render() {
    return (
      <div className="cart-container">
        <h1 style={{ color: "#645954" }}>Report</h1>
        <Table hover responsive>
          <thead>
            <tr>
              <th>No</th>
              <th>Product Code</th>
              <th>Total Purchase</th>
            </tr>
          </thead>
          <tbody>{this.renderProductData()}</tbody>
        </Table>
      </div>
    );
  }
}

export default Report;
