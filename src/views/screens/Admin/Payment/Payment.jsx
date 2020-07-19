import React, { Component } from "react";
import "./Payment.css";
import { Table, Modal, ModalHeader, ModalBody } from "reactstrap";
import Axios from "axios";
import { API_URL } from "../../../../constants/API";
import ButtonUI from "../../../components/Button/Button";

class Payment extends Component {
  state = {
    transactionData: [],
    modalOpen: false,
    selectedFile: null,
    receiptActive: "",
    activeTransaction: 0,
    activeModal: 0,
  };

  componentDidMount() {
    this.getTransactionData();
  }

  getTransactionData = () => {
    Axios.get(`${API_URL}/transactions/admin`)
      .then((res) => {
        // console.log(res.data);
        this.setState({ transactionData: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  toogleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };

  renderTransaction = () => {
    return this.state.transactionData.map((val, idx) => {
      const { status, user, receipt, id } = val;
      return (
        <tr key={`trans-${idx}`}>
          <td>{idx + 1}</td>
          <td>{user.username}</td>
          <td>{status}</td>
          <td>
            <div className="d-flex justify-content-center align-items-center">
              {status === "Payment Accept" ? null : (
                <ButtonUI
                  type="contain-dark"
                  onClick={() =>
                    this.setState({
                      modalOpen: true,
                      receiptActive: receipt,
                      activeTransaction: id,
                      activeModal: idx,
                    })
                  }
                >
                  See Receipt
                </ButtonUI>
              )}
            </div>
          </td>
        </tr>
      );
    });
  };

  rejectHandler = (id) => {
    Axios.put(`${API_URL}/transactions/${id}`, {
      id: id,
      receipt: this.state.receiptActive,
      status: "Reject please upload receipt again",
      user: this.state.transactionData[this.state.activeModal].user,
      subTotalPrice: this.state.transactionData[this.state.activeModal]
        .subTotalPrice,
    })
      .then((res) => {
        this.setState({ modalOpen: false });
        this.getTransactionData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  accHandler = (id) => {
    Axios.put(`${API_URL}/transactions/${id}`, {
      id: id,
      receipt: this.state.receiptActive,
      status: "Payment Accept",
      user: this.state.transactionData[this.state.activeModal].user,
      subTotalPrice: this.state.transactionData[this.state.activeModal]
        .subTotalPrice,
    })
      .then((res) => {
        Axios.get(`${API_URL}/transactionDetails/transactionId/${id}`)
          .then((res) => {
            // console.log(res.data);
            let message = "";
            res.data.forEach((val) => {
              message += `<h4>${val.product.productName}|${val.quantity}|${val.price}|${val.total}<h4>\n`;
            });
            Axios.get(`${API_URL}/transactionDetails/invoice`, {
              params: {
                detail: message,
                subTotalPrice: this.state.transactionData[
                  this.state.activeModal
                ].subTotalPrice,
                userId: this.state.transactionData[this.state.activeModal].user
                  .id,
              },
            })
              .then((res) => {
                this.setState({ modalOpen: false });
                this.getTransactionData();
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="cart-container">
        <h1 style={{ color: "#645954" }}>Payment</h1>
        <Table hover responsive>
          <thead>
            <tr>
              <th>No</th>
              <th>Username</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.renderTransaction()}</tbody>
        </Table>
        <Modal
          toggle={this.toogleModal}
          isOpen={this.state.modalOpen}
          className="edit-modal"
          centered
        >
          <ModalHeader toggle={this.toogleModal}>Receipt</ModalHeader>
          <ModalBody>
            <div>
              <div className="d-flex justify-content-center">
                <img
                  src={this.state.receiptActive}
                  alt=""
                  style={{
                    width: "300px",
                    height: "300px",
                    objectFit: "contain",
                  }}
                />
              </div>
              <div className="d-flex justify-content-center mt-4">
                <ButtonUI
                  type="outline-dark"
                  onClick={() =>
                    this.rejectHandler(this.state.activeTransaction)
                  }
                  className="mr-4"
                >
                  Reject
                </ButtonUI>
                <ButtonUI
                  type="contain-dark"
                  onClick={() => this.accHandler(this.state.activeTransaction)}
                >
                  Accept
                </ButtonUI>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default Payment;
