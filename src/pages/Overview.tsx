import React from 'react';
import BalanceCard from '../components/BalanceCard';
import CashbackSection from '../components/CashbackSection';
import TransactionsList from '../components/TransactionsList';
import TransferSection from '../components/TransferSection';
import ConversionSection from '../components/ConversionSection';
import QuickTransfer from '../components/QuickTransfer';
import ActivityChart from '../components/ActivityChart';

const Overview: React.FC = () => {
  return (
    <>
      <div className="dashboard-grid">
        <BalanceCard />
        <CashbackSection />
      </div>
      <div className="content-grid">
        <TransactionsList />
        <TransferSection />
        <ConversionSection />
        <QuickTransfer />
        <ActivityChart />
      </div>
    </>
  );
};

export default Overview;
