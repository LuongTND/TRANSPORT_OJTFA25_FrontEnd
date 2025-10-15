import React from 'react';

const base = 'inline-flex items-center justify-center rounded px-4 py-2 font-semibold focus:outline-none transition text-white';
const variants = {
  primary: 'bg-green-600 hover:bg-green-800',
  secondary: 'bg-green-200 text-green-900 hover:bg-green-300',
  outline: 'bg-white text-green-600 border border-green-600 hover:bg-green-50',
  disabled: 'bg-gray-300 text-gray-400 pointer-events-none',
};
const sizes = {
  sm: 'text-sm py-1 px-3',
  md: '',
  lg: 'text-lg py-2 px-6',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  children,
  className = '',
  ...props
}) {
  return (
    <button
      className={`${base} ${variants[disabled?'disabled':variant]} ${sizes[size]} ${className}`}
      disabled={disabled||loading}
      {...props}
    >
      {loading && <span className="loader mr-2" />}
      {children}
    </button>
  );
}
// Thêm CSS loader nhỏ cho loading ở global css/tailwind:
// .loader { border:2px solid #a3e635; border-top:2px solid #16a34a; border-radius:50%; width:16px; height:16px; animation:spin .9s linear infinite; display:inline-block; }
// @keyframes spin {to{transform:rotate(360deg);}}
