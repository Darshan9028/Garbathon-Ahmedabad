import React from 'react';
import { SAFE_RECRUITERS_LIST } from '../data/mockData';

interface SafeRecruitersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SafeRecruitersModal: React.FC<SafeRecruitersModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/30 p-6 flex flex-col gap-5 max-h-[85vh] overflow-hidden">
        <div className="flex items-center justify-between pb-3 border-b border-surface-container">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">verified_user</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-[16px] text-on-surface font-bold">Verified Safe Recruiters (17 Cleared)</h3>
              <p className="text-[12px] text-on-surface-variant">Validated domain SPF/DKIM records & authenticated corporate headers</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="overflow-y-auto pr-1 flex flex-col gap-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {SAFE_RECRUITERS_LIST.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container flex items-center justify-between transition-colors border border-outline-variant/20"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-surface-container-highest text-on-surface font-bold text-xs flex items-center justify-center shrink-0">
                    {item.company.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-semibold text-xs text-on-surface truncate">{item.company}</span>
                    <span className="font-mono text-[11px] text-on-surface-variant truncate">@{item.domain}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end shrink-0 pl-2">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                    DKIM 100%
                  </span>
                  <span className="text-[10px] text-on-surface-variant mt-0.5">{item.lastContact}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-3 border-t border-surface-container flex items-center justify-between text-xs text-on-surface-variant">
          <span>Continuous IMAP SPF/DKIM verification active</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-surface-container text-on-surface font-semibold hover:bg-surface-container-high transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
