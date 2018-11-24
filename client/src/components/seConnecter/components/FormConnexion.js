import React from "react";
import {
  Button,
  Form,
  FormGroup,
  Col,
  FormControl,
  ControlLabel
} from "react-bootstrap";

class ConnexionForm extends React.Component {
  render() {
    return (
      <Form horizontal>
        <FormGroup controlId="formControlsUsername">
          <Col componentClass={ControlLabel} sm={2}>
            Username
          </Col>
          <Col sm={10}>
            <FormControl type="Text" placeholder="Username" />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} sm={2}>
            Password
          </Col>
          <Col sm={10}>
            <FormControl type="password" placeholder="Password" />
          </Col>
        </FormGroup>

        <Button type="submit">OK</Button>
      </Form>
    );
  }
}

export default ConnexionForm;
