import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '/src/api.js';
import 'bootstrap/dist/css/bootstrap.min.css';

function VerifyEmail() {
    const { token } = useParams(); // Używamy useParams na najwyższym poziomie komponentu
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        api
            .get(`/users/users/verify-email?token=${token}`)
            .then(() => {
                setMessage('Email verified successfully!');
                setSuccess(true);
            })
            .catch(() => {
                setMessage('Verification failed or token expired.');
            });
    }, [token]);

    return (
        <div data-bs-theme="dark" className="container text-center">
            <h1>Email Verification</h1>
            <p>{message}</p>
        </div>
    );
}

export default VerifyEmail;
