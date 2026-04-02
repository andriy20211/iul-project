import React, { useState } from 'react';
import { Button, Form, Container, Card, Row, Col, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Registration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');

    const navigate = useNavigate();

    const handleAuth = async (path) => {
        const res = await fetch(`/api/${path}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });
        const data = await res.json();
        setMessage(data.message);

        if (res.ok) {
            if (data.user) {
                localStorage.setItem('user', JSON.stringify(data.user));
            }
            navigate('/welcome');
        }
    };

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
            <Row className="w-100 justify-content-center">
                <Col md={8} lg={5}>
                    <Card className="shadow-sm border-0 rounded-4 p-4">
                        <Card.Body>
                            <h2 className="text-center mb-4 fw-bold">Create Account</h2>
                            
                            {/* Show message only if it exists */}
                            {message && (
                                <Alert variant={message.includes('success') ? 'success' : 'danger'}>
                                    {message}
                                </Alert>
                            )}

                            <Form>
                                <Form.Group className="mb-3" controlId="formName">
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Enter your name" 
                                        onChange={e => setName(e.target.value)} 
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formEmail">
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control 
                                        type="email" 
                                        placeholder="name@example.com" 
                                        onChange={e => setEmail(e.target.value)} 
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control 
                                        type="password" 
                                        placeholder="Create a password" 
                                        onChange={e => setPassword(e.target.value)} 
                                    />
                                </Form.Group>

                                <div className="d-grid gap-2">
                                    <Button 
                                        variant="primary" 
                                        size="lg" 
                                        onClick={() => handleAuth('register')}
                                        className="rounded-pill"
                                    >
                                        Sign Up
                                    </Button>
                                </div>
                            </Form>

                            <div className="text-center mt-4">
                                <span className="text-muted">Already have an account? </span>
                                <Link to="/login" className="text-decoration-none fw-bold">Log In</Link>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Registration;