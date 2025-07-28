import React, { useState } from 'react';
import { 
  User, Lock, Bell, Shield, CreditCard, Globe, 
  Moon, Sun
} from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    push: false,
    transactions: true,
    marketing: false
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'cards', label: 'Cards & Limits', icon: CreditCard },
    { id: 'preferences', label: 'Preferences', icon: Globe }
  ];

  const renderTabContent = () => {
    switch(activeTab) {
      case 'profile':
        return (
          <div className="settings-content">
            <h3>Profile Information</h3>
            <div className="profile-section">
              <div className="profile-avatar">
                <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="Profile" />
                <button className="avatar-edit">Edit</button>
              </div>
              <div className="profile-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name</label>
                    <input type="text" defaultValue="Oleg" />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" defaultValue="Petrov" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" defaultValue="oleg@email.com" />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input type="tel" defaultValue="+1 (555) 123-4567" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <input type="text" defaultValue="123 Main Street, New York, NY 10001" />
                </div>
                <button className="btn-primary">Save Changes</button>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="settings-content">
            <h3>Security Settings</h3>
            <div className="security-section">
              <div className="security-card">
                <h4>Password</h4>
                <p>Last changed 3 months ago</p>
                <button className="btn-secondary">Change Password</button>
              </div>
              <div className="security-card">
                <h4>Two-Factor Authentication</h4>
                <p>Add an extra layer of security</p>
                <div className="toggle-switch">
                  <input type="checkbox" id="2fa" defaultChecked />
                  <label htmlFor="2fa"></label>
                </div>
              </div>
              <div className="security-card">
                <h4>Login History</h4>
                <div className="login-history">
                  <div className="login-item">
                    <span>Web Browser - Chrome</span>
                    <span>Today, 2:30 PM</span>
                  </div>
                  <div className="login-item">
                    <span>Mobile App - iOS</span>
                    <span>Yesterday, 8:15 AM</span>
                  </div>
                  <div className="login-item">
                    <span>Web Browser - Safari</span>
                    <span>Jan 20, 5:45 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="settings-content">
            <h3>Notification Preferences</h3>
            <div className="notifications-section">
              <div className="notification-group">
                <h4>Communication</h4>
                <div className="notification-item">
                  <div>
                    <label>Email Notifications</label>
                    <p>Receive notifications via email</p>
                  </div>
                  <div className="toggle-switch">
                    <input 
                      type="checkbox" 
                      id="email-notif" 
                      checked={notifications.email}
                      onChange={(e) => setNotifications({...notifications, email: e.target.checked})}
                    />
                    <label htmlFor="email-notif"></label>
                  </div>
                </div>
                <div className="notification-item">
                  <div>
                    <label>SMS Notifications</label>
                    <p>Receive notifications via SMS</p>
                  </div>
                  <div className="toggle-switch">
                    <input 
                      type="checkbox" 
                      id="sms-notif"
                      checked={notifications.sms}
                      onChange={(e) => setNotifications({...notifications, sms: e.target.checked})}
                    />
                    <label htmlFor="sms-notif"></label>
                  </div>
                </div>
              </div>
              <div className="notification-group">
                <h4>Account Activity</h4>
                <div className="notification-item">
                  <div>
                    <label>Transaction Alerts</label>
                    <p>Get notified of all transactions</p>
                  </div>
                  <div className="toggle-switch">
                    <input 
                      type="checkbox" 
                      id="transaction-notif"
                      checked={notifications.transactions}
                      onChange={(e) => setNotifications({...notifications, transactions: e.target.checked})}
                    />
                    <label htmlFor="transaction-notif"></label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="settings-content">
            <h3>Privacy Settings</h3>
            <div className="privacy-section">
              <div className="privacy-card">
                <h4>Data Sharing</h4>
                <p>Control how your data is used</p>
                <div className="privacy-options">
                  <label>
                    <input type="checkbox" defaultChecked />
                    Share anonymous usage data
                  </label>
                  <label>
                    <input type="checkbox" />
                    Allow marketing communications
                  </label>
                  <label>
                    <input type="checkbox" defaultChecked />
                    Enable location services
                  </label>
                </div>
              </div>
              <div className="privacy-card">
                <h4>Account Visibility</h4>
                <p>Who can see your account information</p>
                <select className="privacy-select">
                  <option>Only me</option>
                  <option>Trusted contacts</option>
                  <option>Public</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 'cards':
        return (
          <div className="settings-content">
            <h3>Cards & Limits</h3>
            <div className="cards-section">
              <div className="limit-card">
                <h4>Daily Transfer Limit</h4>
                <div className="limit-info">
                  <span className="current-limit">$5,000</span>
                  <span className="limit-used">$1,250 used today</span>
                </div>
                <button className="btn-secondary">Modify Limit</button>
              </div>
              <div className="limit-card">
                <h4>Monthly Spending Limit</h4>
                <div className="limit-info">
                  <span className="current-limit">$15,000</span>
                  <span className="limit-used">$3,847 spent this month</span>
                </div>
                <button className="btn-secondary">Modify Limit</button>
              </div>
              <div className="limit-card">
                <h4>ATM Withdrawal Limit</h4>
                <div className="limit-info">
                  <span className="current-limit">$1,000</span>
                  <span className="limit-used">$200 withdrawn today</span>
                </div>
                <button className="btn-secondary">Modify Limit</button>
              </div>
            </div>
          </div>
        );

      case 'preferences':
        return (
          <div className="settings-content">
            <h3>Preferences</h3>
            <div className="preferences-section">
              <div className="preference-item">
                <div className="preference-info">
                  <h4>Theme</h4>
                  <p>Choose your preferred theme</p>
                </div>
                <div className="theme-toggle">
                  <button 
                    className={!darkMode ? 'active' : ''}
                    onClick={() => setDarkMode(false)}
                  >
                    <Sun size={20} />
                    Light
                  </button>
                  <button 
                    className={darkMode ? 'active' : ''}
                    onClick={() => setDarkMode(true)}
                  >
                    <Moon size={20} />
                    Dark
                  </button>
                </div>
              </div>
              <div className="preference-item">
                <div className="preference-info">
                  <h4>Currency</h4>
                  <p>Primary currency for display</p>
                </div>
                <select>
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                  <option>GBP (£)</option>
                  <option>JPY (¥)</option>
                </select>
              </div>
              <div className="preference-item">
                <div className="preference-info">
                  <h4>Language</h4>
                  <p>Interface language</p>
                </div>
                <select>
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select>
              </div>
              <div className="preference-item">
                <div className="preference-info">
                  <h4>Time Zone</h4>
                  <p>Your local time zone</p>
                </div>
                <select>
                  <option>Eastern Time (ET)</option>
                  <option>Central Time (CT)</option>
                  <option>Mountain Time (MT)</option>
                  <option>Pacific Time (PT)</option>
                </select>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div className="settings-page">
      <div className="page-header">
        <h2>Settings</h2>
        <p>Manage your account preferences and security</p>
      </div>

      <div className="settings-container">
        <div className="settings-sidebar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`settings-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon size={20} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="settings-main">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Settings;
