import React, { useState } from 'react';
import api from '/src/api.js';
import BackButton from './BackButton';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');  // Name field
  const [nickname, setNickname] = useState('');  // Optional nickname
  const [gender, setGender] = useState('');  // Gender
  const [canBelay, setCanBelay] = useState('');  // Belaying ability
  const [errors, setErrors] = useState({}); // State for validation errors

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = {};

    // Check if fields are correctly filled
    if (!email) validationErrors.email = 'Email is required';
    // if (!name) validationErrors.name = 'Name is required';
    if (!gender) validationErrors.gender = 'Gender selection is required';
    if (!canBelay) validationErrors.canBelay = 'Belaying ability selection is required';
    if (password !== confirmPassword) validationErrors.password = 'Passwords must match';

    setErrors(validationErrors);

    // If there are validation errors, do not submit the form
    if (Object.keys(validationErrors).length > 0) return;

    // Registration logic
    //console.log('Registration:', { email, password, name, nickname, gender, canBelay });
    try {
      const response = await api.post('/auth/signup', {
        email,
        password,
        name,
        nickname,
        gender,
        belay: canBelay === 'no'
      });

      console.log(response.data.message);
    } catch (error) {
      console.error('Error during signup:', error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="container text-center">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input 
            type="email" 
            className="form-control" 
            id="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
          {errors.email && <div className="text-danger">{errors.email}</div>}
        </div>

        <div className="form-group mt-3">
          <label htmlFor="name">Full Name (optional)</label>
          <input 
            type="text" 
            className="form-control" 
            id="name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <div className="text-danger">{errors.name}</div>}
        </div>

        <div className="form-group mt-3">
          <label htmlFor="nickname">Nickname</label>
          <input 
            type="text" 
            className="form-control" 
            id="nickname" 
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>

        <div className="form-group mt-3">
          <label>Gender</label>
          <select 
            className="form-control" 
            value={gender} 
            onChange={(e) => setGender(e.target.value)} 
            required
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <div className="text-danger">{errors.gender}</div>}
        </div>

        <div className="form-group mt-3">
          <label>Can you belay?</label>
          <select 
            className="form-control" 
            value={canBelay} 
            onChange={(e) => setCanBelay(e.target.value)} 
            required
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          {errors.canBelay && <div className="text-danger">{errors.canBelay}</div>}
        </div>

        <div className="form-group mt-3">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            className="form-control" 
            id="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>

        <div className="form-group mt-3">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input 
            type="password" 
            className="form-control" 
            id="confirmPassword" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required 
          />
          {errors.password && <div className="text-danger">{errors.password}</div>}
        </div>

        <button type="submit" className="btn btn-primary mt-3 w-100">Sign Up</button>
      </form>
      <BackButton />
    </div>
  );
}

export default SignUp;