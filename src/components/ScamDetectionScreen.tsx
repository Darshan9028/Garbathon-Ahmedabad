import React, { useState, useMemo } from 'react';
import { ScreenId } from './AppShell';
import { SCAM_DOSSIERS, ScamDossier } from '../data/mockData';

interface ScamDetectionScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenSafeList: () => void;
  onShowToast: (message: string, icon?: string) => void;
}

export const ScamDetectionScreen: React.FC<ScamDetectionScreenProps> = ({
  onNavigate,
  onOpenSafeList,
  onShowToast
}) => {
  const [dossiers, setDossiers] = useState<ScamDossier[]>(SCAM_DOSSIERS);
  const [selectedThreatId, setSelectedThreatId] = useState<string>('scam_apex');
  const [activeFilter, setActiveFilter] = useState<'all' | 'fee' | 'kyc' | 'telegram'>('all');

  const selectedDossier = useMemo(() => {
    return dossiers.find(d => d.id === selectedThreatId) || dossiers[0];
  }, [dossiers, selectedThreatId]);

  const filteredDossiers = useMemo(() => {
    return dossiers.filter(d => {
      if (activeFilter === 'fee') return /fee|deposit|laptop/i.test(d.type + d.headline);
      if (activeFilter === 'kyc') return /kyc|pan|cheque|identity/i.test(d.type + d.headline);
      if (activeFilter === 'telegram') return /telegram|channel/i.test(d.type + d.headline);
      return true;
    });
  }, [dossiers, activeFilter]);

  const handleBlocklist = () => {
    if (!selectedDossier) return;
    setDossiers(prev =>
      prev.map(d => (d.id === selectedDossier.id ? { ...d, status: 'blocked' } : d))
    );
    onShowToast(`Sender domain ${selectedDossier.senderDomain} permanently quarantined & blocklisted.`, 'block');
  };

  const handleDismiss = () => {
    if (!selectedDossier) return;
    setDossiers(prev =>
      prev.map(d => (d.id === selectedDossier.id ? { ...d, status: 'dismissed' } : d))
    );
    onShowToast(`Marked ${selectedDossier.company} as reviewed / false positive.`, 'done_all');
  };

  const handleExportDossier = () => {
    if (!selectedDossier) return;
    const jsonStr = JSON.stringify(selectedDossier, null, 2);
    navigator.clipboard.writeText(jsonStr);
    onShowToast('Forensic threat dossier JSON exported to clipboard!', 'picture_as_pdf');
  };

  return (
    <div className="flex flex-col w-full pb-12">
      {/* Ambient Glow */}
      <div className="relative w-full overflow-hidden px-4 sm:px-6 lg:px-8 pt-6 pb-6">
        <div className="pointer-events-none absolute -top-24 -right-16 w-96 h-96 rounded-full bg-error/5 blur-3xl"></div>
        <div className="pointer-events-none absolute top-40 left-1/3 w-80 h-80 rounded-full bg-secondary-fixed/20 blur-3xl"></div>

        {/* Header & Breadcrumb Context */}
        <div className="flex flex-col gap-1 mb-6 relative z-10">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-error-container text-on-error-container text-xs font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-error animate-pulse"></span>
              Heuristic Shield Active
            </span>
            <span className="font-mono text-xs text-on-surface-variant font-medium">
              Model: Gemini Flash 2.5 Recruitment Guard
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight mt-1">
            Scam &amp; Phishing Detection Center
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant max-w-3xl">
            Heuristic AI engine auditing recruiter authenticity, spoofed domains, upfront fee fraud, and premature identity theft across all inbound recruitment channels.
          </p>
        </div>

        {/* Top Threat Summary Metric Cards (3 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 relative z-10">
          {/* Card 1: High Risk */}
          <div className="p-5 rounded-2xl bg-surface-container-lowest shadow-xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow border border-outline-variant/30">
            <div className="absolute top-0 left-0 right-0 h-1 bg-error"></div>
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-error font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px]">warning</span>
                  High Risk / Predatory Scams
                </span>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-3xl font-extrabold text-on-surface">2</span>
                  <span className="text-xs text-on-surface-variant">Flagged alerts</span>
                </div>
              </div>
              <span className="px-2 py-1 rounded bg-error-container text-on-error-container text-[11px] font-bold">
                Action Advised
              </span>
            </div>
            <div className="mt-4 pt-3 flex items-center justify-between bg-surface-container-low px-3 py-2 rounded-xl border border-surface-container">
              <span className="text-xs text-on-surface font-semibold">Advance Fee &amp; KYC harvesting</span>
              <span className="font-mono text-xs text-error font-bold">Critical Threat</span>
            </div>
          </div>

          {/* Card 2: Needs Review */}
          <div className="p-5 rounded-2xl bg-surface-container-lowest shadow-xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow border border-outline-variant/30">
            <div className="absolute top-0 left-0 right-0 h-1 bg-secondary-container"></div>
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-secondary font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px]">policy</span>
                  Needs Review / Suspicious
                </span>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-3xl font-extrabold text-on-surface">1</span>
                  <span className="text-xs text-on-surface-variant">Flagged channel</span>
                </div>
              </div>
              <span className="px-2 py-1 rounded bg-secondary-fixed text-on-secondary-fixed-variant text-[11px] font-bold">
                Unverified Entity
              </span>
            </div>
            <div className="mt-4 pt-3 flex items-center justify-between bg-surface-container-low px-3 py-2 rounded-xl border border-surface-container">
              <span className="text-xs text-on-surface font-semibold">Disposable TLD (.site) &amp; Telegram reroute</span>
              <span className="font-mono text-xs text-secondary font-bold">Moderate</span>
            </div>
          </div>

          {/* Card 3: Cleared */}
          <div className="p-5 rounded-2xl bg-surface-container-lowest shadow-xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow border border-outline-variant/30">
            <div className="absolute top-0 left-0 right-0 h-1 bg-primary-container"></div>
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-on-surface font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px] text-secondary">verified_user</span>
                  Verified Legitimate
                </span>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-3xl font-extrabold text-on-surface">17</span>
                  <span className="text-xs text-on-surface-variant">Cleared pipelines</span>
                </div>
              </div>
              <span className="px-2 py-1 rounded bg-surface-container-high text-on-surface text-[11px] font-bold">
                100% DKIM/SPF
              </span>
            </div>
            <div className="mt-4 pt-3 flex items-center justify-between bg-surface-container-low px-3 py-2 rounded-xl border border-surface-container">
              <span className="text-xs text-on-surface font-semibold">Direct recruiters from verified ATS</span>
              <span className="font-mono text-xs text-emerald-700 font-bold">Safe</span>
            </div>
          </div>
        </div>

        {/* Main Split-Screen Threat Analysis Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT COLUMN: Flagged Message Queue (40% -> 5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Risk Filter Pills Bar */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-xs whitespace-nowrap transition-colors ${
                  activeFilter === 'all'
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container-low hover:bg-surface-container text-on-surface-variant'
                }`}
                type="button"
              >
                <span>All Alerts</span>
                <span className="px-1.5 py-0.2 rounded-full bg-surface-container-highest text-on-surface text-[10px]">
                  {dossiers.length}
                </span>
              </button>

              <button
                onClick={() => setActiveFilter('fee')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeFilter === 'fee'
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container-low hover:bg-surface-container text-on-surface-variant'
                }`}
                type="button"
              >
                Training/Security Fee (1)
              </button>

              <button
                onClick={() => setActiveFilter('kyc')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeFilter === 'kyc'
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container-low hover:bg-surface-container text-on-surface-variant'
                }`}
                type="button"
              >
                Premature KYC (1)
              </button>

              <button
                onClick={() => setActiveFilter('telegram')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeFilter === 'telegram'
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container-low hover:bg-surface-container text-on-surface-variant'
                }`}
                type="button"
              >
                Telegram (1)
              </button>
            </div>

            {/* Threat Queue List */}
            <div className="flex flex-col gap-3" id="threatCardList">
              {filteredDossiers.map(dossier => {
                const isSelected = selectedDossier?.id === dossier.id;
                const isBlocked = dossier.status === 'blocked';

                return (
                  <div
                    key={dossier.id}
                    onClick={() => setSelectedThreatId(dossier.id)}
                    className={`p-4 rounded-xl bg-surface-container-lowest shadow-xs cursor-pointer transition-all relative overflow-hidden border ${
                      isSelected
                        ? 'ring-2 ring-primary shadow-md border-transparent'
                        : 'border-outline-variant/30 hover:shadow-md'
                    }`}
                  >
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                        dossier.score >= 90 ? 'bg-error' : 'bg-secondary-container'
                      }`}
                    ></div>

                    <div className="flex items-start justify-between gap-2 pl-2">
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-sm text-on-surface truncate">{dossier.company}</span>
                          <span className="material-symbols-outlined text-[16px] text-error">
                            {dossier.score >= 90 ? 'gpp_bad' : 'send_to_mobile'}
                          </span>
                        </div>
                        <span className="font-mono text-xs text-error font-semibold truncate">{dossier.senderEmail}</span>
                      </div>

                      <div className="flex flex-col items-end gap-1">
                        <span className="px-2 py-0.5 rounded bg-error-container text-on-error-container text-[11px] font-bold whitespace-nowrap">
                          SCORE {dossier.score}
                        </span>
                        {isBlocked && (
                          <span className="text-[9px] bg-red-100 text-red-800 font-bold px-1.5 py-0.2 rounded uppercase">
                            Blocked
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="pl-2 mt-2">
                      <p className="text-xs font-bold text-on-surface">{dossier.headline}</p>

                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {dossier.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              idx === 0
                                ? 'bg-error/10 text-error'
                                : 'bg-surface-container-high text-on-surface-variant'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <p className="text-xs text-on-surface-variant mt-2 line-clamp-2 bg-surface-container-low/50 p-2.5 rounded-lg border border-surface-container">
                        &quot;{dossier.quote}&quot;
                      </p>

                      <div className="flex items-center justify-between mt-3 pt-2 text-on-surface-variant font-mono text-[11px] border-t border-surface-container/60">
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">schedule</span>
                          {dossier.receivedTime}
                        </span>
                        <span className="text-error font-bold flex items-center gap-0.5">
                          Inspect Dossier
                          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Safe Recruiter Summary Box */}
            <div className="p-4 rounded-2xl bg-surface-container-low flex items-center justify-between mt-1 border border-surface-container">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-surface-container-lowest flex items-center justify-center text-on-surface shadow-xs">
                  <span className="material-symbols-outlined text-[24px]">verified</span>
                </div>
                <div>
                  <p className="font-bold text-sm text-on-surface">17 Safe Recruiters Verified</p>
                  <p className="text-xs text-on-surface-variant">Google, PhonePe, Uber, Swiggy DKIM passed</p>
                </div>
              </div>
              <button
                onClick={onOpenSafeList}
                className="px-3 py-1.5 rounded-lg bg-surface-container-lowest text-on-surface text-xs font-bold hover:bg-surface-container transition-colors shadow-xs border border-outline-variant/30"
                type="button"
              >
                View Safe List
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Forensic Evidence & Deep Inspection Panel (60% -> 7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {selectedDossier ? (
              <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-5 relative overflow-hidden border border-outline-variant/30">
                {/* Threat Severity Header with Gauge Visual */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-surface-container-low p-4 rounded-xl border border-surface-container">
                  <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
                      <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-surface-container-high"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3.5"
                        ></path>
                        <path
                          className={selectedDossier.score >= 90 ? 'text-error' : 'text-amber-500'}
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="currentColor"
                          strokeDasharray={`${selectedDossier.score}, 100`}
                          strokeLinecap="round"
                          strokeWidth="3.5"
                        ></path>
                      </svg>
                      <div className="absolute flex flex-col items-center">
                        <span className={`font-mono text-sm font-extrabold ${selectedDossier.score >= 90 ? 'text-error' : 'text-amber-600'}`}>
                          {selectedDossier.score}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                            selectedDossier.score >= 90 ? 'bg-error text-on-error' : 'bg-secondary-fixed text-on-secondary-fixed-variant'
                          }`}
                        >
                          {selectedDossier.severity}
                        </span>
                        <span className="font-mono text-[11px] text-on-surface-variant font-medium">
                          Confidence: {selectedDossier.confidence}%
                        </span>
                      </div>
                      <h2 className="text-base font-bold text-on-surface mt-0.5">Forensic Threat Dossier</h2>
                      <p className="text-xs text-on-surface-variant">Entity: {selectedDossier.company} • Target: Arjun Sharma</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      onClick={handleExportDossier}
                      className="px-3 py-1.5 rounded-lg bg-surface-container-high text-on-surface hover:bg-surface-container-highest text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
                      <span>Export Dossier</span>
                    </button>
                  </div>
                </div>

                {/* Audit Trail & Detected Violations */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-error text-[18px]">flag</span>
                      Detected Heuristic Violations ({selectedDossier.violations.length} Flagged)
                    </span>
                    <span className="font-mono text-[11px] text-on-surface-variant">Heuristic Model v3.2</span>
                  </div>

                  {selectedDossier.violations.map((v, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-error-container/30 flex flex-col gap-1.5 border border-error/20"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-error text-[18px]">
                            {idx === 0 ? 'payments' : idx === 1 ? 'dns' : 'history_edu'}
                          </span>
                          <span className="font-bold text-xs text-on-surface">{v.title}</span>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-error text-on-error">
                          {v.severityLabel}
                        </span>
                      </div>
                      <p className="text-xs text-on-surface pl-6 leading-relaxed">{v.description}</p>
                      <div className="pl-6 mt-1 flex items-center gap-2">
                        <span className="font-mono text-[11px] text-error font-semibold bg-surface-container-lowest px-2 py-0.5 rounded">
                          {v.trigger}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cryptographic Header Verification Matrix */}
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px] text-on-surface-variant">security</span>
                    Cryptographic Header Verification
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <div className="p-2.5 rounded-xl bg-error-container/40 flex flex-col border border-error/20">
                      <span className="font-mono text-[10px] text-on-surface-variant font-bold">SPF STATUS</span>
                      <span className="font-mono text-xs font-bold text-error mt-0.5">SOFTFAIL</span>
                      <span className="text-[10px] text-on-surface-variant mt-0.5">IP not in permitted list</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-error-container/40 flex flex-col border border-error/20">
                      <span className="font-mono text-[10px] text-on-surface-variant font-bold">DKIM SIGNATURE</span>
                      <span className="font-mono text-xs font-bold text-error mt-0.5">NONE (MISSING)</span>
                      <span className="text-[10px] text-on-surface-variant mt-0.5">Unsigned message body</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-error-container/40 flex flex-col border border-error/20">
                      <span className="font-mono text-[10px] text-on-surface-variant font-bold">DMARC POLICY</span>
                      <span className="font-mono text-xs font-bold text-error mt-0.5">FAIL</span>
                      <span className="text-[10px] text-on-surface-variant mt-0.5">Alignment failed</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-surface-container-low flex flex-col border border-surface-container">
                      <span className="font-mono text-[10px] text-on-surface-variant font-bold">RETURN-PATH</span>
                      <span className="font-mono text-xs font-bold text-on-surface mt-0.5 truncate">disposable-relay.net</span>
                      <span className="text-[10px] text-on-surface-variant mt-0.5">Known bulletproof host</span>
                    </div>
                  </div>
                </div>

                {/* Original Email Segment with Highlighted Malicious Patterns */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[18px] text-on-surface-variant">mail</span>
                      Message Body Payload (Annotated)
                    </span>
                    <span className="text-[11px] text-error font-semibold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-error"></span>
                      Threat payload isolated
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-surface-container-lowest font-mono text-xs leading-relaxed text-on-surface border border-outline-variant/30 select-text whitespace-pre-wrap">
                    {selectedDossier.annotatedBody}
                  </div>
                </div>

                {/* User Action Bar */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-surface-container">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleBlocklist}
                      className="px-4 py-2.5 rounded-xl bg-error text-on-error font-bold text-xs hover:bg-error/90 transition-all shadow-xs flex items-center justify-center gap-1.5"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[16px]">block</span>
                      <span>Mark Reviewed &amp; Blocklist</span>
                    </button>
                    <button
                      onClick={handleDismiss}
                      className="px-3.5 py-2.5 rounded-xl bg-surface-container-high text-on-surface hover:bg-surface-container-highest text-xs font-semibold transition-colors flex items-center justify-center"
                      type="button"
                    >
                      Dismiss (False Positive)
                    </button>
                  </div>

                  <a
                    href="https://cybercrime.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-secondary text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-surface-container"
                  >
                    <span className="material-symbols-outlined text-[16px]">local_police</span>
                    <span>Report to Cyber Crime (1930)</span>
                  </a>
                </div>

                {/* Disclaimer Banner */}
                <div className="p-3 rounded-xl bg-surface-container-low flex items-start gap-2.5 border border-surface-container">
                  <span className="material-symbols-outlined text-outline text-[18px] mt-0.5 shrink-0">info</span>
                  <p className="text-[11px] text-on-surface-variant leading-snug">
                    <strong>Heuristic Notice:</strong> AI threat scoring provides automated heuristic evidence based on domain reputation, sender spoof signatures, and linguistic extortion patterns. This does not constitute a judicial determination. Always cross-check via MCA Registrar or verified corporate HR desk before financial transfers.
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
