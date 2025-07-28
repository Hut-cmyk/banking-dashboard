import React, { useState } from 'react';
import { X, Send, User, CreditCard, DollarSign, MessageSquare } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';
import { useFormValidation, validationRules } from '../hooks/useFormValidation';
import FormInput from './FormInput';
import Loading from './Loading';

interface Contact {
  id: number;
  name: string;
  accountNumber: string;
  bankName?: string;
}

interface TransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  contacts?: Contact[];
  selectedContact?: Contact;
  onTransfer?: (transferData: {
    recipientId: string;
    accountNumber: string;
    recipientName: string;
    amount: string;
    description: string;
    transferFee: string;
    fromAccount: { id: string; name: string; number: string; balance: number };
  }) => void; // <-- Add this line
}

const TransferModal: React.FC<TransferModalProps> = ({ 
  isOpen, 
  onClose, 
  contacts = [], 
  selectedContact,
  onTransfer // <-- Add this to the destructured props
}) => {
  const { success, error } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [transferType, setTransferType] = useState<'contact' | 'account'>('contact');
  const [formData, setFormData] = useState({
    recipientId: selectedContact?.id?.toString() || '',
    accountNumber: selectedContact?.accountNumber || '',
    recipientName: selectedContact?.name || '',
    amount: '',
    description: '',
    transferFee: '0.00'
  });

  const { validateForm, getFieldProps, hasErrors } = useFormValidation({
    recipientName: { required: true, minLength: 2 },
    accountNumber: { 
      required: true, 
      pattern: /^\d{10,16}$/,
      custom: (value: string) => {
        if (value && (value.length < 10 || value.length > 16)) {
          return 'Account number must be 10-16 digits';
        }
        return null;
      }
    },
    amount: validationRules.amount,
    description: { maxLength: 100 }
  });

  const accounts = [
    { id: '1', name: 'Primary Checking', number: '****1234', balance: 5750.20 },
    { id: '2', name: 'Savings Account', number: '****5678', balance: 12450.75 },
    { id: '3', name: 'Business Account', number: '****9012', balance: 8920.30 }
  ];

  const [fromAccount, setFromAccount] = useState(accounts[0]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Auto-fill contact details when selecting from dropdown
    if (field === 'recipientId' && value) {
      const contact = contacts.find(c => c.id.toString() === value);
      if (contact) {
        setFormData(prev => ({
          ...prev,
          recipientName: contact.name,
          accountNumber: contact.accountNumber
        }));
      }
    }

    // Calculate transfer fee based on amount
    if (field === 'amount' && value) {
      const amount = parseFloat(value);
      const fee = amount > 1000 ? '2.50' : amount > 100 ? '1.00' : '0.00';
      setFormData(prev => ({
        ...prev,
        transferFee: fee
      }));
    }
  };

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm(formData)) {
      error('Validation Error', 'Please fix the errors below');
      return;
    }

    const amount = parseFloat(formData.amount);
    const fee = parseFloat(formData.transferFee);
    const total = amount + fee;

    if (total > fromAccount.balance) {
      error('Insufficient Funds', `Your account balance is $${fromAccount.balance.toFixed(2)}`);
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      success(
        'Transfer Successful!', 
        `$${amount.toFixed(2)} sent to ${formData.recipientName}`
      );

      // Call onTransfer if provided
      if (onTransfer) {
        onTransfer({
          ...formData,
          fromAccount
        });
      }
      
      // Reset form and close modal
      setFormData({
        recipientId: '',
        accountNumber: '',
        recipientName: '',
        amount: '',
        description: '',
        transferFee: '0.00'
      });
      onClose();
    } catch (err) {
      error('Transfer Failed', 'Please try again later');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content transfer-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Send Money</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleTransfer}>
          {/* From Account Selection */}
          <div className="form-section">
            <h3>From Account</h3>
            <div className="account-selector">
              <select 
                value={fromAccount.id}
                onChange={(e) => {
                  const account = accounts.find(acc => acc.id === e.target.value);
                  if (account) setFromAccount(account);
                }}
              >
                {accounts.map(account => (
                  <option key={account.id} value={account.id}>
                    {account.name} {account.number} - ${account.balance.toFixed(2)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Transfer Type Selection */}
          <div className="form-section">
            <h3>Transfer To</h3>
            <div className="transfer-type-tabs">
              <button
                type="button"
                className={transferType === 'contact' ? 'active' : ''}
                onClick={() => setTransferType('contact')}
              >
                <User size={16} />
                Saved Contact
              </button>
              <button
                type="button"
                className={transferType === 'account' ? 'active' : ''}
                onClick={() => setTransferType('account')}
              >
                <CreditCard size={16} />
                Account Number
              </button>
            </div>
          </div>

          {/* Recipient Selection */}
          {transferType === 'contact' ? (
            <div className="form-section">
              <label>Select Contact</label>
              <select
                value={formData.recipientId}
                onChange={(e) => handleInputChange('recipientId', e.target.value)}
                required
              >
                <option value="">Choose a contact...</option>
                {contacts.map(contact => (
                  <option key={contact.id} value={contact.id}>
                    {contact.name} - {contact.accountNumber}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <>
              <FormInput
                label="Recipient Name"
                type="text"
                placeholder="Enter recipient's full name"
                value={formData.recipientName}
                onChange={(e) => handleInputChange('recipientName', e.target.value)}
                icon={<User size={16} />}
                required
                {...getFieldProps('recipientName')}
              />
              
              <FormInput
                label="Account Number"
                type="text"
                placeholder="Enter 10-16 digit account number"
                value={formData.accountNumber}
                onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                icon={<CreditCard size={16} />}
                required
                {...getFieldProps('accountNumber')}
              />
            </>
          )}

          {/* Amount */}
          <FormInput
            label="Transfer Amount"
            type="number"
            placeholder="0.00"
            value={formData.amount}
            onChange={(e) => handleInputChange('amount', e.target.value)}
            icon={<DollarSign size={16} />}
            helperText="Maximum $10,000 per transaction"
            required
            {...getFieldProps('amount')}
          />

          {/* Description */}
          <FormInput
            label="Description (Optional)"
            type="text"
            placeholder="What's this transfer for?"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            icon={<MessageSquare size={16} />}
            helperText="Add a note for your records"
            {...getFieldProps('description')}
          />

          {/* Transfer Summary */}
          {formData.amount && (
            <div className="transfer-summary">
              <h3>Transfer Summary</h3>
              <div className="summary-row">
                <span>Transfer Amount:</span>
                <span>${parseFloat(formData.amount || '0').toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Transfer Fee:</span>
                <span>${formData.transferFee}</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>${(parseFloat(formData.amount || '0') + parseFloat(formData.transferFee)).toFixed(2)}</span>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button 
            type="submit" 
            className="btn-primary transfer-submit"
            disabled={isLoading || hasErrors || !formData.amount}
          >
            {isLoading ? (
              <Loading size="small" text="Processing Transfer..." />
            ) : (
              <>
                <Send size={20} />
                Send ${formData.amount || '0.00'}
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransferModal;
