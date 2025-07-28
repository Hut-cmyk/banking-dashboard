import React, { Suspense } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Loading from './components/Loading';
import { ToastProvider } from './contexts/ToastContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Overview from './pages/Overview';
import Cards from './pages/Cards';
import Transactions from './pages/Transactions';
import Analytics from './pages/Analytics';
import Accounts from './pages/Accounts';
import Contacts from './pages/Contacts';
import Settings from './pages/Settings';
import Help from './pages/Help';

function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <Router>
          <div className="app">
            <Sidebar />
            <main className="main-content">
              <Header />
              <Suspense fallback={<Loading type="fullscreen" text="Loading page..." />}>
                <Routes>
                  <Route path="/" element={<Overview />} />
                  <Route path="/cards" element={<Cards />} />
                  <Route path="/transactions" element={<Transactions />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/accounts" element={<Accounts />} />
                  <Route path="/contacts" element={<Contacts />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/help" element={<Help />} />
                </Routes>
              </Suspense>
            </main>
          </div>
        </Router>
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;
