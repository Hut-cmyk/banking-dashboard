import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { TrendingUp, TrendingDown, DollarSign, PieChart } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Analytics: React.FC = () => {
  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Income vs Expenses Over Time',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return '$' + value;
          },
        },
      },
    },
  };

  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Income',
        data: [3500, 4200, 3800, 4500, 4100, 4800],
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        borderWidth: 3,
        fill: true,
      },
      {
        label: 'Expenses',
        data: [2800, 3200, 2900, 3400, 3100, 3600],
        borderColor: '#F44336',
        backgroundColor: 'rgba(244, 67, 54, 0.1)',
        borderWidth: 3,
        fill: true,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Monthly Spending by Category',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return '$' + value;
          },
        },
      },
    },
  };

  const barChartData = {
    labels: ['Food & Drinks', 'Shopping', 'Transportation', 'Entertainment', 'Bills', 'Healthcare'],
    datasets: [
      {
        label: 'Amount Spent',
        data: [450, 780, 320, 180, 650, 220],
        backgroundColor: [
          '#7763EA',
          '#FF6B6B',
          '#4ECDC4',
          '#45B7D1',
          '#96CEB4',
          '#FFEAA7',
        ],
        borderWidth: 0,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: true,
        text: 'Expense Distribution',
      },
    },
  };

  const doughnutData = {
    labels: ['Food & Drinks', 'Shopping', 'Transportation', 'Entertainment', 'Bills', 'Healthcare'],
    datasets: [
      {
        data: [450, 780, 320, 180, 650, 220],
        backgroundColor: [
          '#7763EA',
          '#FF6B6B',
          '#4ECDC4',
          '#45B7D1',
          '#96CEB4',
          '#FFEAA7',
        ],
        borderWidth: 0,
      },
    ],
  };

  const insights = [
    {
      title: 'Highest Spending Category',
      value: 'Shopping',
      amount: '$780',
      trend: 'up',
      percentage: '+15%',
      icon: TrendingUp,
      color: 'red'
    },
    {
      title: 'Lowest Spending Category',
      value: 'Entertainment',
      amount: '$180',
      trend: 'down',
      percentage: '-8%',
      icon: TrendingDown,
      color: 'green'
    },
    {
      title: 'Average Daily Spending',
      value: 'Daily Average',
      amount: '$95.50',
      trend: 'up',
      percentage: '+3%',
      icon: DollarSign,
      color: 'blue'
    },
    {
      title: 'Savings Rate',
      value: 'Monthly Savings',
      amount: '22%',
      trend: 'up',
      percentage: '+5%',
      icon: PieChart,
      color: 'purple'
    }
  ];

  return (
    <div className="analytics-page">
      <div className="page-header">
        <div>
          <h2>Analytics</h2>
          <p>Detailed insights into your financial patterns</p>
        </div>
      </div>

      <div className="insights-grid">
        {insights.map((insight, index) => (
          <div key={index} className={`insight-card ${insight.color}`}>
            <div className="insight-icon">
              <insight.icon size={24} />
            </div>
            <div className="insight-content">
              <h3>{insight.title}</h3>
              <div className="insight-value">{insight.amount}</div>
              <div className={`insight-trend ${insight.trend}`}>
                {insight.percentage} from last month
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="charts-grid">
        <div className="chart-card large">
          <div style={{ height: '400px' }}>
            <Line options={lineChartOptions} data={lineChartData} />
          </div>
        </div>

        <div className="chart-card">
          <div style={{ height: '400px' }}>
            <Bar options={barChartOptions} data={barChartData} />
          </div>
        </div>

        <div className="chart-card">
          <div style={{ height: '400px' }}>
            <Doughnut options={doughnutOptions} data={doughnutData} />
          </div>
        </div>
      </div>

      <div className="financial-goals">
        <h3>Financial Goals</h3>
        <div className="goals-grid">
          <div className="goal-card">
            <div className="goal-header">
              <h4>Emergency Fund</h4>
              <span className="goal-percentage">75%</span>
            </div>
            <div className="goal-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div className="goal-details">
              <span>$7,500 of $10,000</span>
              <span className="goal-deadline">Goal: Dec 2024</span>
            </div>
          </div>

          <div className="goal-card">
            <div className="goal-header">
              <h4>Vacation Fund</h4>
              <span className="goal-percentage">45%</span>
            </div>
            <div className="goal-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div className="goal-details">
              <span>$2,250 of $5,000</span>
              <span className="goal-deadline">Goal: Summer 2024</span>
            </div>
          </div>

          <div className="goal-card">
            <div className="goal-header">
              <h4>New Car</h4>
              <span className="goal-percentage">30%</span>
            </div>
            <div className="goal-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '30%' }}></div>
              </div>
            </div>
            <div className="goal-details">
              <span>$6,000 of $20,000</span>
              <span className="goal-deadline">Goal: 2025</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
