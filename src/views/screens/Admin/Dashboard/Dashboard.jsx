import React, { Component } from "react";
import "./Dashboard.css";

import { Table, Modal, ModalHeader, ModalBody } from "reactstrap";
import Axios from "axios";
import swal from "sweetalert";

import InputUI from "../../../components/Input/Input";
import ButtonUI from "../../../components/Button/Button";
import FileUI from "../../../components/InputFile/InputFile";
import { API_URL } from "../../../../constants/API";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

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
      type: "",
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
      type: "",
    },
    dataTypeProduct: [],
    dataTypePackage: [],
    package: {
      packageId: 0,
      productId: 0,
    },
    searchItem: "",
    pageSize: 3,
    pagesCount: 0,
    currentPage: 0,
  };

  componentDidMount() {
    this.getCategoryData();
    this.getManyPage();
    this.getProductData();
    this.getTypeProduct();
    this.getTypePrackage();
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

  getManyPage = () => {
    Axios.get(`${API_URL}/products/all`)
      .then((res) => {
        let count = Math.ceil(res.data.length / this.state.pageSize);
        this.setState({
          pagesCount: count,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getProductData = (page = this.state.currentPage) => {
    Axios.get(`${API_URL}/products`, {
      params: {
        pageSize: this.state.pageSize,
        page: page,
      },
    })
      .then((res) => {
        this.setState({ productDataList: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getTypeProduct = () => {
    Axios.get(`${API_URL}/products/typeProduct`)
      .then((res) => {
        this.setState({ dataTypeProduct: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getTypePrackage = () => {
    Axios.get(`${API_URL}/products/typePackage`)
      .then((res) => {
        this.setState({ dataTypePackage: res.data });
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

  renderPackageList = () => {
    return this.state.dataTypePackage.map((val) => {
      const { id, productName } = val;
      return (
        <option key={`Package-${id}`} value={`${id}`}>
          {productName}
        </option>
      );
    });
  };

  renderProductList = () => {
    return this.state.dataTypeProduct.map((val) => {
      const { id, productName } = val;
      return (
        <option key={`Product-${id}`} value={`${id}`}>
          {productName}
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
        type,
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
                    <div className="">Type: {type}</div>
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

  selectOptionHandler = (e, field, form) => {
    const { value } = e.target;
    if (field === "type" || field === "packageId" || field === "productId") {
      this.setState({
        [form]: {
          ...this.state[form],
          [field]: value,
        },
      });
    } else {
      this.setState({ [field]: value });
    }
  };

  addProductToPackage = () => {
    Axios.post(
      `${API_URL}/products/${this.state.package.productId}/package/${this.state.package.packageId}`
    )
      .then((res) => {
        // console.log(res.data);
        swal(
          "Success!",
          "The product has been added to the package",
          "success"
        );
        this.setState({
          package: {
            packageId: 0,
            productId: 0,
          },
          activePage: "Show Product",
        });
        this.getProductData();
        this.getTypeProduct();
        this.getTypePrackage();
      })
      .catch((err) => {
        console.log(err);
      });
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
              if (res.data.type === "Package") {
                // console.log(res.data.type);
                Axios.post(`${API_URL}/packages`, {
                  idInProduct: res.data.id,
                })
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
                        type: "",
                      },
                      categoryId: "",
                      selectedFile: null,
                      activePage: "Show Product",
                    });
                    this.getProductData();
                    this.getTypeProduct();
                    this.getTypePrackage();
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              } else {
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
                    type: "",
                  },
                  categoryId: "",
                  selectedFile: null,
                  activePage: "Show Product",
                });
                this.getProductData();
                this.getTypeProduct();
                this.getTypePrackage();
              }
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
        // console.log(this.state.editProductForm);
        Axios.put(`${API_URL}/products`, this.state.editProductForm)
          .then((res) => {
            // console.log(res.data);
            if (res.data.type === "Package") {
              Axios.post(`${API_URL}/packages`, {
                idInProduct: res.data.id,
              })
                .then((res) => {
                  swal(
                    "Success!",
                    "The product has been added to the list",
                    "success"
                  );
                  this.setState({
                    selectedFile: null,
                    modalOpen: false,
                  });
                  this.getProductData();
                  this.getTypeProduct();
                  this.getTypePrackage();
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              Axios.delete(`${API_URL}/packages/${res.data.id}`)
                .then((res) => {
                  swal(
                    "Success!",
                    "The product has been added to the list",
                    "success"
                  );
                  this.setState({
                    selectedFile: null,
                    modalOpen: false,
                  });
                  this.getProductData();
                  this.getTypeProduct();
                  this.getTypePrackage();
                })
                .catch((err) => {
                  console.log(err);
                });
            }
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
        this.getTypeProduct();
        this.getTypePrackage();
      })
      .catch((err) => {
        swal("Error!", "The product couldn't be removed", "error");
      });
  };

  paginationHandler = (idx) => {
    this.setState({
      currentPage: idx,
    });
    this.getProductData(idx);
  };

  render() {
    const { pagesCount, currentPage } = this.state;
    return (
      <div className="dashboard-container">
        <h1 style={{ color: "#645954" }}>Products</h1>
        <div className="d-flex mt-2 mb-3">
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
          <ButtonUI
            type="text-dark"
            onClick={() =>
              this.setState({ activePage: "Add Product To Package" })
            }
          >
            Add Products To Package
          </ButtonUI>
        </div>
        {this.state.activePage === "Show Product" ? (
          <>
            <Table hover responsive>
              <thead>
                <tr key={`product-head`}>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody className="product-table">{this.renderProduct()}</tbody>
            </Table>
            <div className="pagination">
              <Pagination size="sm">
                <PaginationItem disabled={currentPage <= 0}>
                  <PaginationLink
                    onClick={() => this.paginationHandler(currentPage - 1)}
                    previous
                    href="#"
                  />
                </PaginationItem>
                {[...Array(pagesCount)].map((page, idx) => {
                  return (
                    <PaginationItem
                      active={idx === currentPage}
                      key={`page-${idx + 1}`}
                    >
                      <PaginationLink
                        onClick={() => this.paginationHandler(idx)}
                        href="#"
                      >
                        {idx + 1}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
                <PaginationItem disabled={currentPage >= pagesCount - 1}>
                  <PaginationLink
                    onClick={() => this.paginationHandler(currentPage + 1)}
                    next
                    href="#"
                  />
                </PaginationItem>
              </Pagination>
            </div>
          </>
        ) : this.state.activePage === "Add Product" ? (
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
                onChange={(e) => this.selectOptionHandler(e, "categoryId")}
              >
                <option defaultValue value="">
                  Category
                </option>
                {this.renderCategory()}
              </select>
              <select
                className="custom-select input-group mt-3"
                value={this.state.newProductForm.type}
                onChange={(e) =>
                  this.selectOptionHandler(e, "type", "newProductForm")
                }
              >
                <option defaultValue value="">
                  Type
                </option>
                <option value="Product" key={`new-product`}>
                  Product
                </option>
                <option value="Package" key={`new-package`}>
                  Package
                </option>
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
                        type: "",
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
        ) : (
          <div className="addProduct-container">
            <div className="addProduct-form">
              <h4>Add Products To Package</h4>
              <select
                className="custom-select input-group mt-3"
                value={this.state.package.packageId}
                onChange={(e) =>
                  this.selectOptionHandler(e, "packageId", "package")
                }
              >
                <option defaultValue value="0">
                  Package
                </option>
                {this.renderPackageList()}
              </select>
              <select
                className="custom-select input-group mt-3"
                value={this.state.package.productId}
                onChange={(e) =>
                  this.selectOptionHandler(e, "productId", "package")
                }
              >
                <option defaultValue value="0">
                  Product
                </option>
                {this.renderProductList()}
              </select>
              <div className="d-flex justify-content-center mt-4">
                <ButtonUI
                  type="contain-dark"
                  onClick={this.addProductToPackage}
                  className="mr-4"
                >
                  Add
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
                        type: "",
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
                onChange={(e) => this.selectOptionHandler(e, "categoryId")}
              >
                <option defaultValue value="">
                  Category
                </option>
                {this.renderCategory()}
              </select>
              <select
                className="custom-select input-group mt-3"
                value={this.state.editProductForm.type}
                onChange={(e) =>
                  this.selectOptionHandler(e, "type", "editProductForm")
                }
              >
                <option defaultValue value="">
                  Type
                </option>
                <option value="Product" key={`edit-product`}>
                  Product
                </option>
                <option value="Package" key={`edit-package`}>
                  Package
                </option>
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
