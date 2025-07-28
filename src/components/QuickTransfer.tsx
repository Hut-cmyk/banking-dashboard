import React from 'react';

const QuickTransfer: React.FC = () => {
  const contacts = [
    {
      id: 1,
      name: 'Monica',
      img: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    {
      id: 2,
      name: 'Chandler',
      img: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
    {
      id: 3,
      name: 'Ross',
      img: 'https://randomuser.me/api/portraits/men/3.jpg',
    },
    {
      id: 4,
      name: 'Rachel',
      img: 'https://randomuser.me/api/portraits/women/4.jpg',
    },
    {
      id: 5,
      name: 'Joey',
      img: 'https://randomuser.me/api/portraits/men/5.jpg',
    },
  ];

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Quick Transfer</h3>
        <button className="card-menu">
          <span>...</span>
        </button>
      </div>
      <div className="contacts-grid">
        {contacts.map((contact) => (
          <div key={contact.id} className="contact-avatar">
            <img src={contact.img} alt={contact.name} />
          </div>
        ))}
        <div className="add-contact">+</div>
      </div>
      <input
        type="text"
        placeholder="9876 8774 5443 0000 1289"
        className="transfer-input"
      />
      <div className="transfer-actions">
        <button className="btn-secondary">Save as draft</button>
        <button className="btn-primary">Send money</button>
      </div>
    </div>
  );
};

export default QuickTransfer;

