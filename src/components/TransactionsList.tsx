import React from 'react';
import { MoreHorizontal, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

const TransactionsList: React.FC = () => {
  const transactions = [
    {
      id: 1,
      name: 'Starbucks New York LLP',
      date: '12.01.2020 09:34',
      amount: -5.30,
      type: 'expense'
    },
    {
      id: 2,
      name: 'Walmart Marketplace',
      date: '11.01.2020 21:48',
      amount: -135,
      type: 'expense'
    },
    {
      id: 3,
      name: 'From Catherine Pierce',
      date: '11.01.2020 18:05',
      amount: 250,
      type: 'income'
    }
  ];

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Transactions</h3>
        <button className="card-menu">
          <MoreHorizontal size={20} />
        </button>
      </div>
      
      <div className="transactions-list">
        {transactions.map(transaction => (
          <div key={transaction.id} className="transaction-item">
            <div className={`transaction-icon ${transaction.type}`}>
              {transaction.type === 'expense' ? 
                <ArrowUpRight size={20} /> : 
                <ArrowDownLeft size={20} />
              }
            </div>
            <div className="transaction-details">
              <div className="transaction-name">{transaction.name}</div>
              <div className="transaction-date">{transaction.date}</div>
            </div>
            <div className={`transaction-amount ${transaction.type}`}>
              {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionsList;
