import React, { useState, useMemo } from 'react';
import { Search, Download, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';

const Transactions: React.FC = () => {
  const { success, error } = useToast();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('30days');
  const [isExporting, setIsExporting] = useState(false);

  // Helper function to get date range
  const getDateRange = (range: string) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    switch (range) {
      case '7days':
        return new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      case '30days':
        return new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
      case '90days':
        return new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000);
      case 'year':
        return new Date(today.getFullYear(), 0, 1);
      default:
        return new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
    }
  };

  const filteredTransactions = useMemo(() => {
    const transactions = [
      {
        id: 1,
        name: 'Starbucks New York LLP',
        date: '2024-01-12 09:34',
        amount: -5.30,
        type: 'expense',
        category: 'Food & Drinks',
        description: 'Coffee and breakfast',
        status: 'completed'
      },
      {
        id: 2,
        name: 'Walmart Marketplace',
        date: '2024-01-11 21:48',
        amount: -135.00,
        type: 'expense',
        category: 'Shopping',
        description: 'Grocery shopping',
        status: 'completed'
      },
      {
        id: 3,
        name: 'From Catherine Pierce',
        date: '2024-01-11 18:05',
        amount: 250.00,
        type: 'income',
        category: 'Transfer',
        description: 'Birthday money',
        status: 'completed'
      },
      {
        id: 4,
        name: 'Netflix Subscription',
        date: '2024-01-10 14:22',
        amount: -15.99,
        type: 'expense',
        category: 'Entertainment',
        description: 'Monthly subscription',
        status: 'completed'
      },
      {
        id: 5,
        name: 'Salary Deposit',
        date: '2024-01-01 09:00',
        amount: 3500.00,
        type: 'income',
        category: 'Salary',
        description: 'Monthly salary',
        status: 'completed'
      },
      {
        id: 6,
        name: 'Amazon Purchase',
        date: '2024-01-09 15:30',
        amount: -89.99,
        type: 'expense',
        category: 'Shopping',
        description: 'Electronics',
        status: 'pending'
      },
      {
        id: 7,
        name: 'Gas Station',
        date: '2024-01-08 08:15',
        amount: -45.20,
        type: 'expense',
        category: 'Transportation',
        description: 'Fuel',
        status: 'completed'
      },
      {
        id: 8,
        name: 'Freelance Payment',
        date: '2024-01-07 16:42',
        amount: 750.00,
        type: 'income',
        category: 'Freelance',
        description: 'Web design project',
        status: 'completed'
      }
    ];
    
    return transactions.filter(transaction => {
      const matchesFilter = filter === 'all' || transaction.type === filter;
      const matchesSearch = transaction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Date filtering
      const transactionDate = new Date(transaction.date);
      const dateRangeStart = getDateRange(dateRange);
      const matchesDate = transactionDate >= dateRangeStart;
      
      return matchesFilter && matchesSearch && matchesDate;
    });
  }, [filter, searchTerm, dateRange, getDateRange]);

  const totalIncome = filteredTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = filteredTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + Math.abs(t.amount), 0);

  // Export functionality
  const handleExport = async () => {
    setIsExporting(true);
    try {
      // Simulate export processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create CSV content
      const csvHeaders = ['Date', 'Name', 'Category', 'Description', 'Amount', 'Type', 'Status'];
      const csvRows = filteredTransactions.map(transaction => [
        new Date(transaction.date).toLocaleDateString(),
        transaction.name,
        transaction.category,
        transaction.description,
        transaction.amount.toString(),
        transaction.type,
        transaction.status
      ]);
      
      const csvContent = [csvHeaders, ...csvRows]
        .map(row => row.map(field => `"${field}"`).join(','))
        .join('\n');
      
      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `transactions_${dateRange}_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      success('Transactions exported successfully!', `${filteredTransactions.length} transactions exported`);
    } catch (err) {
      error('Export failed', 'Please try again later');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="transactions-page">
      <div className="page-header">
        <div>
          <h2>Transactions</h2>
          <p>Manage and track all your transactions</p>
        </div>
        <button 
          className="btn-primary"
          onClick={handleExport}
          disabled={isExporting}
        >
          <Download size={20} className={isExporting ? 'loading-spinner' : ''} />
          {isExporting ? 'Exporting...' : 'Export'}
        </button>
      </div>

      <div className="transaction-summary">
        <div className="summary-card income">
          <h3>Total Income</h3>
          <div className="summary-amount">+${totalIncome.toLocaleString()}</div>
          <div className="summary-period">This month</div>
        </div>
        <div className="summary-card expense">
          <h3>Total Expenses</h3>
          <div className="summary-amount">-${totalExpenses.toLocaleString()}</div>
          <div className="summary-period">This month</div>
        </div>
        <div className="summary-card balance">
          <h3>Net Balance</h3>
          <div className="summary-amount">${(totalIncome - totalExpenses).toLocaleString()}</div>
          <div className="summary-period">This month</div>
        </div>
      </div>

      <div className="transaction-filters">
        <div className="search-filter">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-buttons">
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Transactions</option>
            <option value="income">Income</option>
            <option value="expense">Expenses</option>
          </select>
          
          <select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="90days">Last 3 months</option>
            <option value="year">This year</option>
          </select>
        </div>
      </div>

      <div className="transactions-table">
        <div className="table-header">
          <div>Transaction</div>
          <div>Category</div>
          <div>Date</div>
          <div>Amount</div>
          <div>Status</div>
        </div>
        
        {filteredTransactions.map(transaction => (
          <div key={transaction.id} className="transaction-row">
            <div className="transaction-info">
              <div className={`transaction-icon ${transaction.type}`}>
                {transaction.type === 'expense' ? 
                  <ArrowUpRight size={20} /> : 
                  <ArrowDownLeft size={20} />
                }
              </div>
              <div>
                <div className="transaction-name">{transaction.name}</div>
                <div className="transaction-description">{transaction.description}</div>
              </div>
            </div>
            
            <div className="transaction-category">
              <span className={`category-badge ${transaction.category.toLowerCase().replace(' ', '-')}`}>
                {transaction.category}
              </span>
            </div>
            
            <div className="transaction-date">
              {new Date(transaction.date).toLocaleDateString()}
            </div>
            
            <div className={`transaction-amount ${transaction.type}`}>
              {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
            </div>
            
            <div className={`transaction-status ${transaction.status}`}>
              {transaction.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transactions;
