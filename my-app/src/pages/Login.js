import React, { useState } from 'react';
import { Button, Form, Container, Card, Row, Col, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const handleAuth = async () => {
        const res = await fetch(`/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        
        const data = await res.json();
        setMessage(data.message);

        if (res.ok) {
            if (data.user) {
                localStorage.setItem('user', JSON.stringify(data.user));
            }
            navigate('/');
        }
    };

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
            <Row className="w-100 justify-content-center">
                <Col md={8} lg={5}>
                    <Card className="shadow-sm border-0 rounded-4 p-4">
                        <Card.Body>
                            <div className="text-center mb-4">
                                <h2 className="fw-bold">Welcome Back</h2>
                                <p className="text-muted">Please enter your details to log in</p>
                            </div>

                            {/* Alert for errors or success messages */}
                            {message && (
                                <Alert variant={message.toLowerCase().includes('success') ? 'success' : 'danger'} className="py-2">
                                    {message}
                                </Alert>
                            )}

                            <Form>
                                <Form.Group className="mb-3" controlId="formEmail">
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control 
                                        type="email" 
                                        placeholder="Enter email" 
                                        value={email}
                                        onChange={e => setEmail(e.target.value)} 
                                        className="py-2"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control 
                                        type="password" 
                                        placeholder="Enter password" 
                                        value={password}
                                        onChange={e => setPassword(e.target.value)} 
                                        className="py-2"
                                    />
                                </Form.Group>

                                <div className="d-grid gap-2">
                                    <Button 
                                        variant="primary" 
                                        size="lg" 
                                        onClick={handleAuth}
                                        className="rounded-pill fw-bold"
                                    >
                                        Log In
                                    </Button>
                                </div>
                            </Form>

                            <div className="text-center mt-4">
                                <span className="text-muted">Don't have an account? </span>
                                <Link to="/register" className="text-decoration-none fw-bold">Sign Up</Link>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;