import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './MyReports.css';

function MyReports() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [myItems, setMyItems] = useState([]);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    fetchMyItems();
  }, [currentUser, navigate]);

  const fetchMyItems = async () => {
    const q = query(
      collection(db, 'reportedItems'),
      where('userId', '==', currentUser.uid)
    );
    const querySnapshot = await getDocs(q);
    const items = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setMyItems(items);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this report?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, 'reportedItems', id));
      setMyItems(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error deleting report:", error);
      alert("Failed to delete the report.");
    }
  };

  return (
    <div className="myreports-container">
      <h2 className="myreports-title">📝 My Reported Items</h2>
      {myItems.length === 0 ? (
        <p>You haven’t reported anything yet.</p>
      ) : (
        <div className="myreports-grid">
          {myItems.map(item => (
            <div key={item.id} className="myreport-card">
              <h3>{item.title}</h3>
              <p><strong>Type:</strong> {item.type}</p>
              <p><strong>Description:</strong> {item.description}</p>
              <p><strong>Contact:</strong> {item.contact}</p>
              <button className="delete-btn" onClick={() => handleDelete(item.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyReports;
