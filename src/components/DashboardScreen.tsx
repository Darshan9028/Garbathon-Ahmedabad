import React from 'react';
import { ScreenId } from './AppShell';
import { Application, EmailMessage } from '../data/mockData';

interface DashboardScreenProps {
  onNavigate: (screen: ScreenId, subTab?: string) => void;
  applications: Application[];
  emails: EmailMessage[];
  onTriggerAnalyze: () => void;
  onExport: () => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  onNavigate,
  applications,
  emails,
  onTriggerAnalyze,
  onExport
}) => {
  const activeCount = applications.filter(a => a.status !== 'rejected').length;
  const interviewingCount = applications.filter(a => a.status === 'interviewing').length;
  const offersCount = applications.filter(a => a.status === 'offer').length;
  const followupsCount = applications.filter(a => a.followUpDue).length;
  const threatsCount = emails.filter(e => e.isScam).length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 flex flex-col gap-6 max-w-[1600px] mx-auto w-full">
      {/* Top Executive Welcome Scrim */}
      <section className="relative overflow-hidden rounded-2xl bg-surface-container-low p-6 lg:p-8 shadow-xs border border-surface-container">
        <div className="absolute -right-20 -top-24 w-96 h-96 rounded-full bg-secondary-fixed opacity-40 blur-3xl pointer-events-none"></div>
        <div className="absolute right-1/3 -bottom-20 w-80 h-80 rounded-full bg-surface-container-highest opacity-70 blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex flex-col gap-1 max-w-3xl">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs text-secondary uppercase tracking-widest bg-secondary-fixed/50 px-2.5 py-0.5 rounded-full font-bold">
                Autopilot Pulse • Live
              </span>
              <span className="font-mono text-xs text-on-surface-variant flex items-center gap-1 font-medium">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                Sync Status: Fresh (2m ago)
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-on-surface tracking-tight">
              Good afternoon, Arjun. Let&apos;s keep your job search on track.
            </h1>

            <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
              {emails.length} synthetic emails parsed <span className="text-outline-variant">•</span> {activeCount} active applications <span className="text-outline-variant">•</span> {interviewingCount} interviews scheduled <span className="text-outline-variant">•</span> {threatsCount} high-risk alerts flagged
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 self-start lg:self-center">
            <button
              onClick={onTriggerAnalyze}
              className="group relative flex items-center gap-2 px-5 py-2.5 rounded-xl bg-secondary-container text-on-secondary-fixed font-bold text-xs shadow-md hover:bg-secondary-fixed-dim transition-all active:scale-[0.98]"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px] text-on-secondary-fixed transition-transform group-hover:rotate-12">
                mark_email_read
              </span>
              <span>Analyze Inbox</span>
              <span className="font-mono text-[9px] bg-on-secondary-fixed/15 px-1.5 py-0.5 rounded font-bold uppercase">Run AI</span>
            </button>

            <button
              onClick={onExport}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container-lowest text-on-surface text-xs font-semibold shadow-xs hover:bg-surface-container transition-all border border-outline-variant/30"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px] text-outline">file_download</span>
              <span>Export Pipeline</span>
            </button>
          </div>
        </div>
      </section>

      {/* KPI Metrics Grid (5 Cards) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Card 1: Total Applications */}
        <div
          onClick={() => onNavigate('tracker')}
          className="flex flex-col justify-between p-4 rounded-xl bg-surface-container-lowest shadow-xs hover:shadow-md cursor-pointer transition-all border border-outline-variant/20 hover:border-outline-variant"
        >
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">Applications</span>
            <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[18px]">send</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-on-surface">{activeCount}</span>
              <span className="text-xs text-secondary font-semibold">Active</span>
            </div>
            <div className="flex items-center justify-between mt-2 pt-2 bg-surface-container-low/50 rounded-lg px-2 py-1">
              <span className="font-mono text-[11px] text-secondary font-semibold flex items-center gap-0.5">
                <span className="material-symbols-outlined text-[14px]">trending_up</span> +4 this wk
              </span>
              <svg className="w-16 h-4 text-secondary stroke-current fill-none stroke-[2]" viewBox="0 0 64 16">
                <path d="M0,14 Q16,12 28,6 T48,8 T64,2"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Card 2: Interviews Scheduled */}
        <div
          onClick={() => onNavigate('followups', 'interview')}
          className="flex flex-col justify-between p-4 rounded-xl bg-surface-container-lowest shadow-xs hover:shadow-md cursor-pointer transition-all border border-outline-variant/20 hover:border-outline-variant"
        >
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">Interviews</span>
            <div className="w-8 h-8 rounded-lg bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed">
              <span className="material-symbols-outlined text-[18px]">calendar_month</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-on-surface">{interviewingCount}</span>
              <span className="text-xs text-on-tertiary-fixed font-semibold">Scheduled</span>
            </div>
            <div className="mt-2 bg-surface-container-low/50 rounded-lg px-2 py-1">
              <p className="font-mono text-[11px] text-on-surface truncate font-semibold">Next: Zepto Staff FE</p>
              <p className="font-mono text-[10px] text-on-surface-variant">Tmrw at 2:00 PM</p>
            </div>
          </div>
        </div>

        {/* Card 3: Offers Received */}
        <div
          onClick={() => onNavigate('tracker')}
          className="flex flex-col justify-between p-4 rounded-xl bg-surface-container-lowest shadow-xs hover:shadow-md cursor-pointer transition-all border border-outline-variant/20 hover:border-outline-variant"
        >
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">Offers</span>
            <div className="w-8 h-8 rounded-lg bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed-variant">
              <span className="material-symbols-outlined text-[18px]">verified</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-secondary">{offersCount}</span>
              <span className="text-xs text-secondary font-semibold">Pending Offer</span>
            </div>
            <div className="mt-2 bg-surface-container-low/50 rounded-lg px-2 py-1 flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-[11px] text-on-surface truncate font-semibold">Swiggy • ₹34 LPA</p>
                <p className="font-mono text-[10px] text-secondary font-medium">4 days remaining</p>
              </div>
              <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
            </div>
          </div>
        </div>

        {/* Card 4: Suspicious Emails */}
        <div
          onClick={() => onNavigate('scam')}
          className="flex flex-col justify-between p-4 rounded-xl bg-surface-container-lowest shadow-xs hover:shadow-md cursor-pointer transition-all border border-outline-variant/20 hover:border-error"
        >
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-error">Scam Watch</span>
            <div className="w-8 h-8 rounded-lg bg-error-container flex items-center justify-center text-on-error-container">
              <span className="material-symbols-outlined text-[18px]">gshield</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-error">{threatsCount}</span>
              <span className="text-xs text-error font-semibold">Threats Flagged</span>
            </div>
            <div className="mt-2 bg-error-container/40 rounded-lg px-2 py-1">
              <p className="font-mono text-[10px] text-on-error-container leading-tight truncate font-semibold">Apex Tech: Training fee</p>
              <p className="font-mono text-[10px] text-on-error-container/80 truncate">Fake Telegram recruiter</p>
            </div>
          </div>
        </div>

        {/* Card 5: Follow-ups Due */}
        <div
          onClick={() => onNavigate('followups')}
          className="flex flex-col justify-between p-4 rounded-xl bg-surface-container-lowest shadow-xs hover:shadow-md cursor-pointer transition-all border border-outline-variant/20 hover:border-secondary"
        >
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">Follow-ups</span>
            <div className="w-8 h-8 rounded-lg bg-secondary-fixed-dim/30 flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[18px]">notification_important</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-on-surface">{followupsCount}</span>
              <span className="text-xs text-secondary font-semibold">Overdue</span>
            </div>
            <div className="mt-2 bg-surface-container-low/50 rounded-lg px-2 py-1">
              <p className="font-mono text-[11px] text-on-surface">&gt; 7 days inactive</p>
              <p className="font-mono text-[10px] text-secondary font-medium">Ready to nudge</p>
            </div>
          </div>
        </div>
      </section>

      {/* Two-Column Operational Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* MAIN / LEFT COLUMN (65% -> col-span-8) */}
        <div className="lg:col-span-8 flex flex-col gap-6 min-w-0">
          {/* Application Pipeline Distribution Bento */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-xs flex flex-col gap-4 border border-outline-variant/30">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-lg font-bold text-on-surface">Application Pipeline Distribution</h2>
                <p className="text-xs text-on-surface-variant">Live breakdown of current recruitment funnel stages</p>
              </div>
              <div className="flex items-center gap-1.5 self-start sm:self-auto bg-surface-container-low px-2.5 py-1 rounded-lg">
                <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
                <span className="text-xs font-semibold text-on-surface">{activeCount} Active Tracked</span>
              </div>
            </div>

            {/* Horizontal Segment Bar */}
            <div className="flex flex-col gap-2 pt-2">
              <div className="w-full h-3 rounded-full overflow-hidden flex bg-surface-container-high p-0.5">
                <div className="h-full bg-primary-container rounded-l-full" style={{ width: '44.4%' }} title="Applied: 8 (44.4%)"></div>
                <div className="h-full bg-secondary-container ml-0.5" style={{ width: '22.2%' }} title="Screening: 4 (22.2%)"></div>
                <div className="h-full bg-tertiary-container ml-0.5" style={{ width: '16.7%' }} title="Technical: 3 (16.7%)"></div>
                <div className="h-full bg-secondary-fixed-dim ml-0.5" style={{ width: '5.6%' }} title="Offer: 1 (5.6%)"></div>
                <div className="h-full bg-outline-variant rounded-r-full ml-0.5" style={{ width: '11.1%' }} title="Rejected: 2 (11.1%)"></div>
              </div>

              {/* Segment Labels */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1 font-mono text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-primary-container"></span>
                  <span className="text-on-surface">Applied: <strong className="font-bold">8</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
                  <span className="text-on-surface">Screening: <strong className="font-bold">4</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-tertiary-container"></span>
                  <span className="text-on-surface">Tech Round: <strong className="font-bold">3</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-secondary-fixed-dim"></span>
                  <span className="text-on-surface">Offer: <strong className="text-secondary font-bold">1</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-outline-variant"></span>
                  <span className="text-on-surface-variant">Archived: <strong>2</strong></span>
                </div>
              </div>
            </div>

            {/* Sub-breakdown Donut & Quick Stage Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 items-center">
              {/* Inline SVG Donut Chart */}
              <div className="flex items-center gap-4 bg-surface-container-low p-4 rounded-xl border border-surface-container">
                <div className="relative w-20 h-20 shrink-0">
                  <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
                    <path className="text-surface-container-highest stroke-current" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="4.5"></path>
                    <path className="text-primary-container stroke-current" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeDasharray="44.4, 100" strokeWidth="4.5"></path>
                    <path className="text-secondary-container stroke-current" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeDasharray="22.2, 100" strokeDashoffset="-44.4" strokeWidth="4.5"></path>
                    <path className="text-tertiary-container stroke-current" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeDasharray="16.7, 100" strokeDashoffset="-66.6" strokeWidth="4.5"></path>
                    <path className="text-secondary-fixed-dim stroke-current" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeDasharray="5.6, 100" strokeDashoffset="-83.3" strokeWidth="4.5"></path>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-[13px] text-on-surface font-bold leading-none">18</span>
                    <span className="font-mono text-[9px] text-on-surface-variant uppercase">Jobs</span>
                  </div>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs text-on-surface font-bold">Conversion Rate</span>
                  <span className="text-lg text-secondary font-bold">16.7%</span>
                  <span className="font-mono text-[11px] text-on-surface-variant">App to Tech Stage</span>
                </div>
              </div>

              {/* Spotlight 1: Swiggy Offer Details */}
              <div
                onClick={() => onNavigate('tracker')}
                className="bg-surface-container-low p-4 rounded-xl flex flex-col justify-between h-full border border-surface-container cursor-pointer hover:bg-surface-container transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wider text-secondary font-bold">Active Offer</span>
                  <span className="font-mono text-[10px] bg-secondary-fixed text-on-secondary-fixed-variant px-1.5 py-0.5 rounded font-bold">₹34 LPA</span>
                </div>
                <div className="mt-1">
                  <div className="text-[13px] text-on-surface font-bold truncate">Swiggy • Senior SDE</div>
                  <p className="text-[11px] text-on-surface-variant">Offer Letter validated by Autopilot</p>
                </div>
                <div className="flex items-center justify-between pt-2 mt-1">
                  <span className="font-mono text-[10px] text-secondary font-bold">Exp: 4 Days</span>
                  <span className="text-on-surface text-[11px] font-bold hover:underline">Review Terms →</span>
                </div>
              </div>

              {/* Spotlight 2: Next In Line */}
              <div
                onClick={() => onNavigate('followups', 'interview')}
                className="bg-surface-container-low p-4 rounded-xl flex flex-col justify-between h-full border border-surface-container cursor-pointer hover:bg-surface-container transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wider text-on-surface-variant font-bold">Up Next</span>
                  <span className="font-mono text-[10px] bg-surface-container-highest text-on-surface px-1.5 py-0.5 rounded font-bold">Tomorrow</span>
                </div>
                <div className="mt-1">
                  <div className="text-[13px] text-on-surface font-bold truncate">Zepto • Round 2</div>
                  <p className="text-[11px] text-on-surface-variant">System Design & Web Vitals</p>
                </div>
                <div className="flex items-center justify-between pt-2 mt-1">
                  <span className="font-mono text-[11px] text-on-surface font-semibold">2:00 PM IST</span>
                  <span className="font-mono text-[11px] text-secondary font-bold">Prep 85%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Application Activity Timeline */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-xs flex flex-col gap-4 border border-outline-variant/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[20px]">history</span>
                </div>
                <div>
                  <h2 className="text-base font-bold text-on-surface">Recent Activity Timeline</h2>
                  <p className="text-xs text-on-surface-variant">Live event stream extracted from inbox synchronization</p>
                </div>
              </div>
              <button
                onClick={() => onNavigate('inbox')}
                className="text-xs text-secondary hover:underline flex items-center gap-1 font-bold"
                type="button"
              >
                <span>View All 20 Events</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>

            <div className="relative pl-6 flex flex-col gap-4 pt-2">
              {/* Timeline track line */}
              <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-surface-container-high"></div>

              {/* Event 1: Zepto */}
              <div className="relative flex items-start gap-3 group">
                <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary shadow-xs ring-4 ring-surface-container-lowest">
                  <span className="material-symbols-outlined text-[12px]">videocam</span>
                </div>
                <div
                  onClick={() => onNavigate('followups', 'interview')}
                  className="flex-1 bg-surface-container-low/70 rounded-xl p-3.5 hover:bg-surface-container-low transition-colors cursor-pointer border border-surface-container/60"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-on-surface">Zepto</span>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-bold">Round 2 Confirmed</span>
                    </div>
                    <span className="font-mono text-[11px] text-on-surface-variant">Today, 11:30 AM</span>
                  </div>
                  <p className="text-xs text-on-surface mt-1">
                    Technical Interview confirmed: <strong className="font-semibold">Round 2: System Design &amp; Offline Resilience</strong>. Google Calendar event synchronized.
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="font-mono text-[10px] text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">alternate_email</span> recruiter@zepto.com
                    </span>
                    <span className="font-mono text-[10px] text-secondary font-semibold">• Interview briefing ready</span>
                  </div>
                </div>
              </div>

              {/* Event 2: Razorpay */}
              <div className="relative flex items-start gap-3 group">
                <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container shadow-xs ring-4 ring-surface-container-lowest">
                  <span className="material-symbols-outlined text-[12px]">code</span>
                </div>
                <div
                  onClick={() => onNavigate('tracker')}
                  className="flex-1 bg-surface-container-low/70 rounded-xl p-3.5 hover:bg-surface-container-low transition-colors cursor-pointer border border-surface-container/60"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-on-surface">Razorpay</span>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface font-semibold">Assignment</span>
                    </div>
                    <span className="font-mono text-[11px] text-on-surface-variant">Yesterday</span>
                  </div>
                  <p className="text-xs text-on-surface mt-1">
                    Take-home task received: <strong className="font-semibold">Payment Gateway Webhook Reconciliation Service</strong> in Go/TypeScript. Due in 48 hours.
                  </p>
                  <div className="mt-2 flex items-center gap-2 font-mono text-[10px] text-on-surface-variant">
                    <span className="material-symbols-outlined text-[14px]">attach_file</span> webhook-spec-v2.pdf (420 KB)
                  </div>
                </div>
              </div>

              {/* Event 3: Google India */}
              <div className="relative flex items-start gap-3 group">
                <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface shadow-xs ring-4 ring-surface-container-lowest">
                  <span className="material-symbols-outlined text-[12px]">update</span>
                </div>
                <div
                  onClick={() => onNavigate('tracker')}
                  className="flex-1 bg-surface-container-low/70 rounded-xl p-3.5 hover:bg-surface-container-low transition-colors cursor-pointer border border-surface-container/60"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-on-surface">Google India</span>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-surface-container text-on-surface font-semibold">Status Update</span>
                    </div>
                    <span className="font-mono text-[11px] text-on-surface-variant">2 days ago</span>
                  </div>
                  <p className="text-xs text-on-surface mt-1">
                    Application status updated to <strong className="font-semibold">&ldquo;In Review by Hiring Committee&rdquo;</strong> for Bangalore Office (L5 Engineering).
                  </p>
                </div>
              </div>

              {/* Event 4: PhonePe */}
              <div className="relative flex items-start gap-3 group">
                <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed-variant shadow-xs ring-4 ring-surface-container-lowest">
                  <span className="material-symbols-outlined text-[12px]">schedule_send</span>
                </div>
                <div
                  onClick={() => onNavigate('followups')}
                  className="flex-1 bg-surface-container-low/70 rounded-xl p-3.5 hover:bg-surface-container-low transition-colors cursor-pointer border border-surface-container/60"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-on-surface">PhonePe</span>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-bold">Follow-up Recommended</span>
                    </div>
                    <span className="font-mono text-[11px] text-on-surface-variant">3 days ago</span>
                  </div>
                  <p className="text-xs text-on-surface mt-1">
                    8 days elapsed since initial screen. Autopilot has pre-generated a contextual polite inquiry for talent team.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* AI Engine Processing Status Banner */}
          <div className="bg-primary-container text-on-primary-container rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-surface-container-highest/20 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[24px] text-secondary-fixed">memory</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-surface-bright font-bold uppercase tracking-wider">AI Processing Engine</span>
                  <span className="font-mono text-[10px] bg-secondary-container text-on-secondary px-1.5 py-0.2 rounded font-bold">Batch #04</span>
                </div>
                <p className="text-xs text-surface-container-highest/80 mt-0.5">
                  Gemini Flash 2.5 • 20 messages ingested • 0 syntax errors • 100% entity confidence
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
              <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
              <span className="font-mono text-[11px] text-surface-bright font-semibold">Standing by for new mail</span>
            </div>
          </div>
        </div>

        {/* RIGHT / INSPECTOR COLUMN (35% -> col-span-4) */}
        <div className="lg:col-span-4 flex flex-col gap-6 min-w-0">
          {/* Critical Threat Intercepted Card */}
          <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-xs flex flex-col gap-3 relative overflow-hidden border border-error/30">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-error-container text-on-error-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">warning</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-error">Scam Guard Intercept</span>
                  <h3 className="text-sm font-bold text-on-surface">Apex Tech Solutions</h3>
                </div>
              </div>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-error text-on-error font-bold">Critical Risk</span>
            </div>

            <div className="bg-error-container/30 p-3 rounded-xl flex flex-col gap-1 border border-error/20">
              <p className="text-xs text-on-error-container font-semibold">
                Discrepancy: Demanded ₹2,500 &quot;Mandatory Security Deposit&quot; for work laptop dispatch.
              </p>
              <p className="font-mono text-[10px] text-on-surface-variant">
                Sender: hr-recruiting@apextech-jobs-portal.xyz (Registered 4 days ago)
              </p>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="font-mono text-[11px] text-error font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">block</span> Blocked from Tracker
              </span>
              <button
                onClick={() => onNavigate('scam')}
                className="px-3 py-1.5 rounded-lg bg-error-container text-on-error-container text-xs font-bold hover:bg-error hover:text-on-error transition-colors"
                type="button"
              >
                View Evidence
              </button>
            </div>
          </div>

          {/* Upcoming Interviews Widget */}
          <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-xs flex flex-col gap-4 border border-outline-variant/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-secondary">event_upcoming</span>
                <h3 className="text-sm font-bold text-on-surface">Upcoming Interviews</h3>
              </div>
              <span className="font-mono text-xs bg-surface-container px-2 py-0.5 rounded text-on-surface-variant font-bold">3 Slated</span>
            </div>

            {/* Interview Card 1: Zepto */}
            <div className="bg-surface-container-low rounded-xl p-3.5 flex flex-col gap-2 hover:bg-surface-container transition-colors border border-surface-container">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-secondary uppercase tracking-wider">Tomorrow • 2:00 PM IST</span>
                <span className="font-mono text-[10px] bg-secondary-fixed text-on-secondary-fixed-variant px-1.5 py-0.5 rounded font-bold">45 mins</span>
              </div>
              <div>
                <h4 className="text-[13px] text-on-surface font-bold">Zepto — Senior Frontend</h4>
                <p className="text-xs text-on-surface-variant">Round 2: Architecture &amp; Rendering Performance</p>
              </div>
              <div className="flex items-center justify-between pt-1 mt-1 border-t border-surface-container/60">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-secondary"></span>
                  <span className="font-mono text-[11px] text-on-surface">Google Meet ready</span>
                </div>
                <button
                  onClick={() => onNavigate('followups', 'interview')}
                  className="px-3 py-1 rounded-md bg-primary text-on-primary text-[11px] font-semibold hover:bg-primary-container transition-colors"
                  type="button"
                >
                  Open Brief
                </button>
              </div>
            </div>

            {/* Interview Card 2: Razorpay */}
            <div className="bg-surface-container-low rounded-xl p-3.5 flex flex-col gap-2 hover:bg-surface-container transition-colors border border-surface-container">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Friday • 4:30 PM IST</span>
                <span className="font-mono text-[10px] bg-surface-container-highest text-on-surface px-1.5 py-0.5 rounded font-bold">60 mins</span>
              </div>
              <div>
                <h4 className="text-[13px] text-on-surface font-bold">Razorpay — Platform Engineer</h4>
                <p className="text-xs text-on-surface-variant">Round 3: Distributed System Design &amp; Idempotency</p>
              </div>
              <div className="flex items-center justify-between pt-1 mt-1 border-t border-surface-container/60">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-outline"></span>
                  <span className="font-mono text-[11px] text-on-surface-variant">Zoom Link (Sync pending)</span>
                </div>
                <button
                  onClick={() => onNavigate('followups', 'interview')}
                  className="px-3 py-1 rounded-md bg-surface-container-highest text-on-surface text-[11px] font-semibold hover:bg-surface-container transition-colors"
                  type="button"
                >
                  Details
                </button>
              </div>
            </div>
          </div>

          {/* Action Required: Overdue Follow-ups Widget */}
          <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-xs flex flex-col gap-4 border border-outline-variant/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-secondary-fixed-dim">schedule</span>
                <h3 className="text-sm font-bold text-on-surface">Follow-ups Due</h3>
              </div>
              <span className="font-mono text-xs text-secondary font-bold">&gt; 7 Days Idle</span>
            </div>

            {/* Follow-up Item 1: PhonePe */}
            <div className="bg-surface-container-low rounded-xl p-3.5 flex flex-col gap-2 border border-surface-container">
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-on-surface font-bold">PhonePe</span>
                <span className="font-mono text-[10px] bg-secondary-fixed text-on-secondary-fixed-variant px-1.5 py-0.5 rounded font-bold">8d Silent</span>
              </div>
              <p className="text-xs text-on-surface-variant">
                Backend Engineer • Initial recruiter call completed. Follow-up email template #2 generated.
              </p>
              <div className="flex items-center justify-between pt-1">
                <span className="font-mono text-[10px] text-secondary font-bold">Gemini draft ready</span>
                <button
                  onClick={() => onNavigate('followups')}
                  className="flex items-center gap-1 px-3 py-1 rounded-md bg-secondary-container text-on-secondary font-bold text-[11px] hover:bg-secondary-fixed-dim transition-colors"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[13px]">send</span> Draft Follow-up
                </button>
              </div>
            </div>

            {/* Follow-up Item 2: CRED */}
            <div className="bg-surface-container-low rounded-xl p-3.5 flex flex-col gap-2 border border-surface-container">
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-on-surface font-bold">CRED</span>
                <span className="font-mono text-[10px] bg-secondary-fixed text-on-secondary-fixed-variant px-1.5 py-0.5 rounded font-bold">9d Silent</span>
              </div>
              <p className="text-xs text-on-surface-variant">
                Full-stack Engineer • Post take-home assignment submission. Polite status ping drafted.
              </p>
              <div className="flex items-center justify-between pt-1">
                <span className="font-mono text-[10px] text-secondary font-bold">Gemini draft ready</span>
                <button
                  onClick={() => onNavigate('followups')}
                  className="flex items-center gap-1 px-3 py-1 rounded-md bg-secondary-container text-on-secondary font-bold text-[11px] hover:bg-secondary-fixed-dim transition-colors"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[13px]">send</span> Draft Follow-up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
