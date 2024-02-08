// LoginForm.tsx

import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import SignupForm from './signup';

interface LoginFormProps {
  toggleForm: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ toggleForm }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    dispatch({ type: 'LOGIN' });

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3333/api/users/login', { username, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      message.success('Login successful');
      navigate('/home/dashboard');
    } catch (error: any) {
      setError(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const onClickSignUp = () => {
    toggleForm(); // Toggle to SignUp component
  };

  return (
    <Card className="card-content-form">
      <h1 className="title">Log in</h1>

      <Form
        name="login-form"
        initialValues={{ remember: true }}
        onFinish={handleLogin}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            Log in
          </Button>
        </Form.Item>
      </Form>

      {/* Error message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Signup link */}
      <p>
        Don't have an account?{' '}
        <span
          style={{ cursor: 'pointer', color: 'blue' }}
          onClick={onClickSignUp} // Call onClickSignUp function
        >
          Sign up
        </span>
      </p>
      
    
    </Card>
  );
};

export default LoginForm;
