import React, { useState, useMemo } from 'react';
import { ScreenId } from './AppShell';
import { EmailMessage } from '../data/mockData';

interface InboxAnalyzerScreenProps {
  onNavigate: (screen: ScreenId, subTab?: string) => void;
  emails: EmailMessage[];
  onResetCorpus: () => void;
  onReloadDemo: () => void;
  onShowToast: (message: string, icon?: string) => void;
  onOpenRawMime: (email: EmailMessage) => void;
  onMarkFalsePositive: (emailId: string) => void;
  onAddNewEmail: (email: Partial<EmailMessage>) => void;
}

export const InboxAnalyzerScreen: React.FC<InboxAnalyzerScreenProps> = ({
  onNavigate,
  emails,
  onResetCorpus,
  onReloadDemo,
  onShowToast,
  onOpenRawMime,
  onMarkFalsePositive,
  onAddNewEmail
}) => {
  const [selectedEmailId, setSelectedEmailId] = useState<string>(emails[0]?.id || 'msg_apex_20914');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'corpus' | 'paste' | 'upload'>('corpus');

  // Raw text paste form state
  const [rawText, setRawText] = useState('');
  const [rawSender, setRawSender] = useState('');
  const [rawSubject, setRawSubject] = useState('');

  // Selected email
  const selectedEmail = useMemo(() => {
    return emails.find(e => e.id === selectedEmailId) || emails[0];
  }, [emails, selectedEmailId]);

  // Counts
  const counts = useMemo(() => {
    return {
      all: emails.length,
      interview: emails.filter(e => e.category === 'interview').length,
      offer: emails.filter(e => e.category === 'offer').length,
      followup: emails.filter(e => e.category === 'followup').length,
      scam: emails.filter(e => e.isScam).length,
      rejection: emails.filter(e => e.category === 'rejection').length
    };
  }, [emails]);

  // Filtered emails
  const filteredEmails = useMemo(() => {
    return emails.filter(e => {
      if (categoryFilter === 'interview' && e.category !== 'interview') return false;
      if (categoryFilter === 'offer' && e.category !== 'offer') return false;
      if (categoryFilter === 'followup' && e.category !== 'followup') return false;
      if (categoryFilter === 'scam' && !e.isScam) return false;
      if (categoryFilter === 'rejection' && e.category !== 'rejection') return false;

      if (searchFilter.trim()) {
        const q = searchFilter.toLowerCase();
        return (
          e.company.toLowerCase().includes(q) ||
          e.senderEmail.toLowerCase().includes(q) ||
          e.subject.toLowerCase().includes(q) ||
          e.snippet.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [emails, categoryFilter, searchFilter]);

  const handleRunAnalysis = () => {
    setIsAnalyzing(true);
    onShowToast('Analyzing 20 emails with Gemini Flash 2.5 entity extraction...', 'sync');
    setTimeout(() => {
      setIsAnalyzing(false);
      onShowToast('Analysis complete: 18 entities extracted, 3 scams neutralized, 4 follow-ups queued.', 'check_circle');
    }, 1200);
  };

  const handlePasteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rawText.trim()) return;

    const isSuspicious = /deposit|₹|fee|telegram|macbook|cheque|kyc|urgent/i.test(rawText);
    const newId = `msg_custom_${Date.now()}`;
    const newMsg: Partial<EmailMessage> = {
      id: newId,
      senderName: rawSender || 'Unknown HR',
      senderEmail: rawSender.includes('@') ? rawSender : 'recruitment@custom-eval.com',
      senderDomain: 'custom-eval.com',
      recipientEmail: 'arjun.sharma.dev@gmail.com',
      dateStr: 'Just now',
      subject: rawSubject || 'Custom Evaluated Job Communication',
      snippet: rawText.slice(0, 100) + '...',
      fullBody: rawText,
      category: isSuspicious ? 'scam' : 'under_review',
      company: 'Custom Parsed Entity',
      targetRole: 'Evaluated Candidate Role',
      isScam: isSuspicious,
      scamScore: isSuspicious ? 94 : 5,
      scamType: isSuspicious ? 'Potential Advance Fee / Phishing' : undefined,
      spfStatus: isSuspicious ? 'SOFTFAIL' : 'PASS',
      dkimStatus: isSuspicious ? 'NONE (MISSING)' : 'PASS',
      dmarcStatus: isSuspicious ? 'FAIL' : 'PASS',
      returnPath: 'inbound-custom.net',
      domainAgeDays: isSuspicious ? 5 : 300,
      read: true,
      starred: false
    };

    onAddNewEmail(newMsg);
    setSelectedEmailId(newId);
    setActiveTab('corpus');
    setRawText('');
    setRawSender('');
    setRawSubject('');
    onShowToast('Custom email analyzed and mapped to live pipeline!', 'auto_awesome');
  };

  const copyThreatReport = () => {
    if (!selectedEmail) return;
    const report = `THREAT REPORT: ${selectedEmail.company}
Sender: ${selectedEmail.senderEmail}
Risk Score: ${selectedEmail.scamScore || 95}/100
Flags: ${selectedEmail.scamFlags?.join('; ') || 'Advance fee solicitation'}
Headers: SPF ${selectedEmail.spfStatus}, DKIM ${selectedEmail.dkimStatus}`;
    navigator.clipboard.writeText(report);
    onShowToast('Forensic threat report copied to clipboard!', 'content_copy');
  };

  return (
    <div className="flex flex-col w-full pb-12">
      {/* Top Ambient Glow */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute -top-32 left-1/4 w-[500px] h-48 bg-secondary-fixed/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -top-24 right-1/4 w-[420px] h-40 bg-surface-container-highest/60 rounded-full blur-2xl pointer-events-none"></div>

        {/* Header Section */}
        <div className="relative px-4 sm:px-6 lg:px-8 pt-6 pb-4 flex flex-col gap-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs text-secondary uppercase tracking-widest bg-secondary-fixed/50 px-2.5 py-0.5 rounded font-bold">
                  Corpus Intelligence Engine
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-outline-variant"></span>
                <span className="text-xs text-on-surface-variant font-medium">Live Gemini 2.5 Flash Pipeline</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">Inbox Analyzer</h1>
              <p className="text-xs sm:text-sm text-on-surface-variant max-w-3xl mt-0.5">
                Turn {emails.length} messy job-related emails into a structured, risk-audited application pipeline in seconds.
              </p>
            </div>

            {/* Top Action Controls */}
            <div className="flex items-center flex-wrap gap-2">
              <button
                onClick={onResetCorpus}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-all text-xs font-semibold shadow-xs"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px] text-on-surface-variant">restart_alt</span>
                <span>Reset Corpus</span>
              </button>

              <button
                onClick={onReloadDemo}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container-low transition-all text-xs font-semibold shadow-xs border border-outline-variant/30"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px] text-secondary">file_download</span>
                <span>Load 20 Demo Emails</span>
              </button>

              <button
                disabled={isAnalyzing}
                onClick={handleRunAnalysis}
                className={`flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-secondary-container via-secondary to-primary-container text-on-primary font-bold text-xs shadow-md hover:shadow-lg hover:brightness-105 active:scale-95 transition-all ${
                  isAnalyzing ? 'opacity-80 cursor-wait' : ''
                }`}
                type="button"
              >
                <span className={`material-symbols-outlined text-[18px] ${isAnalyzing ? 'animate-spin' : 'animate-pulse'}`}>
                  {isAnalyzing ? 'refresh' : 'auto_awesome'}
                </span>
                <span>{isAnalyzing ? 'Synthesizing Pipeline...' : `Analyze All ${emails.length} Emails`}</span>
              </button>
            </div>
          </div>

          {/* Ingestion & Mode Selector Card */}
          <div className="bg-surface-container-lowest p-3.5 rounded-2xl shadow-xs flex flex-col md:flex-row items-center justify-between gap-3 border border-outline-variant/30">
            {/* Tabs */}
            <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-xl w-full md:w-auto">
              <button
                onClick={() => setActiveTab('corpus')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'corpus'
                    ? 'bg-surface-container-lowest text-on-surface shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
                type="button"
              >
                <span className="material-symbols-outlined text-[16px] text-secondary">folder_check</span>
                <span>20 Synthetic Emails (Active)</span>
              </button>

              <button
                onClick={() => setActiveTab('paste')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'paste'
                    ? 'bg-surface-container-lowest text-on-surface shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">terminal</span>
                <span>Paste Raw Text</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('upload');
                  onShowToast('Drag & drop your .eml or .mbox export here for client-side MIME parsing.', 'info');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'upload'
                    ? 'bg-surface-container-lowest text-on-surface shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">upload_file</span>
                <span>Upload .eml / .mbox</span>
              </button>
            </div>

            {/* Pill Status */}
            <div className="flex items-center gap-2 bg-surface-container px-3 py-1.5 rounded-full text-on-surface-variant font-mono text-[11px] self-start md:self-auto font-medium">
              <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
              <span>{emails.length}/{emails.length} Sample Messages Ready</span>
              <span className="text-outline-variant">•</span>
              <span>Corpus: 48.2 KB</span>
              <span className="text-outline-variant">•</span>
              <span className="text-primary-container font-bold">Gemini Flash 2.5 Active</span>
            </div>
          </div>

          {/* Paste Raw Text Expansion Form */}
          {activeTab === 'paste' && (
            <form onSubmit={handlePasteSubmit} className="bg-surface-container-lowest p-5 rounded-2xl shadow-xs border border-secondary/40 flex flex-col gap-3 animate-in fade-in duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-surface-container">
                <span className="font-bold text-xs text-on-surface flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-secondary">terminal</span>
                  Test Custom Recruiter Message with Heuristic Parser
                </span>
                <span className="text-[11px] text-on-surface-variant font-mono">100% Client-Side Evaluation</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Sender (e.g. hr@company-careers.xyz)"
                  value={rawSender}
                  onChange={(e) => setRawSender(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-surface-container-low text-xs text-on-surface border border-outline-variant/30 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Subject Line (e.g. Urgent Offer Letter / Interview Invite)"
                  value={rawSubject}
                  onChange={(e) => setRawSubject(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-surface-container-low text-xs text-on-surface border border-outline-variant/30 focus:outline-none"
                />
              </div>
              <textarea
                required
                rows={4}
                placeholder="Paste the full email body here (include any requests for fees, Telegram redirects, interview dates, etc.)..."
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                className="w-full p-3 rounded-xl bg-surface-container-low text-xs font-mono text-on-surface border border-outline-variant/30 focus:outline-none"
              ></textarea>
              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-on-surface-variant">
                  Tip: Include phrases like &quot;deposit&quot; or &quot;Telegram&quot; to test scam heuristics.
                </span>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-secondary-container text-on-secondary font-bold text-xs shadow-xs hover:brightness-105 transition-all"
                >
                  Parse &amp; Ingest Email
                </button>
              </div>
            </form>
          )}

          {/* Multi-step Live Processing Flow */}
          <div className="bg-surface-container-lowest p-4 rounded-2xl shadow-xs border border-outline-variant/30">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Step 1 */}
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-container-low border border-surface-container">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary-container text-on-primary font-mono text-xs shrink-0 font-bold">
                  <span className="material-symbols-outlined text-[14px]">check</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-on-surface truncate">1. Reading &amp; Parsing</span>
                    <span className="font-mono text-[10px] text-secondary font-bold">100%</span>
                  </div>
                  <span className="text-[11px] text-on-surface-variant truncate">20/20 raw mime headers ok</span>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-container-low border border-surface-container">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary-container text-on-primary font-mono text-xs shrink-0 font-bold">
                  <span className="material-symbols-outlined text-[14px]">check</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-on-surface truncate">2. Entity Extraction</span>
                    <span className="font-mono text-[10px] text-secondary font-bold">18 Found</span>
                  </div>
                  <span className="text-[11px] text-on-surface-variant truncate">Roles, salary tags &amp; dates</span>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-error-container/40 border border-error/20">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-error text-on-error font-mono text-xs shrink-0 font-bold">
                  <span className="material-symbols-outlined text-[14px]">warning</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-error truncate">3. Risk &amp; Scam Audit</span>
                    <span className="font-mono text-[10px] text-error font-bold">3 High Risk</span>
                  </div>
                  <span className="text-[11px] text-on-surface-variant truncate">Heuristic patterns triggered</span>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-secondary-fixed/40 border border-secondary/20">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-secondary text-on-secondary font-mono text-xs shrink-0 font-bold">
                  <span className="material-symbols-outlined text-[14px]">schedule</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-on-secondary-fixed-variant truncate">4. Follow-up Engine</span>
                    <span className="font-mono text-[10px] text-secondary font-bold">4 Queued</span>
                  </div>
                  <span className="text-[11px] text-on-surface-variant truncate">Ghosting guard active</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Two-Column Workbench Section */}
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* LEFT PANEL: Categorized Email Feed */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="bg-surface-container-lowest rounded-2xl shadow-xs p-4 flex flex-col gap-3 border border-outline-variant/30">
                <div className="flex items-center justify-between pb-1">
                  <span className="text-sm font-bold text-on-surface">Inbox Threads</span>
                  <span className="font-mono text-[11px] text-on-surface-variant">Showing {filteredEmails.length} parsed</span>
                </div>

                {/* Scrollable Filter Chips */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  <button
                    onClick={() => setCategoryFilter('all')}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold shrink-0 transition-colors ${
                      categoryFilter === 'all'
                        ? 'bg-primary-container text-on-primary-container'
                        : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'
                    }`}
                  >
                    All ({counts.all})
                  </button>

                  <button
                    onClick={() => setCategoryFilter('interview')}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold shrink-0 transition-colors ${
                      categoryFilter === 'interview'
                        ? 'bg-primary-container text-on-primary-container'
                        : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'
                    }`}
                  >
                    Interviews ({counts.interview})
                  </button>

                  <button
                    onClick={() => setCategoryFilter('offer')}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold shrink-0 transition-colors ${
                      categoryFilter === 'offer'
                        ? 'bg-primary-container text-on-primary-container'
                        : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'
                    }`}
                  >
                    Offers ({counts.offer})
                  </button>

                  <button
                    onClick={() => setCategoryFilter('followup')}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold shrink-0 transition-colors ${
                      categoryFilter === 'followup'
                        ? 'bg-secondary-fixed text-on-secondary-fixed-variant'
                        : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'
                    }`}
                  >
                    Follow-up Due ({counts.followup})
                  </button>

                  <button
                    onClick={() => setCategoryFilter('scam')}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold shrink-0 transition-colors ${
                      categoryFilter === 'scam'
                        ? 'bg-error text-on-error'
                        : 'bg-error-container text-on-error-container'
                    }`}
                  >
                    Suspicious ({counts.scam})
                  </button>

                  <button
                    onClick={() => setCategoryFilter('rejection')}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold shrink-0 transition-colors ${
                      categoryFilter === 'rejection'
                        ? 'bg-primary-container text-on-primary-container'
                        : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'
                    }`}
                  >
                    Rejections ({counts.rejection})
                  </button>
                </div>

                {/* Search Inside Parsed Corpus */}
                <div className="relative flex items-center w-full">
                  <span className="material-symbols-outlined absolute left-3 text-[16px] text-outline">search</span>
                  <input
                    type="text"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    placeholder="Filter emails by sender, company, or keywords..."
                    className="w-full pl-9 pr-3 py-2 bg-surface-container-low rounded-xl text-xs text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest transition-all border border-transparent focus:border-outline-variant/40"
                  />
                  {searchFilter && (
                    <button onClick={() => setSearchFilter('')} className="absolute right-2 text-outline">
                      <span className="material-symbols-outlined text-[14px]">cancel</span>
                    </button>
                  )}
                </div>

                {/* Email List Items */}
                <div className="flex flex-col gap-2 mt-1 max-h-[640px] overflow-y-auto pr-1">
                  {filteredEmails.map((email) => {
                    const isSelected = selectedEmail?.id === email.id;
                    const isThreat = email.isScam;

                    return (
                      <div
                        key={email.id}
                        onClick={() => setSelectedEmailId(email.id)}
                        className={`group relative p-3.5 rounded-xl cursor-pointer transition-all flex flex-col gap-1.5 border ${
                          isSelected
                            ? isThreat
                              ? 'bg-error-container/20 border-l-4 border-l-error border-error/40 shadow-sm'
                              : 'bg-surface-container-high border-l-4 border-l-primary-container border-outline-variant/40 shadow-sm'
                            : 'bg-surface-container-low hover:bg-surface-container border-transparent'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0">
                            {isThreat ? (
                              <span className="w-2 h-2 rounded-full bg-error shrink-0 animate-ping"></span>
                            ) : (
                              <div className="w-5 h-5 rounded bg-surface-container-highest text-on-surface flex items-center justify-center text-[10px] font-bold shrink-0">
                                {email.company.slice(0, 1)}
                              </div>
                            )}
                            <span className="text-xs font-bold text-on-surface truncate">{email.company}</span>
                          </div>

                          {isThreat ? (
                            <span className="font-mono text-[10px] text-error font-bold uppercase tracking-wider bg-error-container px-2 py-0.5 rounded">
                              Scam Detected
                            </span>
                          ) : email.category === 'interview' ? (
                            <span className="font-mono text-[10px] text-on-tertiary-fixed-variant bg-tertiary-fixed px-2 py-0.5 rounded font-bold">
                              Interview Scheduled
                            </span>
                          ) : email.category === 'offer' ? (
                            <span className="font-mono text-[10px] text-secondary font-bold bg-secondary-fixed px-2 py-0.5 rounded">
                              Offer Received
                            </span>
                          ) : email.category === 'followup' ? (
                            <span className="font-mono text-[10px] text-on-secondary-fixed-variant bg-secondary-fixed-dim/60 px-2 py-0.5 rounded font-bold">
                              Follow-Up Due
                            </span>
                          ) : (
                            <span className="font-mono text-[10px] text-on-surface-variant bg-surface-container px-2 py-0.5 rounded font-medium">
                              Under Review
                            </span>
                          )}
                        </div>

                        <p className="text-xs font-semibold text-on-surface line-clamp-1">{email.subject}</p>
                        <p className="text-[11px] text-on-surface-variant line-clamp-1 leading-relaxed">
                          {email.snippet}
                        </p>

                        <div className="flex items-center justify-between pt-1 text-[11px] text-on-surface-variant">
                          <div className="flex items-center gap-1 font-mono text-[10px]">
                            {isThreat ? (
                              <span className="text-error font-semibold flex items-center gap-0.5">
                                <span className="material-symbols-outlined text-[13px]">gshield</span>
                                Domain age: {email.domainAgeDays}d
                              </span>
                            ) : (
                              <span>{email.targetRole}</span>
                            )}
                          </div>
                          <span className="font-mono text-[10px]">{email.dateStr}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* RIGHT PANEL: Deep Inspection & Evidence Panel */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              {selectedEmail ? (
                <div className="bg-surface-container-lowest rounded-2xl shadow-xs p-5 sm:p-6 flex flex-col gap-4 border border-outline-variant/30">
                  {/* Email Metadata Header */}
                  <div className="flex flex-col gap-2 pb-3 bg-surface-container-low p-4 rounded-xl border border-surface-container">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {selectedEmail.isScam ? (
                          <span className="px-2.5 py-0.5 rounded bg-error-container text-on-error-container font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">gshield</span>
                            Flagged by Heuristic AI
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">verified</span>
                            Verified Inbound Header
                          </span>
                        )}
                        <span className="font-mono text-[11px] text-on-surface-variant">ID: {selectedEmail.id}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onOpenRawMime(selectedEmail)}
                          className="text-[11px] font-mono text-on-surface-variant hover:text-on-surface flex items-center gap-1 underline"
                        >
                          <span className="material-symbols-outlined text-[13px]">code</span> View Raw MIME
                        </button>
                        <span className="font-mono text-[11px] text-on-surface-variant">{selectedEmail.dateStr}</span>
                      </div>
                    </div>

                    <h2 className="text-base sm:text-lg font-bold text-on-surface mt-1 leading-snug">
                      {selectedEmail.subject}
                    </h2>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-on-surface-variant gap-2 pt-1 border-t border-surface-container/60">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-bold text-on-surface">From:</span>
                        <span className={`font-mono ${selectedEmail.isScam ? 'text-error font-bold' : 'text-on-surface'}`}>
                          {selectedEmail.senderEmail}
                        </span>
                        {selectedEmail.isScam ? (
                          <span className="px-1.5 py-0.2 rounded bg-error-container text-on-error-container text-[9px] font-bold">
                            UNVERIFIED SPF/DKIM
                          </span>
                        ) : (
                          <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 text-[9px] font-bold">
                            DKIM PASS
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1 font-mono text-[11px]">
                        <span className="font-semibold text-on-surface">To:</span>
                        <span>{selectedEmail.recipientEmail}</span>
                      </div>
                    </div>
                  </div>

                  {/* AI Extraction Summary Bento Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
                    <div className="p-3 bg-surface-container rounded-xl flex flex-col justify-between">
                      <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider">Company</span>
                      <span className="font-bold text-xs text-on-surface truncate mt-1">{selectedEmail.company}</span>
                      <span className={`text-[10px] font-bold ${selectedEmail.isScam ? 'text-error' : 'text-emerald-700'}`}>
                        {selectedEmail.isScam ? 'Unregistered Entity' : 'Verified Employer'}
                      </span>
                    </div>

                    <div className="p-3 bg-surface-container rounded-xl flex flex-col justify-between">
                      <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider">Target Role</span>
                      <span className="font-bold text-xs text-on-surface truncate mt-1">{selectedEmail.targetRole}</span>
                      <span className="text-[10px] text-on-surface-variant">
                        {selectedEmail.salaryText || 'Market Benchmark'}
                      </span>
                    </div>

                    <div className="p-3 bg-surface-container rounded-xl flex flex-col justify-between">
                      <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider">Classification</span>
                      <span className={`font-bold text-xs truncate mt-1 ${selectedEmail.isScam ? 'text-error' : 'text-on-surface'}`}>
                        {selectedEmail.isScam ? (selectedEmail.scamType || 'Predatory Fee') : 'Legitimate Lead'}
                      </span>
                      <span className="text-[10px] text-on-surface-variant capitalize">
                        {selectedEmail.category.replace('_', ' ')}
                      </span>
                    </div>

                    <div className="p-3 bg-surface-container rounded-xl flex flex-col justify-between">
                      <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider">Confidence</span>
                      <div className="flex items-center gap-1 mt-1">
                        <span className={`text-base font-extrabold ${selectedEmail.isScam ? 'text-error' : 'text-emerald-700'}`}>
                          {selectedEmail.isScam ? `${selectedEmail.scamScore || 98.4}%` : '99.8%'}
                        </span>
                        <span className={`material-symbols-outlined text-[16px] ${selectedEmail.isScam ? 'text-error' : 'text-emerald-700'}`}>
                          verified
                        </span>
                      </div>
                      <span className="text-[10px] text-on-surface-variant">Gemini Flash Heuristic</span>
                    </div>
                  </div>

                  {/* Threat Evidence Breakdown (Shown if Scam) */}
                  {selectedEmail.isScam ? (
                    <div className="p-4 rounded-xl bg-error-container text-on-error-container flex flex-col gap-2.5 border border-error/30">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[20px] text-error">fmd_bad</span>
                          <span className="text-xs font-bold text-error uppercase tracking-wider">
                            3 High-Confidence Scam Red Flags
                          </span>
                        </div>
                        <span className="font-mono text-[10px] text-error font-bold bg-surface-container-lowest px-2 py-0.5 rounded shadow-xs">
                          Audit Score: {selectedEmail.scamScore || 98}/100 Risk
                        </span>
                      </div>

                      <div className="flex flex-col gap-2 mt-1">
                        <div className="flex items-start gap-2 bg-surface-container-lowest/80 p-2.5 rounded-lg text-on-surface">
                          <span className="material-symbols-outlined text-[16px] text-error shrink-0 mt-0.5">payments</span>
                          <div className="flex flex-col text-xs">
                            <span className="font-bold text-on-surface">Advance Payment Demand (Illegal under labor guidelines)</span>
                            <span className="text-on-surface-variant text-[11px]">
                              Sender explicitly requests ₹2,500 &quot;refundable security deposit&quot; via UPI QR code for an alleged Apple M3 development laptop provisioning.
                            </span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2 bg-surface-container-lowest/80 p-2.5 rounded-lg text-on-surface">
                          <span className="material-symbols-outlined text-[16px] text-error shrink-0 mt-0.5">language</span>
                          <div className="flex flex-col text-xs">
                            <span className="font-bold text-on-surface">Disposable Impersonation Domain</span>
                            <span className="text-on-surface-variant text-[11px]">
                              The domain <code className="bg-surface-container-highest px-1 rounded text-primary-container font-mono">{selectedEmail.senderDomain}</code> was registered only {selectedEmail.domainAgeDays} days ago with hidden WHOIS privacy.
                            </span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2 bg-surface-container-lowest/80 p-2.5 rounded-lg text-on-surface">
                          <span className="material-symbols-outlined text-[16px] text-error shrink-0 mt-0.5">psychology_alt</span>
                          <div className="flex flex-col text-xs">
                            <span className="font-bold text-on-surface">Immediate Selection Anomaly</span>
                            <span className="text-on-surface-variant text-[11px]">
                              Immediate appointment letter issued without prior technical screen, code review, or application record in local tracker corpus.
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-emerald-50 text-emerald-950 flex items-center justify-between border border-emerald-200">
                      <div className="flex items-center gap-2.5">
                        <span className="material-symbols-outlined text-emerald-700 text-[20px]">verified_user</span>
                        <div>
                          <span className="font-bold text-xs">Authenticated Recruiter Correspondence</span>
                          <p className="text-[11px] text-emerald-800">
                            Valid corporate SPF/DKIM keys detected. Domain age: {selectedEmail.domainAgeDays} days. Zero financial or PII demands.
                          </p>
                        </div>
                      </div>
                      <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                        100% Legit
                      </span>
                    </div>
                  )}

                  {/* Original Raw Email Body with Highlighting */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-on-surface">Original Email Transcript (Keyword Heuristics Highlighted)</span>
                      <span className="font-mono text-[10px] text-on-surface-variant">MIME Decoded • Text/Plain</span>
                    </div>

                    <div className="p-4 rounded-xl bg-surface-container-low font-mono text-xs leading-relaxed text-on-surface flex flex-col gap-2 max-h-56 overflow-y-auto border border-surface-container select-text">
                      <div className="whitespace-pre-wrap">{selectedEmail.fullBody}</div>
                    </div>
                  </div>

                  {/* AI Recommended Actions & Automation Buttons */}
                  <div className="pt-1 flex flex-col gap-2 bg-surface-container p-4 rounded-xl border border-surface-container-high">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] text-secondary">smart_toy</span>
                      <span className="text-xs font-bold text-on-surface">AI Recommended Countermeasure</span>
                    </div>

                    <p className="text-xs text-on-surface-variant">
                      {selectedEmail.isScam
                        ? 'DO NOT transfer any funds, scan QR codes, or submit government identification. This communication follows identical patterns to the known "Laptop Deposit" job cartel active across LinkedIn.'
                        : 'Application verified and safely linked to Tracker. If awaiting response for >7 days, Autopilot will stage a polite follow-up draft in Follow-ups center.'}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      {selectedEmail.isScam ? (
                        <>
                          <button
                            onClick={() => onNavigate('scam')}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-on-primary font-bold text-xs hover:bg-primary-container transition-all shadow-xs"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[16px]">gshield</span>
                            <span>Move to Scam Detection Center</span>
                          </button>

                          <button
                            onClick={copyThreatReport}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container-high transition-all text-xs font-semibold shadow-xs border border-outline-variant/30"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[16px]">content_copy</span>
                            <span>Copy Threat Report</span>
                          </button>

                          <button
                            onClick={() => onMarkFalsePositive(selectedEmail.id)}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container-lowest text-on-surface-variant hover:text-on-surface transition-all text-xs font-semibold"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[16px]">done_all</span>
                            <span>Mark as False Positive</span>
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => onNavigate('tracker')}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-on-primary font-bold text-xs hover:bg-primary-container transition-all shadow-xs"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[16px]">view_kanban</span>
                            <span>Open in Application Tracker</span>
                          </button>

                          {selectedEmail.category === 'followup' && (
                            <button
                              onClick={() => onNavigate('followups')}
                              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-secondary-container text-on-secondary font-bold text-xs hover:bg-secondary-fixed-dim transition-all shadow-xs"
                              type="button"
                            >
                              <span className="material-symbols-outlined text-[16px]">schedule_send</span>
                              <span>Draft 7-Day Follow-up</span>
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-surface-container-lowest rounded-2xl p-12 text-center text-on-surface-variant">
                  Select an email on the left to inspect AI forensic analysis.
                </div>
              )}

              {/* Quick Stats Footer Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div
                  onClick={() => onNavigate('followups')}
                  className="bg-surface-container-lowest p-3.5 rounded-xl shadow-xs flex items-center gap-3 border border-outline-variant/20 hover:border-secondary transition-colors cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed-variant flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[20px]">quickreply</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-bold text-xs text-on-surface">4 Follow-ups</span>
                    <span className="text-[11px] text-on-surface-variant truncate">Drafted &amp; timed</span>
                  </div>
                </div>

                <div
                  onClick={() => onNavigate('tracker')}
                  className="bg-surface-container-lowest p-3.5 rounded-xl shadow-xs flex items-center gap-3 border border-outline-variant/20 hover:border-primary transition-colors cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-lg bg-secondary-fixed text-on-secondary-fixed-variant flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[20px]">fact_check</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-bold text-xs text-on-surface">18 Applications</span>
                    <span className="text-[11px] text-on-surface-variant truncate">Synchronized to Tracker</span>
                  </div>
                </div>

                <div
                  onClick={() => onNavigate('scam')}
                  className="bg-surface-container-lowest p-3.5 rounded-xl shadow-xs flex items-center gap-3 border border-outline-variant/20 hover:border-error transition-colors cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-lg bg-error-container text-on-error-container flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[20px]">policy</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-bold text-xs text-error">3 Threats Blocked</span>
                    <span className="text-[11px] text-on-surface-variant truncate">Security score: 100%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
