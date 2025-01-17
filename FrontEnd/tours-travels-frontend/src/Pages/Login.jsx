import React, { useState, useContext } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import loginImg from "../assets/images/login1.jpg";
import userIcon from "../assets/images/user.png";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../utils/config";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    // Email validation
    if (!credentials.email) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      tempErrors.email = "Email is invalid";
      isValid = false;
    }

    // Password validation
    if (!credentials.password) {
      tempErrors.password = "Password is required";
      isValid = false;
    } else if (credentials.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [id]: value
    }));
    // Clear error when user starts typing
    if (errors[id]) {
      setErrors(prev => ({
        ...prev,
        [id]: ""
      }));
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setError(null);
    dispatch({ type: "LOGIN_START" });

    try {
      const url = `${BASE_URL.replace(/\/$/, "")}/auth/login`;

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(credentials),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.message);
        dispatch({ type: "LOGIN_FAILURE", payload: result.message });
      } else {
        dispatch({ type: "LOGIN_SUCCESS", payload: result });
        setSuccess("Login successful!");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (err) {
      setError("An error occurred while logging in. Please try again later.");
      dispatch({ type: "LOGIN_FAILURE", payload: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={loginImg} alt="" />
              </div>

              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Login</h2>

                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}

                <Form onSubmit={handleClick}>
                  <FormGroup className="form__group">
                    <input
                      type="email"
                      placeholder="Email"
                      id="email"
                      value={credentials.email}
                      onChange={handleChange}
                      className={errors.email ? 'error' : ''}
                    />
                    {errors.email && <span className="error__message">{errors.email}</span>}
                  </FormGroup>

                  <FormGroup className="form__group">
                    <div className="password__input">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        id="password"
                        value={credentials.password}
                        onChange={handleChange}
                        className={errors.password ? 'error' : ''}
                      />
                      <i
                        className={`ri-eye${showPassword ? '-off' : ''}-line`}
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    </div>
                    {errors.password && <span className="error__message">{errors.password}</span>}
                  </FormGroup>

                  <Button
                    className={`auth__btn ${isLoading ? 'loading' : ''}`}
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="loading__spinner">
                        <i className="ri-loader-4-line"></i>
                      </span>
                    ) : (
                      'Login'
                    )}
                  </Button>
                </Form>
                <p>
                  Don't have an account? <Link to="/register">Register</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
