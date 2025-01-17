import React, { useState, useContext } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Register.css";
import registerImg from "../assets/images/signup1.jpg";
import userIcon from "../assets/images/user.png";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../utils/config";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: "",
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

    // Username validation
    if (!credentials.username) {
      tempErrors.username = "Username is required";
      isValid = false;
    } else if (credentials.username.length < 3) {
      tempErrors.username = "Username must be at least 3 characters";
      isValid = false;
    }

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
    dispatch({ type: "REGISTER_START" });

    try {
      const res = await fetch(`${BASE_URL.replace(/\/$/, "")}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(credentials),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.message || "An error occurred while registering.");
        dispatch({ type: "REGISTER_FAILURE", payload: result.message });
      } else {
        setSuccess("Registration successful!");
        dispatch({ type: "REGISTER_SUCCESS", payload: result });
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (err) {
      setError("An error occurred while registering. Please try again later.");
      dispatch({ type: "REGISTER_FAILURE", payload: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="register__container d-flex justify-content-between">
              <div className="register__img">
                <img src={registerImg} alt="" />
              </div>

              <div className="register__form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Register</h2>

                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}

                <Form onSubmit={handleClick}>
                  <FormGroup className="form__group">
                    <input
                      type="text"
                      placeholder="Username"
                      id="username"
                      value={credentials.username}
                      onChange={handleChange}
                      className={errors.username ? 'error' : ''}
                    />
                    {errors.username && <span className="error__message">{errors.username}</span>}
                  </FormGroup>

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
                      'Create Account'
                    )}
                  </Button>
                </Form>
                <p>
                  Already have an account? <Link to="/login">Login</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Register;
