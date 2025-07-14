import React, { useState, useEffect } from 'react';
import './AddItems.css';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import 'react-toastify/dist/ReactToastify.css';

function AddItems() {
  const [item, setItem] = useState({
    type: 'lost',
    title: '',
    description: '',
    contact: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, 'reportedItems'), {
        ...item,
        userId: currentUser.uid,
        reportedBy: currentUser.displayName,
        email: currentUser.email,
        timestamp: serverTimestamp(),
      });

      toast.success('🎉 Item reported successfully!', {
        position: 'top-center',
        autoClose: 2000,
      });

      setItem({ type: 'lost', title: '', description: '', contact: '' });
    } catch (error) {
      console.error('Error adding document: ', error);
      toast.error('❌ Something went wrong. Try again!', {
        position: 'top-center',
        autoClose: 2500,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  return (
    <div className="additems-wrapper">
      <Particles
  id="tsparticles"
  init={particlesInit}
  options={{
    fullScreen: { enable: false },
    background: { color: "#fffaf3" },
    particles: {
      number: { value: 30 },
      size: { value: 18 },  // bigger for icons
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
      },
    },
  }}
/>


      <div className="additems-container">
        <ToastContainer />
        <h2 className="form-title">Report Lost or Found Item</h2>
        <p className="form-subtitle">Help us return belongings to their rightful owners.</p>

        <form onSubmit={handleSubmit} className="add-form">
          <label>Item Type</label>
          <select name="type" value={item.type} onChange={handleChange} required>
            <option value="lost">Lost</option>
            <option value="found">Found</option>
          </select>

          <label>Item Title</label>
          <input
            type="text"
            name="title"
            value={item.title}
            onChange={handleChange}
            placeholder="e.g. Black Wallet"
            required
          />

          <label>Description</label>
          <textarea
            name="description"
            value={item.description}
            onChange={handleChange}
            rows="4"
            placeholder="Describe the item in detail..."
            required
          />

          <label>Contact Info</label>
          <input
            type="text"
            name="contact"
            value={item.contact}
            onChange={handleChange}
            placeholder="Phone, Email, or Insta handle"
            required
          />

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Report'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddItems;
