'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/cn';

// OTP Input Component
function OTPInput({ value, onChange, length = 4 }) {
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(new Array(length).fill(''));

  useEffect(() => {
    if (value) {
      const otpArray = value.split('').slice(0, length);
      setOtp([...otpArray, ...new Array(length - otpArray.length).fill('')]);
    }
  }, [value, length]);

  const handleChange = (element, index) => {
    const val = element.value.replace(/\D/g, '');
    if (val.length > 1) {
      // Handle paste
      const pastedOtp = val.slice(0, length).split('');
      const newOtp = [...otp];
      pastedOtp.forEach((digit, i) => {
        if (index + i < length) {
          newOtp[index + i] = digit;
        }
      });
      setOtp(newOtp);
      onChange(newOtp.join(''));
      const nextIndex = Math.min(index + pastedOtp.length, length - 1);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);
    onChange(newOtp.join(''));

    // Move to next input
    if (val && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex gap-2 justify-center">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e.target, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className={cn(
            'w-10 h-12 text-center text-lg font-semibold',
            'border-2 border-gray-200 rounded-lg',
            'focus:border-blue-500 focus:ring-2 focus:ring-blue-100',
            'transition-all duration-200',
            digit && 'border-blue-500 bg-blue-50'
          )}
          autoFocus={index === 0}
        />
      ))}
    </div>
  );
}

// Main Auth Modal Component
export function AuthModal({ isOpen, onClose }) {
  const { requestOTP, verifyOTP, resendOTP } = useAuth();

  const [step, setStep] = useState('phone'); // 'phone' | 'otp' | 'register'
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [isNewUser, setIsNewUser] = useState(false);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep('phone');
        setPhone('');
        setOtp('');
        setName('');
        setEmail('');
        setCity('');
        setError('');
        setCountdown(0);
        setIsNewUser(false);
      }, 300);
    }
  }, [isOpen]);

  // Countdown timer for resend OTP
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Handle phone submission
  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    if (phone.length !== 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    setIsLoading(true);
    setError('');

    const result = await requestOTP({ phone: `+91${phone}` });

    setIsLoading(false);

    if (result.success) {
      setStep('otp');
      setCountdown(30);
      // Check if new user (for showing name/email fields)
      if (result.data?.isNewUser) {
        setIsNewUser(true);
      }
    } else {
      setError(result.message);
    }
  };

  // Handle OTP verification
  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError('Please enter the complete 6-digit OTP');
      return;
    }

    setIsLoading(true);
    setError('');

    const result = await verifyOTP({
      phone: `+91${phone}`,
      otp,
    });

    setIsLoading(false);

    if (result.success) {
      onClose();
    } else {
      setError(result.message);
    }
  };

  // Handle resend OTP
  const handleResendOTP = async () => {
    if (countdown > 0) return;

    setIsLoading(true);
    setError('');

    const result = await resendOTP({ phone: `+91${phone}` });

    setIsLoading(false);

    if (result.success) {
      setCountdown(30);
      setOtp('');
    } else {
      setError(result.message);
    }
  };

  // Handle registration with additional details
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }

    setIsLoading(true);
    setError('');

    const result = await requestOTP({
      phone: `+91${phone}`,
      name,
      email,
      city,
    });

    setIsLoading(false);

    if (result.success) {
      setStep('otp');
      setCountdown(30);
    } else {
      setError(result.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors z-10"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8 text-white">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white/20 rounded-lg">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold">
              {step === 'phone' && 'Login / Sign Up'}
              {step === 'otp' && 'Verify OTP'}
              {step === 'register' && 'Complete Profile'}
            </h2>
          </div>
          <p className="text-blue-100 text-sm">
            {step === 'phone' && 'Get access to college brochures, favorites and dashboard'}
            {step === 'otp' && `OTP sent to +91 ${phone}`}
            {step === 'register' && 'A few more details to complete your profile'}
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
              {error}
            </div>
          )}

          {/* Phone Input Step */}
          {step === 'phone' && (
            <form onSubmit={handlePhoneSubmit}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-4 text-gray-500 bg-gray-50 border border-r-0 border-gray-200 rounded-l-lg text-sm">
                    +91
                  </span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="Enter your phone number"
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-r-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all"
                    autoFocus
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  You'll receive a 6-digit OTP to verify
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading || phone.length !== 10}
                className={cn(
                  'w-full py-3 px-4 rounded-lg font-medium text-white',
                  'bg-gradient-to-r from-orange-500 to-orange-600',
                  'hover:from-orange-600 hover:to-orange-700',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  'transition-all duration-200 shadow-sm hover:shadow'
                )}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending OTP...
                  </span>
                ) : (
                  'Request OTP'
                )}
              </button>
            </form>
          )}

          {/* OTP Verification Step */}
          {step === 'otp' && (
            <form onSubmit={handleOTPSubmit}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
                  Enter the 6-digit OTP
                </label>
                <OTPInput value={otp} onChange={setOtp} length={6} />
                <div className="mt-4 text-center">
                  {countdown > 0 ? (
                    <p className="text-sm text-gray-500">
                      Resend OTP in <span className="text-blue-600 font-medium">{countdown}s</span>
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOTP}
                      disabled={isLoading}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Resend OTP
                    </button>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || otp.length !== 6}
                className={cn(
                  'w-full py-3 px-4 rounded-lg font-medium text-white',
                  'bg-gradient-to-r from-orange-500 to-orange-600',
                  'hover:from-orange-600 hover:to-orange-700',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  'transition-all duration-200 shadow-sm hover:shadow'
                )}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Verifying...
                  </span>
                ) : (
                  'Verify OTP'
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setStep('phone');
                  setOtp('');
                }}
                className="w-full mt-3 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                Change Phone Number
              </button>
            </form>
          )}

          {/* Registration Step (if new user needs more details) */}
          {step === 'register' && (
            <form onSubmit={handleRegisterSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all"
                    autoFocus
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City (Optional)
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter your city"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || !name.trim()}
                className={cn(
                  'w-full mt-6 py-3 px-4 rounded-lg font-medium text-white',
                  'bg-gradient-to-r from-orange-500 to-orange-600',
                  'hover:from-orange-600 hover:to-orange-700',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  'transition-all duration-200 shadow-sm hover:shadow'
                )}
              >
                {isLoading ? 'Processing...' : 'Continue'}
              </button>
            </form>
          )}

          {/* Terms */}
          <p className="mt-6 text-xs text-gray-500 text-center">
            By continuing, you agree to our{' '}
            <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
