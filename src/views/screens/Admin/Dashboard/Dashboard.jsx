import React from "react";
import "./Dashboard.css";
import { Table } from "reactstrap";
import InputUI from "../../../components/Input/Input";
import ButtonUI from "../../../components/Button/Button";

const Dashboard = () => {
  return (
    <>
      <div className="dashboard-container">
        <caption>
          <h1>Products</h1>
        </caption>
        <Table striped hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
            </tr>
          </tbody>
        </Table>
      </div>
      <div className="addProduct-container">
        <div className="addProduct-form">
          <h4>Add New Product</h4>
          <InputUI placeholder="Product Name" />
          <InputUI placeholder="Price" />
          <textarea
            className="custom-input textarea-product mt-3"
            placeholder="Description"
          ></textarea>
          <InputUI placeholder="Image Source" />
          <select className="custom-select input-group mt-3">
            <option selected value="">
              Category
            </option>
            <option value="">Food</option>
            <option value="">Treats</option>
            <option value="">Toys</option>
            <option value="">Medicine</option>
            <option value="">Grooming</option>
            <option value="">Supplies</option>
            <option value="">Accessories</option>
          </select>
          <div className="d-flex justify-content-center mt-4">
            <ButtonUI type="contain-dark">Add Product</ButtonUI>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
