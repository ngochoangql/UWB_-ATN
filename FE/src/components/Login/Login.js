import { Divider, Input } from "antd";
import React, { useState } from "react";
import "./Login.scss";
import { Link } from "react-router-dom";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Container from "react-bootstrap/Container";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    const apiUrl =   "http://localhost:3001/api/user/login";
    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(apiUrl, data);
      const token = response.data;
      if (token.status === "401") {
        toast.error("Login Failure!");
      } else {
    
        localStorage.setItem("userId", token.userId);
        localStorage.setItem("role", token.role);
        toast.success("Login Success");
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  return (
    <>
    
      <Container 
        style={{ 
          height: "100%", 
          width: "100%",
          backgroundImage: "url('https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645.jpg')"
        }} 
      >
        <Row >
          <Col xs={6}>
            
             <img
              src = '../../../public/logo.png'
              width = "100%"
              height = "100%"
              alt = "image"
            />     
          </Col>
          <Col xs={6} >
            <h1>Hallo! WelcomeBack</h1>
            <div>
              <Form>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Check type="checkbox" label="Remember" />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleLogin}>
                  Login
                </Button>
              </Form>

              <div>
                <div>
                  Chưa có tài khoản?
                  <Link to={"/register"}>
                    <span>Đăng ký</span>
                  </Link>
                </div>
                <div>
                  <Link to={"/forgot-password"}>
                    <span>Quên mật khẩu</span>
                  </Link>
                </div>
              </div>
            </div>
      </Col>
        </Row>
      </Container>
  </>
  );
};

export default Login;
