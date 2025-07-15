import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Login successful!');
    } catch (error) {
      alert(error.message);
    }
  };

  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  return (
    <div className="login-wrapper">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          background: { color: "#fffaf3" },
          particles: {
            number: { value: 30 },
            size: { value: 18 },
            move: { enable: true, speed: 0.9 },
            opacity: { value: 0.6 },
            shape: {
              type: "char",
              character: [
                { value: "🗝️", font: "Verdana" },
                { value: "📱", font: "Verdana" },
                { value: "👜", font: "Verdana" },
                { value: "📝", font: "Verdana" }
              ]
            }
          }
        }}
      />

      <div className="login-container">
        <h2>Welcome Back!</h2>
        <p>Login to continue using Lost & Found Portal</p>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
        </form>
        <div className="footer-note">
          Don't have an account? Please sign up first.
        </div>
      </div>
    </div>
  );
}

export default Login;
