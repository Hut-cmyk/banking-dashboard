import React, { useState } from 'react';
import { Plus, MoreHorizontal, Eye, EyeOff, Lock, Unlock, Trash2 } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';

const Cards: React.FC = () => {
  const { success, warning, error } = useToast();
  const [showNumbers, setShowNumbers] = useState<{[key: number]: boolean}>({});
  const [cards, setCards] = useState([
    {
      id: 1,
      type: 'Primary',
      number: '4532 1234 5678 1289',
      expiry: '09/25',
      cardType: 'Visa',
      balance: 5750.20,
      status: 'active',
      color: 'gradient-card'
    },
    {
      id: 2,
      type: 'Business',
      number: '5678 9012 3456 7890',
      expiry: '12/26',
      cardType: 'Mastercard',
      balance: 12450.75,
      status: 'active',
      color: 'gradient-primary'
    },
    {
      id: 3,
      type: 'Savings',
      number: '4111 1111 1111 1111',
      expiry: '06/27',
      cardType: 'Visa',
      balance: 8920.30,
      status: 'blocked',
      color: 'gradient-secondary'
    }
  ]);

  const toggleShowNumber = (cardId: number) => {
    setShowNumbers(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  const toggleCardStatus = (cardId: number) => {
    const card = cards.find(c => c.id === cardId);
    if (!card) return;
    
    setCards(prev => prev.map(c => 
      c.id === cardId 
        ? { ...c, status: c.status === 'active' ? 'blocked' : 'active' }
        : c
    ));
    
    const newStatus = card.status === 'active' ? 'blocked' : 'active';
    if (newStatus === 'blocked') {
      warning(`${card.type} card blocked`, 'Card has been temporarily disabled');
    } else {
      success(`${card.type} card activated`, 'Card is now ready to use');
    }
  };

  const handleDeleteCard = (cardId: number) => {
    const card = cards.find(c => c.id === cardId);
    if (!card) return;
    
    if (card.balance > 0) {
      error('Cannot delete card', 'Please transfer remaining balance before deleting');
      return;
    }
    
    if (window.confirm(`Are you sure you want to delete your ${card.type} card ending in ${card.number.slice(-4)}?`)) {
      setCards(prev => prev.filter(c => c.id !== cardId));
      success('Card deleted successfully', `${card.type} card has been removed from your account`);
    }
  };

  const formatCardNumber = (number: string, show: boolean) => {
    if (show) return number;
    return '•••• •••• •••• ' + number.slice(-4);
  };

  return (
    <div className="cards-page">
      <div className="page-header">
        <h2>My Cards</h2>
        <button className="btn-primary">
          <Plus size={20} />
          Add New Card
        </button>
      </div>

      <div className="cards-grid">
        {cards.map(card => (
          <div key={card.id} className={`card-item ${card.color}`}>
            <div className="card-header">
              <span className="card-type">{card.type}</span>
              <button className="card-menu">
                <MoreHorizontal size={20} />
              </button>
            </div>
            
            <div className="card-balance">
              <div className="balance-label">Available Balance</div>
              <div className="balance-amount">${card.balance.toLocaleString()}</div>
            </div>
            
            <div className="card-number">
              {formatCardNumber(card.number, showNumbers[card.id] || false)}
            </div>
            
            <div className="card-footer">
              <div className="card-details">
                <span className="card-expiry">{card.expiry}</span>
                <span className="card-brand">{card.cardType}</span>
              </div>
              <div className={`card-status ${card.status}`}>
                {card.status === 'active' ? 'Active' : 'Blocked'}
              </div>
            </div>
            
            <div className="card-actions">
              <button 
                className="action-btn"
                onClick={() => toggleShowNumber(card.id)}
                title={showNumbers[card.id] ? 'Hide number' : 'Show number'}
              >
                {showNumbers[card.id] ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
              <button 
                className="action-btn"
                onClick={() => toggleCardStatus(card.id)}
                title={card.status === 'active' ? 'Block card' : 'Unblock card'}
              >
                {card.status === 'active' ? <Lock size={16} /> : <Unlock size={16} />}
              </button>
              <button 
                className="action-btn danger" 
                onClick={() => handleDeleteCard(card.id)}
                title="Delete card"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="card-statistics">
        <div className="stat-card">
          <h3>Monthly Spending</h3>
          <div className="stat-value">$2,847.30</div>
          <div className="stat-change positive">+12.5% from last month</div>
        </div>
        <div className="stat-card">
          <h3>Available Credit</h3>
          <div className="stat-value">$15,750</div>
          <div className="stat-change negative">-5.2% from last month</div>
        </div>
        <div className="stat-card">
          <h3>Cashback Earned</h3>
          <div className="stat-value">$127.45</div>
          <div className="stat-change positive">+8.3% from last month</div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
