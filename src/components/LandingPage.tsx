import React, { useState } from 'react';
import { ScreenId } from './AppShell';

interface LandingPageProps {
  onNavigate: (screen: ScreenId, subTab?: string) => void;
}

interface DemoEmailItem {
  id: number;
  category: 'interview' | 'scam' | 'followup';
  sender: string;
  badge: string;
  badgeClass: string;
  dotColor: string;
  subject: string;
  snippet: string;
  recruiter: string;
  statusText: string;
  statusClass: string;
  // Inspector details
  dockTag: string;
  dockTagClass: string;
  dockTitle: string;
  dockSubtitle: string;
  scoreText: string;
  scoreClass: string;
  meterWidth: string;
  meterBg: string;
  evidenceHtml: string;
  actionLabel: string;
  contentHtml: string;
  ctaText: string;
  ctaClass: string;
  targetScreen: ScreenId;
  targetSubTab?: string;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [selectedDemoIndex, setSelectedDemoIndex] = useState(0);
  const [demoCategoryFilter, setDemoCategoryFilter] = useState<'all' | 'interview' | 'scam' | 'followup'>('all');

  const demoItems: DemoEmailItem[] = [
    {
      id: 0,
      category: 'interview',
      sender: 'Google India Recruitment',
      badge: 'Interview Scheduled',
      badgeClass: 'bg-tertiary-fixed text-on-tertiary-fixed',
      dotColor: 'bg-tertiary-container',
      subject: 'Invitation: System Design Round - Staff Frontend Architect (L6)',
      snippet: '"Hi candidate, thank you for completing the technical screen. The team was impressed by your distributed state sync answers. We\'d like to schedule your 60-minute virtual onsite..."',
      recruiter: 'Recruiter: priya.s@google.com',
      statusText: 'Scheduled for Tomorrow',
      statusClass: 'text-tertiary-container font-semibold',
      dockTag: 'Interview Confirmed',
      dockTagClass: 'bg-tertiary-fixed text-on-tertiary-fixed',
      dockTitle: 'Google India • Staff Frontend Architect',
      dockSubtitle: 'Round 2 System Design with Senior Director of Engineering.',
      scoreText: '100% Verified Legit',
      scoreClass: 'text-tertiary-container',
      meterWidth: 'w-full',
      meterBg: 'bg-tertiary-container',
      evidenceHtml: 'Domain: google.com (SPF/DKIM/DMARC pass) • Corporate GSuite headers valid • No premature payment or sensitive PII demanded.',
      actionLabel: 'Role-Specific Technical Briefing',
      contentHtml: `<ul class="list-disc list-inside space-y-1 text-on-surface-variant font-mono text-xs">
        <li>Key Focus: Cross-tab IndexedDB replication under 100ms latency.</li>
        <li>Anticipated question: State machine orchestration for concurrent multi-client transactions.</li>
        <li>Recruiter note: Interviewer is author of open-source Web Worker threading specs.</li>
      </ul>`,
      ctaText: 'Download Interview Prep Cheat Sheet',
      ctaClass: 'bg-primary-container text-on-primary',
      targetScreen: 'followups',
      targetSubTab: 'interview'
    },
    {
      id: 1,
      category: 'scam',
      sender: 'GlobalTech HR Operations',
      badge: '99% Scam Score',
      badgeClass: 'bg-error-container text-on-error-container',
      dotColor: 'bg-error',
      subject: 'Urgent: Offer Letter Released - Laptop Security Deposit Required',
      snippet: '"Congratulations! You have been selected without technical interviews for the Cloud Specialist position. Please deposit ₹4,500 for courier insurance of your MacBook..."',
      recruiter: 'Domain: hr-globaltech-careers.online',
      statusText: 'Threat: Advance Fee Fraud',
      statusClass: 'text-error font-bold',
      dockTag: '99% High Risk Scam',
      dockTagClass: 'bg-error text-on-error',
      dockTitle: 'GlobalTech HR • Fraudulent Offer Intercepted',
      dockSubtitle: 'Advance-fee equipment deposit scam targeting applicants.',
      scoreText: 'Critical Threat Flagged',
      scoreClass: 'text-error',
      meterWidth: 'w-11/12',
      meterBg: 'bg-error',
      evidenceHtml: 'FLAG 1: Registered domain age: 4 days old (disposable registrar).<br>FLAG 2: Telegram redirect for interview.<br>FLAG 3: Unsolicited job offer requesting ₹4,500 laptop security bond.',
      actionLabel: 'Neutralization Actions',
      contentHtml: `<div class="p-3 bg-error-container/40 rounded-lg text-error text-xs font-medium">
        Automated Quarantine Triggered. The sender has been flagged across community heuristics and blacklisted from your pipeline.
      </div>`,
      ctaText: 'Export Scam Evidence Dossier',
      ctaClass: 'bg-error text-on-error',
      targetScreen: 'scam'
    },
    {
      id: 2,
      category: 'followup',
      sender: 'Razorpay Engineering Talent',
      badge: 'Follow-up Due',
      badgeClass: 'bg-secondary-fixed text-on-secondary-fixed',
      dotColor: 'bg-secondary',
      subject: 'Application Received: Staff Automation Architect',
      snippet: '"We have received your application for Staff Automation Architect. Our hiring panel reviews portfolios on Mondays. We will get back shortly..."',
      recruiter: 'Applied: 8 days ago • No follow-up response',
      statusText: '1-Click Nudge Ready',
      statusClass: 'text-secondary font-semibold',
      dockTag: 'Follow-up Due (8 Days Silent)',
      dockTagClass: 'bg-secondary-fixed text-on-secondary-fixed',
      dockTitle: 'Razorpay • Staff Automation Lead',
      dockSubtitle: 'Initial resume submission sent 8 days ago with no recruiter triage.',
      scoreText: '98% Normal Stagnancy',
      scoreClass: 'text-secondary',
      meterWidth: 'w-3/4',
      meterBg: 'bg-secondary-container',
      evidenceHtml: 'Standard enterprise hiring slowdown. No rejection bounce detected. Recruiter LinkedIn activity active yesterday.',
      actionLabel: 'Auto-Generated Polite Nudge Draft',
      contentHtml: `<p class="font-mono text-xs text-on-surface bg-surface-container p-2.5 rounded-lg leading-relaxed">
        "Hi Razorpay Hiring Team, following up on my application for Staff Automation Architect. I recently published an open-source CI/CD benchmark suite that aligns directly with your engineering blog's scaling goals..."
      </p>`,
      ctaText: 'Copy Follow-up & Launch Gmail',
      ctaClass: 'bg-secondary-container text-on-secondary-container',
      targetScreen: 'followups'
    }
  ];

