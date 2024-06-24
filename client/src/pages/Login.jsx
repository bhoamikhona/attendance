import React, { useState, useContext } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer.jsx";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext.js";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  const { loginUser } = useContext(AppContext);

  const submitHandler = async function (e) {
    e.preventDefault();

    let isValid = true;

    if (!email) {
      setEmailValid(false);
      isValid = false;
    } else {
      setEmailValid(true);
    }

    if (!password) {
      setPasswordValid(false);
      isValid = false;
    } else {
      setPasswordValid(true);
    }

    loginUser(email, password);
    // console.log(AppContext);
  };

  return (
    <FormContainer>
      <h1>Login</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isInvalid={!emailValid}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            Email is required
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isInvalid={!passwordValid}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            Password is required
          </Form.Control.Feedback>
        </Form.Group>

        <Button type="submit" variant="primary">
          Login
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Don't have an account? <Link to="/register">Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default Login;
