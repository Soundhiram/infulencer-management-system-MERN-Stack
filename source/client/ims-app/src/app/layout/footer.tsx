import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer style={{ position: 'fixed', bottom: 0, width: '100%', backgroundColor: '#f0f2f5', padding: '20px', textAlign: 'justify' }}>
      <span>
        Copyright &copy; {`${new Date().getFullYear()}`}{' '}
        <span style={{ fontWeight: 'bold' }}>Influencer Management System</span> All rights
        reserved.
      </span>
      <div>
        <a href="/#" onClick={(e) => e.preventDefault()} style={{ color: 'gray', textDecoration: 'none' }}>
          Term & Conditions
        </a>
        <span style={{ margin: '0 5px', color: 'gray' }}>|</span>
        <a href="/#" onClick={(e) => e.preventDefault()} style={{ color: 'gray', textDecoration: 'none' }}>
          Privacy & Policy
        </a>
      </div>
    </footer>
  );
};

