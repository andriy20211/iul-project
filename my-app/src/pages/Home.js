import { Container, Row, Col, Button, Card, Navbar, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      {/* 1. Hero Section */}
      <header className="bg-dark text-white text-center py-5 shadow-sm">
        <Container className="py-5">
          <h1 className="display-3 fw-bold">Welcome to Our Platform</h1>
          <p className="lead mb-4">
            The easiest way to manage your data and connect with your team.
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Button variant="primary" size="lg" className="px-4 gap-3" onClick={() => navigate('/register')}>
              Get Started
            </Button>
            <Button variant="outline-light" size="lg" className="px-4" onClick={() => navigate('/login')}>
              Login
            </Button>
          </div>
        </Container>
      </header>

      {/* 2. Features Section */}
      <Container className="py-5" id="features">
        <h2 className="text-center mb-5">Why Choose Us?</h2>
        <Row>
          <Col md={4} className="mb-4">
            <Card className="h-100 border-0 shadow-sm text-center p-3">
              <Card.Body>
                <div className="display-6 mb-3 text-primary">🚀</div>
                <Card.Title>Fast Performance</Card.Title>
                <Card.Text>
                  Built with React and Node.js for lightning-fast response times.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 border-0 shadow-sm text-center p-3">
              <Card.Body>
                <div className="display-6 mb-3 text-primary">🛡️</div>
                <Card.Title>Secure Data</Card.Title>
                <Card.Text>
                  Your information is safely stored in MongoDB with modern encryption.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 border-0 shadow-sm text-center p-3">
              <Card.Body>
                <div className="display-6 mb-3 text-primary">📱</div>
                <Card.Title>Fully Responsive</Card.Title>
                <Card.Text>
                  Access your account from any device, anywhere in the world.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* 3. Footer */}
      <footer className="py-4 bg-light mt-auto border-top">
        <Container className="text-center">
          <span className="text-muted">© 2026 App. All rights reserved.</span>
        </Container>
      </footer>
    </div>
  );
}