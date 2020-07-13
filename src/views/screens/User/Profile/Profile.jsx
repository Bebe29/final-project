import React, { Component } from "react";
import "./Profile.css";

import Axios from "axios";
import { connect } from "react-redux";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import swal from "sweetalert";
import { Link } from "react-router-dom";

import { API_URL } from "../../../../constants/API";
import ButtonUI from "../../../components/Button/Button";
import PasswordUI from "../../../components/InputPassword/Password";

class Profile extends Component {
  state = {
    userData: {},
    disableInput: "yes",
    userProfileForm: {
      id: 0,
      phoneNumber: "",
      streetName: "",
      city: "",
      zipCode: "",
    },
    updateFullName: "",
    modalOpen: false,
    showPassword: {
      showOld: false,
      showNew: false,
    },
    inputPass: {
      oldPass: "",
      newPass: "",
    },
  };

  componentDidMount() {
    this.getDataUser();
  }

  getDataUser = () => {
    Axios.get(`${API_URL}/users/${this.props.user.id}`)
      .then((res) => {
        // console.log(res.data);
        this.setState({
          userData: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  editBtnHandler = () => {
    if (this.state.userData.verified) {
      if (this.state.userData.userProfile) {
        this.setState({
          updateFullName: this.state.userData.fullName,
          userProfileForm: this.state.userData.userProfile,
          disableInput: "no",
        });
      } else {
        this.setState({
          updateFullName: this.state.userData.fullName,
          disableInput: "no",
        });
      }
    } else {
      swal("Verify Account!", "Please verify your account first", "warning");
    }
  };

  profileInputHandler = (e, field) => {
    const { value } = e.target;
    if (field === "updateFullName") {
      this.setState({
        [field]: value,
      });
    } else {
      this.setState({
        userProfileForm: { ...this.state.userProfileForm, [field]: value },
      });
    }
  };

  saveHandler = () => {
    let userForm = { ...this.state.userData };
    userForm = {
      ...userForm,
      fullName: this.state.updateFullName,
      userProfile: this.state.userProfileForm,
    };
    Axios.put(`${API_URL}/users/profile`, userForm)
      .then((res) => {
        this.setState({ userData: res.data, disableInput: "yes" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  toogleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };

  showHandler = (field) => {
    this.setState({
      showPassword: {
        ...this.state.showPassword,
        [field]: !this.state.showPassword[field],
      },
    });
  };

  passwordInputHandler = (e, field) => {
    const { value } = e.target;
    this.setState({
      inputPass: {
        ...this.state.inputPass,
        [field]: value,
      },
    });
  };

  changePassword = () => {
    Axios.get(`${API_URL}/users/${this.state.userData.id}/changePassword`, {
      params: {
        oldPass: this.state.inputPass.oldPass,
        newPass: this.state.inputPass.newPass,
      },
    })
      .then((res) => {
        // console.log(res.data);
        if (res.data) {
          swal("Success!", "Your password has been changed", "success");
          this.setState({
            inputPass: {
              oldPass: "",
              newPass: "",
            },
            showPassword: {
              showOld: false,
              showNew: false,
            },
            modalOpen: false,
          });
        } else {
          swal("Error!", "Sorry, your password couldn't be changed", "error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    // console.log(this.state.userData);
    const { username, fullName, email, userProfile } = this.state.userData;
    return (
      <div className="profile-container">
        <h1>Profile</h1>
        <div className="profile-content-container mt-3">
          {this.state.disableInput === "yes" ? (
            <>
              <div>
                <h6>Username :</h6>
                <div className="custom-input content-wrap">{username}</div>
              </div>
              <div className="mt-3">
                <h6>Full Name :</h6>
                <div className="custom-input content-wrap">{fullName}</div>
              </div>
              <div className="mt-3">
                <h6>Email :</h6>
                <div className="custom-input content-wrap">{email}</div>
                {/* <input className="custom-input" value={email} disabled /> */}
              </div>
              <div className="mt-3">
                <h6>Phone Number :</h6>
                <div className="custom-input">
                  {!userProfile
                    ? "-"
                    : userProfile.phoneNumber === ""
                    ? "-"
                    : userProfile.phoneNumber}
                </div>
              </div>
              <div className="mt-3">
                <h6>Address</h6>
                <div className="mt-2">
                  Street :
                  <div className="custom-input content-wrap">
                    {!this.state.userData.userProfile
                      ? "-"
                      : userProfile.streetName === ""
                      ? "-"
                      : userProfile.streetName}
                  </div>
                </div>
                <div className="mt-2">
                  City :{" "}
                  <div className="custom-input">
                    {!this.state.userData.userProfile
                      ? "-"
                      : userProfile.city === ""
                      ? "-"
                      : userProfile.city}
                  </div>
                </div>
                <div className="mt-2">
                  ZIP Code :{" "}
                  <div className="custom-input">
                    {!this.state.userData.userProfile
                      ? "-"
                      : userProfile.zipCode === ""
                      ? "-"
                      : userProfile.zipCode}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <h6>Username :</h6>
                <input
                  className="custom-input"
                  value={username}
                  style={{ color: "#312A27" }}
                  disabled
                />
              </div>
              <div className="mt-3">
                <h6>Full Name :</h6>
                <input
                  className="custom-input"
                  onChange={(e) =>
                    this.profileInputHandler(e, "updateFullName")
                  }
                  value={this.state.updateFullName}
                />
              </div>
              <div className="mt-3">
                <h6>Email :</h6>
                <input
                  className="custom-input"
                  value={email}
                  style={{ color: "#312A27" }}
                  disabled
                />
              </div>
              <div className="mt-3">
                <h6>Phone Number :</h6>
                <input
                  className="custom-input"
                  pattern="[0-9]*"
                  onChange={(e) => this.profileInputHandler(e, "phoneNumber")}
                  value={this.state.userProfileForm.phoneNumber}
                  placeholder="081234567890"
                />
              </div>
              <div className="mt-3">
                <h6>Address</h6>
                <div className="mt-2">
                  Street :
                  <input
                    className="custom-input"
                    onChange={(e) => this.profileInputHandler(e, "streetName")}
                    value={this.state.userProfileForm.streetName}
                    placeholder="Street Name"
                  />
                </div>
                <div className="mt-2">
                  City :{" "}
                  <input
                    className="custom-input"
                    onChange={(e) => this.profileInputHandler(e, "city")}
                    value={this.state.userProfileForm.city}
                    placeholder="City Name"
                  />
                </div>
                <div className="mt-2">
                  ZIP Code :{" "}
                  <input
                    className="custom-input"
                    pattern="[0-9]*"
                    onChange={(e) => this.profileInputHandler(e, "zipCode")}
                    value={this.state.userProfileForm.zipCode}
                    placeholder="00000"
                  />
                </div>
              </div>
            </>
          )}
          <div className="d-flex justify-content-center align-items-center mt-4">
            {this.state.disableInput === "yes" ? (
              <>
                <ButtonUI
                  className="mr-3"
                  type="contain-dark"
                  onClick={this.editBtnHandler}
                >
                  Edit
                </ButtonUI>
                <ButtonUI onClick={() => this.setState({ modalOpen: true })}>
                  Change Password
                </ButtonUI>
              </>
            ) : (
              <>
                <ButtonUI
                  type="outline-dark"
                  className="mr-3"
                  onClick={() => this.setState({ disableInput: "yes" })}
                >
                  Cancel
                </ButtonUI>
                <ButtonUI type="contain-dark" onClick={this.saveHandler}>
                  Save
                </ButtonUI>
              </>
            )}
          </div>
        </div>
        <Modal
          toggle={this.toogleModal}
          isOpen={this.state.modalOpen}
          className="edit-modal"
          centered
        >
          <ModalHeader toggle={this.toogleModal}>Change Password</ModalHeader>
          <ModalBody>
            <div>
              <p className="content-lg mt-4">Old Password:</p>
              <PasswordUI
                value={this.state.inputPass.oldPass}
                type={this.state.showPassword.showOld ? "text" : "password"}
                placeholder="Old Password"
                onChange={(e) => this.passwordInputHandler(e, "oldPass")}
                onClick={() => this.showHandler("showOld")}
              />
              <p className="content-lg mt-4">New Password:</p>
              <PasswordUI
                value={this.state.inputPass.newPass}
                type={this.state.showPassword.showNew ? "text" : "password"}
                placeholder="New Password"
                onChange={(e) => this.passwordInputHandler(e, "newPass")}
                onClick={() => this.showHandler("showNew")}
              />
              <div className="content-sm mt-2 d-flex justify-content-center">
                <Link
                  to="/forgot"
                  style={{
                    textDecoration: "none",
                    color: "#645954",
                  }}
                >
                  Forgot your password?
                </Link>
              </div>
              <div className="d-flex justify-content-center mt-4 mb-3">
                <ButtonUI
                  type="outline-dark"
                  onClick={() =>
                    this.setState({
                      inputPass: {
                        oldPass: "",
                        newPass: "",
                      },
                      showPassword: {
                        showOld: false,
                        showNew: false,
                      },
                      modalOpen: false,
                    })
                  }
                  className="mr-4"
                >
                  Cancel
                </ButtonUI>
                <ButtonUI type="contain-dark" onClick={this.changePassword}>
                  Change
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

export default connect(mapStateToProps)(Profile);
