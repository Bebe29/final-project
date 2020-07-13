import React, { Component } from "react";
import "./Dashboard.css";

import { Table, Modal, ModalHeader, ModalBody } from "reactstrap";
import Axios from "axios";
import swal from "sweetalert";

import InputUI from "../../../components/Input/Input";
import ButtonUI from "../../../components/Button/Button";
import FileUI from "../../../components/InputFile/InputFile";
import { API_URL } from "../../../../constants/API";

class Dashboard extends Component {
  state = {
    activePage: "Show Product",
    modalOpen: false,
    categoryList: [],
    productDataList: [],
    newProductForm: {
      productName: "",
      price: "",
      stock: "",
      productDescription: "",
      image: "",
    },
    categoryId: "",
    selectedFile: null,
    activeProduct: [],
    editProductForm: {
      id: 0,
      productName: "",
      price: "",
      stock: "",
      productDescription: "",
      image: "",
      category: {},
    },
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

  getProductData = () => {
    Axios.get(`${API_URL}/products`)
      .then((res) => {
        // console.log(res.data);
        this.setState({ productDataList: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderCategory = () => {
    return this.state.categoryList.map((val) => {
      const { id, categoryName } = val;
      return (
        <option value={id} key={`category-${id}`}>
          {categoryName}
        </option>
      );
    });
  };

  renderProduct = () => {
    return this.state.productDataList.map((val, idx) => {
      const {
        id,
        productName,
        price,
        stock,
        productDescription,
        image,
        category,
      } = val;
      return (
        <>
          <tr
            onClick={() => {
              if (this.state.activeProduct.includes(idx)) {
                this.setState({
                  activeProduct: [
                    ...this.state.activeProduct.filter((item) => item !== idx),
                  ],
                });
              } else {
                this.setState({
                  activeProduct: [...this.state.activeProduct, idx],
                });
              }
            }}
            key={`product-${id}`}
          >
            <td>{id}</td>
            <td>{productName}</td>
            <td>
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(price)}
            </td>
            <td>{stock}</td>
            <td>{category ? category.categoryName : ""}</td>
          </tr>
          {this.state.activeProduct.includes(idx) ? (
            <tr key={`detail-product-${id}`}>
              <td colSpan={6} className="collapse-item">
                <div className="d-flex justify-content-center align-items-center">
                  <img src={image} alt="" />
                  <div className="d-flex flex-column text-left">
                    <div className="">Product Name: {productName}</div>
                    <div className="">
                      Price:{" "}
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(price)}
                    </div>
                    <div className="">Stock: {stock}</div>
                    <div className="">
                      Category: {category ? category.categoryName : ""}
                    </div>
                    <div className="">
                      <div className="">Description:</div>
                      <div className="">{productDescription}</div>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                  <ButtonUI
                    type="contain-dark mr-3"
                    onClick={() => this.editBtnHandler(idx)}
                  >
                    Edit
                  </ButtonUI>
                  <ButtonUI
                    type="outline-dark"
                    onClick={() => this.deleteHandler(id, idx)}
                  >
                    Delete
                  </ButtonUI>
                </div>
              </td>
            </tr>
          ) : null}
        </>
      );
    });
  };

  toogleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };

  fileChangeHandler = (e) => {
    this.setState({ selectedFile: e.target.files[0] });
    console.log(e.target.files[0]);
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
    const { productName, price, stock } = this.state.newProductForm;
    if (
      this.state.selectedFile === null ||
      productName === "" ||
      price === "" ||
      stock === ""
    ) {
      swal("Error!", "Your product couldn't be added to the list", "error");
    } else {
      formData.append(
        "file",
        this.state.selectedFile,
        this.state.selectedFile.name
      );
      formData.append("productData", JSON.stringify(this.state.newProductForm));
      Axios.post(`${API_URL}/products`, formData)
        .then((res) => {
          console.log(res.data);
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
                activePage: "Show Product",
              });
              this.getProductData();
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
    }
  };

  editBtnHandler = (idx) => {
    if (this.state.productDataList[idx].category) {
      this.setState({
        editProductForm: {
          ...this.state.productDataList[idx],
        },
        categoryId: this.state.productDataList[idx].category.id,
        selectedFile: null,
        modalOpen: true,
      });
    } else {
      this.setState({
        editProductForm: {
          ...this.state.productDataList[idx],
        },
        categoryId: "",
        selectedFile: null,
        modalOpen: true,
      });
    }
  };

  editProductHandler = () => {
    let formData = new FormData();
    if (this.state.selectedFile === null) {
      this.editProduct();
    } else {
      // console.log("on");
      formData.append(
        "file",
        this.state.selectedFile,
        this.state.selectedFile.name
      );
      // console.log(JSON.stringify(this.state.editProductForm));
      formData.append(
        "productData",
        JSON.stringify(this.state.editProductForm)
      );
      Axios.post(`${API_URL}/products`, formData)
        .then((res) => {
          this.setState({
            editProductForm: { ...this.state.editProductForm, image: res.data },
          });
          // console.log(this.state.editProductForm);
          this.editProduct();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  editProduct = () => {
    Axios.get(`${API_URL}/categories/${this.state.categoryId}`)
      .then((res) => {
        // console.log(res.data);
        this.setState({
          editProductForm: {
            ...this.state.editProductForm,
            category: res.data,
          },
        });
        console.log(this.state.editProductForm);
        Axios.put(`${API_URL}/products`, this.state.editProductForm)
          .then((res) => {
            swal(
              "Success!",
              "The product has been added to the list",
              "success"
            );
            this.setState({
              modalOpen: false,
            });
            this.getProductData();
          })
          .catch((err) => {
            swal("Error!", "Couldn't update the changes", "error");
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deleteHandler = (id, idx) => {
    Axios.delete(`${API_URL}/products/${id}`)
      .then((res) => {
        swal(
          "Success!",
          "The product has been remove from the list",
          "success"
        );
        this.setState({
          activeProduct: [
            ...this.state.activeProduct.filter((item) => item !== idx),
          ],
        });
        this.getProductData();
      })
      .catch((err) => {
        swal("Error!", "The product couldn't be removed", "error");
      });
  };

  render() {
    return (
      <div className="dashboard-container">
        <h1 style={{ color: "#645954" }}>Products</h1>
        <div className="d-flex mt-2 mb-4">
          <ButtonUI
            type="text-dark"
            className="mr-2"
            onClick={() => this.setState({ activePage: "Show Product" })}
          >
            Show Product
          </ButtonUI>
          <ButtonUI
            type="text-dark"
            onClick={() => this.setState({ activePage: "Add Product" })}
          >
            Add Product
          </ButtonUI>
        </div>
        {this.state.activePage === "Show Product" ? (
          <Table hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody className="product-table">{this.renderProduct()}</tbody>
          </Table>
        ) : (
          <div className="addProduct-container">
            <div className="addProduct-form">
              <h4>Add New Product</h4>
              <InputUI
                className="mt-3"
                placeholder="Product Name"
                value={this.state.newProductForm.productName}
                onChange={(e) =>
                  this.inputHandler(e, "productName", "newProductForm")
                }
              />
              <InputUI
                className="mt-3"
                pattern="[0-9]*"
                placeholder="Price"
                value={this.state.newProductForm.price}
                onChange={(e) =>
                  this.inputHandler(e, "price", "newProductForm")
                }
              />
              <InputUI
                className="mt-3"
                pattern="[0-9]*"
                placeholder="Stock"
                value={this.state.newProductForm.stock}
                onChange={(e) =>
                  this.inputHandler(e, "stock", "newProductForm")
                }
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
        )}
        <Modal
          toggle={this.toogleModal}
          isOpen={this.state.modalOpen}
          className="edit-modal"
          centered
        >
          <ModalHeader toggle={this.toogleModal}>Edit Product</ModalHeader>
          <ModalBody>
            <div>
              <InputUI
                className="mt-3"
                placeholder="Product Name"
                value={this.state.editProductForm.productName}
                onChange={(e) =>
                  this.inputHandler(e, "productName", "editProductForm")
                }
              />
              <InputUI
                className="mt-3"
                pattern="[0-9]*"
                placeholder="Price"
                value={this.state.editProductForm.price}
                onChange={(e) =>
                  this.inputHandler(e, "price", "editProductForm")
                }
              />
              <InputUI
                className="mt-3"
                pattern="[0-9]*"
                placeholder="Stock"
                value={this.state.editProductForm.stock}
                onChange={(e) =>
                  this.inputHandler(e, "stock", "editProductForm")
                }
              />
              <textarea
                className="custom-input textarea-product mt-3"
                placeholder="Description"
                value={this.state.editProductForm.productDescription}
                onChange={(e) =>
                  this.inputHandler(e, "productDescription", "editProductForm")
                }
              ></textarea>
              <FileUI onChange={this.fileChangeHandler}>
                {this.state.selectedFile
                  ? this.state.selectedFile.name
                  : this.state.editProductForm.image
                  ? this.state.editProductForm.image.split("/")[5]
                  : ""}
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
                  type="outline-dark"
                  onClick={() => this.toogleModal()}
                  className="mr-4"
                >
                  Cancel
                </ButtonUI>
                <ButtonUI type="contain-dark" onClick={this.editProductHandler}>
                  Save
                </ButtonUI>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default Dashboard;
