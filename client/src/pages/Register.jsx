import React, { useState, useContext } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { AppContext } from "../context/AppContext.js";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [nameValid, setNameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(true);

  const { registerUser } = useContext(AppContext);

  const submitHandler = async function (e) {
    e.preventDefault();

    let isValid = true;

    if (!name) {
      setNameValid(false);
      isValid = false;
    } else {
      setNameValid(true);
    }

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

    if (!confirmPassword) {
      setConfirmPasswordValid(false);
      isValid = false;
    } else {
      setConfirmPasswordValid(true);
    }

    if (password !== confirmPassword) {
      setConfirmPasswordValid(false);
      toast.error("Passwords do not match");
      isValid = false;
    } else {
      setConfirmPasswordValid(true);
    }

    if (!isValid) {
      toast.error("All fields are required");
      return;
    }

    registerUser(name, email, password);
  };

  return (
    <FormContainer>
      <h1>Register</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            isInvalid={!nameValid}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            Name is required
          </Form.Control.Feedback>
        </Form.Group>

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

        <Form.Group className="my-2" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            isInvalid={!confirmPasswordValid}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            {password !== confirmPassword
              ? "Passwords do not match"
              : "Confirm Password is required"}
          </Form.Control.Feedback>
        </Form.Group>

        <Button type="submit" variant="primary">
          Register
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Already have an account? <Link to="/login">Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default Register;
