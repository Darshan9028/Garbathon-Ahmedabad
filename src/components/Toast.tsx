import React from 'react';

export interface ToastData {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning' | 'error';
  icon?: string;
}

interface ToastProps {
  toast: ToastData | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  if (!toast) return null;

  const iconName = toast.icon || (
    toast.type === 'error' ? 'error' :
    toast.type === 'warning' ? 'warning' :
    toast.type === 'info' ? 'info' : 'check_circle'
  );

  const iconColor = toast.type === 'error' ? 'text-red-500' :
    toast.type === 'warning' ? 'text-amber-500' :
    toast.type === 'info' ? 'text-indigo-400' : 'text-[#fea619]';

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl bg-[#211635] text-[#fff7ff] shadow-2xl border border-white/10 animate-in fade-in slide-in-from-bottom-5 duration-200 max-w-md">
      <span className={`material-symbols-outlined text-[22px] ${iconColor} shrink-0`}>
        {iconName}
      </span>
      <p className="text-[13px] font-medium leading-snug text-slate-100 flex-1">
        {toast.message}
      </p>
      <button
        onClick={onClose}
        className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        aria-label="Close notification"
      >
        <span className="material-symbols-outlined text-[16px]">close</span>
      </button>
    </div>
  );
};