  const filteredDemo = demoCategoryFilter === 'all'
    ? demoItems
    : demoItems.filter(item => item.category === demoCategoryFilter);

  const selectedItem = demoItems[selectedDemoIndex] || demoItems[0];

  return (
    <div className="w-full min-h-screen bg-surface font-body-md text-on-surface antialiased flex flex-col">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 w-full bg-surface-container-lowest/90 backdrop-blur-md shadow-xs border-b border-surface-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img
              alt="JobHunt Autopilot AI Logo"
              className="w-10 h-10 rounded-lg shadow-xs"
              src="https://lh3.googleusercontent.com/aida/AEtjO1XZJW1iuCjZPIDLFO7wUdNgWbSFPoKB4v7IHDScBHEJwGXmnSVQdswS4auKwpY4hWT4FnApIV5vE8wTuYNl8X21H3OqBg0NM1xDIQvOZ86iLZS-FtBPIlpgEA5VZZ64k8RdNYRUwberEJgoS-xdDYmqSh1cN-Udk-SxdabRj5Z6ROF6Q0XH8G3JmvuOuj54UuksZPU0veR_Iy1JQAr7B5f9XvaAfKPsZk669ijX5y_gpxLurjPZGWD8RqY"
            />
            <div className="flex flex-col">
              <span className="font-headline-sm text-base text-on-surface font-bold tracking-tight group-hover:text-secondary transition-colors">
                JobHunt Autopilot
              </span>
              <span className="text-[11px] text-outline font-semibold">Automation Suite</span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-[13px] font-semibold text-on-surface-variant">
            <a href="#features" className="hover:text-on-surface transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-on-surface transition-colors">How It Works</a>
            <a href="#security" className="hover:text-on-surface transition-colors">Security & Synthetic Data</a>
            <a href="#demo" className="hover:text-on-surface transition-colors">Live Pipeline</a>
          </nav>

          {/* Right CTAs */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => onNavigate('dashboard')}
              className="hidden sm:inline-flex px-3 py-1.5 text-xs font-semibold text-on-surface-variant hover:text-on-surface transition-colors"
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => onNavigate('dashboard')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-secondary-container text-on-secondary-container text-xs font-bold shadow-xs hover:brightness-105 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">rocket_launch</span>
              <span>Launch Web App</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section with Garba Radiance Motif */}
      <section className="relative overflow-hidden bg-primary-container text-on-primary pt-14 pb-24" id="hero">
        {/* Ambient Backdrop Lighting & Mandala Motif SVG */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-secondary-container/15 blur-[120px] rounded-full"></div>
          {/* Subtle Elegant Garba Circular Vector Motif */}
          <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[780px] h-[780px] opacity-[0.07] text-secondary-fixed animate-[spin_160s_linear_infinite]" fill="none" stroke="currentColor" viewBox="0 0 400 400">
            <circle cx="200" cy="200" r="190" strokeDasharray="4 6" strokeWidth="0.75"></circle>
            <circle cx="200" cy="200" r="150" strokeWidth="0.5"></circle>
            <circle cx="200" cy="200" r="110" strokeDasharray="3 3" strokeWidth="0.75"></circle>
            <circle cx="200" cy="200" r="70" strokeWidth="0.5"></circle>
            <g strokeWidth="0.5">
              <line x1="200" x2="200" y1="10" y2="390"></line>
              <line x1="10" x2="390" y1="200" y2="200"></line>
              <line x1="66" x2="334" y1="66" y2="334"></line>
              <line x1="66" x2="334" y1="334" y2="66"></line>
              <polygon points="200,50 250,150 350,200 250,250 200,350 150,250 50,200 150,150"></polygon>
              <polygon points="200,90 235,165 310,200 235,235 200,310 165,235 90,200 165,165"></polygon>
            </g>
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          {/* Hackathon Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-lowest/10 backdrop-blur-md shadow-xs mb-6 border border-white/10">
            <span className="w-2 h-2 rounded-full bg-secondary-fixed-dim animate-pulse"></span>
            <span className="text-[11px] text-secondary-fixed tracking-wide uppercase font-semibold">
              Automation Track • Garbathon 2026 by GDG Ahmedabad
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display-lg text-4xl sm:text-5xl lg:text-6xl max-w-4xl tracking-tight leading-tight font-extrabold">
            Your job search, <span className="bg-gradient-to-r from-secondary-fixed via-secondary-fixed-dim to-secondary-container bg-clip-text text-transparent">on autopilot.</span>
          </h1>

          {/* Subhead */}
          <p className="text-base sm:text-lg text-inverse-primary/80 max-w-3xl mt-4 mb-8 font-normal leading-relaxed">
            Transform a chaotic inbox of 20+ job emails into a prioritized pipeline. Automatically extracts applications, flags predatory recruitment scams with verifiable evidence, schedules 7-day follow-ups, and generates tailored interview briefings.
          </p>

          {/* Hero Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 mb-14">
            <button
              onClick={() => onNavigate('inbox')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-secondary-container text-on-secondary-container font-bold text-sm shadow-lg hover:shadow-secondary-container/20 hover:brightness-105 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
              <span>Analyze My Inbox (Try Demo)</span>
            </button>
            <button
              onClick={() => onNavigate('tracker')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-surface-container-lowest/10 text-on-primary font-bold text-sm backdrop-blur-sm hover:bg-surface-container-lowest/20 transition-all border border-white/10"
            >
              <span className="material-symbols-outlined text-[20px]">play_circle</span>
              <span>Explore Pipeline</span>
            </button>
            <button
              onClick={() => onNavigate('dashboard')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-on-primary font-bold text-sm hover:bg-black/80 transition-all border border-white/10"
            >
              <span className="material-symbols-outlined text-[20px]">dashboard</span>
              <span>Open Dashboard</span>
            </button>
          </div>

          {/* Hero Perspective UI Mockup Showcase */}
          <div className="w-full max-w-5xl rounded-2xl bg-surface-container-lowest text-on-surface shadow-2xl p-4 sm:p-6 text-left transition-all border border-outline-variant/30">
            {/* Dashboard Top Control bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 bg-surface-container-low p-3 rounded-xl border border-surface-container">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-error"></span>
                <span className="w-3 h-3 rounded-full bg-secondary-container"></span>
                <span className="w-3 h-3 rounded-full bg-primary-container"></span>
                <span className="ml-3 text-[11px] text-outline font-mono font-semibold uppercase tracking-wider">
                  PIPELINE ENGINE: ACTIVE • SYNTHETIC_CORPUS_v2.6
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-secondary text-[11px] font-semibold bg-surface-container-lowest px-2.5 py-1 rounded shadow-xs">
                <span className="material-symbols-outlined text-[15px]">verified_user</span>
                <span>Zero Data Leakage • 100% Client-Side</span>
              </div>
            </div>

            {/* 3-Column Preview Layout (Kanban Micro View) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Col 1: High-Confidence Interviews */}
              <div className="bg-surface rounded-xl p-3 flex flex-col gap-2.5 border border-surface-container">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-tertiary-container uppercase tracking-wider font-bold">Interviews (4 Scheduled)</span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-tertiary-fixed text-on-tertiary-fixed font-bold">Priority</span>
                </div>

                {/* Card: Google */}
                <div
                  onClick={() => onNavigate('followups', 'interview')}
                  className="bg-surface-container-lowest p-3 rounded-lg shadow-xs hover:shadow-md cursor-pointer transition-all border border-surface-container"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-on-surface">Google</span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-surface-container text-on-surface-variant font-semibold">₹42 LPA</span>
                  </div>
                  <p className="text-xs text-on-surface-variant mb-2">Staff Frontend Architect • L6</p>
                  <div className="flex items-center gap-1.5 text-[11px] text-tertiary-container font-semibold">
                    <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                    <span>Round 2 System Design: Tomorrow, 3:30 PM IST</span>
                  </div>
                </div>

                {/* Card: Zepto */}
                <div
                  onClick={() => onNavigate('followups', 'interview')}
                  className="bg-surface-container-lowest p-3 rounded-lg shadow-xs hover:shadow-md cursor-pointer transition-all border border-surface-container"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-on-surface">Zepto</span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-surface-container text-on-surface-variant font-semibold">₹36 LPA</span>
                  </div>
                  <p className="text-xs text-on-surface-variant mb-2">Senior Automation Engineer</p>
                  <div className="flex items-center gap-1.5 text-[11px] text-secondary font-semibold">
                    <span className="material-symbols-outlined text-[14px]">psychology</span>
                    <span>AI Briefing Ready: 6 System Prep Prompts</span>
                  </div>
                </div>
              </div>

              {/* Col 2: Action Required / Stagnant (Follow-ups) */}
              <div className="bg-surface rounded-xl p-3 flex flex-col gap-2.5 border border-surface-container">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-secondary font-bold uppercase tracking-wider">Awaiting Signal (8)</span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-secondary-fixed text-on-secondary-fixed font-bold">&gt;7 Days</span>
                </div>

                {/* Card: Razorpay */}
                <div
                  onClick={() => onNavigate('followups')}
                  className="bg-surface-container-lowest p-3 rounded-lg shadow-xs hover:shadow-md cursor-pointer transition-all border border-surface-container"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-on-surface">Razorpay</span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-surface-container text-on-surface-variant font-semibold">Applied 8d ago</span>
                  </div>
                  <p className="text-xs text-on-surface-variant mb-2">Staff Automation Lead</p>
                  <div className="bg-secondary-fixed/20 p-2 rounded flex items-center justify-between">
                    <span className="text-[11px] text-secondary font-semibold">Polite nudge drafted</span>
                    <span className="material-symbols-outlined text-secondary text-[14px]">send</span>
                  </div>
                </div>

                {/* Card: Atlassian */}
                <div
                  onClick={() => onNavigate('followups')}
                  className="bg-surface-container-lowest p-3 rounded-lg shadow-xs hover:shadow-md cursor-pointer transition-all border border-surface-container"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-on-surface">Atlassian</span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-surface-container text-on-surface-variant font-semibold">Applied 10d ago</span>
                  </div>
                  <p className="text-xs text-on-surface-variant mb-1">Engineering Lead - Pipeline Platform</p>
                  <span className="text-[11px] text-outline font-medium">Recruiter: Last active 2d ago</span>
                </div>
              </div>

              {/* Col 3: Scam Interceptor Alerts */}
              <div className="bg-surface rounded-xl p-3 flex flex-col gap-2.5 border border-surface-container">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-error font-bold uppercase tracking-wider">Fraud Guard Intercepts (3)</span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-error-container text-on-error-container font-bold">Threat Neutralized</span>
                </div>

                {/* Card: Scam Warning */}
                <div
                  onClick={() => onNavigate('scam')}
                  className="bg-error-container/30 p-3 rounded-lg shadow-xs hover:shadow-md cursor-pointer transition-all border border-error/20"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-on-surface">&quot;GlobalTech Cloud Ltd&quot;</span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-error text-on-error font-bold">99% SCAM</span>
                  </div>
                  <p className="text-xs text-on-surface-variant mb-1.5">Senior Cloud Specialist ($95/hr)</p>
                  <div className="flex items-start gap-1.5 text-[11px] text-error font-semibold">
                    <span className="material-symbols-outlined text-[15px] shrink-0 mt-0.5">gpp_bad</span>
                    <span>Flagged: Sender requested ₹4,500 &quot;Mandatory Laptop Fee&quot;</span>
                  </div>
                </div>

                {/* Card: Domain Spoof */}
                <div
                  onClick={() => onNavigate('scam')}
                  className="bg-surface-container-lowest p-3 rounded-lg shadow-xs hover:shadow-md cursor-pointer transition-all border border-surface-container"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-on-surface">&quot;Acme Careers Intl&quot;</span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-secondary-fixed-dim text-on-surface font-bold">SUSPICIOUS</span>
                  </div>
                  <p className="text-xs text-on-surface-variant mb-1">Domain created 4 days ago on disposable registrar.</p>
                  <span className="text-[11px] text-outline font-medium">Action: Auto-quarantined to Trash</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Trust Metrics Strip */}
      <section className="w-full bg-surface-container-low py-8 shadow-xs border-y border-surface-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl text-on-surface font-extrabold tracking-tight">20/20</span>
            <span className="text-xs sm:text-sm text-on-surface-variant mt-1">Synthetic Job Emails Processed in 4.2s</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl text-secondary font-extrabold tracking-tight">100%</span>
            <span className="text-xs sm:text-sm text-on-surface-variant mt-1">Client-Side Privacy (No External Scrapes)</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl text-error font-extrabold tracking-tight">3 Intercepted</span>
            <span className="text-xs sm:text-sm text-on-surface-variant mt-1">Predatory Fee & Domain Scams Neutralized</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl text-tertiary-container font-extrabold tracking-tight">4 Confirmed</span>
            <span className="text-xs sm:text-sm text-on-surface-variant mt-1">Live Interviews Scheduled & Synced</span>
          </div>
        </div>
      </section>

