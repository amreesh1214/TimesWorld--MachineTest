import React, { useState } from 'react';
import vector from '../assets/images/HeroVector.png';
import { Container, Row, Col, Form, Button, Image, ProgressBar } from 'react-bootstrap';
import { FiFacebook, FiLinkedin, FiTwitter } from 'react-icons/fi';
import { TbBrandGoogle } from 'react-icons/tb';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        userName: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const [criteria, setCriteria] = useState({
        uppercase: false,
        number: false,
        specialChar: false,
        minLength: false,
    });

    const validatePassword = (password) => {
        const newCriteria = {
            uppercase: /[A-Z]/.test(password),
            number: /[0-9]/.test(password),
            specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
            minLength: password.length >= 8,
        };
        setCriteria(newCriteria);
        return Object.values(newCriteria).filter(Boolean).length;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({ ...prev, [name]: value }));

        // Clear the error for this field if it's valid
        setErrors((prevErrors) => {
            const updatedErrors = { ...prevErrors };
            if (name === 'userName' && value.trim()) {
                delete updatedErrors.userName;
            }
            if (name === 'password') {
                validatePassword(value);
                if (value && validatePassword(value) === 4) {
                    delete updatedErrors.password;
                }
            }
            return updatedErrors;
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!formData.userName.trim()) newErrors.userName = 'Username is required';
        if (!formData.password) newErrors.password = 'Password is required';
        else if (validatePassword(formData.password) < 4)
            newErrors.password = 'Password does not meet all criteria';

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            navigate('/home');
        }
    };

    const strength = Object.values(criteria).filter(Boolean).length;
    const strengthVariant = ['danger', 'warning', 'info', 'success'][strength - 1] || 'danger';

    const renderCriteria = (label, condition) => {
        if (!formData.password) return null;
        return (
            <div className="d-flex align-items-center mb-1">
                {condition ? (
                    <FaCheckCircle className="green-text me-2" />
                ) : (
                    <FaExclamationCircle className="danger-text me-2" />
                )}
                <span>{label}</span>
            </div>
        );
    };

    return (
        <div className="min-vh-100 d-flex align-items-center bg-light">
            <Container>
                <Row className="justify-content-center">
                    <Col md={6} sm={12} className="d-flex flex-column justify-content-center">
                        <h1 className="fw-bold mb-4">Sign In</h1>
                        <h5 className="mb-4">
                            New user?{' '}
                            <a href="/signup" className="text-primary text-decoration-none">
                                Create an account
                            </a>
                        </h5>
                        <div className='col-12 col-md-9 col-lg-8'>
                            <Form onSubmit={handleSubmit} className="w-100 w-md-75">
                                <Form.Group className="mb-3">
                                    <Form.Control
                                        type="text"
                                        placeholder="Username or email"
                                        name="userName"
                                        value={formData.userName}
                                        onChange={handleChange}
                                        isInvalid={!!errors.userName}
                                    />
                                    <Form.Control.Feedback type="invalid" className='text-danger'>{errors.userName}</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        isInvalid={!!errors.password}
                                    />
                                    <Form.Control.Feedback type="invalid" className='text-danger'>{errors.password}</Form.Control.Feedback>
                                </Form.Group>

                                {formData.password && (
                                    <>
                                        <ProgressBar
                                            now={(strength / 4) * 100}
                                            variant={strengthVariant}
                                            className="mb-2 text-danger"
                                            label={`${(strength / 4) * 100}%`}

                                        />
                                        <div className="mb-3">
                                            {renderCriteria('At least 1 uppercase letter', criteria.uppercase)}
                                            {renderCriteria('At least 1 number', criteria.number)}
                                            {renderCriteria('At least 1 special character (!@#$...)', criteria.specialChar)}
                                            {renderCriteria('Minimum 8 characters', criteria.minLength)}
                                        </div>
                                    </>
                                )}

                                <Form.Group className="mb-3 d-flex align-items-center">
                                    <Form.Check type="checkbox" id="remember" label="Keep me signed in" />
                                </Form.Group>

                                <Button variant="secondary" className="w-100 mb-3" type="submit">
                                    Sign In
                                </Button>

                                <div className="text-center my-3">
                                    <div className="separator">Or Sign In With</div>
                                </div>

                                <div className="d-flex justify-content-center gap-3 icon-container">
                                    <TbBrandGoogle />
                                    <FiFacebook />
                                    <FiLinkedin />
                                    <FiTwitter />
                                </div>
                            </Form></div>
                    </Col>

                    {/* Right Side Illustration */}
                    <Col md={6} className="d-none d-md-flex justify-content-center align-items-center">
                        <Image src={vector} fluid style={{ height: '70vh', objectFit: 'cover' }} />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Signin;
