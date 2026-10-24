import React from 'react';
import { EmailMessage } from '../data/mockData';

interface RawEmailModalProps {
  email: EmailMessage | null;
  onClose: () => void;
}

export const RawEmailModal: React.FC<RawEmailModalProps> = ({ email, onClose }) => {
  if (!email) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/30 p-6 flex flex-col gap-4 max-h-[85vh] overflow-hidden">
        <div className="flex items-center justify-between pb-3 border-b border-surface-container">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-surface-container text-on-surface flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">terminal</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-[15px] text-on-surface font-bold">MIME Raw Payload & Headers</h3>
              <p className="text-[11px] text-on-surface-variant font-mono">{email.id}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="p-3 rounded-xl bg-surface-container-low font-mono text-xs flex flex-col gap-1 border border-outline-variant/20">
          <div><span className="text-on-surface-variant font-semibold">From:</span> {email.senderName} &lt;{email.senderEmail}&gt;</div>
          <div><span className="text-on-surface-variant font-semibold">To:</span> {email.recipientEmail}</div>
          <div><span className="text-on-surface-variant font-semibold">Date:</span> {email.dateStr}</div>
          <div><span className="text-on-surface-variant font-semibold">Subject:</span> {email.subject}</div>
          <div><span className="text-on-surface-variant font-semibold">SPF:</span> <span className={email.spfStatus === 'PASS' ? 'text-emerald-600' : 'text-red-600 font-bold'}>{email.spfStatus}</span></div>
          <div><span className="text-on-surface-variant font-semibold">DKIM:</span> <span className={email.dkimStatus === 'PASS' ? 'text-emerald-600' : 'text-red-600 font-bold'}>{email.dkimStatus}</span></div>
          <div><span className="text-on-surface-variant font-semibold">Return-Path:</span> {email.returnPath}</div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 rounded-xl bg-[#211635] text-[#fff7ff] font-mono text-xs leading-relaxed whitespace-pre-wrap select-text">
          {email.fullBody}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-surface-container text-xs text-on-surface-variant">
          <span className="font-mono">Decoded UTF-8 plain-text stream</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-surface-container text-on-surface font-semibold hover:bg-surface-container-high transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
