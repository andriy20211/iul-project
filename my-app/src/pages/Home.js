import { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Form, ListGroup, Card, Toast, ToastContainer } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

export default function Home() {
  const [user, setUser] = useState(null);
  const [isNewUser, setIsNewUser] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const navigate = useNavigate();
  const [taskInput, setTaskInput] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [editing, setEditing] = useState(false);

  // --- TASK PERSISTENCE LOGIC ---

  // Initialize state from localStorage to prevent "empty list" flicker on refresh
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // Sync tasks to localStorage whenever the tasks array changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // --- TASK ACTIONS ---

  const addTask = () => {
    if (taskInput.trim() === "") return; // Do not add empty tasks
    const newTask = {
      id: Date.now(), // Temporary ID for React key
      text: taskInput,
      completed: false
    };
    setTasks([newTask, ...tasks]); // Add new task to the list
    setTaskInput(""); // Clear the input field
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  // Toggle completion status
  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // --- AUTH & SESSION LOGIC ---

  useEffect(() => {
    const savedData = localStorage.getItem('user');
    const registrationFlag = localStorage.getItem('isNewUser');
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');

    // Guard Clause: If NO user is found, redirect to Login
    if (!savedData) {
      console.log("No user found, redirecting to login...");
      navigate('/login');
      return;
    }

    // If user exists, parse the data and update state
    try {
      const parsedUser = JSON.parse(savedData);
      setUser(parsedUser);

      // Show toast only once per login session
      if (!hasSeenWelcome) {
        setShowToast(true);
        localStorage.setItem('hasSeenWelcome', 'true');
      }

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
    localStorage.removeItem('hasSeenWelcome');
    navigate('/login');
  };

  return (
    <div className="home-page d-flex flex-column" style={{ minHeight: '100vh', backgroundColor: '#f4f7f6' }}>
      {/* Navigation Bar */}
      <div className="bg-white border-bottom py-3 shadow-sm">
        <Container className="d-flex justify-content-between align-items-center">
          <h4 className="mb-0 fw-bold text-primary">
            <Link to="/" className="text-decoration-none">SIMPLE PLAN</Link>
          </h4>
          <Button variant="outline-danger" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </Container>
      </div>

      {/* Hero Section */}
      <header className="bg-primary text-white text-center py-2 shadow-sm">
        <Container className="py-1">
          <h1 className="display-4 fw-bold">Task Planner</h1>
          <p className="lead mb-1">Organize your day instantly</p>
        </Container>
      </header>

      {/* Main Content */}
      <Container className="flex-grow-1 py-5">
        <Row className="justify-content-center">
          <Col md={6} lg={5}>

            {/* Input Form Card */}
            <Card className="p-4 shadow-sm border-0 rounded-4 mb-4">
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">What needs to be done?</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Type your task..."
                  value={taskInput}
                  onChange={e => setTaskInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addTask()} // Allow adding via Enter key
                />
              </Form.Group>
              <Button variant="success" onClick={addTask} className="w-100 rounded-pill fw-bold">
                Add Task
              </Button>
            </Card>

            {/* Tasks List */}
            <h5 className="mb-3 fw-bold">Your Tasks ({tasks.length})</h5>
            <ListGroup className="shadow-sm rounded-4 overflow-hidden">
              {tasks.length > 0 ? (
                tasks.map((item) => (
                  <ListGroup.Item
                    key={item.id}
                    className="d-flex justify-content-between align-items-center p-3"
                    style={{ backgroundColor: item.completed ? '#f8f9fa' : '#fff' }}
                  >
                    <div
                      className="d-flex align-items-center"
                      style={{ cursor: 'pointer', flex: 1, minWidth: 0 }} // minWidth: 0 allows flex element to shrink
                      onClick={() => toggleTask(item.id)}
                    >
                      <Form.Check
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => toggleTask(item.id)}
                        className="me-3"
                      />
                      <span style={{
                        textDecoration: item.completed ? 'line-through' : 'none',
                        color: item.completed ? '#6c757d' : '#212529',
                        wordBreak: 'break-all', // Breaks word at any point
                        overflowWrap: 'anywhere' // Modern standard for text wrapping
                      }}>
                        {item.text}
                      </span>
                    </div>

                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => deleteTask(item.id)}
                      className="border-0 ms-2"
                    >
                      ✕
                    </Button>
                  </ListGroup.Item>
                ))
              ) : (
                <ListGroup.Item className="text-center text-muted py-4">
                  No tasks yet. Start planning!
                </ListGroup.Item>
              )}
            </ListGroup>
          </Col>
        </Row>
      </Container>

      {/* Toast Notifications */}
      <ToastContainer position="bottom-end" className="p-3">
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={6000} authide className="border-0 shadow-lg">
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

      {/* Footer */}
      <footer className="py-4 bg-light border-top mt-auto">
        <Container className="text-center">
          <span className="text-muted">© 2026 App. All rights reserved.</span>
        </Container>
      </footer>
    </div>
  );
}