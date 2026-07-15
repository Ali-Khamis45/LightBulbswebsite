import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('luma-user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('luma-user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('luma-user');
    }
  }, [currentUser]);

  // Simulated Login
  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!email || !password) {
          reject(new Error('Email and password are required.'));
          return;
        }

        // Simulating registered users storage
        const registeredUsers = JSON.parse(localStorage.getItem('luma-registered-users') || '[]');
        
        // Check for default admin login
        if (email === 'admin@luma.com' && password === 'admin123') {
          const adminUser = { email, name: 'Luma Admin', isAdmin: true };
          setCurrentUser(adminUser);
          resolve(adminUser);
          return;
        }

        const foundUser = registeredUsers.find(u => u.email === email && u.password === password);
        if (foundUser) {
          const user = { email: foundUser.email, name: foundUser.name, isAdmin: false };
          setCurrentUser(user);
          resolve(user);
        } else {
          reject(new Error('Invalid email or password.'));
        }
      }, 800); // Mimic network request latency
    });
  };

  // Simulated Register
  const register = (name, email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!name || !email || !password) {
          reject(new Error('All fields are required.'));
          return;
        }

        if (email === 'admin@luma.com') {
          reject(new Error('This email is reserved.'));
          return;
        }

        const registeredUsers = JSON.parse(localStorage.getItem('luma-registered-users') || '[]');
        const exists = registeredUsers.some(u => u.email === email);

        if (exists) {
          reject(new Error('Email is already registered.'));
          return;
        }

        const newUser = { name, email, password };
        registeredUsers.push(newUser);
        localStorage.setItem('luma-registered-users', JSON.stringify(registeredUsers));

        const sessionUser = { name, email, isAdmin: false };
        setCurrentUser(sessionUser);
        resolve(sessionUser);
      }, 800);
    });
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout, isAdmin: !!currentUser?.isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
