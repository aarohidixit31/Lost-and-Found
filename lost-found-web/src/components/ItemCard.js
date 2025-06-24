import React from 'react';
import './ItemCard.css';

function ItemCard({ item }) {
  return (
    <div className="item-card">
      <h3>{item.title}</h3>
      <p><strong>Type:</strong> {item.type}</p>
      <p><strong>Description:</strong> {item.description}</p>
      <p><strong>Contact:</strong> {item.contact}</p>
    </div>
  );
}

export default ItemCard;
