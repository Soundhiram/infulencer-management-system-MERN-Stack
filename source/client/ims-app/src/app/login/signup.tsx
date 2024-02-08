import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from React Router
import { signup } from '../store/actions/authActions';
import { useDispatch } from 'react-redux';

interface SignupFormProps {
    toggleForm: () => void;
  }

const SignupForm: React.FC<SignupFormProps> = ({ toggleForm }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const navigate =useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values: any) => {
    dispatch(signup());



    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3333/api/users/register', values);
      const token = response.data.token;
      localStorage.setItem('token', token); // Store token in local storage
      message.success('Sign up successful');
      navigate('/home/dashboard')
    } catch (error: any) {
      setError(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const onClickSignUp = () => {
    // This function will be called when the sign-up link is clicked
    navigate('/login');
  };

  return (
    <Form name="signup-form" onFinish={onFinish}>
      <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
        <Input.Password />
      </Form.Item>
      <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Mobile Number" name="mobileNumber" rules={[{ required: true, message: 'Please input your mobile number!' }]}>
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Sign up
        </Button>
      </Form.Item>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Link back to login page */}
      <p>
        Already have an account?{' '}
        <span
          style={{ cursor: 'pointer', color: 'blue' }}
          onClick={toggleForm}
        >
         Log In
        </span>
      </p>
    </Form>
  );
};

export default SignupForm;
