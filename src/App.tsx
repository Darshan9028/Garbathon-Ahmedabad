/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScreenId, AppShell } from './components/AppShell';
import { LandingPage } from './components/LandingPage';
import { DashboardScreen } from './components/DashboardScreen';
import { InboxAnalyzerScreen } from './components/InboxAnalyzerScreen';
import { TrackerScreen } from './components/TrackerScreen';
import { ScamDetectionScreen } from './components/ScamDetectionScreen';
import { FollowUpsScreen } from './components/FollowUpsScreen';
import { AddApplicationModal } from './components/AddApplicationModal';
import { SafeRecruitersModal } from './components/SafeRecruitersModal';
import { RawEmailModal } from './components/RawEmailModal';
import { Toast, ToastData } from './components/Toast';
import {
  INITIAL_EMAILS,
  INITIAL_APPLICATIONS,
  EmailMessage,
  Application
} from './data/mockData';

export default function App() {
  // Navigation: screen 1 is landing page by default as specified in navigation spec
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('landing');
  const [subTab, setSubTab] = useState<string | undefined>(undefined);

  // Core application state
  const [emails, setEmails] = useState<EmailMessage[]>(INITIAL_EMAILS);
  const [applications, setApplications] = useState<Application[]>(INITIAL_APPLICATIONS);

  // Global search query
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSafeListOpen, setIsSafeListOpen] = useState(false);
  const [inspectedMimeEmail, setInspectedMimeEmail] = useState<EmailMessage | null>(null);

  // Toast state
  const [toast, setToast] = useState<ToastData | null>(null);

  const showToast = (message: string, icon?: string, type: ToastData['type'] = 'info') => {
    setToast({
      id: String(Date.now()),
      message,
      icon,
      type
    });
    setTimeout(() => {
      setToast(prev => (prev?.message === message ? null : prev));
    }, 4000);
  };

  const handleNavigate = (screen: ScreenId, nextSubTab?: string) => {
    setCurrentScreen(screen);
    setSubTab(nextSubTab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Actions
  const handleResetCorpus = () => {
    setEmails([]);
    showToast('Corpus cleared. Ready for custom raw text or .eml ingestion.', 'delete_sweep');
  };

  const handleReloadDemo = () => {
    setEmails(INITIAL_EMAILS);
    setApplications(INITIAL_APPLICATIONS);
    showToast('Reloaded 20 demo synthetic emails and 18 applications.', 'sync');
  };

  const handleAddManualApplication = (newApp: Partial<Application>) => {
    const fullApp: Application = {
      id: `app_manual_${Date.now()}`,
      company: newApp.company || 'New Company',
      companyInitial: (newApp.company || 'NC').slice(0, 2).toUpperCase(),
      role: newApp.role || 'Software Engineer',
      department: 'Engineering',
      status: newApp.status || 'applied',
      appliedDate: 'Just now',
      daysAgo: 0,
      location: newApp.location || 'Remote',
      salary: newApp.salary || 'Competitive',
      followUpDue: false,
      recruiterName: newApp.recruiterName || 'Talent Team',
      recruiterEmail: newApp.recruiterEmail || 'recruiting@company.com',
      recruiterInitial: (newApp.recruiterName || 'TT').slice(0, 2).toUpperCase(),
      emailIds: [],
      notes: newApp.notes,
      journey: newApp.journey || [
        {
          title: 'Application Added',
          date: 'Today',
          detail: 'Registered in Autopilot tracker',
          status: 'completed'
        }
      ]
    };

    setApplications(prev => [fullApp, ...prev]);
    showToast(`Added ${fullApp.company} (${fullApp.role}) to tracker!`, 'check_circle');
  };

  const handleUpdateAppStatus = (appId: string, newStatus: Application['status']) => {
    setApplications(prev =>
      prev.map(app => (app.id === appId ? { ...app, status: newStatus } : app))
    );
    showToast(`Updated status to ${newStatus.toUpperCase()}`, 'swap_horiz');
  };

  const handleMarkFalsePositive = (emailId: string) => {
    setEmails(prev =>
      prev.map(e =>
        e.id === emailId
          ? {
              ...e,
              isScam: false,
              scamScore: 4,
              category: 'under_review',
              scamType: undefined
            }
          : e
      )
    );
    showToast('Marked email as false positive and restored to verified inbox.', 'verified');
  };

  const handleAddNewEmail = (newEmail: Partial<EmailMessage>) => {
    const fullEmail: EmailMessage = {
      id: newEmail.id || `msg_${Date.now()}`,
      senderName: newEmail.senderName || 'Recruiter',
      senderEmail: newEmail.senderEmail || 'recruiter@domain.com',
      senderDomain: newEmail.senderDomain || 'domain.com',
      recipientEmail: 'arjun.sharma.dev@gmail.com',
      dateStr: 'Just now',
      subject: newEmail.subject || 'Recruiter Message',
      snippet: newEmail.snippet || '',
      fullBody: newEmail.fullBody || '',
      category: newEmail.category || 'under_review',
      company: newEmail.company || 'Unknown Company',
      targetRole: newEmail.targetRole || 'Software Role',
      salaryText: newEmail.salaryText,
      isScam: Boolean(newEmail.isScam),
      scamScore: newEmail.scamScore,
      scamType: newEmail.scamType,
      scamFlags: newEmail.scamFlags,
      spfStatus: newEmail.spfStatus || 'PASS',
      dkimStatus: newEmail.dkimStatus || 'PASS',
      dmarcStatus: newEmail.dmarcStatus || 'PASS',
      returnPath: newEmail.returnPath || 'relay.net',
      domainAgeDays: newEmail.domainAgeDays || 100,
      read: true,
      starred: false
    };

    setEmails(prev => [fullEmail, ...prev]);
  };

  const handleExportPipeline = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      user: 'Arjun Sharma',
      activeApplications: applications,
      emailsSummaryCount: emails.length
    };
    const jsonStr = JSON.stringify(data, null, 2);
    navigator.clipboard.writeText(jsonStr);
    showToast('Pipeline data exported to clipboard as JSON!', 'file_download');
  };

  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface antialiased">
      {/* Screen 1: Landing Page (Initial Screen) */}
      {currentScreen === 'landing' ? (
        <LandingPage onNavigate={handleNavigate} />
      ) : (
        /* Screens 2-6: Wrapped with AppShell (Sidebar & Topbar) */
        <AppShell
          currentScreen={currentScreen}
          onNavigate={handleNavigate}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          applicationsCount={applications.filter(a => a.status !== 'rejected').length}
          emailsCount={emails.length}
          threatsCount={emails.filter(e => e.isScam).length}
          activeFollowUpsCount={applications.filter(a => a.followUpDue).length}
          onQuickAnalyze={() => handleNavigate('inbox')}
        >
          {/* Screen 2 — Main Dashboard */}
          {currentScreen === 'dashboard' && (
            <DashboardScreen
              onNavigate={handleNavigate}
              applications={applications}
              emails={emails}
              onTriggerAnalyze={() => handleNavigate('inbox')}
              onExport={handleExportPipeline}
            />
          )}

          {/* Screen 3 — Inbox Analyzer */}
          {currentScreen === 'inbox' && (
            <InboxAnalyzerScreen
              onNavigate={handleNavigate}
              emails={emails}
              onResetCorpus={handleResetCorpus}
              onReloadDemo={handleReloadDemo}
              onShowToast={showToast}
              onOpenRawMime={(e) => setInspectedMimeEmail(e)}
              onMarkFalsePositive={handleMarkFalsePositive}
              onAddNewEmail={handleAddNewEmail}
            />
          )}

          {/* Screen 4 — Application Tracker */}
          {currentScreen === 'tracker' && (
            <TrackerScreen
              onNavigate={handleNavigate}
              applications={applications}
              emails={emails}
              onOpenAddModal={() => setIsAddModalOpen(true)}
              onOpenRawEmail={(e) => setInspectedMimeEmail(e)}
              onExport={handleExportPipeline}
              onShowToast={showToast}
              onUpdateAppStatus={handleUpdateAppStatus}
            />
          )}

          {/* Screen 5 — Scam Detection Center */}
          {currentScreen === 'scam' && (
            <ScamDetectionScreen
              onNavigate={handleNavigate}
              onOpenSafeList={() => setIsSafeListOpen(true)}
              onShowToast={showToast}
            />
          )}

          {/* Screen 6 — Follow-ups & Interview Prep */}
          {currentScreen === 'followups' && (
            <FollowUpsScreen
              initialSubTab={subTab}
              onShowToast={showToast}
            />
          )}
        </AppShell>
      )}

      {/* Global Modals */}
      <AddApplicationModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddManualApplication}
      />

      <SafeRecruitersModal
        isOpen={isSafeListOpen}
        onClose={() => setIsSafeListOpen(false)}
      />

      <RawEmailModal
        email={inspectedMimeEmail}
        onClose={() => setInspectedMimeEmail(null)}
      />

      {/* Global Toast */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
