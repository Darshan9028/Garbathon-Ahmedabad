import React, { useState, useMemo } from 'react';
import { ScreenId } from './AppShell';
import { Application, EmailMessage } from '../data/mockData';

interface TrackerScreenProps {
  onNavigate: (screen: ScreenId, subTab?: string) => void;
  applications: Application[];
  emails: EmailMessage[];
  onOpenAddModal: () => void;
  onOpenRawEmail: (email: EmailMessage) => void;
  onExport: () => void;
  onShowToast: (message: string, icon?: string) => void;
  onUpdateAppStatus: (appId: string, newStatus: 'applied' | 'interviewing' | 'offer' | 'rejected') => void;
}

export const TrackerScreen: React.FC<TrackerScreenProps> = ({
  onNavigate,
  applications,
  emails,
  onOpenAddModal,
  onOpenRawEmail,
  onExport,
  onShowToast,
  onUpdateAppStatus
}) => {
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');
  const [roleFilter, setRoleFilter] = useState<'all' | 'frontend' | 'backend' | 'data'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAppId, setSelectedAppId] = useState<string>('app_zepto');
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [isFollowupArmed, setIsFollowupArmed] = useState(true);

  // Selected application
  const selectedApp = useMemo(() => {
    return applications.find(a => a.id === selectedAppId) || applications[0];
  }, [applications, selectedAppId]);

  // Emails for selected application
  const selectedAppEmails = useMemo(() => {
    if (!selectedApp) return [];
    return emails.filter(e =>
      selectedApp.emailIds.includes(e.id) ||
      e.company.toLowerCase().includes(selectedApp.company.toLowerCase())
    );
  }, [selectedApp, emails]);

  // Filtered applications
  const filteredApps = useMemo(() => {
    return applications.filter(app => {
      if (roleFilter === 'frontend') {
        const match = /frontend|full stack|fullstack|ui|architect/i.test(app.role);
        if (!match) return false;
      } else if (roleFilter === 'backend') {
        const match = /backend|platform|cloud|infrastructure/i.test(app.role);
        if (!match) return false;
      } else if (roleFilter === 'data') {
        const match = /data|ml|ai/i.test(app.role);
        if (!match) return false;
      }

      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        return (
          app.company.toLowerCase().includes(q) ||
          app.role.toLowerCase().includes(q) ||
          app.location.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [applications, roleFilter, searchTerm]);

  // Column grouped
  const appliedList = filteredApps.filter(a => a.status === 'applied');
  const interviewingList = filteredApps.filter(a => a.status === 'interviewing');
  const offersList = filteredApps.filter(a => a.status === 'offer');
  const rejectedList = filteredApps.filter(a => a.status === 'rejected');

  const handleCardClick = (id: string) => {
    setSelectedAppId(id);
    setIsDrawerOpen(true);
  };

  const handleSyncCalendar = () => {
    if (!selectedApp?.nextStepDate) return;
    onShowToast(`Calendar event synced: ${selectedApp.company} interview (${selectedApp.nextStepDate})`, 'calendar_month');
  };

  return (
    <div className="flex flex-col w-full pb-12">
      {/* Top Command & Action Canvas */}
      <div className="px-4 sm:px-6 lg:px-8 pt-6 pb-4 flex flex-col gap-4">
        {/* Breadcrumb & Header Title Area */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs uppercase tracking-wider text-secondary font-bold bg-secondary-fixed/50 px-2 py-0.5 rounded">
                Real-time Inbox Sync
              </span>
              <span className="font-mono text-xs text-on-surface-variant flex items-center gap-1 font-medium">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                Last analyzed 3m ago via Gemini Flash
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">Application Tracker</h1>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-0.5 max-w-3xl">
              {applications.length} active applications automatically extracted, synchronized, and categorized from your inbox.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2.5 flex-wrap self-start lg:self-center">
            {/* View Toggle */}
            <div className="inline-flex p-0.5 rounded-xl bg-surface-container shadow-inner">
              <button
                type="button"
                onClick={() => setViewMode('kanban')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === 'kanban'
                    ? 'text-on-primary bg-primary shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">view_kanban</span>
                <span>Kanban Board</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === 'table'
                    ? 'text-on-primary bg-primary shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">table_rows</span>
                <span>Data Table</span>
              </button>
            </div>

            <button
              onClick={onExport}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-surface-container-lowest text-on-surface text-xs font-semibold shadow-xs hover:bg-surface-container transition-colors border border-outline-variant/30"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px] text-outline">file_download</span>
              <span>Export CSV / JSON</span>
            </button>

            <button
              onClick={onOpenAddModal}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary-container text-on-primary-container text-xs font-bold shadow-xs hover:opacity-95 transition-all"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              <span>+ Add Manual Application</span>
            </button>
          </div>
        </div>

        {/* Filter Bar & Search Omnibar */}
        <div className="p-3 bg-surface-container-lowest rounded-2xl shadow-xs flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-3 border border-outline-variant/30">
          {/* Role Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 xl:pb-0 scrollbar-none">
            <button
              onClick={() => setRoleFilter('all')}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                roleFilter === 'all'
                  ? 'text-on-primary bg-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface bg-surface-container-low'
              }`}
            >
              All Roles ({applications.length})
            </button>
            <button
              onClick={() => setRoleFilter('frontend')}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                roleFilter === 'frontend'
                  ? 'text-on-primary bg-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface bg-surface-container-low'
              }`}
            >
              Full-Stack / Frontend (11)
            </button>
            <button
              onClick={() => setRoleFilter('backend')}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                roleFilter === 'backend'
                  ? 'text-on-primary bg-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface bg-surface-container-low'
              }`}
            >
              Backend / Platform (5)
            </button>
            <button
              onClick={() => setRoleFilter('data')}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                roleFilter === 'data'
                  ? 'text-on-primary bg-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface bg-surface-container-low'
              }`}
            >
              Data / ML (2)
            </button>
          </div>

          {/* Search Omnibar & Filter Drops */}
          <div className="flex items-center gap-3 flex-wrap xl:flex-nowrap">
            <div className="relative flex items-center min-w-[260px] flex-1 xl:flex-none">
              <span className="material-symbols-outlined absolute left-3 text-[16px] text-outline">search</span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search company, job role, or location..."
                className="w-full pl-9 pr-3 py-1.5 bg-surface-container-low rounded-xl text-xs text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container transition-all border border-transparent focus:border-outline-variant/40"
              />
            </div>

            {/* Quick Highlight Badges */}
            <div className="hidden sm:flex items-center gap-1.5">
              <button
                onClick={() => {
                  setRoleFilter('all');
                  setViewMode('kanban');
                  onShowToast('Highlighting 3 active interview stages', 'event');
                }}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed text-xs font-bold"
              >
                <span className="material-symbols-outlined text-[14px]">event</span>
                <span>3 Interviews</span>
              </button>
              <button
                onClick={() => onNavigate('followups')}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-secondary-fixed text-on-secondary-fixed-variant text-xs font-bold"
              >
                <span className="material-symbols-outlined text-[14px]">schedule</span>
                <span>4 Follow-ups Overdue</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dynamic Workspace: Multi-Pane Board + Fixed Right Inspector */}
      <div className="relative px-4 sm:px-6 lg:px-8 flex gap-6 items-start overflow-hidden">
        {/* LEFT WORKSPACE: Kanban View */}
        {viewMode === 'kanban' ? (
          <div className="flex-1 min-w-0 transition-all duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-4 items-start">
              {/* COLUMN 1: APPLIED */}
              <div className="flex flex-col rounded-2xl bg-surface-container-low/70 p-3 min-w-0 shadow-xs border border-surface-container">
                <div className="flex items-center justify-between px-1.5 py-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-surface-tint"></span>
                    <h2 className="text-sm font-bold text-on-surface">Applied</h2>
                  </div>
                  <span className="font-mono text-xs px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-bold">
                    {appliedList.length}
                  </span>
                </div>

                <div className="flex flex-col gap-2.5">
                  {appliedList.map(app => {
                    const isSelected = selectedApp?.id === app.id;
                    return (
                      <div
                        key={app.id}
                        onClick={() => handleCardClick(app.id)}
                        className={`p-3.5 rounded-xl bg-surface-container-lowest shadow-xs hover:shadow-md cursor-pointer transition-all border ${
                          isSelected ? 'ring-2 ring-primary-container border-transparent' : 'border-outline-variant/30 hover:-translate-y-0.5'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center font-bold text-xs text-on-surface">
                              {app.companyInitial}
                            </div>
                            <div>
                              <h3 className="text-xs font-bold text-on-surface leading-tight">{app.company}</h3>
                              <p className="text-[11px] text-on-surface-variant mt-0.5">{app.role}</p>
                            </div>
                          </div>
                          <span className="text-[10px] text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded font-mono">
                            {app.daysAgo}d ago
                          </span>
                        </div>

                        {app.notes && (
                          <div className="mt-2.5 flex items-center gap-1.5 text-on-surface-variant text-[11px] bg-surface-container-low/80 p-2 rounded-lg">
                            <span className="material-symbols-outlined text-[14px] text-secondary">mark_email_read</span>
                            <span className="truncate">&quot;{app.notes}&quot;</span>
                          </div>
                        )}

                        <div className="mt-3 pt-2 flex items-center justify-between text-[11px] border-t border-surface-container/60">
                          <div className="flex items-center gap-1 text-on-surface-variant font-mono">
                            <span className="material-symbols-outlined text-[13px]">location_on</span>
                            <span>{app.location.split('/')[0]}</span>
                          </div>
                          {app.followUpDue ? (
                            <span className="text-[10px] px-2 py-0.5 rounded-md bg-secondary-fixed text-on-secondary-fixed-variant font-bold flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                              Follow-up Due
                            </span>
                          ) : (
                            <span className="text-[10px] px-2 py-0.5 rounded-md bg-surface-container-highest text-on-primary-fixed-variant font-semibold">
                              {app.stageInfo || 'In Review'}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* COLUMN 2: INTERVIEWING */}
              <div className="flex flex-col rounded-2xl bg-tertiary-fixed/30 p-3 min-w-0 shadow-xs border border-tertiary-fixed">
                <div className="flex items-center justify-between px-1.5 py-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-on-tertiary-container animate-pulse"></span>
                    <h2 className="text-sm font-bold text-on-surface">Interviewing</h2>
                  </div>
                  <span className="font-mono text-xs px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant font-bold">
                    {interviewingList.length}
                  </span>
                </div>

                <div className="flex flex-col gap-2.5">
                  {interviewingList.map(app => {
                    const isSelected = selectedApp?.id === app.id;
                    return (
                      <div
                        key={app.id}
                        onClick={() => handleCardClick(app.id)}
                        className={`p-3.5 rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md cursor-pointer transition-all border ${
                          isSelected ? 'ring-2 ring-primary-container border-transparent' : 'border-outline-variant/30 hover:-translate-y-0.5'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center font-bold text-xs text-on-surface">
                              {app.companyInitial}
                            </div>
                            <div>
                              <h3 className="text-xs font-bold text-on-surface leading-tight">{app.company}</h3>
                              <p className="text-[11px] text-on-surface-variant mt-0.5">{app.role}</p>
                            </div>
                          </div>
                        </div>

                        {/* Interview Alert Strip */}
                        <div className="mt-3 p-2.5 rounded-lg bg-tertiary-fixed/60 flex flex-col gap-1 border border-tertiary-fixed">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] text-on-tertiary-fixed-variant font-bold flex items-center gap-1">
                              <span className="material-symbols-outlined text-[13px]">videocam</span>
                              {app.nextStep || 'Round 2: System Design'}
                            </span>
                            <span className="font-mono text-[10px] text-on-surface-variant font-semibold">
                              {app.nextStepDate?.split(' ')[0] || 'Upcoming'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between mt-0.5">
                            <span className="text-[11px] text-on-surface">Google Meet / Video Link</span>
                            <span className="material-symbols-outlined text-[13px] text-secondary">verified</span>
                          </div>
                        </div>

                        <div className="mt-3 flex items-center justify-between text-[11px] pt-1">
                          <span className="text-[10px] px-2 py-0.5 rounded-md bg-surface-container text-on-surface font-semibold">
                            {app.stageInfo || 'Stage 2 of 4'}
                          </span>
                          <span className="font-mono text-[11px] text-secondary font-bold">
                            {app.emailIds.length} emails synced
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* COLUMN 3: OFFERS */}
              <div className="flex flex-col rounded-2xl bg-secondary-fixed/30 p-3 min-w-0 shadow-xs border border-secondary-fixed">
                <div className="flex items-center justify-between px-1.5 py-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                    <h2 className="text-sm font-bold text-on-surface">Offers</h2>
                  </div>
                  <span className="font-mono text-xs px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-bold">
                    {offersList.length}
                  </span>
                </div>

                <div className="flex flex-col gap-2.5">
                  {offersList.map(app => {
                    const isSelected = selectedApp?.id === app.id;
                    return (
                      <div
                        key={app.id}
                        onClick={() => handleCardClick(app.id)}
                        className={`p-3.5 rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md cursor-pointer transition-all border ${
                          isSelected ? 'ring-2 ring-primary-container border-transparent' : 'border-outline-variant/30 hover:-translate-y-0.5'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center font-bold text-xs text-secondary">
                              {app.companyInitial}
                            </div>
                            <div>
                              <h3 className="text-xs font-bold text-on-surface leading-tight">{app.company}</h3>
                              <p className="text-[11px] text-on-surface-variant mt-0.5">{app.role}</p>
                            </div>
                          </div>
                          <span className="text-[9px] bg-secondary-container text-on-secondary-fixed font-bold px-1.5 py-0.5 rounded uppercase">
                            Verified
                          </span>
                        </div>

                        {/* Offer Details Box */}
                        <div className="mt-3 p-3 rounded-lg bg-surface-container-low flex flex-col gap-1 border border-surface-container">
                          <div className="flex items-baseline justify-between">
                            <span className="font-mono text-[9px] text-on-surface-variant uppercase tracking-wider font-bold">
                              Base + ESOPs
                            </span>
                            <span className="text-sm font-bold text-on-surface">{app.salary || '₹34,00,000'}</span>
                          </div>
                          <div className="h-1 w-full bg-surface-container-high rounded-full overflow-hidden">
                            <div className="h-full bg-secondary w-3/4 rounded-full"></div>
                          </div>
                          <div className="flex items-center justify-between text-[11px] pt-1">
                            <span className="text-[10px] text-secondary-container font-bold flex items-center gap-1">
                              <span className="material-symbols-outlined text-[12px]">alarm</span>
                              4 days left to accept
                            </span>
                            <span className="font-mono text-[10px] text-on-surface-variant">Nov 15, 2024</span>
                          </div>
                        </div>

                        <div className="mt-3 flex items-center justify-between pt-1">
                          <span className="text-[10px] px-2 py-0.5 rounded-md bg-secondary-fixed text-on-secondary-fixed-variant font-bold">
                            Pending Acceptance
                          </span>
                          <span className="text-[11px] font-bold text-on-surface hover:text-primary underline flex items-center gap-0.5">
                            View Offer
                            <span className="material-symbols-outlined text-[12px]">open_in_new</span>
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* COLUMN 4: REJECTED / INACTIVE */}
              <div className="flex flex-col rounded-2xl bg-surface-container-low/60 p-3 min-w-0 opacity-90 shadow-xs border border-surface-container">
                <div className="flex items-center justify-between px-1.5 py-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-outline"></span>
                    <h2 className="text-sm font-bold text-on-surface-variant">Rejected / Inactive</h2>
                  </div>
                  <span className="font-mono text-xs px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-bold">
                    {rejectedList.length}
                  </span>
                </div>

                <div className="flex flex-col gap-2.5">
                  {rejectedList.map(app => {
                    const isSelected = selectedApp?.id === app.id;
                    return (
                      <div
                        key={app.id}
                        onClick={() => handleCardClick(app.id)}
                        className={`p-3.5 rounded-xl bg-surface-container-lowest shadow-xs hover:shadow cursor-pointer transition-all border ${
                          isSelected ? 'ring-2 ring-primary-container border-transparent' : 'border-outline-variant/30'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center font-bold text-xs text-on-surface-variant">
                              {app.companyInitial}
                            </div>
                            <div>
                              <h3 className="text-xs font-bold text-on-surface leading-tight">{app.company}</h3>
                              <p className="text-[11px] text-on-surface-variant mt-0.5">{app.role}</p>
                            </div>
                          </div>
                          <span className="text-[10px] text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded font-mono">
                            {app.appliedDate}
                          </span>
                        </div>

                        {app.notes && (
                          <div className="mt-2.5 p-2 rounded-lg bg-surface-container-low/60 text-on-surface-variant text-[11px] italic">
                            &quot;{app.notes}&quot;
                          </div>
                        )}

                        <div className="mt-2.5 flex items-center justify-between text-[11px]">
                          <span className="font-mono text-[10px] text-outline">Auto-archived</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-md bg-error-container text-on-error-container font-semibold">
                            Rejection Parsed
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ALTERNATE DATA TABLE VIEW */
          <div className="flex-1 min-w-0 bg-surface-container-lowest rounded-2xl shadow-xs overflow-hidden border border-outline-variant/30">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-surface-container-low text-on-surface-variant font-mono text-[11px] uppercase tracking-wider border-b border-surface-container">
                    <th className="py-3 px-4 font-bold">Company &amp; Role</th>
                    <th className="py-3 px-4 font-bold">Stage &amp; Status</th>
                    <th className="py-3 px-4 font-bold">Applied Date</th>
                    <th className="py-3 px-4 font-bold">Location</th>
                    <th className="py-3 px-4 font-bold">Next Action / AI Note</th>
                    <th className="py-3 px-4 text-right font-bold">Move Stage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container text-xs text-on-surface">
                  {filteredApps.map(app => (
                    <tr
                      key={app.id}
                      onClick={() => handleCardClick(app.id)}
                      className={`hover:bg-surface-container-low/60 transition-colors cursor-pointer ${
                        selectedApp?.id === app.id ? 'bg-surface-container-low' : ''
                      }`}
                    >
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-surface-container flex items-center justify-center font-bold text-xs">
                            {app.companyInitial}
                          </div>
                          <div>
                            <span className="font-bold text-xs text-on-surface">{app.company}</span>
                            <div className="text-[11px] text-on-surface-variant">{app.role}</div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                            app.status === 'interviewing'
                              ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                              : app.status === 'offer'
                              ? 'bg-secondary-fixed text-on-secondary-fixed-variant'
                              : app.status === 'rejected'
                              ? 'bg-error-container text-on-error-container'
                              : 'bg-surface-container-highest text-on-surface'
                          }`}
                        >
                          {app.status.toUpperCase()}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-mono text-[11px] text-on-surface-variant">
                        {app.appliedDate} ({app.daysAgo}d ago)
                      </td>

                      <td className="py-3.5 px-4 font-mono text-[11px] text-on-surface-variant">
                        {app.location}
                      </td>

                      <td className="py-3.5 px-4">
                        {app.nextStep ? (
                          <div className="flex items-center gap-1.5 text-secondary font-semibold text-[11px]">
                            <span className="material-symbols-outlined text-[14px]">videocam</span>
                            {app.nextStep}
                          </div>
                        ) : app.followUpDue ? (
                          <span className="text-secondary font-bold text-[11px] flex items-center gap-1">
                            <span className="material-symbols-outlined text-[13px]">priority_high</span>
                            Follow-up Due ({app.followUpDaysOverdue}d)
                          </span>
                        ) : (
                          <span className="text-on-surface-variant text-[11px]">{app.stageInfo || 'In Review'}</span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={app.status}
                          onChange={(e) => onUpdateAppStatus(app.id, e.target.value as any)}
                          className="px-2 py-1 rounded bg-surface-container text-[11px] font-semibold text-on-surface border border-outline-variant/30 focus:outline-none"
                        >
                          <option value="applied">Applied</option>
                          <option value="interviewing">Interviewing</option>
                          <option value="offer">Offer</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* RIGHT INSPECTOR RAIL (Docked Detail Drawer: 380px fixed width) */}
        {isDrawerOpen && selectedApp && (
          <aside className="w-[380px] shrink-0 bg-surface-container-lowest rounded-2xl shadow-lg p-5 flex flex-col gap-4 border border-outline-variant/30 animate-in slide-in-from-right-4 duration-200">
            {/* Drawer Header & Controls */}
            <div className="flex items-start justify-between pb-2 border-b border-surface-container">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-sm shadow-xs">
                  {selectedApp.companyInitial}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-sm text-on-surface">{selectedApp.company}</h3>
                    <span className="text-[10px] bg-tertiary-fixed text-on-tertiary-fixed-variant font-bold px-1.5 py-0.5 rounded">
                      {selectedApp.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant">{selectedApp.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-1 rounded-lg hover:bg-surface-container text-on-surface-variant"
                  title="Close Inspector"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>
            </div>

            {/* Recruiter & Contact Meta Pill */}
            <div className="p-3 rounded-xl bg-surface-container-low flex flex-col gap-2 border border-surface-container">
              <span className="font-mono text-[10px] uppercase tracking-wider text-on-surface-variant font-bold">
                Primary Recruiter Contact
              </span>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant flex items-center justify-center font-bold text-xs">
                    {selectedApp.recruiterInitial}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-on-surface leading-tight">{selectedApp.recruiterName}</span>
                    <span className="font-mono text-[11px] text-on-surface-variant">{selectedApp.recruiterEmail}</span>
                  </div>
                </div>
                <a
                  href={`mailto:${selectedApp.recruiterEmail}`}
                  className="p-1.5 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container shadow-xs"
                  title="Send Direct Email"
                >
                  <span className="material-symbols-outlined text-[16px]">mail</span>
                </a>
              </div>
            </div>

            {/* Quick Action Triggers */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onNavigate('followups', 'interview')}
                className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-secondary-fixed text-on-secondary-fixed-variant text-xs font-bold shadow-xs hover:bg-secondary-fixed-dim transition-all"
              >
                <span className="material-symbols-outlined text-[16px]">psychology</span>
                <span>Interview Brief</span>
              </button>
              <button
                onClick={handleSyncCalendar}
                className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-surface-container-low text-on-surface text-xs font-semibold hover:bg-surface-container transition-all border border-surface-container"
              >
                <span className="material-symbols-outlined text-[16px]">calendar_add_on</span>
                <span>Add to Calendar</span>
              </button>
            </div>

            {/* Application Journey Timeline */}
            <div className="flex flex-col gap-2 pt-1">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-on-surface">Application Journey</h4>
                <span className="font-mono text-[10px] text-on-surface-variant font-semibold">
                  {selectedApp.journey?.length || 4} Milestones
                </span>
              </div>

              <div className="relative pl-6 flex flex-col gap-3 py-1">
                <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-surface-container-high"></div>

                {selectedApp.journey?.map((step, idx) => (
                  <div key={idx} className="relative flex flex-col text-xs">
                    <span
                      className={`absolute -left-6 top-1 w-3.5 h-3.5 rounded-full flex items-center justify-center ${
                        step.status === 'upcoming'
                          ? 'bg-primary ring-2 ring-surface-container-lowest'
                          : 'bg-secondary-fixed'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          step.status === 'upcoming' ? 'bg-white animate-ping' : 'bg-secondary'
                        }`}
                      ></span>
                    </span>

                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-on-surface">{step.title}</span>
                      <span className="font-mono text-[10px] text-on-surface-variant">{step.date}</span>
                    </div>

                    <span className="text-[11px] text-on-surface-variant mt-0.5 leading-snug">{step.detail}</span>
                    {step.score && (
                      <span className="font-mono text-[10px] text-secondary font-bold mt-0.5">{step.score}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Associated Raw Emails Extracted */}
            <div className="flex flex-col gap-2 pt-1">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-on-surface">Extracted Email Trail ({selectedAppEmails.length})</h4>
                <span className="font-mono text-[10px] text-on-surface-variant">IMAP Verified</span>
              </div>

              <div className="flex flex-col gap-2">
                {selectedAppEmails.length > 0 ? (
                  selectedAppEmails.map((email) => (
                    <div
                      key={email.id}
                      className="p-2.5 rounded-xl bg-surface-container-low flex flex-col gap-1 hover:bg-surface-container transition-colors border border-surface-container"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs text-on-surface truncate">{email.subject}</span>
                        <span className="font-mono text-[10px] text-on-surface-variant shrink-0">{email.dateStr}</span>
                      </div>
                      <p className="text-[11px] text-on-surface-variant line-clamp-2">{email.snippet}</p>
                      <div className="flex items-center justify-end mt-1 pt-1 border-t border-surface-container/60">
                        <button
                          onClick={() => onOpenRawEmail(email)}
                          className="text-[10px] text-on-surface hover:text-primary font-bold flex items-center gap-0.5"
                        >
                          View Raw MIME
                          <span className="material-symbols-outlined text-[12px]">visibility</span>
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-3 text-center text-xs text-on-surface-variant bg-surface-container-low rounded-xl">
                    1 inbound application confirmation synced.
                  </div>
                )}
              </div>
            </div>

            {/* Quick AI Automation Control footer inside drawer */}
            <div className="mt-auto pt-3 border-t border-surface-container flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px] text-secondary">smart_toy</span>
                <span>
                  Autopilot Follow-up:{' '}
                  <strong className={isFollowupArmed ? 'text-on-surface' : 'text-outline'}>
                    {isFollowupArmed ? 'Armed' : 'Paused'}
                  </strong>
                </span>
              </div>

              <button
                onClick={() => {
                  setIsFollowupArmed(!isFollowupArmed);
                  onShowToast(
                    isFollowupArmed
                      ? `Follow-up triggers paused for ${selectedApp.company}`
                      : `Follow-up triggers armed for ${selectedApp.company}`,
                    'schedule'
                  );
                }}
                className="text-[11px] text-secondary hover:underline font-bold"
              >
                {isFollowupArmed ? 'Pause Trigger' : 'Arm Trigger'}
              </button>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};
