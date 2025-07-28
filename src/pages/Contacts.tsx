import React, { useState } from 'react';
import { Plus, Search, MoreHorizontal, Send, Edit, Phone, Mail } from 'lucide-react';

const Contacts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const contacts = [
    {
      id: 1,
      name: 'Monica Geller',
      email: 'monica@email.com',
      phone: '+1 (555) 123-4567',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      category: 'family',
      lastTransfer: '2024-01-10',
      totalTransferred: 2500.00,
      accountNumber: '****7890'
    },
    {
      id: 2,
      name: 'Chandler Bing',
      email: 'chandler@email.com',
      phone: '+1 (555) 234-5678',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      category: 'friends',
      lastTransfer: '2024-01-08',
      totalTransferred: 850.00,
      accountNumber: '****3456'
    },
    {
      id: 3,
      name: 'Ross Geller',
      email: 'ross@email.com',
      phone: '+1 (555) 345-6789',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      category: 'family',
      lastTransfer: '2024-01-05',
      totalTransferred: 1200.00,
      accountNumber: '****9012'
    },
    {
      id: 4,
      name: 'Rachel Green',
      email: 'rachel@email.com',
      phone: '+1 (555) 456-7890',
      avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
      category: 'friends',
      lastTransfer: '2023-12-28',
      totalTransferred: 650.00,
      accountNumber: '****5678'
    },
    {
      id: 5,
      name: 'Joey Tribbiani',
      email: 'joey@email.com',
      phone: '+1 (555) 567-8901',
      avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
      category: 'friends',
      lastTransfer: '2023-12-25',
      totalTransferred: 3200.00,
      accountNumber: '****2345'
    },
    {
      id: 6,
      name: 'Phoebe Buffay',
      email: 'phoebe@email.com',
      phone: '+1 (555) 678-9012',
      avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
      category: 'friends',
      lastTransfer: '2023-12-20',
      totalTransferred: 450.00,
      accountNumber: '****6789'
    }
  ];

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || contact.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const recentTransfers = [
    {
      id: 1,
      contactName: 'Monica Geller',
      amount: 250.00,
      date: '2024-01-10',
      status: 'completed'
    },
    {
      id: 2,
      contactName: 'Chandler Bing',
      amount: 150.00,
      date: '2024-01-08',
      status: 'completed'
    },
    {
      id: 3,
      contactName: 'Ross Geller',
      amount: 300.00,
      date: '2024-01-05',
      status: 'pending'
    }
  ];

  return (
    <div className="contacts-page">
      <div className="page-header">
        <div>
          <h2>Contacts</h2>
          <p>Manage your transfer contacts and beneficiaries</p>
        </div>
        <button className="btn-primary">
          <Plus size={20} />
          Add Contact
        </button>
      </div>

      <div className="contacts-stats">
        <div className="stat-card">
          <h3>Total Contacts</h3>
          <div className="stat-value">{contacts.length}</div>
        </div>
        <div className="stat-card">
          <h3>This Month</h3>
          <div className="stat-value">12</div>
          <div className="stat-subtitle">transfers sent</div>
        </div>
        <div className="stat-card">
          <h3>Total Sent</h3>
          <div className="stat-value">$8,850</div>
          <div className="stat-subtitle">this month</div>
        </div>
      </div>

      <div className="contacts-filters">
        <div className="search-filter">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="category-filters">
          <button 
            className={selectedCategory === 'all' ? 'active' : ''}
            onClick={() => setSelectedCategory('all')}
          >
            All
          </button>
          <button 
            className={selectedCategory === 'family' ? 'active' : ''}
            onClick={() => setSelectedCategory('family')}
          >
            Family
          </button>
          <button 
            className={selectedCategory === 'friends' ? 'active' : ''}
            onClick={() => setSelectedCategory('friends')}
          >
            Friends
          </button>
          <button 
            className={selectedCategory === 'business' ? 'active' : ''}
            onClick={() => setSelectedCategory('business')}
          >
            Business
          </button>
        </div>
      </div>

      <div className="contacts-grid">
        {filteredContacts.map(contact => (
          <div key={contact.id} className="contact-card">
            <div className="contact-header">
              <img src={contact.avatar} alt={contact.name} className="contact-avatar" />
              <button className="contact-menu">
                <MoreHorizontal size={20} />
              </button>
            </div>
            
            <div className="contact-info">
              <h3>{contact.name}</h3>
              <p className="contact-email">{contact.email}</p>
              <p className="contact-phone">{contact.phone}</p>
              <span className={`contact-category ${contact.category}`}>
                {contact.category}
              </span>
            </div>
            
            <div className="contact-stats">
              <div className="stat">
                <span className="stat-label">Last Transfer</span>
                <span className="stat-value">
                  {new Date(contact.lastTransfer).toLocaleDateString()}
                </span>
              </div>
              <div className="stat">
                <span className="stat-label">Total Sent</span>
                <span className="stat-value">${contact.totalTransferred.toLocaleString()}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Account</span>
                <span className="stat-value">{contact.accountNumber}</span>
              </div>
            </div>
            
            <div className="contact-actions">
              <button className="action-btn secondary">
                <Edit size={16} />
              </button>
              <button className="action-btn secondary">
                <Phone size={16} />
              </button>
              <button className="action-btn secondary">
                <Mail size={16} />
              </button>
              <button className="action-btn primary">
                <Send size={16} />
                Send Money
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="recent-transfers">
        <div className="transfers-header">
          <h3>Recent Transfers</h3>
          <button className="btn-secondary">View All</button>
        </div>
        
        <div className="transfers-list">
          {recentTransfers.map(transfer => (
            <div key={transfer.id} className="transfer-item">
              <div className="transfer-contact">{transfer.contactName}</div>
              <div className="transfer-amount">${transfer.amount.toFixed(2)}</div>
              <div className="transfer-date">
                {new Date(transfer.date).toLocaleDateString()}
              </div>
              <div className={`transfer-status ${transfer.status}`}>
                {transfer.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contacts;
