import React, { useState } from 'react';

export type ScreenId = 'landing' | 'dashboard' | 'inbox' | 'tracker' | 'scam' | 'followups';

interface AppShellProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId, subTab?: string) => void;
  children: React.ReactNode;
  activeFollowUpsCount?: number;
  threatsCount?: number;
  applicationsCount?: number;
  emailsCount?: number;
  onQuickAnalyze?: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const AppShell: React.FC<AppShellProps> = ({
  currentScreen,
  onNavigate,
  children,
  activeFollowUpsCount = 4,
  threatsCount = 3,
  applicationsCount = 18,
  emailsCount = 20,
  onQuickAnalyze,
  searchQuery,
  setSearchQuery
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    {
      id: 'dashboard' as ScreenId,
      label: 'Dashboard',
      icon: 'grid_view'
    },
    {
      id: 'inbox' as ScreenId,
      label: 'Inbox Analyzer',
      icon: 'mark_email_read',
      badge: `${emailsCount} Loaded`
    },
    {
      id: 'tracker' as ScreenId,
      label: 'Tracker',
      icon: 'view_kanban',
      badge: `${applicationsCount}`
    },
    {
      id: 'scam' as ScreenId,
      label: 'Scam Detection',
      icon: 'gshield',
      badge: `${threatsCount} Alerts`,
      badgeClass: 'bg-error-container text-on-error-container font-medium'
    },
    {
      id: 'followups' as ScreenId,
      label: 'Follow-ups',
      icon: 'schedule_send',
      badge: `${activeFollowUpsCount} Due`,
      badgeClass: 'bg-secondary-fixed text-on-secondary-fixed-variant font-medium'
    },
    {
      id: 'followups' as ScreenId,
      subTab: 'interview',
      label: 'Interview Prep',
      icon: 'psychology'
    }
  ];

  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface antialiased flex flex-col">
      {/* Mobile Top Header for narrow screens */}
      <header className="lg:hidden sticky top-0 z-50 h-14 bg-surface-container-lowest border-b border-surface-container px-4 flex items-center justify-between shadow-xs">
        <button
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-2"
        >
          <img
            alt="JobHunt Logo"
            className="w-7 h-7 rounded-lg"
            src="https://lh3.googleusercontent.com/aida/AEtjO1XZJW1iuCjZPIDLFO7wUdNgWbSFPoKB4v7IHDScBHEJwGXmnSVQdswS4auKwpY4hWT4FnApIV5vE8wTuYNl8X21H3OqBg0NM1xDIQvOZ86iLZS-FtBPIlpgEA5VZZ64k8RdNYRUwberEJgoS-xdDYmqSh1cN-Udk-SxdabRj5Z6ROF6Q0XH8G3JmvuOuj54UuksZPU0veR_Iy1JQAr7B5f9XvaAfKPsZk669ijX5y_gpxLurjPZGWD8RqY"
          />
          <span className="font-bold text-sm tracking-tight">JobHunt AI</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('landing')}
            className="px-2.5 py-1 text-xs rounded bg-surface-container text-on-surface-variant font-medium"
          >
            Landing
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1.5 rounded-lg text-on-surface hover:bg-surface-container"
          >
            <span className="material-symbols-outlined text-[20px]">menu</span>
          </button>
        </div>
      </header>

      {/* Mobile Nav Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-xs flex flex-col">
          <div className="w-72 bg-surface-container-lowest h-full p-4 flex flex-col justify-between shadow-2xl">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between pb-2 border-b border-surface-container">
                <span className="font-bold text-sm">Navigation</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 rounded text-on-surface-variant"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>
              <nav className="flex flex-col gap-1">
                {navItems.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      onNavigate(item.id, item.subTab);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                      currentScreen === item.id
                        ? 'bg-primary-container text-on-primary-container font-semibold shadow-xs'
                        : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`text-[10px] px-1.5 py-0.5 rounded ${item.badgeClass || 'bg-surface-container text-on-surface-variant'}`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>
            <button
              onClick={() => {
                onNavigate('landing');
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-2 px-3 rounded-lg border border-outline-variant/40 text-xs font-semibold text-on-surface flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              Back to Landing Page
            </button>
          </div>
        </div>
      )}

      {/* Fixed Left Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-full w-[260px] bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex-col justify-between border-r border-outline-variant/20">
        <div className="flex flex-col">
          {/* Logo & Header */}
          <div className="px-5 pt-5 pb-3">
            <button
              onClick={() => onNavigate('landing')}
              className="flex items-center gap-3 text-left w-full group hover:opacity-95 transition-opacity"
            >
              <img
                alt="JobHunt Autopilot AI Logo"
                className="h-8 w-auto object-contain rounded-md"
                src="https://lh3.googleusercontent.com/aida/AEtjO1XZJW1iuCjZPIDLFO7wUdNgWbSFPoKB4v7IHDScBHEJwGXmnSVQdswS4auKwpY4hWT4FnApIV5vE8wTuYNl8X21H3OqBg0NM1xDIQvOZ86iLZS-FtBPIlpgEA5VZZ64k8RdNYRUwberEJgoS-xdDYmqSh1cN-Udk-SxdabRj5Z6ROF6Q0XH8G3JmvuOuj54UuksZPU0veR_Iy1JQAr7B5f9XvaAfKPsZk669ijX5y_gpxLurjPZGWD8RqY"
              />
              <div className="flex flex-col">
                <span className="font-headline-sm text-[16px] text-on-surface font-bold leading-tight tracking-tight group-hover:text-secondary transition-colors">
                  JobHunt AI
                </span>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="font-mono text-[10px] text-on-surface-variant font-medium">v1.4</span>
                  <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                  <span className="text-[10px] text-secondary font-semibold">GDG Ahmedabad</span>
                </div>
              </div>
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex flex-col gap-1 px-3 mt-3">
            {navItems.map((item, idx) => {
              const isActive = currentScreen === item.id && (!item.subTab || item.subTab === 'interview');
              return (
                <button
                  key={idx}
                  onClick={() => onNavigate(item.id, item.subTab)}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors group text-left ${
                    isActive
                      ? 'bg-primary-container text-on-primary-container font-semibold shadow-xs'
                      : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                    <span className="text-[13px]">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`font-mono text-[11px] px-1.5 py-0.5 rounded ${
                        item.badgeClass || 'bg-surface-container text-on-surface-variant'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Quick Link back to Landing */}
            <div className="my-2 border-t border-surface-container/60"></div>
            <button
              onClick={() => onNavigate('landing')}
              className="flex items-center justify-between px-3 py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors text-left"
            >
              <div className="flex items-center gap-2.5 text-xs font-medium">
                <span className="material-symbols-outlined text-[18px]">home</span>
                <span>Landing Page</span>
              </div>
              <span className="material-symbols-outlined text-[14px] text-outline">arrow_forward</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 flex flex-col gap-2.5 bg-surface-container-lowest border-t border-surface-container/60">
          <div className="px-3 py-2 rounded-lg bg-surface-container-low flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-container opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
              </span>
              <span className="text-[11px] font-semibold text-on-surface">Gemini Flash 2.5</span>
            </div>
            <span className="font-mono text-[10px] text-secondary font-bold uppercase tracking-wider">Active</span>
          </div>

          <div className="p-2.5 rounded-xl bg-surface-container-low flex items-center gap-2.5">
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ring-1 ring-outline-variant/30"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8tWTLj4FhhS9sDygLzQgzWq3Sd9HGVR-VdhFsWBiPgIYxFpWN7zFdo4ptOsMo18GovNZbnnOvW66vO7At5aXi_Y6vpJSN52sM40tpb9uLQKfjcXKa4VTnGwxVYuri5S1pwLMcgQXEjp_aVOnD_qKSD32OgPmCQN1nDfdt-U1AsFD_b1iQL7kpexvskiupNraDOCRz5UswivvYv74aWt4ek5EJzvGSbyCHEa3eLsz5Ycmm7xmftUN4"
            />
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[12px] text-on-surface truncate">Arjun Sharma</span>
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              </div>
              <span className="text-[10px] text-on-surface-variant truncate">Senior Full-Stack</span>
              <span className="text-[9px] text-secondary-container font-bold uppercase mt-0.5">Active Search</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Container Offset by Left Sidebar */}
      <div className="lg:pl-[260px] flex-1 flex flex-col">
        {/* Sticky Desktop Top Bar */}
        <header className="hidden lg:flex fixed top-0 left-[260px] right-0 h-16 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 items-center justify-between px-8 border-b border-surface-container">
          <div className="flex items-center gap-4">
            <div className="flex items-center text-on-surface-variant text-[13px] gap-1.5">
              <span className="text-on-surface-variant/70">Workspace</span>
              <span className="material-symbols-outlined text-[16px] text-outline-variant">chevron_right</span>
              <span className="text-on-surface font-semibold capitalize">
                {currentScreen === 'inbox' ? 'Inbox Analyzer' : currentScreen === 'tracker' ? 'Application Tracker' : currentScreen === 'scam' ? 'Scam Detection' : currentScreen === 'followups' ? 'Follow-ups' : 'Autopilot Console'}
              </span>
            </div>

            <div className="h-4 w-px bg-outline-variant/40 mx-1"></div>

            {/* Global Live Filter / Omnibar */}
            <div className="relative flex items-center w-80">
              <span className="material-symbols-outlined absolute left-3 text-[18px] text-outline">search</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search applications, companies, emails..."
                className="w-full pl-9 pr-8 py-1.5 bg-surface-container-low rounded-lg text-xs text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest transition-all border border-transparent focus:border-outline-variant/40"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 text-outline hover:text-on-surface"
                >
                  <span className="material-symbols-outlined text-[14px]">cancel</span>
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden xl:flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high">
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              <span className="text-[11px] text-on-surface font-semibold">Demo Data: Active (20 Synced)</span>
            </div>

            <button
              type="button"
              onClick={onQuickAnalyze || (() => onNavigate('inbox'))}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary text-on-primary font-semibold text-xs shadow-sm hover:bg-primary-container hover:text-on-primary-container transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
              <span>+ Analyze Inbox</span>
            </button>

            {/* Notifications Button */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
                title="Notifications"
              >
                <span className="material-symbols-outlined text-[20px]">notifications</span>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error animate-pulse"></span>
              </button>

              {/* Notification Popover Panel */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-surface-container-lowest rounded-xl shadow-xl border border-outline-variant/30 p-3 flex flex-col gap-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center justify-between pb-2 border-b border-surface-container">
                    <span className="font-bold text-xs">Live System Notifications</span>
                    <span className="text-[10px] font-mono bg-error-container text-on-error-container px-1.5 py-0.2 rounded font-bold">3 Urgent</span>
                  </div>

                  <div className="flex flex-col gap-1.5 max-h-72 overflow-y-auto pr-1">
                    <div
                      onClick={() => { onNavigate('scam'); setShowNotifications(false); }}
                      className="p-2 rounded-lg bg-error-container/30 hover:bg-error-container/50 cursor-pointer flex items-start gap-2 text-xs transition-colors"
                    >
                      <span className="material-symbols-outlined text-error text-[16px] shrink-0 mt-0.5">warning</span>
                      <div className="flex flex-col">
                        <span className="font-bold text-error">Scam Alert: Apex Global Tech</span>
                        <span className="text-on-surface-variant text-[11px]">Demanded ₹2,500 security deposit for laptop.</span>
                      </div>
                    </div>

                    <div
                      onClick={() => { onNavigate('followups', 'interview'); setShowNotifications(false); }}
                      className="p-2 rounded-lg bg-tertiary-fixed/40 hover:bg-tertiary-fixed/60 cursor-pointer flex items-start gap-2 text-xs transition-colors"
                    >
                      <span className="material-symbols-outlined text-indigo-700 text-[16px] shrink-0 mt-0.5">calendar_today</span>
                      <div className="flex flex-col">
                        <span className="font-bold text-on-surface">Tomorrow 2:00 PM: Zepto Interview</span>
                        <span className="text-on-surface-variant text-[11px]">Round 2 System Design brief ready.</span>
                      </div>
                    </div>

                    <div
                      onClick={() => { onNavigate('followups'); setShowNotifications(false); }}
                      className="p-2 rounded-lg bg-secondary-fixed/40 hover:bg-secondary-fixed/60 cursor-pointer flex items-start gap-2 text-xs transition-colors"
                    >
                      <span className="material-symbols-outlined text-amber-700 text-[16px] shrink-0 mt-0.5">schedule_send</span>
                      <div className="flex flex-col">
                        <span className="font-bold text-on-surface">PhonePe Follow-up Overdue</span>
                        <span className="text-on-surface-variant text-[11px]">8 days silent. Contextual draft ready.</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-surface-container flex items-center justify-between text-[11px]">
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="text-on-surface-variant hover:underline"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => { onNavigate('dashboard'); setShowNotifications(false); }}
                      className="text-secondary font-semibold hover:underline"
                    >
                      View All in Dashboard →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar */}
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => onNavigate('landing')}
                title="Return to Landing Page"
                className="flex items-center p-0.5 rounded-full hover:ring-2 hover:ring-secondary transition-all"
              >
                <img
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8tWTLj4FhhS9sDygLzQgzWq3Sd9HGVR-VdhFsWBiPgIYxFpWN7zFdo4ptOsMo18GovNZbnnOvW66vO7At5aXi_Y6vpJSN52sM40tpb9uLQKfjcXKa4VTnGwxVYuri5S1pwLMcgQXEjp_aVOnD_qKSD32OgPmCQN1nDfdt-U1AsFD_b1iQL7kpexvskiupNraDOCRz5UswivvYv74aWt4ek5EJzvGSbyCHEa3eLsz5Ycmm7xmftUN4"
                />
              </button>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="w-full lg:pt-16 flex-1 bg-surface">
          {children}
        </main>
      </div>
    </div>
  );
};
