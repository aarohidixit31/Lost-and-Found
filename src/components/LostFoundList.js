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

  // Filter search
  const filteredItems = items.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesType;
  });

  // Format contact smartly
  const formatContact = (contact) => {
    if (!contact) return null;

    if (/^\d{10}$/.test(contact)) {
      return <a href={`tel:${contact}`} className="smart-link">📞 {contact}</a>;
    } else if (contact.includes('@') && !contact.includes(' ')) {
      return <a href={`mailto:${contact}`} className="smart-link">✉️ {contact}</a>;
    } else if (contact.toLowerCase().includes('instagram') || contact.startsWith('@')) {
      const handle = contact.replace('@', '').trim();
      return <a href={`https://instagram.com/${handle}`} target="_blank" rel="noopener noreferrer" className="smart-link">📸 @{handle}</a>;
    } else {
      return <span className="item-contact">{contact}</span>;
    }
  };

  return (
    <div className="lost-found-list-wrapper">
      <h2 className="reported-items-title">Reported Items</h2>

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
              <div className="item-contact">{formatContact(item.contact)}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default LostFoundList;
