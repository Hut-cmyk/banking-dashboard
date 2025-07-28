import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingProps {
  size?: 'small' | 'medium' | 'large';
  text?: string;
  type?: 'spinner' | 'skeleton' | 'fullscreen';
}

const Loading: React.FC<LoadingProps> = ({ 
  size = 'medium', 
  text = 'Loading...', 
  type = 'spinner' 
}) => {
  const getSizeClass = () => {
    switch (size) {
      case 'small': return 'loading-small';
      case 'large': return 'loading-large';
      default: return 'loading-medium';
    }
  };

  if (type === 'fullscreen') {
    return (
      <div className="loading-fullscreen">
        <div className="loading-content">
          <Loader2 className="loading-spinner" size={48} />
          <p>{text}</p>
        </div>
      </div>
    );
  }

  if (type === 'skeleton') {
    return (
      <div className="skeleton-loader">
        <div className="skeleton-header"></div>
        <div className="skeleton-line"></div>
        <div className="skeleton-line short"></div>
        <div className="skeleton-button"></div>
      </div>
    );
  }

  return (
    <div className={`loading-container ${getSizeClass()}`}>
      <Loader2 className="loading-spinner" />
      {text && <span className="loading-text">{text}</span>}
    </div>
  );
};

// Card Loading Skeleton
export const CardSkeleton: React.FC = () => (
  <div className="card skeleton-card">
    <div className="skeleton-header"></div>
    <div className="skeleton-line"></div>
    <div className="skeleton-line short"></div>
    <div className="skeleton-line medium"></div>
  </div>
);

// Table Loading Skeleton
export const TableSkeleton: React.FC = () => (
  <div className="skeleton-table">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="skeleton-row">
        <div className="skeleton-cell"></div>
        <div className="skeleton-cell short"></div>
        <div className="skeleton-cell medium"></div>
        <div className="skeleton-cell short"></div>
      </div>
    ))}
  </div>
);

export default Loading;
