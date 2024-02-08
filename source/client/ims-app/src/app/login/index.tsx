// index.tsx

import React, { useState } from 'react';
import LoginForm from './login';
import SignupForm from './signup';

const Index = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);

  const toggleForm = () => {
    setIsLoginForm(prevState => !prevState);
  };

  return (
    <div>
      {isLoginForm ? (
        <LoginForm toggleForm={toggleForm} />
      ) : (
        <SignupForm toggleForm={toggleForm} />
      )}
    </div>
  );
};

export default Index;
