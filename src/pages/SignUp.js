import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import './SignUp.css';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      alert(`Welcome, ${name}! Signup successful.`);
      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  return (
    <div className="signup-wrapper">
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

      <div className="signup-container">
        <h2>Create Your Account</h2>
        <form onSubmit={handleSignup} className="signup-form">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            required
          />
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
          <button type="submit" disabled={loading}>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
