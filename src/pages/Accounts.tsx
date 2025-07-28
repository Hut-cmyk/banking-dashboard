import React, { useState } from 'react';
import { Plus, MoreHorizontal, ArrowUpRight, ArrowDownLeft, Eye, EyeOff } from 'lucide-react';

const Accounts: React.FC = () => {
  const [showBalance, setShowBalance] = useState<{[key: number]: boolean}>({});
  
  const accounts = [
    {
      id: 1,
      name: 'Primary Checking',
      type: 'Checking',
      balance: 5750.20,
      accountNumber: '****4891',
      interestRate: '0.05%',
      status: 'active'
    },
    {
      id: 2,
      name: 'High Yield Savings',
      type: 'Savings',
      balance: 15420.75,
      accountNumber: '****7832',
      interestRate: '2.50%',
      status: 'active'
    },
    {
      id: 3,
      name: 'Business Account',
      type: 'Business',
      balance: 28950.00,
      accountNumber: '****2934',
      interestRate: '0.25%',
      status: 'active'
    },
    {
      id: 4,
      name: 'Investment Account',
      type: 'Investment',
      balance: 45230.50,
      accountNumber: '****5671',
      interestRate: '5.75%',
      status: 'active'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      account: 'Primary Checking',
      description: 'Salary Deposit',
      amount: 3500.00,
      type: 'credit',
      date: '2024-01-15'
    },
    {
      id: 2,
      account: 'High Yield Savings',
      description: 'Monthly Transfer',
      amount: 1000.00,
      type: 'credit',
      date: '2024-01-15'
    },
    {
      id: 3,
      account: 'Primary Checking',
      description: 'Rent Payment',
      amount: 1200.00,
      type: 'debit',
      date: '2024-01-14'
    },
    {
      id: 4,
      account: 'Investment Account',
      description: 'Dividend Payment',
      amount: 150.25,
      type: 'credit',
      date: '2024-01-13'
    }
  ];

  const toggleBalance = (accountId: number) => {
    setShowBalance(prev => ({
      ...prev,
      [accountId]: !prev[accountId]
    }));
  };

  const formatBalance = (balance: number, show: boolean) => {
    if (show) return `$${balance.toLocaleString()}`;
    return '****.**';
  };

  const getAccountIcon = (type: string) => {
    switch(type) {
      case 'Checking': return '🏦';
      case 'Savings': return '💰';
      case 'Business': return '🏢';
      case 'Investment': return '📈';
      default: return '💳';
    }
  };

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

  return (
    <div className="accounts-page">
      <div className="page-header">
        <div>
          <h2>My Accounts</h2>
          <p>Manage all your bank accounts in one place</p>
        </div>
        <button className="btn-primary">
          <Plus size={20} />
          Add Account
        </button>
      </div>

      <div className="accounts-summary">
        <div className="summary-card total">
          <h3>Total Balance</h3>
          <div className="summary-amount">${totalBalance.toLocaleString()}</div>
          <div className="summary-accounts">{accounts.length} accounts</div>
        </div>
        <div className="summary-card monthly">
          <h3>Monthly Growth</h3>
          <div className="summary-amount positive">+$2,847.30</div>
          <div className="summary-percentage">+6.2% this month</div>
        </div>
        <div className="summary-card interest">
          <h3>Interest Earned</h3>
          <div className="summary-amount">$127.45</div>
          <div className="summary-period">This month</div>
        </div>
      </div>

      <div className="accounts-grid">
        {accounts.map(account => (
          <div key={account.id} className="account-card">
            <div className="account-header">
              <div className="account-info">
                <span className="account-icon">{getAccountIcon(account.type)}</span>
                <div>
                  <h3>{account.name}</h3>
                  <p>{account.type} • {account.accountNumber}</p>
                </div>
              </div>
              <button className="card-menu">
                <MoreHorizontal size={20} />
              </button>
            </div>

            <div className="account-balance">
              <div className="balance-row">
                <span>Available Balance</span>
                <button 
                  className="toggle-balance"
                  onClick={() => toggleBalance(account.id)}
                >
                  {showBalance[account.id] ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <div className="balance-amount">
                {formatBalance(account.balance, showBalance[account.id] || false)}
              </div>
            </div>

            <div className="account-details">
              <div className="detail-row">
                <span>Interest Rate</span>
                <span className="interest-rate">{account.interestRate}</span>
              </div>
              <div className="detail-row">
                <span>Status</span>
                <span className={`status ${account.status}`}>{account.status}</span>
              </div>
            </div>

            <div className="account-actions">
              <button className="btn-secondary">Transfer</button>
              <button className="btn-primary">Details</button>
            </div>
          </div>
        ))}
      </div>

      <div className="recent-activity">
        <div className="activity-header">
          <h3>Recent Activity</h3>
          <button className="btn-secondary">View All</button>
        </div>
        
        <div className="activity-list">
          {recentActivity.map(activity => (
            <div key={activity.id} className="activity-item">
              <div className="activity-icon">
                {activity.type === 'credit' ? 
                  <ArrowDownLeft className="credit" size={20} /> : 
                  <ArrowUpRight className="debit" size={20} />
                }
              </div>
              <div className="activity-details">
                <div className="activity-description">{activity.description}</div>
                <div className="activity-account">{activity.account}</div>
              </div>
              <div className="activity-date">
                {new Date(activity.date).toLocaleDateString()}
              </div>
              <div className={`activity-amount ${activity.type}`}>
                {activity.type === 'credit' ? '+' : '-'}${activity.amount.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Accounts;
