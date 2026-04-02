import React, { useState, useEffect } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

export default function Main() {
  const [userName, setUserName] = useState('');
  const [show, setShow] = useState(true);

 useEffect(() => {
    const savedData = localStorage.getItem('user'); // Look for the 'user' key
    if (savedData) {
        const userObj = JSON.parse(savedData);
        setUserName(userObj.name); // Grab the name property
    }
}, []);

  return (
    <div>
      <div className="container mt-4">
        <h2>Main page</h2>
        <hr />
        {userName ? (
            <div className="alert alert-success">
              Welcome, <strong>{userName}</strong>! You are successfully logged in.
            </div>
        ) : (
            <div className="alert alert-warning">
              You are viewing this page as a <strong>Guest</strong>.
            </div>
        )}
      </div>

      <div className="p-5">
        <ToastContainer position="bottom-end" className="p-3" style={{ zIndex: 11 }}>
          <Toast show={show} onClose={() => setShow(false)} delay={5000} autohide>
            <Toast.Header>
              <strong className="me-auto">System</strong>
              <small>just now</small>
            </Toast.Header>
            <Toast.Body>
              Hello, <b>{userName || 'User'}</b>!
            </Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
    </div>
  );
}