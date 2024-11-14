import React, { useState } from 'react';
import api from '/src/api.js';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');  // Pole Imię
  const [nickname, setNickname] = useState('');  // Opcjonalny nick
  const [gender, setGender] = useState('');  // Płeć
  const [canBelay, setCanBelay] = useState('');  // Asekuracja
  const [errors, setErrors] = useState({}); // Stan na błędy walidacji

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = {};

    // Sprawdzenie, czy pola są poprawnie wypełnione
    if (!email) validationErrors.email = 'Email jest wymagany';
    if (!name) validationErrors.name = 'Imię jest wymagane';
    if (!gender) validationErrors.gender = 'Wybór płci jest wymagany';
    if (!canBelay) validationErrors.canBelay = 'Wybór asekuracji jest wymagany';
    if (password !== confirmPassword) validationErrors.password = 'Hasła muszą być takie same';

    setErrors(validationErrors);

    // Jeżeli są błędy walidacji, nie wysyłamy formularza
    if (Object.keys(validationErrors).length > 0) return;

    // Logika rejestracji
    //console.log('Rejestracja:', { email, password, name, nickname, gender, canBelay });
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
          <label htmlFor="name">Imię i Nazwisko (opcjonalne)</label>
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
          <label htmlFor="nickname">Nick</label>
          <input 
            type="text" 
            className="form-control" 
            id="nickname" 
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>

        <div className="form-group mt-3">
          <label>Płeć</label>
          <select 
            className="form-control" 
            value={gender} 
            onChange={(e) => setGender(e.target.value)} 
            required
          >
            <option value="">Wybierz płeć</option>
            <option value="male">Mężczyzna</option>
            <option value="female">Kobieta</option>
            <option value="other">Inne</option>
          </select>
          {errors.gender && <div className="text-danger">{errors.gender}</div>}
        </div>

        <div className="form-group mt-3">
          <label>Czy umiesz asekurować?</label>
          <select 
            className="form-control" 
            value={canBelay} 
            onChange={(e) => setCanBelay(e.target.value)} 
            required
          >
            <option value="">Wybierz</option>
            <option value="yes">Tak</option>
            <option value="no">Nie</option>
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
    </div>
  );
}

export default SignUp;
