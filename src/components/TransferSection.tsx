import React, { useState } from 'react';
import { MoreHorizontal, ArrowRight } from 'lucide-react';
import TransferModal from './TransferModal';

const TransferSection: React.FC = () => {
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);

  // Sample contacts data - in a real app, this would come from props or state management
  const contacts = [
    {
      id: 1,
      name: 'John Smith',
      avatar: 'https://ui-avatars.com/api/?name=John+Smith&background=4f46e5&color=fff',
      accountNumber: '1234 5678 9012 3456',
      bank: 'First National Bank'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=059669&color=fff',
      accountNumber: '2345 6789 0123 4567',
      bank: 'City Trust Bank'
    },
    {
      id: 3,
      name: 'Mike Davis',
      avatar: 'https://ui-avatars.com/api/?name=Mike+Davis&background=dc2626&color=fff',
      accountNumber: '3456 7890 1234 5678',
      bank: 'Regional Credit Union'
    },
    {
      id: 4,
      name: 'Emily Wilson',
      avatar: 'https://ui-avatars.com/api/?name=Emily+Wilson&background=7c3aed&color=fff',
      accountNumber: '4567 8901 2345 6789',
      bank: 'Metro Bank'
    }
  ];

  const handleTransferClick = () => {
    setIsTransferModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsTransferModalOpen(false);
  };

  const handleTransferSubmit = (transferData: any) => {
    console.log('Transfer submitted:', transferData);
    // Handle the transfer logic here
    setIsTransferModalOpen(false);
  };

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Transfer</h3>
          <button className="card-menu">
            <MoreHorizontal size={20} />
          </button>
        </div>
        
        <div className="transfer-content">
          <input 
            type="text" 
            placeholder="9876 8774 5443 0000 1289"
            className="transfer-input"
            onClick={handleTransferClick}
            readOnly
          />
          <p style={{ fontSize: '0.8rem', color: 'var(--light-gray)', marginBottom: '1rem' }}>
            Click to start a new transfer
          </p>
          <button className="transfer-button" onClick={handleTransferClick}>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      <TransferModal
        isOpen={isTransferModalOpen}
        onClose={handleCloseModal}
        contacts={contacts}
        onTransfer={handleTransferSubmit}
      />
    </>
  );
};

export default TransferSection;
