import React, { Component } from "react";
import "./Dashboard.css";

import { Table } from "reactstrap";
import Axios from "axios";
import swal from "sweetalert";

import InputUI from "../../../components/Input/Input";
import ButtonUI from "../../../components/Button/Button";
import FileUI from "../../../components/InputFile/InputFile";
import { API_URL } from "../../../../constants/API";

class Dashboard extends Component {
  state = {
    categoryList: [],
    newProductForm: {
      productName: "",
      price: "",
      stock: "",
      productDescription: "",
      image: "",
    },
    categoryId: "",
    selectedFile: null,
  };

  componentDidMount() {
    this.getCategoryData();
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

  renderCategory = () => {
    return this.state.categoryList.map((val) => {
      const { id, categoryName } = val;
      return <option value={id}>{categoryName}</option>;
    });
  };

  fileChangeHandler = (e) => {
    this.setState({ selectedFile: e.target.files[0] });
    // console.log(e.target.files[0]);
  };

  inputHandler = (e, field, form) => {
    const { value } = e.target;
    if (field === "price" || field === "stock") {
      this.setState({
        [form]: {
          ...this.state[form],
          [field]: parseInt(value),
        },
      });
    } else {
      this.setState({
        [form]: {
          ...this.state[form],
          [field]: value,
        },
      });
    }
  };

  categoryHandler = (e, field) => {
    const { value } = e.target;
    this.setState({ [field]: value });
  };

  addNewProductHandler = () => {
    let formData = new FormData();
    formData.append(
      "file",
      this.state.selectedFile,
      this.state.selectedFile.name
    );
    formData.append("productData", JSON.stringify(this.state.newProductForm));
    Axios.post(`${API_URL}/products`, formData)
      .then((res) => {
        this.setState({
          newProductForm: { ...this.state.newProductForm, image: res.data },
        });
        // console.log(this.state.newProductForm);
        Axios.post(
          `${API_URL}/products/categories/${this.state.categoryId}`,
          this.state.newProductForm
        )
          .then((res) => {
            swal(
              "Success!",
              "The product has been added to the list",
              "success"
            );
            this.setState({
              newProductForm: {
                productName: "",
                price: "",
                stock: "",
                productDescription: "",
                image: "",
              },
              categoryId: "",
              selectedFile: null,
            });
          })
          .catch((err) => {
            swal(
              "Error!",
              "Your product couldn't be added to the list",
              "error"
            );
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <>
        <div className="dashboard-container">
          <h1 style={{ color: "#645954" }}>Products</h1>
          <Table striped hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody></tbody>
          </Table>
        </div>
        <div className="addProduct-container">
          <div className="addProduct-form">
            <h4>Add New Product</h4>
            <InputUI
              placeholder="Product Name"
              value={this.state.newProductForm.productName}
              onChange={(e) =>
                this.inputHandler(e, "productName", "newProductForm")
              }
            />
            <InputUI
              pattern="[0-9]*"
              placeholder="Price"
              value={this.state.newProductForm.price}
              onChange={(e) => this.inputHandler(e, "price", "newProductForm")}
            />
            <InputUI
              pattern="[0-9]*"
              placeholder="Stock"
              value={this.state.newProductForm.stock}
              onChange={(e) => this.inputHandler(e, "stock", "newProductForm")}
            />
            <textarea
              className="custom-input textarea-product mt-3"
              placeholder="Description"
              value={this.state.newProductForm.productDescription}
              onChange={(e) =>
                this.inputHandler(e, "productDescription", "newProductForm")
              }
            ></textarea>
            <FileUI onChange={this.fileChangeHandler}>
              {this.state.selectedFile ? this.state.selectedFile.name : ""}
            </FileUI>
            <select
              className="custom-select input-group mt-3"
              value={this.state.categoryId}
              onChange={(e) => this.categoryHandler(e, "categoryId")}
            >
              <option defaultValue value="">
                Category
              </option>
              {this.renderCategory()}
            </select>
            <div className="d-flex justify-content-center mt-4">
              <ButtonUI
                type="contain-dark"
                onClick={this.addNewProductHandler}
                className="mr-4"
              >
                Add Product
              </ButtonUI>
              <ButtonUI
                type="outline-dark"
                onClick={() =>
                  this.setState({
                    newProductForm: {
                      productName: "",
                      price: "",
                      stock: "",
                      productDescription: "",
                      image: "",
                    },
                    categoryId: "",
                    selectedFile: null,
                  })
                }
              >
                Clear
              </ButtonUI>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Dashboard;
