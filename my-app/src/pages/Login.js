import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';

const Registration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const handleAuth = async (path) => {

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
            navigate('/main');
        }
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>

            <div className=''>
                <h2>Вхід</h2>
                <br />
                <br /><br />
                <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
                <br /><br />

                <input type="password" placeholder="Пароль" onChange={e => setPassword(e.target.value)} />
                <br /><br />
                <div>
                    <Button variant="primary" onClick={() => handleAuth('login')}>Увійти</Button>
                </div>
            </div>
            <p>{message}</p>

        </div>
    );
};

export default Registration;