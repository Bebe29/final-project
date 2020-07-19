import React, { Component } from "react";
import "./History.css";
import { Table, Modal, ModalHeader, ModalBody } from "reactstrap";
import Axios from "axios";
import { API_URL } from "../../../../constants/API";
import { connect } from "react-redux";
import FileUI from "../../../components/InputFile/InputFile";
import ButtonUI from "../../../components/Button/Button";
import swal from "sweetalert";

class History extends Component {
  state = {
    transactionData: [],
    modalOpen: false,
    selectedFile: null,
    activeModal: 0,
  };

  componentDidMount() {
    this.getTransactionData();
  }

  getTransactionData = () => {
    Axios.get(`${API_URL}/transactions/${this.props.user.id}`)
      .then((res) => {
        this.setState({ transactionData: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  toogleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };

  fileChangeHandler = (e) => {
    this.setState({ selectedFile: e.target.files[0] });
    // console.log(e.target.files[0]);
  };

  renderTransaction = () => {
    return this.state.transactionData.map((val, idx) => {
      const { status, subTotalPrice } = val;
      return (
        <tr key={`trans-${idx}`}>
          <td>{idx + 1}</td>
          <td>{status}</td>
          <td>
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(subTotalPrice)}
          </td>
          <td>
            <div className="d-flex justify-content-center align-items-center">
              {status === "Waiting to pay" ? (
                <ButtonUI
                  type="contain-dark"
                  onClick={() =>
                    this.setState({ modalOpen: true, activeModal: idx })
                  }
                >
                  Pay Now
                </ButtonUI>
              ) : status === "Reject please upload receipt again" ? (
                <ButtonUI
                  type="contain-dark"
                  onClick={() =>
                    this.setState({ modalOpen: true, activeModal: idx })
                  }
                >
                  Reupload
                </ButtonUI>
              ) : null}
            </div>
          </td>
        </tr>
      );
    });
  };

  uploadReceipt = () => {
    let formData = new FormData();
    const { id, subTotalPrice, user } = this.state.transactionData[
      this.state.activeModal
    ];
    formData.append(
      "file",
      this.state.selectedFile,
      this.state.selectedFile.name
    );
    formData.append(
      "paymentData",
      JSON.stringify(this.state.transactionData[this.state.activeModal])
    );
    Axios.post(`${API_URL}/transactions`, formData)
      .then((res) => {
        Axios.put(`${API_URL}/transactions/${id}`, {
          id: id,
          receipt: res.data,
          status: "Waiting to approval",
          user: user,
          subTotalPrice: subTotalPrice,
        })
          .then((res) => {
            swal(
              "The Payment Success!",
              "Please wait for approval from admin",
              "success"
            );
            this.setState({
              selectedFile: null,
              modalOpen: false,
            });
            this.getTransactionData();
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
        <h1 style={{ color: "#645954" }}>History</h1>
        <Table hover responsive>
          <thead>
            <tr>
              <th>No</th>
              <th>Status</th>
              <th>Price</th>
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
          <ModalHeader toggle={this.toogleModal}>Upload Receipt</ModalHeader>
          <ModalBody>
            <div>
              <FileUI onChange={this.fileChangeHandler}>
                {this.state.selectedFile ? this.state.selectedFile.name : ""}
              </FileUI>
              <div className="d-flex justify-content-center mt-4">
                <ButtonUI
                  type="outline-dark"
                  onClick={() =>
                    this.setState({ modalOpen: false, selectedFile: null })
                  }
                  className="mr-4"
                >
                  Cancel
                </ButtonUI>
                <ButtonUI type="contain-dark" onClick={this.uploadReceipt}>
                  Upload
                </ButtonUI>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(History);
