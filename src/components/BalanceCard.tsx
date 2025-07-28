import React from 'react';

const BalanceCard: React.FC = () => {
  return (
    <div className="balance-card">
      <div className="balance-label">Current Balance</div>
      <div className="balance-amount">$5,750.20</div>
      <div className="card-number">•••• •••• •••• 1289</div>
      <div className="card-details">
        <div className="card-expiry">09/25</div>
        <div className="card-logo">MC</div>
      </div>
    </div>
  );
};

export default BalanceCard;
