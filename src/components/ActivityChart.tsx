import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Calendar } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ActivityChart: React.FC = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
      y: {
        grid: {
          color: '#f0f0f0',
        },
        border: {
          display: false,
        },
        ticks: {
          callback: function(value: any) {
            return '$' + value + 'k';
          },
        },
      },
    },
    elements: {
      point: {
        radius: 4,
        hoverRadius: 6,
      },
      line: {
        tension: 0.4,
      },
    },
  };

  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Activity',
        data: [5, 3, 4, 5, 4, 6, 7, 8, 6, 7],
        borderColor: '#7763EA',
        backgroundColor: 'rgba(119, 99, 234, 0.1)',
        borderWidth: 3,
        fill: true,
      },
    ],
  };

  return (
    <div className="card chart-container">
      <div className="card-header">
        <h3 className="card-title">My Activity</h3>
        <div className="date-filter">
          <Calendar size={16} />
          <span>Jan 21 - Sep 21, 2022</span>
        </div>
      </div>
      <div style={{ height: '250px' }}>
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export default ActivityChart;
