import React from 'react';
export default function Modal({open, onClose, title, children}) {
  if(!open) return null;
  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-xl min-w-[320px] w-full max-w-md border-green-500 border-l-8 relative">
        <button onClick={onClose} className="absolute right-2 top-1 text-xl text-green-700 hover:text-green-800">×</button>
        {title && <h3 className="mb-3 font-bold text-green-700">{title}</h3>}
        {children}
      </div>
    </div>
  );
}