      {/* Three-Step "How It Works" Section */}
      <section className="py-20 bg-surface" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-surface-container text-xs text-secondary uppercase font-bold tracking-wider mb-2">
              Engine Workflow
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">
              From Chaos to Clarity in 3 Algorithmic Steps
            </h2>
            <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">
              Built specifically for high-frequency job applications where unread recruiter updates and deceptive phishing hide in plain sight.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Step 1 */}
            <div
              onClick={() => onNavigate('inbox')}
              className="bg-surface-container-lowest p-6 rounded-2xl shadow-xs hover:shadow-md transition-shadow relative border border-outline-variant/30 cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-xl font-bold text-on-surface mb-4 group-hover:scale-105 transition-transform">
                01
              </div>
              <h3 className="text-base font-bold text-on-surface mb-2">Analyze Emails</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                Feed raw inbox threads or upload .EML corpus. The natural language engine categorizes messages into Applications, Interview Invites, Stagnant Leads, and Deceptive Spam.
              </p>
              <div className="bg-surface-container-low p-2.5 rounded-lg font-mono text-[11px] text-outline">
                Regex heuristics + NLP semantic context parser
              </div>
            </div>

            {/* Step 2 */}
            <div
              onClick={() => onNavigate('scam')}
              className="bg-surface-container-lowest p-6 rounded-2xl shadow-xs hover:shadow-md transition-shadow relative border border-outline-variant/30 cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-xl font-bold text-secondary mb-4 group-hover:scale-105 transition-transform">
                02
              </div>
              <h3 className="text-base font-bold text-on-surface mb-2">Organize & Protect</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                Applications automatically populate an interactive Kanban workbench. The Scam Engine assesses domain age, security certificates, and upfront payment patterns in real time.
              </p>
              <div className="bg-surface-container-low p-2.5 rounded-lg font-mono text-[11px] text-secondary font-semibold">
                Multi-signal scam score with verifiable audit trails
              </div>
            </div>

            {/* Step 3 */}
            <div
              onClick={() => onNavigate('followups')}
              className="bg-surface-container-lowest p-6 rounded-2xl shadow-xs hover:shadow-md transition-shadow relative border border-outline-variant/30 cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-xl font-bold text-tertiary-container mb-4 group-hover:scale-105 transition-transform">
                03
              </div>
              <h3 className="text-base font-bold text-on-surface mb-2">Take the Next Step</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                Trigger single-click follow-up sequences for leads that haven&apos;t responded within 7 business days. Access auto-generated technical interview crib sheets tailored to the exact role.
              </p>
              <div className="bg-surface-container-low p-2.5 rounded-lg font-mono text-[11px] text-tertiary-container font-semibold">
                1-click Gmail sync + automated briefing sheets
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Deep-Dive Grid */}
      <section className="py-20 bg-surface-container-low" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs text-secondary font-bold uppercase tracking-wider">Tactical Intelligence</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-on-surface mt-1">Engineered to Win the Recruitment Gauntlet</h2>
            </div>
            <p className="text-xs sm:text-sm text-on-surface-variant max-w-md">
              Every component is designed to reduce cognitive load while protecting candidates from sophisticated hiring fraud.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Feature 1 */}
            <div
              onClick={() => onNavigate('tracker')}
              className="bg-surface-container-lowest p-5 rounded-2xl shadow-xs flex flex-col justify-between border border-outline-variant/20 hover:border-secondary transition-colors cursor-pointer"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-on-surface mb-4">
                  <span className="material-symbols-outlined text-[24px]">view_kanban</span>
                </div>
                <h4 className="font-bold text-sm text-on-surface mb-2">Automated Pipeline</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Auto-extracts company names, compensation rates, recruiter titles, and interview rounds into unified stages without manual data entry.
                </p>
              </div>
              <div className="mt-5 pt-2 bg-surface-container-low px-2.5 py-1 rounded font-mono text-[11px] text-outline">
                Parsed: 20 applications in 4.2s
              </div>
            </div>

            {/* Feature 2 */}
            <div
              onClick={() => onNavigate('scam')}
              className="bg-surface-container-lowest p-5 rounded-2xl shadow-xs flex flex-col justify-between border border-outline-variant/20 hover:border-error transition-colors cursor-pointer"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-error-container flex items-center justify-center text-on-error-container mb-4">
                  <span className="material-symbols-outlined text-[24px]">security</span>
                </div>
                <h4 className="font-bold text-sm text-on-surface mb-2">Multi-Signal Scam Detection</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Identifies predatory indicators: upfront security deposits, spoofed sender domains, unverified Telegram interviews, and premature Aadhaar/PAN collection.
                </p>
              </div>
              <div className="mt-5 pt-2 bg-error-container/40 px-2.5 py-1 rounded text-[11px] text-error font-semibold">
                Heuristic confidence score included
              </div>
            </div>

            {/* Feature 3 */}
            <div
              onClick={() => onNavigate('followups')}
              className="bg-surface-container-lowest p-5 rounded-2xl shadow-xs flex flex-col justify-between border border-outline-variant/20 hover:border-secondary transition-colors cursor-pointer"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed mb-4">
                  <span className="material-symbols-outlined text-[24px]">schedule_send</span>
                </div>
                <h4 className="font-bold text-sm text-on-surface mb-2">7-Day Stagnancy Follow-ups</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Prevents dropped leads. Automatically composes courteous, customized follow-up emails highlighting recent portfolio milestones after 7 days of silence.
                </p>
              </div>
              <div className="mt-5 pt-2 bg-secondary-fixed/30 px-2.5 py-1 rounded text-[11px] text-secondary font-semibold">
                One-tap mail client launch
              </div>
            </div>

            {/* Feature 4 */}
            <div
              onClick={() => onNavigate('followups', 'interview')}
              className="bg-surface-container-lowest p-5 rounded-2xl shadow-xs flex flex-col justify-between border border-outline-variant/20 hover:border-indigo-400 transition-colors cursor-pointer"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed mb-4">
                  <span className="material-symbols-outlined text-[24px]">psychology_alt</span>
                </div>
                <h4 className="font-bold text-sm text-on-surface mb-2">Role-Specific Interview Prep</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Pre-interview intelligence synthesizing the job description with recruiter communications to generate 10 high-probability questions and system architectural briefs.
                </p>
              </div>
              <div className="mt-5 pt-2 bg-tertiary-fixed/30 px-2.5 py-1 rounded text-[11px] text-tertiary-container font-semibold">
                Google, Zepto, Razorpay presets
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Live Demo & Corpus Playground Section */}
      <section className="py-20 bg-surface" id="demo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-secondary-fixed text-[11px] text-on-secondary-fixed mb-1 font-bold">
                Live Interactive Simulator
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-on-surface">Explore the Synthetic Pipeline</h2>
              <p className="text-xs text-on-surface-variant mt-0.5">Select an email payload below to inspect the AI&apos;s instant classification, risk audit, and response draft.</p>
            </div>

            {/* Action / Filter Toggle */}
            <div className="flex items-center gap-1 bg-surface-container p-1 rounded-xl">
              <button
                onClick={() => setDemoCategoryFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  demoCategoryFilter === 'all'
                    ? 'bg-surface-container-lowest text-on-surface shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                All (20)
              </button>
              <button
                onClick={() => setDemoCategoryFilter('interview')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  demoCategoryFilter === 'interview'
                    ? 'bg-surface-container-lowest text-on-surface shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Interviews (4)
              </button>
              <button
                onClick={() => setDemoCategoryFilter('scam')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  demoCategoryFilter === 'scam'
                    ? 'bg-surface-container-lowest text-on-surface shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Scams (3)
              </button>
              <button
                onClick={() => setDemoCategoryFilter('followup')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  demoCategoryFilter === 'followup'
                    ? 'bg-surface-container-lowest text-on-surface shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Follow-ups (8)
              </button>
            </div>
          </div>

          {/* Playground Dynamic Inspector Workbench */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Email Feed / Pipeline Column (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-3">
              {filteredDemo.map((item) => {
                const isSelected = selectedItem.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedDemoIndex(item.id)}
                    className={`cursor-pointer p-4 rounded-xl bg-surface-container-lowest shadow-xs hover:shadow-md transition-all active:scale-[0.99] border border-outline-variant/30 ${
                      isSelected ? 'ring-2 ring-primary-container' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${item.dotColor}`}></span>
                        <span className="font-bold text-sm text-on-surface">{item.sender}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${item.badgeClass}`}>
                        {item.badge}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-on-surface truncate">{item.subject}</p>
                    <p className="text-xs text-on-surface-variant line-clamp-2 mt-1 leading-relaxed">
                      {item.snippet}
                    </p>

                    <div className="mt-3 pt-2 flex items-center justify-between text-[11px] text-outline border-t border-surface-container">
                      <span>{item.recruiter}</span>
                      <span className={item.statusClass}>{item.statusText}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Inspector Deep Dive Rail (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-md h-full flex flex-col justify-between border border-outline-variant/30">
                <div>
                  <div className="flex items-center justify-between pb-2 mb-3 bg-surface-container-low p-2.5 rounded-xl">
                    <span className="text-[11px] text-outline uppercase font-mono font-bold tracking-wider">AI INSPECTION DOCK</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${selectedItem.dockTagClass}`}>
                      {selectedItem.dockTag}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-on-surface mb-0.5">{selectedItem.dockTitle}</h3>
                  <p className="text-xs text-on-surface-variant mb-4">{selectedItem.dockSubtitle}</p>

                  {/* Scam/Security Breakdown Gauge */}
                  <div className="bg-surface-container-low p-3.5 rounded-xl mb-4 border border-surface-container">
                    <div className="flex justify-between items-center mb-1.5 text-xs">
                      <span className="font-bold text-on-surface">Authenticity & Safety Audit</span>
                      <span className={`font-bold ${selectedItem.scoreClass}`}>{selectedItem.scoreText}</span>
                    </div>

                    {/* Visual Risk Meter */}
                    <div className="w-full bg-surface-container rounded-full h-2 mb-2 overflow-hidden">
                      <div className={`h-2 rounded-full transition-all ${selectedItem.meterBg} ${selectedItem.meterWidth}`}></div>
                    </div>

                    <p
                      className="font-mono text-[11px] text-outline leading-tight"
                      dangerouslySetInnerHTML={{ __html: selectedItem.evidenceHtml }}
                    ></p>
                  </div>

                  {/* Automated Action Draft / Briefing */}
                  <div>
                    <h4 className="text-[11px] text-secondary font-bold uppercase tracking-wider mb-1.5">
                      {selectedItem.actionLabel}
                    </h4>
                    <div
                      className="bg-surface-container-low p-3.5 rounded-xl text-xs text-on-surface leading-relaxed border border-surface-container"
                      dangerouslySetInnerHTML={{ __html: selectedItem.contentHtml }}
                    ></div>
                  </div>
                </div>

                {/* Context Action Button */}
                <div className="pt-4 mt-4 border-t border-surface-container">
                  <button
                    onClick={() => onNavigate(selectedItem.targetScreen, selectedItem.targetSubTab)}
                    className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-sm ${selectedItem.ctaClass}`}
                  >
                    <span className="material-symbols-outlined text-[18px]">download_done</span>
                    <span>{selectedItem.ctaText}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy & Synthetic Data Architecture Section */}
      <section className="py-20 bg-surface-container-lowest text-on-surface" id="security">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary-container rounded-3xl p-8 sm:p-12 text-on-primary relative overflow-hidden shadow-xl border border-white/10">
            {/* Ambient vector graphic */}
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-secondary-container/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-surface-container-lowest/10 text-xs text-secondary-fixed mb-4 font-semibold border border-white/10">
                <span className="material-symbols-outlined text-[16px]">lock</span>
                <span>Ethical AI Commitment</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-on-primary mb-4 tracking-tight">
                Built for Garbathon 2026 with a 100% Synthetic Privacy Guarantee
              </h2>

              <p className="text-sm sm:text-base text-inverse-primary leading-relaxed mb-8 font-normal">
                Job applicants face enough anxiety without worrying about unauthorized inbox scraping. JobHunt Autopilot AI was engineered from the ground up for the Automation Track using high-fidelity synthetic job hunt datasets. It never requires live OAuth inbox access or stores sensitive personal identities on third-party servers.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                <div className="bg-surface-container-lowest/5 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                  <span className="material-symbols-outlined text-secondary-fixed text-[24px] mb-2 block">cloud_off</span>
                  <p className="font-bold text-sm text-on-primary">Zero Third-Party Storage</p>
                  <p className="text-xs text-inverse-primary/70 mt-0.5">Processed ephemerally in browser memory.</p>
                </div>
                <div className="bg-surface-container-lowest/5 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                  <span className="material-symbols-outlined text-secondary-fixed text-[24px] mb-2 block">verified_user</span>
                  <p className="font-bold text-sm text-on-primary">Synthetic Test Data</p>
                  <p className="text-xs text-inverse-primary/70 mt-0.5">20 realistic multi-industry applicant scenarios.</p>
                </div>
                <div className="bg-surface-container-lowest/5 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                  <span className="material-symbols-outlined text-secondary-fixed text-[24px] mb-2 block">code</span>
                  <p className="font-bold text-sm text-on-primary">Open Source Codebase</p>
                  <p className="text-xs text-inverse-primary/70 mt-0.5">Publicly auditable regex & NLP models.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer with GDG Ahmedabad & Garbathon 2026 Attribution */}
      <footer className="w-full bg-surface-container-lowest py-10 border-t border-surface-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img
              alt="JobHunt Autopilot AI Logo"
              className="w-8 h-8 rounded-lg"
              src="https://lh3.googleusercontent.com/aida/AEtjO1XZJW1iuCjZPIDLFO7wUdNgWbSFPoKB4v7IHDScBHEJwGXmnSVQdswS4auKwpY4hWT4FnApIV5vE8wTuYNl8X21H3OqBg0NM1xDIQvOZ86iLZS-FtBPIlpgEA5VZZ64k8RdNYRUwberEJgoS-xdDYmqSh1cN-Udk-SxdabRj5Z6ROF6Q0XH8G3JmvuOuj54UuksZPU0veR_Iy1JQAr7B5f9XvaAfKPsZk669ijX5y_gpxLurjPZGWD8RqY"
            />
            <div className="flex flex-col">
              <span className="font-bold text-sm text-on-surface">JobHunt Autopilot AI</span>
              <span className="text-xs text-outline">Submission for Garbathon 2026 • GDG Ahmedabad</span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs font-semibold text-on-surface-variant">
            <a href="#hero" className="hover:text-on-surface transition-colors">Top</a>
            <a href="#features" className="hover:text-on-surface transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-on-surface transition-colors">How It Works</a>
            <button
              onClick={() => onNavigate('dashboard')}
              className="hover:text-secondary font-bold transition-colors"
            >
              Console
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 pt-4 border-t border-surface-container/60 text-center text-outline text-[11px]">
          Crafted with precision for Gujarat&apos;s premier tech hackathon • Automation Track • © 2026 JobHunt Autopilot
        </div>
      </footer>
    </div>
  );
};
