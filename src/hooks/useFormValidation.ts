import { useState, useCallback } from 'react';

interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  min?: number;
  max?: number;
  custom?: (value: any) => string | null;
}

interface ValidationRules {
  [key: string]: ValidationRule;
}

interface FormErrors {
  [key: string]: string;
}

export const useFormValidation = (rules: ValidationRules) => {
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{[key: string]: boolean}>({});

  const validateField = useCallback((name: string, value: any): string => {
    const rule = rules[name];
    if (!rule) return '';

    // Required validation
    if (rule.required && (!value || value.toString().trim() === '')) {
      return `${name} is required`;
    }

    // Skip other validations if field is empty and not required
    if (!value && !rule.required) return '';

    const stringValue = value.toString();

    // Min length validation
    if (rule.minLength && stringValue.length < rule.minLength) {
      return `${name} must be at least ${rule.minLength} characters`;
    }

    // Max length validation
    if (rule.maxLength && stringValue.length > rule.maxLength) {
      return `${name} must not exceed ${rule.maxLength} characters`;
    }

    // Pattern validation
    if (rule.pattern && !rule.pattern.test(stringValue)) {
      return `${name} format is invalid`;
    }

    // Numeric validations
    const numericValue = parseFloat(value);
    if (rule.min !== undefined && numericValue < rule.min) {
      return `${name} must be at least ${rule.min}`;
    }

    if (rule.max !== undefined && numericValue > rule.max) {
      return `${name} must not exceed ${rule.max}`;
    }

    // Custom validation
    if (rule.custom) {
      const customError = rule.custom(value);
      if (customError) return customError;
    }

    return '';
  }, [rules]);

  const validateForm = useCallback((formData: {[key: string]: any}): boolean => {
    const newErrors: FormErrors = {};
    let hasErrors = false;

    Object.keys(rules).forEach(fieldName => {
      const error = validateField(fieldName, formData[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
        hasErrors = true;
      }
    });

    setErrors(newErrors);
    return !hasErrors;
  }, [rules, validateField]);

  const validateSingleField = useCallback((name: string, value: any) => {
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
    return !error;
  }, [validateField]);

  const setFieldTouched = useCallback((name: string) => {
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  }, []);

  const clearErrors = useCallback(() => {
    setErrors({});
    setTouched({});
  }, []);

  const getFieldProps = useCallback((name: string) => ({
    onBlur: () => setFieldTouched(name),
    error: touched[name] ? errors[name] : undefined,
    hasError: Boolean(touched[name] && errors[name])
  }), [errors, touched, setFieldTouched]);

  return {
    errors,
    touched,
    validateForm,
    validateSingleField,
    setFieldTouched,
    clearErrors,
    getFieldProps,
    hasErrors: Object.keys(errors).some(key => errors[key])
  };
};

// Common validation rules
export const validationRules = {
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    custom: (value: string) => {
      if (value && !value.includes('@')) return 'Please enter a valid email address';
      return null;
    }
  },
  password: {
    required: true,
    minLength: 8,
    custom: (value: string) => {
      if (value && !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
        return 'Password must contain uppercase, lowercase, and number';
      }
      return null;
    }
  },
  phone: {
    pattern: /^\+?[\d\s\-\(\)]+$/,
    custom: (value: string) => {
      if (value && value.replace(/\D/g, '').length < 10) {
        return 'Please enter a valid phone number';
      }
      return null;
    }
  },
  amount: {
    required: true,
    min: 0.01,
    custom: (value: string) => {
      const num = parseFloat(value);
      if (isNaN(num)) return 'Please enter a valid amount';
      if (num > 10000) return 'Amount cannot exceed $10,000';
      return null;
    }
  },
  cardNumber: {
    required: true,
    pattern: /^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/,
    custom: (value: string) => {
      const cleaned = value.replace(/\s/g, '');
      if (cleaned.length !== 16) return 'Card number must be 16 digits';
      return null;
    }
  }
};
