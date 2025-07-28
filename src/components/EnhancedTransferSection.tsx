import React, { useState } from 'react';
import { ArrowRight, CreditCard } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';
import { useFormValidation, validationRules } from '../hooks/useFormValidation';
import FormInput from './FormInput';
import Loading from './Loading';

const EnhancedTransferSection: React.FC = () => {
  const { success, error } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    amount: ''
  });

  const { validateForm, getFieldProps, hasErrors } = useFormValidation({
    cardNumber: validationRules.cardNumber,
    amount: validationRules.amount
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm(formData)) {
      error('Validation Error', 'Please fix the errors below');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      success(
        'Transfer Successful!', 
        `$${formData.amount} sent to card ending in ${formData.cardNumber.slice(-4)}`
      );
      
      // Reset form
      setFormData({ cardNumber: '', amount: '' });
    } catch (err) {
      error('Transfer Failed', 'Please try again later');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Transfer</h3>
      </div>
      
      <form onSubmit={handleTransfer}>
        <FormInput
          label="Card Number"
          type="text"
          placeholder="1234 5678 9012 3456"
          value={formData.cardNumber}
          onChange={(e) => handleInputChange('cardNumber', e.target.value)}
          icon={<CreditCard size={16} />}
          helperText="Visa or MasterCard of any Poland Bank"
          required
          {...getFieldProps('cardNumber')}
        />
        
        <FormInput
          label="Amount"
          type="number"
          placeholder="0.00"
          value={formData.amount}
          onChange={(e) => handleInputChange('amount', e.target.value)}
          helperText="Maximum $10,000 per transaction"
          required
          {...getFieldProps('amount')}
        />
        
        <button 
          type="submit" 
          className="transfer-button"
          disabled={isLoading || hasErrors}
          aria-label="Send money transfer"
        >
          {isLoading ? (
            <Loading size="small" text="Processing..." />
          ) : (
            <>
              <ArrowRight size={20} />
              Send Transfer
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default EnhancedTransferSection;
