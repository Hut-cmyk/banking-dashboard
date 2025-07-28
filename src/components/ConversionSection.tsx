import React, { useState, useEffect } from 'react';
import { ArrowUpDown, RefreshCw } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';

interface CurrencyRates {
  [key: string]: number;
}

const ConversionSection: React.FC = () => {
  const { success, error } = useToast();
  const [fromAmount, setFromAmount] = useState<string>('1000');
  const [toAmount, setToAmount] = useState<string>('5100');
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('PLN');
  const [exchangeRate, setExchangeRate] = useState<number>(5.1);
  const [lastUpdated, setLastUpdated] = useState<string>(new Date().toLocaleString());
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const currencies = ['USD', 'EUR', 'PLN', 'GBP', 'JPY', 'CAD', 'AUD'];
  
  // Mock exchange rates - in production, this would come from an API
  const mockRates: CurrencyRates = {
    'USD-EUR': 0.85,
    'USD-PLN': 5.1,
    'USD-GBP': 0.73,
    'USD-JPY': 110.5,
    'USD-CAD': 1.25,
    'USD-AUD': 1.35,
    'EUR-USD': 1.18,
    'EUR-PLN': 6.0,
    'EUR-GBP': 0.86,
    'PLN-USD': 0.196,
    'PLN-EUR': 0.167,
    'GBP-USD': 1.37,
    'JPY-USD': 0.009,
    'CAD-USD': 0.8,
    'AUD-USD': 0.74
  };

  const getRateKey = (from: string, to: string): string => `${from}-${to}`;

  const getExchangeRate = (from: string, to: string): number => {
    if (from === to) return 1;
    const rateKey = getRateKey(from, to);
    return mockRates[rateKey] || 1;
  };

  const convertCurrency = (amount: string, rate: number): string => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount)) return '0';
    return (numAmount * rate).toFixed(2);
  };

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    const rate = getExchangeRate(fromCurrency, toCurrency);
    setToAmount(convertCurrency(value, rate));
    setExchangeRate(rate);
  };

  const handleToAmountChange = (value: string) => {
    setToAmount(value);
    const rate = getExchangeRate(toCurrency, fromCurrency);
    setFromAmount(convertCurrency(value, rate));
    setExchangeRate(getExchangeRate(fromCurrency, toCurrency));
  };

  const handleCurrencySwap = () => {
    const newFromCurrency = toCurrency;
    const newToCurrency = fromCurrency;
    const newFromAmount = toAmount;
    const newToAmount = fromAmount;
    
    setFromCurrency(newFromCurrency);
    setToCurrency(newToCurrency);
    setFromAmount(newFromAmount);
    setToAmount(newToAmount);
    setExchangeRate(getExchangeRate(newFromCurrency, newToCurrency));
    
    success('Currencies swapped successfully!');
  };

  const handleCurrencyChange = (type: 'from' | 'to', currency: string) => {
    if (type === 'from') {
      setFromCurrency(currency);
      const rate = getExchangeRate(currency, toCurrency);
      setToAmount(convertCurrency(fromAmount, rate));
      setExchangeRate(rate);
    } else {
      setToCurrency(currency);
      const rate = getExchangeRate(fromCurrency, currency);
      setToAmount(convertCurrency(fromAmount, rate));
      setExchangeRate(rate);
    }
  };

  const refreshRates = async () => {
    setIsLoading(true);
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Add small random variation to simulate rate changes
      const variation = (Math.random() - 0.5) * 0.1;
      const newRate = exchangeRate * (1 + variation);
      setExchangeRate(newRate);
      setToAmount(convertCurrency(fromAmount, newRate));
      setLastUpdated(new Date().toLocaleString());
      success('Exchange rates updated successfully!');
    } catch (err) {
      error('Failed to update exchange rates');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const rate = getExchangeRate(fromCurrency, toCurrency);
    setExchangeRate(rate);
    setToAmount(convertCurrency(fromAmount, rate));
  }, [fromCurrency, toCurrency, fromAmount, getExchangeRate]);

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Currency Conversion</h3>
        <button 
          className="card-menu"
          onClick={refreshRates}
          disabled={isLoading}
          title="Refresh exchange rates"
        >
          <RefreshCw size={20} className={isLoading ? 'loading-spinner' : ''} />
        </button>
      </div>
      
      <div className="conversion-content">
        <div className="conversion-row">
          <div>
            <select 
              value={fromCurrency}
              onChange={(e) => handleCurrencyChange('from', e.target.value)}
              className="conversion-currency"
            >
              {currencies.map(currency => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
            <input 
              type="number" 
              value={fromAmount}
              onChange={(e) => handleFromAmountChange(e.target.value)}
              className="conversion-input"
              placeholder="Enter amount"
              min="0"
              step="0.01"
            />
          </div>
          <button 
            className="conversion-button"
            onClick={handleCurrencySwap}
            title="Swap currencies"
          >
            <ArrowUpDown size={16} />
          </button>
          <div>
            <select 
              value={toCurrency}
              onChange={(e) => handleCurrencyChange('to', e.target.value)}
              className="conversion-currency"
            >
              {currencies.map(currency => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
            <input 
              type="number" 
              value={toAmount}
              onChange={(e) => handleToAmountChange(e.target.value)}
              className="conversion-input"
              placeholder="Converted amount"
              min="0"
              step="0.01"
            />
          </div>
        </div>
        <div className="conversion-rate">
          1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
        </div>
        <div className="conversion-rate" style={{ fontSize: '0.8rem', opacity: 0.7 }}>
          Last updated: {lastUpdated}
        </div>
      </div>
    </div>
  );
};

export default ConversionSection;
