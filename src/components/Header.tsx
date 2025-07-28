import React from 'react';
import { Search } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div>
        <h1 className="header-title">Overview</h1>
        <p className="header-subtitle">Welcome back, Oleg! 👋</p>
      </div>
      
      <div className="header-actions">
        <div className="search-box">
          <Search className="search-icon" size={20} />
          <input 
            type="text" 
            placeholder="Search" 
            className="search-input"
          />
        </div>
        
        <div className="user-avatar">
          OL
        </div>
      </div>
    </header>
  );
};

export default Header;
