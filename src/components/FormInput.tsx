import React, { forwardRef, InputHTMLAttributes } from 'react';
import { AlertCircle } from 'lucide-react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  icon?: React.ReactNode;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, helperText, required, icon, className, id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    return (
      <div className={`form-input-container ${className || ''}`}>
        <label htmlFor={inputId} className="form-label">
          {label}
          {required && <span className="required-indicator" aria-label="required">*</span>}
        </label>
        
        <div className="input-wrapper">
          {icon && <div className="input-icon">{icon}</div>}
          <input
            {...props}
            ref={ref}
            id={inputId}
            className={`form-input ${error ? 'error' : ''} ${icon ? 'with-icon' : ''}`}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={
              [
                error ? errorId : null,
                helperText ? helperId : null
              ].filter(Boolean).join(' ') || undefined
            }
            required={required}
          />
        </div>

        {error && (
          <div id={errorId} className="error-message" role="alert">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {helperText && !error && (
          <div id={helperId} className="helper-text">
            {helperText}
          </div>
        )}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';

export default FormInput;
