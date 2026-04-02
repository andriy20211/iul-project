import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Routes, Route, Link } from 'react-router-dom';
import Registration from './pages/Registration';
import Main from './pages/Main';

function App() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleAuth = async (path) => {
        const res = await fetch(`/api/${path}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        setMessage(data.message);
    };

    return (
        <>
            <Routes>
                <Route path="/" element={<Registration />} />
                <Route path="/main" element={<Main />} />
            </Routes>

        </>
    );
};

export default App