import React from 'react';
import { Headphones, Info, MapPin, Phone, Mail } from 'lucide-react';

const Help: React.FC = () => {
  return (
    <div className="help-page">
      <div className="page-header">
        <h2>Help & Support</h2>
        <p>Need assistance? We are here to help!</p>
      </div>

      <div className="help-container">
        <div className="help-content">
          <h3>Contact Support</h3>
          <p>If you have questions or need help, please contact us:</p>

          <div className="contact-info">
            <div>
              <MapPin size={20} />
              <span>123 Main Street, New York, NY 10001</span>
            </div>
            <div>
              <Phone size={20} />
              <span>+1 (555) 987-6543</span>
            </div>
            <div>
              <Mail size={20} />
              <span>support@bank.com</span>
            </div>
          </div>

          <h3>Help Center</h3>
          <ul className="help-list">
            <li>
              <Info size={20} />
              Account Setup
            </li>
            <li>
              <Info size={20} />
              Transactions & Transfer
            </li>
            <li>
              <Info size={20} />
              Security & Privacy
            </li>
            <li>
              <Info size={20} />
              Reporting & Analytics
            </li>
            <li>
              <Info size={20} />
              Mobile & App Features
            </li>
            <li>
              <Info size={20} />
              Feedback & Suggestions
            </li>
          </ul>

          <h3>24/7 Support</h3>
          <div className="support-info">
            <Headphones size={20} />
            Reach out to our support team anytime.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
