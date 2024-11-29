import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '/src/api.js';
import 'bootstrap/dist/css/bootstrap.min.css';

function VerifyEmail() {
    const [searchParams] = useSearchParams();
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const token = searchParams.get('token');
        api()
            .get(`/users/users/verify-email?token=${token}`)
            .then(() => {
                setMessage('Email verified successfully!');
                setSuccess(true);
            })
            .catch(() => {
                setMessage('Verification failed or token expired.');
            });
    }, [searchParams]);

    return (
        <div  data-bs-theme="dark" className="container text-center">
            <h1 >Email Verification</h1>
            <p>{message}</p>
            if (success) {
                <h2>Log in the App</h2>
            }
        </div>
    );
}

export default VerifyEmail;