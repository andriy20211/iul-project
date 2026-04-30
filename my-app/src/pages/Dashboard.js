import { useState, useEffect } from 'react';
import { Toast, ToastContainer, Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

export default function Main() {
  const [user, setUser] = useState(null);
  const [isNewUser, setIsNewUser] = useState(false);
  const [showToast, setShowToast] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Get data from localStorage
    const savedData = localStorage.getItem('user');
    const registrationFlag = localStorage.getItem('isNewUser');

    // 2. Guard Clause: If NO user is found, send them back to Login
    if (!savedData) {
      console.log("No user found, redirecting to login...");
      navigate('/login'); 
      return; // Stop the rest of the function from running
    }

    // 3. If user exists, parse the data and update state
    try {
      const parsedUser = JSON.parse(savedData);
      setUser(parsedUser);
      
      if (registrationFlag === 'true') {
        setIsNewUser(true);
      
        localStorage.removeItem('isNewUser');
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      localStorage.removeItem('user');
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="bg-light" style={{ minHeight: '100vh' }}>
      {/* Dashboard Header */}
      <div className="bg-white border-bottom py-3 mb-4 shadow-sm">
        <Container className="d-flex justify-content-between align-items-center">
          <h4 className="mb-0 fw-bold text-primary">
          <Link to="/" className="text-decoration-none">SIMPLE PLAN</Link>
          </h4>
          <Button variant="outline-danger" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </Container>
      </div>

      <Container>
        {/* Welcome Message */}
        <Row className="mb-4">
          <Col>
            {user ? (
              <div className="p-4 bg-white rounded-4 shadow-sm border-0">
                <h2 className="fw-bold">
                  {isNewUser ? "Welcome to the family, " : "Welcome back, "}
                  <span className="text-primary">{user.name}</span>!
                </h2>
                <p className="text-muted mb-0">
                  {isNewUser
                    ? "We're so excited to have you on board. Start exploring your new account below."
                    : "Great to see you again! Here is what's happening with your account today."}
                </p>
              </div>
            ) : (
              <Card className="text-center p-5 border-0 shadow-sm">
                <Card.Body>
                  <h3>Please Log In</h3>
                  <p>You need an account to access this dashboard.</p>
                  <Button onClick={() => navigate('/login')}>Go to Login</Button>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>

        {/* Quick Stats/Actions */}
        {user && (
          <Row>
            <Col md={4} className="mb-3">
              <Card className="h-100 border-0 shadow-sm rounded-4">
                <Card.Body className="text-center">
                  <div className="h1 mb-2">👤</div>
                  <Card.Title className="fw-bold">My Profile</Card.Title>
                  <Card.Text className="text-muted small">{user.email}</Card.Text>
                  <Button variant="light" size="sm" className="w-100 rounded-pill">Edit Profile</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-3">
              <Card className="h-100 border-0 shadow-sm rounded-4">
                <Card.Body className="text-center">
                  <div className="h1 mb-2">📂</div>
                  <Card.Title className="fw-bold">My Projects</Card.Title>
                  <Badge bg="info" className="mb-2">0 Active</Badge>
                  <Button variant="light" size="sm" className="w-100 rounded-pill">View All</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-3">
              <Card className="h-100 border-0 shadow-sm rounded-4">
                <Card.Body className="text-center">
                  <div className="h1 mb-2">⚙️</div>
                  <Card.Title className="fw-bold">Settings</Card.Title>
                  <Card.Text className="text-muted small">Account Preferences</Card.Text>
                  <Button variant="light" size="sm" className="w-100 rounded-pill">Manage</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>

      {/*Toast Notification */}
      <ToastContainer position="bottom-end" className="p-3">
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={6000} autohide className="border-0 shadow-lg">
          <Toast.Header className="bg-primary text-white border-0">
            <strong className="me-auto">System Notification</strong>
            <small>just now</small>
          </Toast.Header>
          <Toast.Body>
            {user ? (
              isNewUser
                ? `Account created successfully! Welcome, ${user.name}.`
                : `Successfully logged in as ${user.name}.`
            ) : (
              "Welcome, Guest! Please log in to access all features."
            )}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}