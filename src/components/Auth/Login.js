import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';
import authService from '../../services/authService'; // Import your auth service

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await authService.login(email, password);  // Use authService
      localStorage.setItem('token', response.data.token); // Store the token
      navigate('/'); // Redirect to dashboard
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.'); // Display error message
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Login</Card.Title>
        {error && <div className="alert alert-danger">{error}</div>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default Login;