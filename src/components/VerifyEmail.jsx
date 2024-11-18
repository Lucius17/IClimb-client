import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '/src/api.js';

function VerifyEmail() {
    const [searchParams] = useSearchParams();
    const [message, setMessage] = useState('');

    useEffect(() => {
        const token = searchParams.get('token');
        api()
            .get(`/users/users/verify-email?token=${token}`)
            .then((response) => {
                setMessage('Email verified successfully!');
            })
            .catch((error) => {
                setMessage('Verification failed or token expired.');
            });
    }, [searchParams]);

    return (
        <div>
            <h1>Email Verification</h1>
            <p>{message}</p>
        </div>
    );
}

export default VerifyEmail;
