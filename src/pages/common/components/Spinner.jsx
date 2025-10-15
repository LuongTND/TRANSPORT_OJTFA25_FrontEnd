import React from 'react';
export default function Spinner({ size = 24, className = '' }) {
  return (
    <span
      className={`inline-block animate-spin border-4 border-green-300 border-t-green-600 rounded-full ${className}`}
      style={{ width: size, height: size }}
      role="status"
    />
  );
}
