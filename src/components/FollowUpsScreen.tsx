import React, { useState, useMemo } from 'react';
import { FOLLOW_UP_ITEMS, INTERVIEW_DOSSIERS, FollowUpItem, InterviewDossier } from '../data/mockData';

interface FollowUpsScreenProps {
  initialSubTab?: string;
  onShowToast: (message: string, icon?: string) => void;
}

export const FollowUpsScreen: React.FC<FollowUpsScreenProps> = ({
  initialSubTab = 'followups',
  onShowToast
}) => {
  const [activeMainTab, setActiveMainTab] = useState<'followups' | 'interview'>(
    initialSubTab === 'interview' ? 'interview' : 'followups'
  );

  const [followups, setFollowups] = useState<FollowUpItem[]>(FOLLOW_UP_ITEMS);
  const [selectedAppKey, setSelectedAppKey] = useState<string>('fu_phonepe');
  const [selectedTone, setSelectedTone] = useState<'polite' | 'value' | 'warm'>('polite');
  const [subjectText, setSubjectText] = useState<string>(
    FOLLOW_UP_ITEMS[0].subjects[0]
  );
  const [bodyText, setBodyText] = useState<string>(
    FOLLOW_UP_ITEMS[0].drafts.polite
  );

  // Interview dossiers state
  const [selectedDossierId, setSelectedDossierId] = useState<string>('dossier_zepto');

  // Currently selected follow-up
  const currentItem = useMemo(() => {
    return followups.find(f => f.id === selectedAppKey) || followups[0];
  }, [followups, selectedAppKey]);

  // Selected interview dossier
  const currentDossier = useMemo(() => {
    return INTERVIEW_DOSSIERS.find(d => d.id === selectedDossierId) || INTERVIEW_DOSSIERS[0];
  }, [selectedDossierId]);

  // Select a stagnant application
  const handleSelectApp = (item: FollowUpItem) => {
    setSelectedAppKey(item.id);
    setSubjectText(item.subjects[0]);
    setBodyText(item.drafts[selectedTone]);
  };

  // Change tone
  const handleToneChange = (tone: 'polite' | 'value' | 'warm') => {
    setSelectedTone(tone);
    if (currentItem && currentItem.drafts[tone]) {
      setBodyText(currentItem.drafts[tone]);
    }
  };

  // Word count & read time
  const wordCount = useMemo(() => {
    return bodyText.trim() ? bodyText.trim().split(/\s+/).length : 0;
  }, [bodyText]);

  const readTimeSec = Math.max(15, Math.round((wordCount / 200) * 60));

  // Shuffle subject
  const handleShuffleSubject = () => {
    if (!currentItem) return;
    const subs = currentItem.subjects;
    const currentIdx = subs.indexOf(subjectText);
    const nextIdx = (currentIdx + 1) % subs.length;
    setSubjectText(subs[nextIdx]);
    onShowToast('AI generated alternate high-open subject line.', 'cached');
  };

  // Regenerate with Gemini
  const handleRegenerate = () => {
    onShowToast('Gemini Flash 2.5 re-synthesizing draft tone and phrasing...', 'auto_awesome');
    setTimeout(() => {
      handleToneChange(selectedTone);
      onShowToast('Refreshed with high-conviction recruiter phrasing!', 'check_circle');
    }, 500);
  };

  // Copy draft
  const handleCopyDraft = () => {
    navigator.clipboard.writeText(bodyText);
    onShowToast('Draft copied to clipboard! Ready to paste into Gmail.', 'content_copy');
  };

  // Open in Gmail
  const handleOpenInGmail = () => {
    const sub = encodeURIComponent(subjectText);
    const bod = encodeURIComponent(bodyText);
    onShowToast('Opening default mail client...', 'mail');
    window.location.href = `mailto:${currentItem.recruiterEmail}?subject=${sub}&body=${bod}`;
  };

  // Mark sent
  const handleMarkSent = () => {
    onShowToast(`Marked ${currentItem.company} follow-up sent. Inactivity counter snoozed for 7 days!`, 'verified');
  };

  // Batch draft all
  const handleBatchDraftAll = () => {
    onShowToast('Synthesized 4 high-probability follow-up drafts via Gemini 2.5.', 'mark_email_read');
  };

  // Download PDF
  const handleDownloadPdf = () => {
    const text = `INTERVIEW PREP BRIEFING - ${currentDossier.company} (${currentDossier.role})
Round: ${currentDossier.roundTitle}
Time: ${currentDossier.timeString} (${currentDossier.duration})
Interviewer: ${currentDossier.interviewer} (${currentDossier.interviewerTitle})
Directive: ${currentDossier.extractedDirective}

LIKELY TECHNICAL INQUIRIES:
${currentDossier.technicalInquiries.map((q, i) => `${i + 1}. ${q.title}\n${q.question}`).join('\n\n')}

BEHAVIORAL QUERIES (STAR):
${currentDossier.behavioralQueries.map((q, i) => `${i + 1}. ${q.title}\n${q.scenario}${q.tip ? ` (${q.tip})` : ''}`).join('\n\n')}

SMART QUESTIONS TO ASK:
${currentDossier.smartQuestions.map((q, i) => `${i + 1}. ${q.question}\nRationale: ${q.rationale}`).join('\n\n')}
`;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentDossier.company.toLowerCase()}-interview-dossier.txt`;
    a.click();
    URL.revokeObjectURL(url);
    onShowToast(`Exported full 6-section ${currentDossier.company} briefing sheet!`, 'download');
  };

  return (
    <div className="flex flex-col w-full pb-12">
      <div className="px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6 max-w-[1600px] mx-auto w-full">
        {/* Top Context & Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs text-secondary font-bold uppercase tracking-wider bg-secondary-fixed/50 px-2 py-0.5 rounded">
                Communication Engine
              </span>
              <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
              <span className="font-mono text-xs text-on-surface-variant font-medium">Gemini Flash 2.5 Active</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
              Follow-ups &amp; Interview Prep
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant max-w-2xl mt-0.5">
              Turn silence into recruiter momentum and prepare high-impact technical answers from real correspondence.
            </p>
          </div>

          {/* Quick Operational Metrics Pill */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-surface-container-low shadow-xs border border-surface-container">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-container-lowest">
              <span className="material-symbols-outlined text-[16px] text-secondary">trending_up</span>
              <span className="text-xs text-on-surface font-bold">+34% Reply Rate</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-container-lowest">
              <span className="material-symbols-outlined text-[16px] text-on-surface-variant">timer</span>
              <span className="font-mono text-xs text-on-surface font-semibold">Avg response: 18h</span>
            </div>
          </div>
        </div>

        {/* Master Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-0 pb-1">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-surface-container-low">
            <button
              onClick={() => setActiveMainTab('followups')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold shadow-xs transition-all duration-200 ${
                activeMainTab === 'followups'
                  ? 'bg-surface-container-lowest text-on-surface'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[18px] text-secondary">schedule_send</span>
              <span>Follow-ups Due</span>
              <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant text-[10px] font-bold">
                4 Due &gt;7d
              </span>
            </button>

            <button
              onClick={() => setActiveMainTab('interview')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 ${
                activeMainTab === 'interview'
                  ? 'bg-surface-container-lowest text-on-surface shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">psychology</span>
              <span>Interview Preparation &amp; Briefs</span>
              <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant text-[10px] font-semibold">
                3 Active Stages
              </span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-on-surface-variant">Automated Audit:</span>
            <span className="px-2.5 py-1 rounded-md bg-surface-container-high text-on-surface font-mono text-[11px] font-bold">
              Synced 14m ago
            </span>
          </div>
        </div>

        {/* TAB 1: FOLLOW-UPS WORKBENCH */}
        {activeMainTab === 'followups' && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-150">
            {/* Summary / Alert Ribbon */}
            <div className="p-4 sm:p-5 rounded-2xl bg-surface-container-lowest shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-outline-variant/30">
              <div className="flex items-start sm:items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary-fixed flex items-center justify-center shrink-0 text-on-secondary-fixed-variant">
                  <span className="material-symbols-outlined text-[22px]">notifications_active</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-on-surface">
                    4 applications haven&apos;t received recruiter updates in 7+ days
                  </span>
                  <span className="text-xs text-on-surface-variant">
                    Polite follow-ups boost response rates by 34% by re-surfacing your candidate profile at the top of ATS inboxes.
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleBatchDraftAll}
                  className="px-3.5 py-2 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs font-bold flex items-center gap-1.5 transition-colors"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
                  <span>Batch Draft All (4)</span>
                </button>
              </div>
            </div>

            {/* Split Screen Workbench (40% List / 60% Studio) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left List (40% -> 5 Cols) */}
              <div className="lg:col-span-5 flex flex-col gap-3">
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs uppercase tracking-wider text-on-surface font-bold">
                    Stagnant Applications (4)
                  </span>
                  <span className="font-mono text-[11px] text-on-surface-variant">Sorted by Inactivity</span>
                </div>

                {followups.map((item) => {
                  const isSelected = item.id === currentItem.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelectApp(item)}
                      className={`cursor-pointer p-4 rounded-xl bg-surface-container-lowest shadow-xs transition-all relative overflow-hidden border ${
                        isSelected
                          ? 'ring-2 ring-primary border-transparent'
                          : 'border-outline-variant/30 hover:bg-surface-container-low/70'
                      }`}
                    >
                      <div
                        className={`absolute left-0 top-0 bottom-0 w-1 ${
                          isSelected ? 'bg-secondary' : 'bg-transparent'
                        }`}
                      ></div>

                      <div className="flex items-start justify-between gap-2 pl-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-on-surface font-bold text-xs tracking-tight">
                            {item.companyInitial}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-bold text-xs text-on-surface truncate">{item.company}</span>
                            <span className="text-[11px] text-on-surface-variant truncate">{item.role}</span>
                          </div>
                        </div>

                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            item.priority === 'High Priority'
                              ? 'bg-error-container text-on-error-container'
                              : item.priority === 'Medium'
                              ? 'bg-secondary-fixed text-on-secondary-fixed-variant'
                              : 'bg-surface-container-high text-on-surface-variant'
                          }`}
                        >
                          {item.priority}
                        </span>
                      </div>

                      <div className="mt-3 pl-2 p-2 rounded-lg bg-surface-container-low flex flex-col gap-1 border border-surface-container">
                        <div className="flex items-center justify-between font-mono text-[11px]">
                          <span className="text-secondary font-bold flex items-center gap-1">
                            <span className="material-symbols-outlined text-[13px]">hourglass_empty</span>
                            {item.daysInactive} days inactive
                          </span>
                          <span className="text-on-surface-variant">Last: {item.lastDate}</span>
                        </div>
                        <span className="text-[11px] text-on-surface-variant line-clamp-1">{item.contextSummary}</span>
                      </div>

                      <div className="mt-2.5 pl-2 flex items-center justify-between text-xs">
                        <span className="text-secondary font-bold flex items-center gap-1 text-[11px]">
                          <span className="material-symbols-outlined text-[14px]">edit_note</span>
                          {item.statusBadge}
                        </span>
                        <span className="material-symbols-outlined text-[16px] text-outline">chevron_right</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Interactive Editor: AI Follow-Up Draft Studio (60% -> 7 Cols) */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-xs flex flex-col gap-4 border border-outline-variant/30">
                  {/* Studio Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-surface-container">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed-variant">
                        <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-on-surface">AI Draft Studio</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-surface-container-high text-on-surface">
                            {currentItem.company}
                          </span>
                        </div>
                        <span className="text-xs text-on-surface-variant">
                          Synthesized from {currentItem.lastDate} interaction notes with {currentItem.recruiterName}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={handleRegenerate}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface text-xs font-semibold transition-colors border border-surface-container"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[16px] text-secondary">refresh</span>
                      <span>Regenerate with Gemini</span>
                    </button>
                  </div>

                  {/* Tone Selector Tabs */}
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[11px] text-on-surface-variant uppercase tracking-wider font-bold">
                      Select Communication Persona &amp; Tone
                    </span>
                    <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-surface-container-low border border-surface-container">
                      <button
                        onClick={() => handleToneChange('polite')}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all ${
                          selectedTone === 'polite'
                            ? 'bg-surface-container-lowest text-on-surface'
                            : 'text-on-surface-variant hover:text-on-surface'
                        }`}
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[15px] text-secondary">verified</span>
                        <span>Polite &amp; Professional</span>
                      </button>

                      <button
                        onClick={() => handleToneChange('value')}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                          selectedTone === 'value'
                            ? 'bg-surface-container-lowest text-on-surface shadow-xs'
                            : 'text-on-surface-variant hover:text-on-surface'
                        }`}
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[15px]">bolt</span>
                        <span>Value-Add / Project Update</span>
                      </button>

                      <button
                        onClick={() => handleToneChange('warm')}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                          selectedTone === 'warm'
                            ? 'bg-surface-container-lowest text-on-surface shadow-xs'
                            : 'text-on-surface-variant hover:text-on-surface'
                        }`}
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[15px]">sentiment_satisfied</span>
                        <span>Warm Check-in</span>
                      </button>
                    </div>
                  </div>

                  {/* Subject Line Input */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] text-on-surface-variant uppercase tracking-wider font-bold">
                        Subject Line
                      </label>
                      <span className="font-mono text-[11px] text-secondary font-bold">
                        Predicted Open Rate: {currentItem.openRatePredict}%
                      </span>
                    </div>
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        value={subjectText}
                        onChange={(e) => setSubjectText(e.target.value)}
                        className="w-full pl-3.5 pr-10 py-2.5 bg-surface-container-low text-on-surface text-xs rounded-xl focus:outline-none focus:bg-surface-container-lowest transition-colors border border-surface-container"
                      />
                      <button
                        onClick={handleShuffleSubject}
                        className="absolute right-2.5 p-1 rounded hover:bg-surface-container text-on-surface-variant"
                        title="Alternate AI Subject"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[16px]">cached</span>
                      </button>
                    </div>
                  </div>

                  {/* Email Body Editor Area */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] text-on-surface-variant uppercase tracking-wider font-bold">
                        Draft Message Context
                      </label>
                      <div className="flex items-center gap-2 font-mono text-[11px] text-on-surface-variant">
                        <span>{wordCount} words</span>
                        <span>•</span>
                        <span>{readTimeSec}s read time</span>
                      </div>
                    </div>
                    <div className="relative rounded-xl bg-surface-container-low p-1 border border-surface-container focus-within:bg-surface-container-lowest transition-colors">
                      <textarea
                        rows={8}
                        value={bodyText}
                        onChange={(e) => setBodyText(e.target.value)}
                        className="w-full p-3 bg-transparent text-on-surface text-xs leading-relaxed resize-none focus:outline-none font-mono"
                      ></textarea>
                    </div>
                  </div>

                  {/* Recruiter Recipient Snapshot & Details */}
                  <div className="p-3 rounded-xl bg-surface-container-low flex flex-wrap items-center justify-between gap-3 border border-surface-container">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-secondary-fixed flex items-center justify-center font-bold text-xs text-on-secondary-fixed-variant">
                        {currentItem.recruiterInitial}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-on-surface">{currentItem.recruiterName}</span>
                        <span className="font-mono text-[11px] text-on-surface-variant">{currentItem.recruiterEmail}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-mono text-[10px]">
                        Email validated
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                    </div>
                  </div>

                  {/* Action Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={handleCopyDraft}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary-fixed hover:bg-secondary-fixed-dim text-on-secondary-fixed-variant font-bold text-xs shadow-xs transition-all active:scale-95"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[16px]">content_copy</span>
                        <span>Copy Draft to Clipboard</span>
                      </button>

                      <button
                        onClick={handleOpenInGmail}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-semibold text-xs transition-all"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[16px]">mail</span>
                        <span>Open in Gmail</span>
                      </button>
                    </div>

                    <button
                      onClick={handleMarkSent}
                      className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface text-xs font-medium transition-colors"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      <span>Mark as Sent (+7d Snooze)</span>
                    </button>
                  </div>

                  {/* Human-in-the-Loop callout */}
                  <div className="p-3 rounded-xl bg-surface-container flex items-start gap-2.5 border border-surface-container-high">
                    <span className="material-symbols-outlined text-[18px] text-secondary shrink-0 mt-0.5">gshield</span>
                    <p className="text-[11px] text-on-surface-variant leading-snug">
                      <strong className="font-bold text-on-surface">Guaranteed Human-in-the-Loop:</strong> JobHunt Autopilot AI never sends automated emails directly from your account without explicit confirmation. Messages are drafted strictly for your manual review and approval.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INTERVIEW PREPARATION & BRIEFS SECTION */}
        {activeMainTab === 'interview' && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-150">
            {/* Section Sub-header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px] text-secondary">psychology</span>
                  <h2 className="text-xl font-bold text-on-surface">Upcoming Interview Dossiers</h2>
                </div>
                <p className="text-xs text-on-surface-variant">
                  Live AI-synthesized intelligence cards tailored from real job specs, interview rounds, and tech stacks.
                </p>
              </div>

              {/* Dossier Switcher Pills */}
              <div className="flex items-center gap-1.5 bg-surface-container-low p-1 rounded-xl">
                {INTERVIEW_DOSSIERS.map(d => (
                  <button
                    key={d.id}
                    onClick={() => setSelectedDossierId(d.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedDossierId === d.id
                        ? 'bg-surface-container-lowest text-on-surface shadow-xs'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    {d.company}
                  </button>
                ))}
              </div>
            </div>

            {/* Dossier Card */}
            <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-xs flex flex-col gap-5 border border-outline-variant/30">
              {/* Header Banner & Stage */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-3 border-b border-surface-container">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-on-surface font-extrabold text-lg shrink-0">
                    {currentDossier.companyInitial}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-lg font-bold text-on-surface">
                        {currentDossier.company} — {currentDossier.role}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-xs font-bold">
                        {currentDossier.roundTitle}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-on-surface-variant">
                      <span className="flex items-center gap-1 text-secondary font-bold">
                        <span className="material-symbols-outlined text-[15px]">calendar_today</span>
                        {currentDossier.timeString} ({currentDossier.duration})
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[15px]">videocam</span>
                        {currentDossier.meetPlatform} (Link in Calendar)
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[15px]">person</span>
                        Interviewer: {currentDossier.interviewer} ({currentDossier.interviewerTitle})
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start lg:self-auto">
                  <button
                    onClick={handleDownloadPdf}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-bold text-xs shadow-xs transition-all"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">download_for_offline</span>
                    <span>Download Full Briefing Sheet</span>
                  </button>
                </div>
              </div>

              {/* Recruiter Notes Parsed Callout Banner */}
              <div className="p-4 rounded-xl bg-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-surface-container">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[20px] text-secondary shrink-0">tips_and_updates</span>
                  <div className="flex flex-col">
                    <span className="text-xs text-on-surface uppercase tracking-wider font-bold">
                      Extracted Recruiter Directive &amp; Round Scope:
                    </span>
                    <p className="text-xs text-on-surface italic mt-0.5 leading-relaxed">
                      {currentDossier.extractedDirective}
                    </p>
                  </div>
                </div>
                <span className="shrink-0 px-2.5 py-1 rounded bg-surface-container font-mono text-[10px] text-on-surface-variant font-semibold">
                  Parsed from recruiter email
                </span>
              </div>

              {/* AI Generated Preparation Pillars (3 High-Density Columns) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-1">
                {/* Column A: Likely Technical Inquiries */}
                <div className="p-4 rounded-2xl bg-surface-container-low flex flex-col gap-3 border border-surface-container">
                  <div className="flex items-center justify-between pb-1 border-b border-surface-container/60">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed-variant">
                        <span className="material-symbols-outlined text-[14px]">code</span>
                      </div>
                      <span className="font-bold text-xs text-on-surface">Likely Technical Inquiries</span>
                    </div>
                    <span className="font-mono text-[10px] text-secondary font-bold">
                      {currentDossier.technicalInquiries.length} Predicted
                    </span>
                  </div>

                  <div className="flex flex-col gap-2 mt-1">
                    {currentDossier.technicalInquiries.map((item, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-surface-container-lowest flex flex-col gap-1 border border-outline-variant/20 shadow-xs">
                        <span className="font-bold text-xs text-on-surface">{item.title}</span>
                        <p className="text-[11px] text-on-surface-variant leading-relaxed">{item.question}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column B: Targeted Behavioral Queries */}
                <div className="p-4 rounded-2xl bg-surface-container-low flex flex-col gap-3 border border-surface-container">
                  <div className="flex items-center justify-between pb-1 border-b border-surface-container/60">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-surface-container-high flex items-center justify-center text-on-surface">
                        <span className="material-symbols-outlined text-[14px]">groups</span>
                      </div>
                      <span className="font-bold text-xs text-on-surface">Targeted Behavioral Queries</span>
                    </div>
                    <span className="font-mono text-[10px] text-on-surface-variant font-semibold">STAR Framework</span>
                  </div>

                  <div className="flex flex-col gap-2 mt-1">
                    {currentDossier.behavioralQueries.map((item, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-surface-container-lowest flex flex-col gap-1 border border-outline-variant/20 shadow-xs">
                        <span className="font-bold text-xs text-on-surface">{item.title}</span>
                        <p className="text-[11px] text-on-surface-variant leading-relaxed">{item.scenario}</p>
                        {item.tip && (
                          <span className="font-mono text-[10px] text-secondary font-bold mt-0.5">{item.tip}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column C: Smart Inquiries for Interviewer */}
                <div className="p-4 rounded-2xl bg-surface-container-low flex flex-col gap-3 border border-surface-container">
                  <div className="flex items-center justify-between pb-1 border-b border-surface-container/60">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed-variant">
                        <span className="material-symbols-outlined text-[14px]">help_outline</span>
                      </div>
                      <span className="font-bold text-xs text-on-surface">Smart Inquiries to Ask</span>
                    </div>
                    <span className="font-mono text-[10px] text-secondary font-bold">High Signal</span>
                  </div>

                  <div className="flex flex-col gap-2 mt-1">
                    {currentDossier.smartQuestions.map((item, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-surface-container-lowest flex flex-col gap-1 border border-outline-variant/20 shadow-xs">
                        <span className="font-bold text-xs text-on-surface leading-snug">{item.question}</span>
                        <p className="text-[11px] text-on-surface-variant leading-relaxed mt-0.5">{item.rationale}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Card Mini-Bar */}
              <div className="p-3.5 rounded-xl bg-surface-container-low flex flex-wrap items-center justify-between gap-3 border border-surface-container">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-on-surface font-bold">Other Ready Dossiers:</span>
                  <div className="flex items-center gap-2">
                    {INTERVIEW_DOSSIERS.filter(d => d.id !== selectedDossierId).map(d => (
                      <button
                        key={d.id}
                        onClick={() => setSelectedDossierId(d.id)}
                        className="px-2.5 py-1 rounded-lg bg-surface-container-lowest text-xs text-on-surface font-semibold hover:border-secondary border border-outline-variant/30 transition-colors"
                      >
                        {d.company} ({d.roundTitle.split(':')[0]})
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleDownloadPdf}
                  className="text-xs text-secondary hover:underline font-bold flex items-center gap-1"
                  type="button"
                >
                  <span>Export Active Dossier</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
