import React from 'react';

const CashbackSection: React.FC = () => {
  return (
    <div className="cashback-section">
      <div className="cashback-content">
        <h2 className="cashback-title">Cashback up tp 60%🎁</h2>
        <p className="cashback-description">
          Redesign concept for online bank mBank. This is online service that 
          allows tyou to pay bills for a variety of goods and services using 
          your personal device.
        </p>
        <button className="cashback-button">Active</button>
      </div>
      <div className="cashback-image"></div>
    </div>
  );
};

export default CashbackSection;
