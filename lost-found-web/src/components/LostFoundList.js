import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import './LostFoundList.css';

function LostFoundList({ searchTerm, filterType }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'reportedItems'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setItems(data);
    });

    return () => unsubscribe();
  }, []);

  // Filtering logic
  const filteredItems = items.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="items-grid">
      {filteredItems.length === 0 ? (
        <p>No matching items found.</p>
      ) : (
        filteredItems.map((item) => (
          <div key={item.id} className="item-card">
            <h3 className="item-title">{item.title}</h3>
            <p className={item.type === 'lost' ? 'item-type-lost' : 'item-type-found'}>
              {item.type.toUpperCase()}
            </p>
            <p className="item-desc">{item.description}</p>
            <p className="item-contact">📞 {item.contact}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default LostFoundList;
