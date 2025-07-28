import React, { useState } from 'react';
import { X, User, Phone, Mail, CreditCard, Tag } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';
import { useFormValidation, validationRules } from '../hooks/useFormValidation';
import FormInput from './FormInput';
import Loading from './Loading';

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  accountNumber: string;
  category: string;
  bankName?: string;
}

interface AddContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddContact: (contact: Omit<Contact, 'id'>) => void;
  editingContact?: Contact;
}

const AddContactModal: React.FC<AddContactModalProps> = ({ 
  isOpen, 
  onClose, 
  onAddContact,
  editingContact 
}) => {
  const { success, error } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: editingContact?.name || '',
    email: editingContact?.email || '',
    phone: editingContact?.phone || '',
    accountNumber: editingContact?.accountNumber || '',
    category: editingContact?.category || 'friends',
    bankName: editingContact?.bankName || 'Same Bank'
  });

  const { validateForm, getFieldProps, hasErrors } = useFormValidation({
    name: { required: true, minLength: 2, maxLength: 50 },
    email: validationRules.email,
    phone: validationRules.phone,
    accountNumber: { 
      required: true, 
      pattern: /^\d{10,16}$/,
      custom: (value: string) => {
        if (value && (value.length < 10 || value.length > 16)) {
          return 'Account number must be 10-16 digits';
        }
        return null;
      }
    }
  });

  const categories = [
    { value: 'family', label: 'Family', color: '#4CAF50' },
    { value: 'friends', label: 'Friends', color: '#2196F3' },
    { value: 'business', label: 'Business', color: '#FF9800' },
    { value: 'other', label: 'Other', color: '#9C27B0' }
  ];

  const banks = [
    'Same Bank',
    'Chase Bank',
    'Bank of America',
    'Wells Fargo',
    'Citibank',
    'US Bank',
    'PNC Bank',
    'Capital One',
    'TD Bank',
    'Other'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm(formData)) {
      error('Validation Error', 'Please fix the errors below');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create contact object
      const newContact = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        accountNumber: formData.accountNumber,
        category: formData.category,
        bankName: formData.bankName
      };

      onAddContact(newContact);
      
      success(
        editingContact ? 'Contact Updated!' : 'Contact Added!', 
        `${formData.name} has been ${editingContact ? 'updated' : 'added to'} your contacts`
      );
      
      // Reset form and close modal
      if (!editingContact) {
        setFormData({
          name: '',
          email: '',
          phone: '',
          accountNumber: '',
          category: 'friends',
          bankName: 'Same Bank'
        });
      }
      onClose();
    } catch (err) {
      error('Failed to save contact', 'Please try again later');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content add-contact-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{editingContact ? 'Edit Contact' : 'Add New Contact'}</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Basic Information */}
          <div className="form-section">
            <h3>Contact Information</h3>
            
            <FormInput
              label="Full Name"
              type="text"
              placeholder="Enter contact's full name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              icon={<User size={16} />}
              required
              {...getFieldProps('name')}
            />
            
            <FormInput
              label="Email Address"
              type="email"
              placeholder="contact@example.com"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              icon={<Mail size={16} />}
              required
              {...getFieldProps('email')}
            />
            
            <FormInput
              label="Phone Number"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              icon={<Phone size={16} />}
              helperText="Include country code for international numbers"
              {...getFieldProps('phone')}
            />
          </div>

          {/* Banking Information */}
          <div className="form-section">
            <h3>Banking Details</h3>
            
            <FormInput
              label="Account Number"
              type="text"
              placeholder="Enter 10-16 digit account number"
              value={formData.accountNumber}
              onChange={(e) => handleInputChange('accountNumber', e.target.value)}
              icon={<CreditCard size={16} />}
              helperText="Account number for transfers"
              required
              {...getFieldProps('accountNumber')}
            />

            <div className="form-group">
              <label>Bank Name</label>
              <select
                value={formData.bankName}
                onChange={(e) => handleInputChange('bankName', e.target.value)}
                required
              >
                {banks.map(bank => (
                  <option key={bank} value={bank}>{bank}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Selection */}
          <div className="form-section">
            <h3>Contact Category</h3>
            <div className="category-selection">
              {categories.map(category => (
                <label 
                  key={category.value}
                  className={`category-option ${formData.category === category.value ? 'selected' : ''}`}
                >
                  <input
                    type="radio"
                    name="category"
                    value={category.value}
                    checked={formData.category === category.value}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                  />
                  <div className="category-content">
                    <div 
                      className="category-color" 
                      style={{ backgroundColor: category.color }}
                    ></div>
                    <Tag size={16} />
                    <span>{category.label}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="modal-actions">
            <button 
              type="button" 
              className="btn-secondary"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-primary"
              disabled={isLoading || hasErrors}
            >
              {isLoading ? (
                <Loading size="small" text="Saving..." />
              ) : (
                <>
                  <User size={20} />
                  {editingContact ? 'Update Contact' : 'Add Contact'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddContactModal;
