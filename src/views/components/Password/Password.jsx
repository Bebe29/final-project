import React, { Component } from "react";
// import "./Input.css";

import { InputGroup, InputGroupAddon, Input, Button } from "reactstrap";
// import ButtonUI from "../Button/Button";

class Password extends Component {
  render() {
    return (
      // <InputGroup>
      //   <Input placeholder="Password" />
      //   <InputGroupAddon addonType="append">
      //     <Button color="secondary">To the Right!</Button>
      //   </InputGroupAddon>
      // </InputGroup>
      <InputGroup>
        <Input placeholder="Password" />
        <InputGroupAddon addonType="append"></InputGroupAddon>
      </InputGroup>
    );
  }
}

export default Password;
