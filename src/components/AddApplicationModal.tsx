import React, { useState } from 'react';
import { Application } from '../data/mockData';

interface AddApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (app: Partial<Application>) => void;
}

export const AddApplicationModal: React.FC<AddApplicationModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [location, setLocation] = useState('Bangalore / Hybrid');
  const [salary, setSalary] = useState('');
  const [status, setStatus] = useState<'applied' | 'interviewing' | 'offer' | 'rejected'>('applied');
  const [recruiterName, setRecruiterName] = useState('');
  const [recruiterEmail, setRecruiterEmail] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company.trim() || !role.trim()) return;

    onAdd({
      company,
      companyInitial: company.slice(0, 2).toUpperCase(),
      role,
      location,
      salary: salary || 'Competitive',
      status,
      recruiterName: recruiterName || 'Talent Team',
      recruiterEmail: recruiterEmail || `recruiting@${company.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
      recruiterInitial: (recruiterName || company).slice(0, 2).toUpperCase(),
      notes,
      appliedDate: 'Just now',
      daysAgo: 0,
      followUpDue: false,
      journey: [
        {
          title: 'Manual Entry Added',
          date: 'Today',
          detail: notes || 'Application registered in Autopilot tracker',
          status: 'completed'
        }
      ]
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/30 p-6 flex flex-col gap-5 overflow-hidden">
        <div className="flex items-center justify-between pb-3 border-b border-surface-container">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">add_task</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-[16px] text-on-surface font-bold">Add Job Application</h3>
              <p className="text-[12px] text-on-surface-variant">Manually track outside automated inbox sync</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant mb-1">
                Company Name *
              </label>
              <input
                required
                type="text"
                placeholder="e.g. Netflix, Datadog"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-surface-container-low text-on-surface border border-outline-variant/30 focus:outline-none focus:border-secondary transition-colors"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant mb-1">
                Role Title *
              </label>
              <input
                required
                type="text"
                placeholder="e.g. Staff Frontend Architect"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-surface-container-low text-on-surface border border-outline-variant/30 focus:outline-none focus:border-secondary transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant mb-1">
                Pipeline Stage
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3 py-2 rounded-lg bg-surface-container-low text-on-surface border border-outline-variant/30 focus:outline-none focus:border-secondary transition-colors"
              >
                <option value="applied">Applied (1st Stage)</option>
                <option value="interviewing">Interviewing</option>
                <option value="offer">Offer Extended</option>
                <option value="rejected">Archived / Rejected</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant mb-1">
                Location
              </label>
              <input
                type="text"
                placeholder="e.g. Remote, Bangalore"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-surface-container-low text-on-surface border border-outline-variant/30 focus:outline-none focus:border-secondary transition-colors"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant mb-1">
                Compensation / Band
              </label>
              <input
                type="text"
                placeholder="e.g. ₹40 LPA"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-surface-container-low text-on-surface border border-outline-variant/30 focus:outline-none focus:border-secondary transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant mb-1">
                Recruiter Name
              </label>
              <input
                type="text"
                placeholder="e.g. Sarah Jenkins"
                value={recruiterName}
                onChange={(e) => setRecruiterName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-surface-container-low text-on-surface border border-outline-variant/30 focus:outline-none focus:border-secondary transition-colors"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant mb-1">
                Recruiter Contact Email
              </label>
              <input
                type="email"
                placeholder="e.g. sarah@company.com"
                value={recruiterEmail}
                onChange={(e) => setRecruiterEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-surface-container-low text-on-surface border border-outline-variant/30 focus:outline-none focus:border-secondary transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant mb-1">
              Context Notes & Directives
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Referral by VP of Eng, met at tech conference, next round focus..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-surface-container-low text-on-surface border border-outline-variant/30 focus:outline-none focus:border-secondary transition-colors resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-surface-container">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container text-[13px] font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-primary-container text-on-primary font-semibold text-[13px] hover:brightness-110 active:scale-95 transition-all shadow-sm"
            >
              Save to Pipeline
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
