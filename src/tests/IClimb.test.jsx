import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import api from '../api.js';
import Profile from '../components/Profile';

// Mock the necessary functions
vi.mock('/src/api.js', () => ({
  post: vi.fn(),
}));

describe('Profile Component', () => {
  it('renders the profile page with default information', () => {
    render(
      <Router>
        <Profile />
      </Router>
    );

    expect(screen.getByText('Twój Profil')).toBeInTheDocument();
    expect(screen.getByText('Imię: Jan Kowalski')).toBeInTheDocument();
    expect(screen.getByText('Email: jan.kowalski@example.com')).toBeInTheDocument();
    expect(screen.getByText('Siłownia: Gym Warszawa')).toBeInTheDocument();
    expect(screen.getByText('Nickname: Janek2115')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Edytuj profil/i })).toBeInTheDocument();
  });
});
