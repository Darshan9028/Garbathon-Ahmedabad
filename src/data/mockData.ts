export interface EmailMessage {
  id: string;
  senderName: string;
  senderEmail: string;
  senderDomain: string;
  recipientEmail: string;
  dateStr: string;
  subject: string;
  snippet: string;
  fullBody: string;
  category: 'interview' | 'offer' | 'followup' | 'scam' | 'under_review' | 'rejection';
  company: string;
  targetRole: string;
  salaryText?: string;
  isScam: boolean;
  scamScore?: number;
  scamType?: string;
  scamFlags?: string[];
  spfStatus: 'PASS' | 'SOFTFAIL' | 'FAIL' | 'NONE';
  dkimStatus: 'PASS' | 'FAIL' | 'NONE (MISSING)';
  dmarcStatus: 'PASS' | 'FAIL' | 'NONE';
  returnPath: string;
  domainAgeDays: number;
  read: boolean;
  starred: boolean;
}

export interface Application {
  id: string;
  company: string;
  companyInitial: string;
  role: string;
  department: string;
  status: 'applied' | 'interviewing' | 'offer' | 'rejected';
  appliedDate: string;
  daysAgo: number;
  location: string;
  salary?: string;
  nextStep?: string;
  nextStepDate?: string;
  stageInfo?: string;
  interviewsCount?: number;
  followUpDue: boolean;
  followUpDaysOverdue?: number;
  recruiterName: string;
  recruiterEmail: string;
  recruiterInitial: string;
  emailIds: string[];
  notes?: string;
  offerDeadline?: string;
  meetLink?: string;
  journey: {
    title: string;
    date: string;
    detail: string;
    status: 'completed' | 'upcoming' | 'current';
    score?: string;
  }[];
}

export interface ScamDossier {
  id: string;
  emailId: string;
  company: string;
  senderEmail: string;
  senderDomain: string;
  score: number;
  severity: 'CRITICAL SEVERITY' | 'HIGH SEVERITY' | 'NEEDS REVIEW';
  confidence: number;
  type: string;
  headline: string;
  quote: string;
  receivedTime: string;
  tags: string[];
  violations: {
    title: string;
    severityLabel: string;
    description: string;
    trigger: string;
  }[];
  headers: {
    spf: string;
    dkim: string;
    dmarc: string;
    returnPath: string;
  };
  annotatedBody: string;
  status: 'active' | 'blocked' | 'dismissed';
}

export interface FollowUpItem {
  id: string;
  appId: string;
  company: string;
  companyInitial: string;
  role: string;
  priority: 'High Priority' | 'Medium' | 'Low Priority';
  daysInactive: number;
  lastDate: string;
  contextSummary: string;
  statusBadge: string;
  recruiterName: string;
  recruiterEmail: string;
  recruiterInitial: string;
  subjects: string[];
  drafts: {
    polite: string;
    value: string;
    warm: string;
  };
  wordCount: number;
  readTimeSec: number;
  openRatePredict: number;
}

export interface InterviewDossier {
  id: string;
  company: string;
  companyInitial: string;
  role: string;
  roundTitle: string;
  timeString: string;
  duration: string;
  interviewer: string;
  interviewerTitle: string;
  meetPlatform: string;
  extractedDirective: string;
  technicalInquiries: {
    title: string;
    question: string;
  }[];
  behavioralQueries: {
    title: string;
    scenario: string;
    tip?: string;
  }[];
  smartQuestions: {
    question: string;
    rationale: string;
  }[];
}

export const INITIAL_EMAILS: EmailMessage[] = [
  {
    id: 'msg_apex_20914',
    senderName: 'Apex Global Tech Careers',
    senderEmail: 'hr@apextech-careers-gmail.com',
    senderDomain: 'apextech-careers-gmail.com',
    recipientEmail: 'arjun.sharma.dev@gmail.com',
    dateStr: 'Today, 10:42 AM',
    subject: 'Congratulations on Selection! (Action Required for Laptop Kit)',
    snippet: 'Candidate must submit ₹2,500 via UPI QR code for high-spec MacBook Pro delivery prior to joining...',
    fullBody: `Dear Arjun Sharma,

We are thrilled to inform you that your resume has been shortlisted and approved by our US hiring manager for the position of Associate Software Engineer - Remote (India Batch) with an annual compensation package of ₹14,50,000 CTC.

Due to high volume hiring, no live technical interview is required. Your profile was assessed directly from GitHub repositories.

⚠️ IMPORTANT ACTION REQUIRED BEFORE TOMORROW 5:00 PM: To dispatch your Apple MacBook M3 Pro company kit and high-speed fiber terminal, please complete the mandatory security deposit of ₹2,500 (100% refundable with first salary cycle) using the official UPI link below.

UPI ID: apextechcorp.onboarding@paytm
Transaction Reference ID must be emailed back to this thread to confirm hardware shipment allocation.

Warm Regards,
Pooja Mehra • Senior Talent Executive
Apex Global Technologies Ltd.`,
    category: 'scam',
    company: 'Apex Global Tech',
    targetRole: 'Assoc. SDE (Remote)',
    salaryText: '₹14,50,000 CTC',
    isScam: true,
    scamScore: 98,
    scamType: 'Advance Fee Fraud',
    scamFlags: [
      'Advance laptop fee deposit requested via UPI QR',
      'Disposable impersonation domain registered 6 days ago',
      'Immediate selection without technical screen'
    ],
    spfStatus: 'SOFTFAIL',
    dkimStatus: 'NONE (MISSING)',
    dmarcStatus: 'FAIL',
    returnPath: 'disposable-relay.net',
    domainAgeDays: 6,
    read: true,
    starred: false
  },
  {
    id: 'msg_zepto_01',
    senderName: 'Zepto Careers',
    senderEmail: 'talent@zeptonow.com',
    senderDomain: 'zeptonow.com',
    recipientEmail: 'arjun.sharma.dev@gmail.com',
    dateStr: 'Today, 08:15 AM',
    subject: 'Invitation: Round 2 System Design Interview - Senior Frontend Engineer',
    snippet: 'Hi Arjun, glad to inform that your Round 1 challenge scored exceptionally high. We would like to schedule your 60-min system design round...',
    fullBody: `Hi Arjun,

Thank you for completing the technical coding screen. The engineering leadership team was thoroughly impressed by your distributed state sync and offline cache answers.

We would like to invite you for Round 2: System Design & Offline Resilience with Siddharth Rao (Principal Staff Engineer).

Scheduled Time: Tomorrow at 2:00 PM IST (45 mins)
Google Meet Link: https://meet.google.com/xyz-zepto-rnd

Key scope of discussion will encompass IndexedDB replication under low network throughput, Web Worker thread offloading, and Core Web Vitals stability for high-frequency quick-commerce checkout.

Best regards,
Pooja V. • Talent Partner, Zepto`,
    category: 'interview',
    company: 'Zepto',
    targetRole: 'Senior Frontend Engineer',
    salaryText: '₹36 LPA',
    isScam: false,
    spfStatus: 'PASS',
    dkimStatus: 'PASS',
    dmarcStatus: 'PASS',
    returnPath: 'mail-out.zeptonow.com',
    domainAgeDays: 1420,
    read: true,
    starred: true
  },
  {
    id: 'msg_swiggy_01',
    senderName: 'Swiggy Recruiting',
    senderEmail: 'offers@swiggy.in',
    senderDomain: 'swiggy.in',
    recipientEmail: 'arjun.sharma.dev@gmail.com',
    dateStr: 'Yesterday, 04:30 PM',
    subject: 'Offer Letter: Senior Software Engineer (Platform Team)',
    snippet: 'Congratulations! Swiggy is pleased to extend an employment offer for Senior Software Engineer with ₹34,00,000 CTC + ESOP grants...',
    fullBody: `Dear Arjun Sharma,

Following your successful final round interview with our VP of Engineering, we are thrilled to offer you the position of Senior Software Engineer (Platform Team) at Bundl Technologies Pvt Ltd (Swiggy).

Compensation Structure:
- Fixed Base: ₹30,00,000 INR
- Performance Bonus: ₹4,00,000 INR
- ESOP Grant: ₹18,00,000 vested over 4 years

This offer remains valid for 7 calendar days (Expiring Nov 15, 2024). Please review the signed appointment docket attached.

Warm regards,
Kavita N. • Talent Acquisition Director`,
    category: 'offer',
    company: 'Swiggy',
    targetRole: 'Senior Software Engineer (Platform)',
    salaryText: '₹34,00,000 CTC',
    isScam: false,
    spfStatus: 'PASS',
    dkimStatus: 'PASS',
    dmarcStatus: 'PASS',
    returnPath: 'delivery.swiggy.in',
    domainAgeDays: 3200,
    read: true,
    starred: true
  },
  {
    id: 'msg_phonepe_01',
    senderName: 'PhonePe Talent',
    senderEmail: 'careers@phonepe.com',
    senderDomain: 'phonepe.com',
    recipientEmail: 'arjun.sharma.dev@gmail.com',
    dateStr: 'Oct 12, 11:20 AM',
    subject: 'Application Update: Engineering Manager Referral',
    snippet: 'We have received your application and recruiter screening notes for Backend Engineer. Our panel reviews submissions on Mondays...',
    fullBody: `Hi Arjun,

Thank you for speaking with Neha Sengupta on October 12th regarding the Backend Engineer role. We discussed your background with high-throughput microservices and distributed transaction pipelines.

Our engineering panel is currently consolidating candidate shortlists. We will get back to you shortly with next steps.

Best regards,
PhonePe Talent Team`,
    category: 'followup',
    company: 'PhonePe',
    targetRole: 'Backend Engineer',
    salaryText: '₹32 LPA',
    isScam: false,
    spfStatus: 'PASS',
    dkimStatus: 'PASS',
    dmarcStatus: 'PASS',
    returnPath: 'relay.phonepe.com',
    domainAgeDays: 2800,
    read: true,
    starred: false
  },
  {
    id: 'msg_global_kyc_02',
    senderName: 'Global Data Services',
    senderEmail: 'recruiter92@rediffmail.com',
    senderDomain: 'rediffmail.com',
    recipientEmail: 'arjun.sharma.dev@gmail.com',
    dateStr: '3 days ago',
    subject: 'Urgent KYC & Bank Verification for Remote Onboarding',
    snippet: 'Please send color scans of PAN, Aadhaar, and blank signed cheque prior to first telephonic interview...',
    fullBody: `Dear Candidate,

Your profile has been shortlisted for Remote Data Associate at Global Data Services.

To proceed with telephonic evaluation, company compliance requires you to reply within 24 hours with:
1. Color scanned copy of PAN Card and Aadhaar Card
2. Cancelled signed blank cheque for salary account creation
3. Two passport size photographs

Failure to provide documents will forfeit your registration.

Regards,
HR Operations Team`,
    category: 'scam',
    company: 'Global Data Services',
    targetRole: 'Remote Data Associate',
    isScam: true,
    scamScore: 92,
    scamType: 'Identity Harvesting & Bank Fraud',
    scamFlags: [
      'Demands sensitive PII (PAN, Aadhaar, cancelled cheque) before any interview',
      'Sent via free webmail provider (rediffmail.com) without corporate domain',
      'Artificial 24h deadline pressure'
    ],
    spfStatus: 'SOFTFAIL',
    dkimStatus: 'NONE (MISSING)',
    dmarcStatus: 'FAIL',
    returnPath: 'mail-bulk.phishnet.org',
    domainAgeDays: 12,
    read: false,
    starred: false
  },
  {
    id: 'msg_innovate_telegram_03',
    senderName: 'InnovateTech Global',
    senderEmail: 'hr@innovatetech-jobs.site',
    senderDomain: 'innovatetech-jobs.site',
    recipientEmail: 'arjun.sharma.dev@gmail.com',
    dateStr: '1 day ago',
    subject: 'Unsolicited Offer Redirecting to Private Telegram Admin',
    snippet: 'Selected for Senior Frontend Lead. Add VIP recruitment officer on Telegram (@recruiter_alex_global) for briefing...',
    fullBody: `Hello Arjun,

We reviewed your public portfolio and immediately selected you for Senior Frontend Lead ($95/hr).

Interviews are conducted via direct chat with our Head of Global Talent on Telegram.
Please search and message: @recruiter_alex_global to receive your employment authorization form and crypto task assessment.

InnovateTech Talent Acquisition Group`,
    category: 'scam',
    company: 'InnovateTech Global',
    targetRole: 'Senior Frontend Lead ($95/hr)',
    isScam: true,
    scamScore: 74,
    scamType: 'Telegram Reroute / Task Scam',
    scamFlags: [
      'Redirects to Telegram handle instead of verified corporate conference software',
      'Disposable TLD (.site) with hidden WHOIS registry',
      'Unsolicited foreign hourly rate anomaly'
    ],
    spfStatus: 'FAIL',
    dkimStatus: 'NONE (MISSING)',
    dmarcStatus: 'FAIL',
    returnPath: 'anonymous-smtp.site',
    domainAgeDays: 4,
    read: false,
    starred: false
  },
  {
    id: 'msg_razorpay_01',
    senderName: 'Razorpay Talent',
    senderEmail: 'tech-hiring@razorpay.com',
    senderDomain: 'razorpay.com',
    recipientEmail: 'arjun.sharma.dev@gmail.com',
    dateStr: '2 days ago',
    subject: 'Take Home Assignment: Payment Gateway Webhook Reconciliation Service',
    snippet: 'Take-home task received: Payment Gateway Webhook Reconciliation Service in Go/TypeScript. Due in 48 hours...',
    fullBody: `Hi Arjun,

Thank you for clearing the technical deep-dive conversation with our engineering team!

For the next stage, we would like you to build a Payment Gateway Webhook Reconciliation Service.
- Spec: Webhook event ingestion under duplicate delivery guarantees
- Requirements: Idempotency keys, SQLite/PostgreSQL persistent store, exponential backoff
- Due Date: Friday 4:30 PM IST

Looking forward to your pull request submission!

Cheers,
Abhinav • Engineering Hiring, Razorpay`,
    category: 'interview',
    company: 'Razorpay',
    targetRole: 'Platform Engineer',
    salaryText: '₹38 LPA',
    isScam: false,
    spfStatus: 'PASS',
    dkimStatus: 'PASS',
    dmarcStatus: 'PASS',
    returnPath: 'smtp.razorpay.com',
    domainAgeDays: 3100,
    read: true,
    starred: true
  },
  {
    id: 'msg_google_01',
    senderName: 'Google India Staffing',
    senderEmail: 'staffing@google.com',
    senderDomain: 'google.com',
    recipientEmail: 'arjun.sharma.dev@gmail.com',
    dateStr: '5 days ago',
    subject: 'Update on your application: Staff Cloud Engineer (Bangalore)',
    snippet: 'Application status updated to "In Review by Hiring Committee" for Bangalore Office (L5 Engineering)...',
    fullBody: `Dear Arjun,

Thank you for your patience while our Hiring Committee gathers candidate debriefs for the Staff Cloud Engineer (L5) position in Bangalore.

Your interview feedback is currently undergoing cross-functional calibration. We will inform you as soon as the executive committee provides a formal update.

Warm regards,
Google India Talent Team`,
    category: 'under_review',
    company: 'Google India',
    targetRole: 'Staff Cloud Engineer (L5)',
    salaryText: '₹42 LPA',
    isScam: false,
    spfStatus: 'PASS',
    dkimStatus: 'PASS',
    dmarcStatus: 'PASS',
    returnPath: 'mail-sor-f65.google.com',
    domainAgeDays: 9800,
    read: true,
    starred: true
  },
  {
    id: 'msg_atlassian_01',
    senderName: 'Atlassian Recruitment',
    senderEmail: 'careers@atlassian.com',
    senderDomain: 'atlassian.com',
    recipientEmail: 'arjun.sharma.dev@gmail.com',
    dateStr: '8 days ago',
    subject: 'Application Acknowledgment: Senior Full Stack Developer (Remote)',
    snippet: 'We have received your application for Senior Full Stack Developer. We review applications on a rolling basis...',
    fullBody: `Hi Arjun,

Thank you for applying to Atlassian! We have received your application for the Senior Full Stack Developer role on the Confluence & Jira Ecosystem team.

Our talent specialists are evaluating your profile against our core technical needs. If your skills match our requirements, we will reach out to arrange an introductory chat.

Best,
Atlassian Talent Acquisition`,
    category: 'followup',
    company: 'Atlassian',
    targetRole: 'Senior Full Stack Developer',
    salaryText: '₹35 LPA',
    isScam: false,
    spfStatus: 'PASS',
    dkimStatus: 'PASS',
    dmarcStatus: 'PASS',
    returnPath: 'mxs.atlassian.com',
    domainAgeDays: 7500,
    read: true,
    starred: false
  },
  {
    id: 'msg_cred_01',
    senderName: 'CRED Engineering',
    senderEmail: 'hiring@cred.club',
    senderDomain: 'cred.club',
    recipientEmail: 'arjun.sharma.dev@gmail.com',
    dateStr: '9 days ago',
    subject: 'Take-home Design System Submission Received',
    snippet: 'Your design system repository for Frontend Architect has been received. Our review team will review this week...',
    fullBody: `Hi Arjun,

We have safely received your take-home repository submission for Frontend Architect.

Our UI architecture squad evaluates submissions on code quality, rendering performance, and accessible tokens. Expect to hear back within 5 business days.

Cheers,
Siddharth • CRED Hiring`,
    category: 'followup',
    company: 'CRED',
    targetRole: 'Frontend Architect',
    salaryText: '₹40 LPA',
    isScam: false,
    spfStatus: 'PASS',
    dkimStatus: 'PASS',
    dmarcStatus: 'PASS',
    returnPath: 'ses.cred.club',
    domainAgeDays: 2200,
    read: true,
    starred: false
  },
  {
    id: 'msg_blinkit_01',
    senderName: 'Blinkit Careers',
    senderEmail: 'careers@blinkit.com',
    senderDomain: 'blinkit.com',
    recipientEmail: 'arjun.sharma.dev@gmail.com',
    dateStr: '3 days ago',
    subject: 'Invitation: Engineering Manager Screen - Staff Engineer',
    snippet: 'We would like to invite you for a 45-minute conversation with our Engineering Director this coming Monday...',
    fullBody: `Hi Arjun,

Your profile caught our attention for the Staff Engineer opening on our Core Warehouse Systems squad.

We would love to set up an introductory chat with our Director of Engineering on Monday at 11:00 AM IST.

Please confirm if this slot suits you.

Best,
Blinkit Talent Partners`,
    category: 'interview',
    company: 'Blinkit',
    targetRole: 'Staff Engineer',
    salaryText: '₹45 LPA',
    isScam: false,
    spfStatus: 'PASS',
    dkimStatus: 'PASS',
    dmarcStatus: 'PASS',
    returnPath: 'mailer.blinkit.com',
    domainAgeDays: 1600,
    read: true,
    starred: false
  },
  {
    id: 'msg_amazon_01',
    senderName: 'Amazon HR Operations',
    senderEmail: 'no-reply@amazon.jobs',
    senderDomain: 'amazon.jobs',
    recipientEmail: 'arjun.sharma.dev@gmail.com',
    dateStr: 'Oct 12',
    subject: 'Update on SDE II Application #AMZ-99120',
    snippet: 'Thank you for your interest in Amazon. Moving forward with other candidates who more closely align...',
    fullBody: `Dear Arjun,

Thank you for investing your time in applying and interviewing for the SDE II position in Bangalore.

At this time, we are moving forward with other candidates who more closely align with the specific technical requirements for this role. We encourage you to keep checking Amazon.jobs for future opportunities.

Sincerely,
Amazon Student & Professional Recruiting`,
    category: 'rejection',
    company: 'Amazon India',
    targetRole: 'SDE II',
    isScam: false,
    spfStatus: 'PASS',
    dkimStatus: 'PASS',
    dmarcStatus: 'PASS',
    returnPath: 'bounces.amazon.jobs',
    domainAgeDays: 8000,
    read: true,
    starred: false
  },
  {
    id: 'msg_flipkart_01',
    senderName: 'Flipkart Recruitment',
    senderEmail: 'talent@flipkart.com',
    senderDomain: 'flipkart.com',
    recipientEmail: 'arjun.sharma.dev@gmail.com',
    dateStr: 'Oct 04',
    subject: 'Application Status: UI Architect (Closed)',
    snippet: 'This requisition has been closed due to internal restructuring. Your resume will remain on file...',
    fullBody: `Dear Candidate,

Thank you for applying for UI Architect at Flipkart. This position has been closed internally. We have retained your profile in our talent pool for future openings.

Best regards,
Flipkart People Team`,
    category: 'rejection',
    company: 'Flipkart',
    targetRole: 'UI Architect',
    isScam: false,
    spfStatus: 'PASS',
    dkimStatus: 'PASS',
    dmarcStatus: 'PASS',
    returnPath: 'mail.flipkart.com',
    domainAgeDays: 5500,
    read: true,
    starred: false
  },
  {
    id: 'msg_microsoft_01',
    senderName: 'Microsoft Talent Team',
    senderEmail: 'jobopportunities@microsoft.com',
    senderDomain: 'microsoft.com',
    recipientEmail: 'arjun.sharma.dev@gmail.com',
    dateStr: '4 days ago',
    subject: 'Your Microsoft Application: SDE II (Azure Core)',
    snippet: 'Your application has been received and synchronized to the Microsoft Career Portal...',
    fullBody: `Hello Arjun,

Thank you for your application for SDE II (Azure Core - Hyderabad). Your application is currently under review by our recruitment team.

You can check status changes anytime via the Microsoft Action Center portal.

Sincerely,
Microsoft Global Talent Acquisition`,
    category: 'under_review',
    company: 'Microsoft',
    targetRole: 'SDE II (Azure Core)',
    salaryText: '₹36 LPA',
    isScam: false,
    spfStatus: 'PASS',
    dkimStatus: 'PASS',
    dmarcStatus: 'PASS',
    returnPath: 'msx.microsoft.com',
    domainAgeDays: 9900,
    read: true,
    starred: false
  },
  {
    id: 'msg_uber_01',
    senderName: 'Uber Careers',
    senderEmail: 'talent@uber.com',
    senderDomain: 'uber.com',
    recipientEmail: 'arjun.sharma.dev@gmail.com',
    dateStr: '6 days ago',
    subject: 'Application Received: Senior Frontend Engineer (Driver Experience)',
    snippet: 'Thank you for your interest in Uber! Our engineering team is currently triaging portfolios...',
    fullBody: `Hi Arjun,

Thanks for applying to Uber. We received your resume and GitHub links for the Senior Frontend Engineer role in Bangalore.

We will review your background and provide an update within 7-10 business days.

Best,
Uber University & Industry Recruiting`,
    category: 'under_review',
    company: 'Uber',
    targetRole: 'Senior Frontend Engineer (Driver Experience)',
    salaryText: '₹44 LPA',
    isScam: false,
    spfStatus: 'PASS',
    dkimStatus: 'PASS',
    dmarcStatus: 'PASS',
    returnPath: 'mx.uber.com',
    domainAgeDays: 4500,
    read: true,
    starred: false
  },
  {
    id: 'msg_zomato_01',
    senderName: 'Zomato Hiring',
    senderEmail: 'jobs@zomato.com',
    senderDomain: 'zomato.com',
    recipientEmail: 'arjun.sharma.dev@gmail.com',
    dateStr: 'Oct 14',
    subject: 'Application Received: Staff Frontend Architect',
    snippet: 'We have received your application for Staff Frontend Architect at Zomato Gurgaon...',
    fullBody: `Hi Arjun,

Thanks for applying to Zomato! Our engineering team is reviewing your profile and will update you soon.

Cheers,
Zomato Talent Team`,
    category: 'under_review',
    company: 'Zomato',
    targetRole: 'Staff Frontend Architect',
    salaryText: '₹38 LPA',
    isScam: false,
    spfStatus: 'PASS',
    dkimStatus: 'PASS',
    dmarcStatus: 'PASS',
    returnPath: 'mail.zomato.com',
    domainAgeDays: 4000,
    read: true,
    starred: false
  },
  {
    id: 'msg_postman_01',
    senderName: 'Postman Careers',
    senderEmail: 'talent@postman.com',
    senderDomain: 'postman.com',
    recipientEmail: 'arjun.sharma.dev@gmail.com',
    dateStr: 'Oct 15',
    subject: 'Application Received: Platform Engineer (API Gateway)',
    snippet: 'Your application has been received for Platform Engineer. Review underway...',
    fullBody: `Hi Arjun,

Thanks for your application to Postman! We are reviewing your experience with distributed API systems.

Best,
Postman People Team`,
    category: 'under_review',
    company: 'Postman',
    targetRole: 'Platform Engineer (API Gateway)',
    salaryText: '₹37 LPA',
    isScam: false,
    spfStatus: 'PASS',
    dkimStatus: 'PASS',
    dmarcStatus: 'PASS',
    returnPath: 'mail.postman.com',
    domainAgeDays: 3500,
    read: true,
    starred: false
  },
  {
    id: 'msg_coinbase_01',
    senderName: 'Coinbase Talent',
    senderEmail: 'recruiting@coinbase.com',
    senderDomain: 'coinbase.com',
    recipientEmail: 'arjun.sharma.dev@gmail.com',
    dateStr: 'Oct 08',
    subject: 'Application Under Review: Senior Full Stack Engineer (Remote)',
    snippet: 'Thank you for your interest in Coinbase. Our team is reviewing submissions...',
    fullBody: `Hello Arjun,

Thank you for your application for Senior Full Stack Engineer. Our team will review your qualifications and contact you if there is a match.

Coinbase Recruiting`,
    category: 'under_review',
    company: 'Coinbase',
    targetRole: 'Senior Full Stack Engineer (Remote)',
    salaryText: '$140,000',
    isScam: false,
    spfStatus: 'PASS',
    dkimStatus: 'PASS',
    dmarcStatus: 'PASS',
    returnPath: 'mail.coinbase.com',
    domainAgeDays: 4100,
    read: true,
    starred: false
  },
  {
    id: 'msg_stripe_01',
    senderName: 'Stripe Recruiting',
    senderEmail: 'talent@stripe.com',
    senderDomain: 'stripe.com',
    recipientEmail: 'arjun.sharma.dev@gmail.com',
    dateStr: 'Oct 05',
    subject: 'Application: Software Engineer, Infrastructure & Reliability',
    snippet: 'We have received your application for Infrastructure & Reliability...',
    fullBody: `Hi Arjun,

Thanks for applying to Stripe! We will review your application and keep you updated.

Best,
Stripe Recruiting`,
    category: 'under_review',
    company: 'Stripe',
    targetRole: 'Software Engineer, Infra',
    salaryText: '₹48 LPA',
    isScam: false,
    spfStatus: 'PASS',
    dkimStatus: 'PASS',
    dmarcStatus: 'PASS',
    returnPath: 'mail.stripe.com',
    domainAgeDays: 5000,
    read: true,
    starred: false
  },
  {
    id: 'msg_intuit_01',
    senderName: 'Intuit Careers',
    senderEmail: 'talent@intuit.com',
    senderDomain: 'intuit.com',
    recipientEmail: 'arjun.sharma.dev@gmail.com',
    dateStr: 'Oct 03',
    subject: 'Thank you for applying: Staff Software Engineer (Bangalore)',
    snippet: 'Your application has been received for Staff Software Engineer...',
    fullBody: `Hello Arjun,

Thank you for your interest in Intuit. We are assessing candidate profiles for the Staff Software Engineer position in Bangalore.

Intuit Talent Acquisition`,
    category: 'under_review',
    company: 'Intuit',
    targetRole: 'Staff Software Engineer',
    salaryText: '₹40 LPA',
    isScam: false,
    spfStatus: 'PASS',
    dkimStatus: 'PASS',
    dmarcStatus: 'PASS',
    returnPath: 'mail.intuit.com',
    domainAgeDays: 7000,
    read: true,
    starred: false
  }
];

export const INITIAL_APPLICATIONS: Application[] = [
  {
    id: 'app_zepto',
    company: 'Zepto',
    companyInitial: 'Z',
    role: 'Senior Frontend Engineer',
    department: 'Quick Commerce Web Engineering',
    status: 'interviewing',
    appliedDate: 'Oct 14',
    daysAgo: 17,
    location: 'Mumbai / Remote',
    salary: '₹36 LPA',
    nextStep: 'Round 2: System Design',
    nextStepDate: 'Tomorrow, 2:00 PM IST',
    stageInfo: 'Stage 2 of 4',
    interviewsCount: 4,
    followUpDue: false,
    recruiterName: 'Pooja V.',
    recruiterEmail: 'talent@zeptonow.com',
    recruiterInitial: 'PV',
    emailIds: ['msg_zepto_01'],
    meetLink: 'https://meet.google.com/xyz-zepto-rnd',
    notes: 'Interviewer Siddharth Rao (Principal Staff). Focus on IndexedDB, service workers, and ultra-low latency grocery cart.',
    journey: [
      {
        title: 'Applied via LinkedIn',
        date: 'Oct 14',
        detail: 'Resume variant: FullStack_v2.pdf',
        status: 'completed'
      },
      {
        title: 'Recruiter Phone Screen',
        date: 'Oct 18',
        detail: 'Completed (15m discussion on notice period)',
        status: 'completed'
      },
      {
        title: 'Round 1: Coding Test',
        date: 'Oct 21',
        detail: 'React Virtualization & memoization',
        score: 'Passed (94%)',
        status: 'completed'
      },
      {
        title: 'Round 2: System Design',
        date: 'Tomorrow, 2:00 PM',
        detail: 'High-concurrency cart orchestration & Core Web Vitals',
        status: 'upcoming'
      }
    ]
  },
  {
    id: 'app_swiggy',
    company: 'Swiggy',
    companyInitial: 'S',
    role: 'Senior Software Engineer (Platform)',
    department: 'Platform Core Services',
    status: 'offer',
    appliedDate: 'Oct 01',
    daysAgo: 23,
    location: 'Bangalore',
    salary: '₹34,00,000',
    nextStep: 'Offer Acceptance Deadline',
    nextStepDate: 'In 4 days (Nov 15, 2024)',
    stageInfo: 'Offer Extended',
    interviewsCount: 3,
    followUpDue: false,
    recruiterName: 'Kavita N.',
    recruiterEmail: 'offers@swiggy.in',
    recruiterInitial: 'KN',
    emailIds: ['msg_swiggy_01'],
    offerDeadline: 'Nov 15, 2024',
    notes: 'Base ₹30 LPA + ₹4 LPA performance + ₹18L ESOPs. Validated by Autopilot.',
    journey: [
      { title: 'Application Submitted', date: 'Oct 01', detail: 'Referral by Rohan V.', status: 'completed' },
      { title: 'Tech Screen & System Design', date: 'Oct 12', detail: 'Distributed queues & caching', status: 'completed' },
      { title: 'VP Architecture Discussion', date: 'Oct 22', detail: 'Culture & scaling trade-offs', status: 'completed' },
      { title: 'Formal Offer Extended', date: 'Yesterday', detail: '₹34,00,000 CTC + Equity', status: 'current' }
    ]
  },
  {
    id: 'app_razorpay',
    company: 'Razorpay',
    companyInitial: 'R',
    role: 'Platform Engineer',
    department: 'Payment Gateway Infrastructure',
    status: 'interviewing',
    appliedDate: 'Oct 16',
    daysAgo: 8,
    location: 'Bangalore',
    salary: '₹38 LPA',
    nextStep: 'Take-Home Evaluation (Kafka Stream)',
    nextStepDate: 'Due Friday 4:30 PM',
    stageInfo: 'Technical Deep-dive',
    interviewsCount: 3,
    followUpDue: false,
    recruiterName: 'Abhinav S.',
    recruiterEmail: 'tech-hiring@razorpay.com',
    recruiterInitial: 'AS',
    emailIds: ['msg_razorpay_01'],
    notes: 'Building Payment Gateway Webhook Reconciliation Service with idempotency.',
    journey: [
      { title: 'Application Submitted', date: 'Oct 16', detail: 'Direct career portal', status: 'completed' },
      { title: 'Technical Screen', date: 'Oct 20', detail: 'Distributed systems & concurrency', status: 'completed' },
      { title: 'Take-Home Assignment', date: 'Due Friday', detail: 'Webhook reconciliation service', status: 'upcoming' }
    ]
  },
  {
    id: 'app_blinkit',
    company: 'Blinkit',
    companyInitial: 'B',
    role: 'Staff Engineer',
    department: 'Core Warehouse Systems',
    status: 'interviewing',
    appliedDate: 'Oct 19',
    daysAgo: 5,
    location: 'Gurugram / Hybrid',
    salary: '₹45 LPA',
    nextStep: 'Hiring Manager Screen',
    nextStepDate: 'Monday 11:00 AM IST',
    stageInfo: 'Round 1 of 4',
    interviewsCount: 4,
    followUpDue: false,
    recruiterName: 'Vikram M.',
    recruiterEmail: 'careers@blinkit.com',
    recruiterInitial: 'VM',
    emailIds: ['msg_blinkit_01'],
    notes: 'Discussion with Director of Engineering on low-latency picking algorithms.',
    journey: [
      { title: 'Direct Sourced', date: 'Oct 19', detail: 'Inbound message from recruiter', status: 'completed' },
      { title: 'Director HM Screen', date: 'Monday 11:00 AM', detail: 'System scale & team lead fit', status: 'upcoming' }
    ]
  },
  {
    id: 'app_google',
    company: 'Google India',
    companyInitial: 'G',
    role: 'Staff Cloud Engineer (L5)',
    department: 'Google Cloud Platform',
    status: 'applied',
    appliedDate: 'Oct 18',
    daysAgo: 6,
    location: 'Bangalore',
    salary: '₹42 LPA',
    nextStep: 'Hiring Committee Review',
    stageInfo: 'In Review by Committee',
    interviewsCount: 4,
    followUpDue: false,
    recruiterName: 'Priya S.',
    recruiterEmail: 'staffing@google.com',
    recruiterInitial: 'PS',
    emailIds: ['msg_google_01'],
    notes: 'Consolidating interview packets across distributed state sync answers.',
    journey: [
      { title: 'Applied', date: 'Oct 18', detail: 'Referral link', status: 'completed' },
      { title: 'Technical Screen', date: 'Oct 22', detail: 'L5 Cloud distributed systems', status: 'completed' },
      { title: 'Hiring Committee Review', date: 'Current', detail: 'Packet submitted for calibration', status: 'current' }
    ]
  },
  {
    id: 'app_atlassian',
    company: 'Atlassian',
    companyInitial: 'A',
    role: 'Senior Full Stack Developer',
    department: 'Confluence & Jira Ecosystem',
    status: 'applied',
    appliedDate: 'Oct 16',
    daysAgo: 8,
    location: 'Remote (India)',
    salary: '₹35 LPA',
    nextStep: 'Recruiter Screening Decision',
    stageInfo: 'Application Acknowledged',
    followUpDue: true,
    followUpDaysOverdue: 8,
    recruiterName: 'Jessica T.',
    recruiterEmail: 'careers@atlassian.com',
    recruiterInitial: 'JT',
    emailIds: ['msg_atlassian_01'],
    notes: '8 days silent since initial acknowledgment. Follow-up recommended.',
    journey: [
      { title: 'Application Submitted', date: 'Oct 16', detail: 'Portal Submission', status: 'completed' },
      { title: 'Talent Evaluation', date: 'Pending', detail: 'Awaiting recruiter triage', status: 'current' }
    ]
  },
  {
    id: 'app_cred',
    company: 'CRED',
    companyInitial: 'CR',
    role: 'Frontend Architect',
    department: 'Design System & Mobile Core',
    status: 'applied',
    appliedDate: 'Oct 15',
    daysAgo: 9,
    location: 'Bangalore',
    salary: '₹40 LPA',
    nextStep: 'Take-home Feedback',
    stageInfo: 'Repository In Review',
    followUpDue: true,
    followUpDaysOverdue: 9,
    recruiterName: 'Siddharth M.',
    recruiterEmail: 'hiring@cred.club',
    recruiterInitial: 'SM',
    emailIds: ['msg_cred_01'],
    notes: 'Take-home repository submitted 9 days ago. Polite status ping drafted.',
    journey: [
      { title: 'Applied', date: 'Oct 15', detail: 'Direct portfolio link', status: 'completed' },
      { title: 'Take-home Delivered', date: 'Oct 20', detail: 'Lighthouse CI 99+ score repo', status: 'completed' },
      { title: 'Reviewer Feedback', date: 'Pending', detail: 'Overdue by 4 business days', status: 'current' }
    ]
  },
  {
    id: 'app_phonepe',
    company: 'PhonePe',
    companyInitial: 'PP',
    role: 'Backend Engineer',
    department: 'Core Payments & UPI',
    status: 'applied',
    appliedDate: 'Oct 12',
    daysAgo: 8,
    location: 'Bangalore',
    salary: '₹32 LPA',
    nextStep: 'Initial Recruiter Screen Feedback',
    stageInfo: 'Recruiter Call Completed',
    followUpDue: true,
    followUpDaysOverdue: 8,
    recruiterName: 'Neha Sengupta',
    recruiterEmail: 'careers@phonepe.com',
    recruiterInitial: 'NS',
    emailIds: ['msg_phonepe_01'],
    notes: 'Discussed transaction throughput on Oct 12. 8 days inactive.',
    journey: [
      { title: 'Applied', date: 'Oct 10', detail: 'Direct career portal', status: 'completed' },
      { title: 'Recruiter Screen', date: 'Oct 12', detail: 'Spoke with Neha Sengupta', status: 'completed' },
      { title: 'Technical Shortlist', date: 'Pending', detail: 'Overdue 8 days', status: 'current' }
    ]
  },
  {
    id: 'app_microsoft',
    company: 'Microsoft',
    companyInitial: 'M',
    role: 'SDE II (Azure Core)',
    department: 'Cloud & AI Platform',
    status: 'applied',
    appliedDate: 'Oct 20',
    daysAgo: 4,
    location: 'Hyderabad',
    salary: '₹36 LPA',
    nextStep: 'Portal Synced / Resume Screening',
    stageInfo: 'Action Center Synced',
    followUpDue: false,
    recruiterName: 'Anil K.',
    recruiterEmail: 'jobopportunities@microsoft.com',
    recruiterInitial: 'AK',
    emailIds: ['msg_microsoft_01'],
    notes: 'Under review by Azure recruitment squad.',
    journey: [
      { title: 'Applied', date: 'Oct 20', detail: 'Microsoft Careers', status: 'completed' }
    ]
  },
  {
    id: 'app_uber',
    company: 'Uber',
    companyInitial: 'U',
    role: 'Senior Frontend Engineer',
    department: 'Driver Experience',
    status: 'applied',
    appliedDate: 'Oct 18',
    daysAgo: 6,
    location: 'Bangalore',
    salary: '₹44 LPA',
    nextStep: 'Initial Profile Triage',
    stageInfo: 'Under Review',
    followUpDue: false,
    recruiterName: 'Uber University & Industry Team',
    recruiterEmail: 'talent@uber.com',
    recruiterInitial: 'UB',
    emailIds: ['msg_uber_01'],
    notes: 'Awaiting initial screen call.',
    journey: [
      { title: 'Applied', date: 'Oct 18', detail: 'Online application', status: 'completed' }
    ]
  },
  {
    id: 'app_zomato',
    company: 'Zomato',
    companyInitial: 'ZO',
    role: 'Staff Frontend Architect',
    department: 'Consumer Apps',
    status: 'applied',
    appliedDate: 'Oct 14',
    daysAgo: 10,
    location: 'Gurugram',
    salary: '₹38 LPA',
    nextStep: 'Awaiting Response',
    stageInfo: 'Profile In Review',
    followUpDue: false,
    recruiterName: 'Zomato Hiring',
    recruiterEmail: 'jobs@zomato.com',
    recruiterInitial: 'ZH',
    emailIds: ['msg_zomato_01'],
    notes: 'Warm check-in suggested in 2 days.',
    journey: [
      { title: 'Applied', date: 'Oct 14', detail: 'Career portal', status: 'completed' }
    ]
  },
  {
    id: 'app_postman',
    company: 'Postman',
    companyInitial: 'PO',
    role: 'Platform Engineer (API Gateway)',
    department: 'Cloud Core',
    status: 'applied',
    appliedDate: 'Oct 15',
    daysAgo: 9,
    location: 'Bangalore / Remote',
    salary: '₹37 LPA',
    nextStep: 'Screening in Progress',
    stageInfo: 'Under Review',
    followUpDue: false,
    recruiterName: 'Postman People Team',
    recruiterEmail: 'talent@postman.com',
    recruiterInitial: 'PP',
    emailIds: ['msg_postman_01'],
    journey: [{ title: 'Applied', date: 'Oct 15', detail: 'Postman portal', status: 'completed' }]
  },
  {
    id: 'app_amazon',
    company: 'Amazon India',
    companyInitial: 'AM',
    role: 'SDE II',
    department: 'AWS Messaging Infrastructure',
    status: 'rejected',
    appliedDate: 'Oct 02',
    daysAgo: 22,
    location: 'Bangalore',
    stageInfo: 'Rejection Parsed',
    followUpDue: false,
    recruiterName: 'Amazon Student & Professional Recruiting',
    recruiterEmail: 'no-reply@amazon.jobs',
    recruiterInitial: 'AM',
    emailIds: ['msg_amazon_01'],
    notes: 'Parsed automatic rejection email on Oct 12.',
    journey: [
      { title: 'Applied', date: 'Oct 02', detail: 'Amazon.jobs', status: 'completed' },
      { title: 'Rejection Notice', date: 'Oct 12', detail: 'Moving forward with other candidates', status: 'completed' }
    ]
  },
  {
    id: 'app_flipkart',
    company: 'Flipkart',
    companyInitial: 'FK',
    role: 'UI Architect',
    department: 'Supply Chain Frontend',
    status: 'rejected',
    appliedDate: 'Sep 28',
    daysAgo: 26,
    location: 'Bangalore',
    stageInfo: 'Closed',
    followUpDue: false,
    recruiterName: 'Flipkart People Team',
    recruiterEmail: 'talent@flipkart.com',
    recruiterInitial: 'FK',
    emailIds: ['msg_flipkart_01'],
    notes: 'Requisition closed due to internal restructuring.',
    journey: [
      { title: 'Applied', date: 'Sep 28', detail: 'Careers', status: 'completed' },
      { title: 'Requisition Closed', date: 'Oct 04', detail: 'ATS notice closed', status: 'completed' }
    ]
  }
];

export const SCAM_DOSSIERS: ScamDossier[] = [
  {
    id: 'scam_apex',
    emailId: 'msg_apex_20914',
    company: 'Apex Global Tech',
    senderEmail: 'hr@apextech-careers-gmail.com',
    senderDomain: 'apextech-careers-gmail.com',
    score: 98,
    severity: 'CRITICAL SEVERITY',
    confidence: 99.4,
    type: 'Advance Fee Fraud',
    headline: 'Mandatory Laptop Security Deposit Demand (₹2,500)',
    quote: 'Candidate must submit ₹2,500 via UPI QR code for high-spec MacBook Pro delivery prior to joining...',
    receivedTime: 'Received 2h ago',
    tags: ['HIGH RISK: Advance Fee Fraud', 'Lookalike Domain (6d old)'],
    violations: [
      {
        title: 'Violation 1: Monetary Demand Prior to Employment',
        severityLabel: 'High Severity',
        description: 'Legitimate employers in India never charge refundable equipment deposits, aptitude test evaluation charges, or MacBook logistics insurance per ILO Convention No. 181 & Ministry of Labour & Employment guidelines.',
        trigger: 'Trigger: "refundable ₹2,500 security deposit"'
      },
      {
        title: 'Violation 2: Domain Impersonation & Zero Corporate MX',
        severityLabel: 'Domain Spoof',
        description: 'The domain apextech-careers-gmail.com was registered 6 days ago via Namecheap Privacy. It lacks corporate MX infrastructure and has no corresponding Ministry of Corporate Affairs (MCA) CIN record.',
        trigger: 'Domain Age: 6 Days • WHOIS: Redacted'
      },
      {
        title: 'Violation 3: No Prior Application or Interview Trace',
        severityLabel: 'Unsolicited',
        description: 'Cross-referenced candidate mailbox and application tracking ledger: user has zero submitted applications to "Apex Global Tech". Automated mass blast sent via open relay with mail merge variables.',
        trigger: 'Zero application records in local pipeline'
      }
    ],
    headers: {
      spf: 'SOFTFAIL (IP not in permitted list)',
      dkim: 'NONE (MISSING) (Unsigned message body)',
      dmarc: 'FAIL (Alignment failed)',
      returnPath: 'disposable-relay.net (Known bulletproof host)'
    },
    annotatedBody: `From: Apex Careers HR <hr@apextech-careers-gmail.com>
Subject: Immediate Employment Offer - Senior Architect • Kit Dispatch

Dear Arjun Sharma,

We are thrilled to confirm your immediate selection for Senior Full-Stack Specialist at Apex Global Tech with monthly compensation of ₹1,85,000 INR.

⚠️ "Candidate must submit a fully refundable ₹2,500 security deposit via official HR UPI QR Code before 5:00 PM today to initiate dispatched shipment of pre-configured Apple MacBook Pro M3 and security hardware token."

Payment receipt must be shared over WhatsApp (+91-98210-XXXXX) for immediate courier docket allotment.`,
    status: 'active'
  },
  {
    id: 'scam_global_kyc',
    emailId: 'msg_global_kyc_02',
    company: 'Global Data Services',
    senderEmail: 'recruiter92@rediffmail.com',
    senderDomain: 'rediffmail.com',
    score: 92,
    severity: 'HIGH SEVERITY',
    confidence: 96.8,
    type: 'Identity Harvester',
    headline: 'Premature PAN Card & Cancelled Cheque Request',
    quote: 'Please send color scans of PAN, Aadhaar, and blank signed cheque prior to first telephonic interview...',
    receivedTime: 'Received 5h ago',
    tags: ['HIGH RISK: Identity Harvester', 'Free Webmail Provider'],
    violations: [
      {
        title: 'Violation 1: Premature Banking & Identity Harvesting',
        severityLabel: 'Critical Threat',
        description: 'Requesting blank cancelled cheques and high-resolution government IDs before initial screening is an established prelude to identity theft, unauthorized loan origination, and SIM-swap vector exploitation.',
        trigger: 'Trigger: "blank signed cheque for salary account creation"'
      },
      {
        title: 'Violation 2: Free Public Mail Domain for Corporate Recruitment',
        severityLabel: 'Suspicious Provider',
        description: 'Originating from rediffmail.com. Enterprise organizations never dispatch onboarding requisitions via free webmail relays without enterprise MX routing.',
        trigger: 'Public mail provider: rediffmail.com'
      }
    ],
    headers: {
      spf: 'SOFTFAIL',
      dkim: 'NONE (MISSING)',
      dmarc: 'FAIL',
      returnPath: 'mail-bulk.phishnet.org'
    },
    annotatedBody: `From: Global Data Services <recruiter92@rediffmail.com>
Subject: Urgent KYC & Bank Verification for Remote Onboarding

Dear Candidate,

To proceed with telephonic evaluation, company compliance requires you to reply within 24 hours with:
1. Color scanned copy of PAN Card and Aadhaar Card
2. Cancelled signed blank cheque for salary account creation

Failure to provide documents will forfeit your registration.`,
    status: 'active'
  },
  {
    id: 'scam_innovatetech',
    emailId: 'msg_innovate_telegram_03',
    company: 'InnovateTech Global',
    senderEmail: 'hr@innovatetech-jobs.site',
    senderDomain: 'innovatetech-jobs.site',
    score: 74,
    severity: 'NEEDS REVIEW',
    confidence: 88.5,
    type: 'Telegram Reroute',
    headline: 'Unsolicited Offer Redirecting to Private Telegram Admin',
    quote: 'Selected for Senior Frontend Lead. Add VIP recruitment officer on Telegram (@recruiter_alex_global) for briefing...',
    receivedTime: 'Received 1d ago',
    tags: ['NEEDS REVIEW: Suspicious Channel', 'Disposable TLD (.site)'],
    violations: [
      {
        title: 'Violation 1: Unverified Telegram Communication Channel',
        severityLabel: 'Channel Anomaly',
        description: 'Recruiters requesting candidates to transition off email to Telegram or WhatsApp handles evade enterprise corporate audit logs and security monitoring.',
        trigger: 'Trigger: "@recruiter_alex_global on Telegram"'
      },
      {
        title: 'Violation 2: Cheap Disposable TLD Registration',
        severityLabel: 'Domain Age 4 Days',
        description: 'Domain registered on .site TLD 4 days ago with anonymous registrant information.',
        trigger: 'Domain: innovatetech-jobs.site'
      }
    ],
    headers: {
      spf: 'FAIL',
      dkim: 'NONE (MISSING)',
      dmarc: 'FAIL',
      returnPath: 'anonymous-smtp.site'
    },
    annotatedBody: `From: InnovateTech Global <hr@innovatetech-jobs.site>
Subject: Unsolicited Offer Redirecting to Private Telegram Admin

Hello Arjun,

We reviewed your public portfolio and immediately selected you for Senior Frontend Lead ($95/hr).

Interviews are conducted via direct chat with our Head of Global Talent on Telegram.
Please search and message: @recruiter_alex_global to receive your employment authorization form.`,
    status: 'active'
  }
];

export const FOLLOW_UP_ITEMS: FollowUpItem[] = [
  {
    id: 'fu_phonepe',
    appId: 'app_phonepe',
    company: 'PhonePe',
    companyInitial: 'PP',
    role: 'Backend Engineer',
    priority: 'High Priority',
    daysInactive: 8,
    lastDate: 'Oct 12',
    contextSummary: 'Post-recruiter screen with Neha • Distributed transactions focus',
    statusBadge: 'Draft Ready to Review',
    recruiterName: 'Neha Sengupta',
    recruiterEmail: 'neha.s@phonepe.talent.in',
    recruiterInitial: 'NS',
    subjects: [
      'Re: PhonePe Backend Engineer Application — Following up on our initial conversation (Arjun Sharma)',
      'Following up on PhonePe Backend Engineer — Next Steps (Arjun Sharma)',
      'Quick update & check-in: PhonePe Engineering Role'
    ],
    drafts: {
      polite: `Dear Neha,

I hope you're having a productive week.

I'm checking in regarding our conversation on October 12th for the Backend Engineer role at PhonePe. I remain deeply enthusiastic about the team's work scaling distributed transaction pipelines on high-throughput microservices.

Please let me know if there are any additional code samples, architectural case studies, or portfolio references I can provide to support the evaluation process.

Looking forward to hearing from you.

Warm regards,
Arjun Sharma`,
      value: `Dear Neha,

Hope your week is off to a great start.

Following our conversation on October 12th around PhonePe's transaction throughput, I actually published an architectural breakdown on idempotency key caching in distributed Kafka queues that addresses the exact scale bottlenecks we touched upon. I've attached the quick brief here.

Would love to know if the team has had a moment to review my profile for the Backend Engineer position.

Best,
Arjun Sharma`,
      warm: `Hi Neha,

Just dropping a quick friendly note to check in! I thoroughly enjoyed our conversation on October 12th discussing PhonePe's engineering culture and high-throughput systems.

No urgency—just wanted to reaffirm my strong excitement about the role and see how next steps are looking.

Best,
Arjun`
    },
    wordCount: 108,
    readTimeSec: 35,
    openRatePredict: 82
  },
  {
    id: 'fu_atlassian',
    appId: 'app_atlassian',
    company: 'Atlassian',
    companyInitial: 'AT',
    role: 'Senior Full Stack Developer',
    priority: 'Medium',
    daysInactive: 8,
    lastDate: 'Oct 12',
    contextSummary: 'Direct Portal Submission • Confluence & Jira Ecosystem team',
    statusBadge: 'No follow-up sent yet',
    recruiterName: 'Jessica T.',
    recruiterEmail: 'careers@atlassian.com',
    recruiterInitial: 'JT',
    subjects: [
      'Following up: Senior Full Stack Developer Application — Arjun Sharma',
      'Checking in: Atlassian Senior Full Stack Role — Arjun Sharma',
      'Re: Application for Confluence & Jira Ecosystem Team'
    ],
    drafts: {
      polite: `Hi Jessica & Team,

I wanted to briefly follow up on my application submitted on October 12th for the Senior Full Stack Developer position at Atlassian.

Given my extensive background with distributed React architectures and high-density Jira integrations, I am very eager to contribute to your core collaboration products.

Thank you for your time and consideration.

Best regards,
Arjun Sharma`,
      value: `Hi Jessica,

Since submitting my application for the Senior Full Stack role on Oct 12th, I took the liberty of benchmarking Atlassian's Forge app framework for asynchronous state hydrate rates.

Happy to share the mini-repo if your engineering hiring squad is interested!

Best,
Arjun Sharma`,
      warm: `Hi Jessica,

Hope you are having a wonderful week! Checking in on my application for the Senior Full Stack position. Really looking forward to the possibility of collaborating with Atlassian.

Warmly,
Arjun`
    },
    wordCount: 95,
    readTimeSec: 30,
    openRatePredict: 78
  },
  {
    id: 'fu_cred',
    appId: 'app_cred',
    company: 'CRED',
    companyInitial: 'CR',
    role: 'Frontend Architect',
    priority: 'High Priority',
    daysInactive: 9,
    lastDate: 'Oct 11',
    contextSummary: 'Take-home design system repo submitted • Awaiting reviewer evaluation',
    statusBadge: 'Suggested: Send Today',
    recruiterName: 'Siddharth M.',
    recruiterEmail: 'siddharth.m@cred.club',
    recruiterInitial: 'SM',
    subjects: [
      'CRED Frontend Architect — Take-Home Assignment Submission Status (Arjun Sharma)',
      'Re: Take-Home Design System Review — Arjun Sharma',
      'Checking in on CRED Frontend Architect Evaluation'
    ],
    drafts: {
      polite: `Dear Siddharth,

I hope all is well with you.

I wanted to check in regarding the design system take-home repository I delivered on October 11th for the Frontend Architect role at CRED.

I am eager to hear any engineering feedback or dive deeper into the micro-animation and state cache choices during our next discussion.

Best regards,
Arjun Sharma`,
      value: `Hi Siddharth,

Following my take-home design system submission on Oct 11, I added an automated Lighthouse CI benchmark showing 99+ Core Web Vitals on the mobile drawer components.

Looking forward to reviewing it together.

Best,
Arjun`,
      warm: `Hi Siddharth,

Hope you're having a smooth week! Wanted to ping you quickly to ensure my repo link arrived safely and see if any questions arose.

Cheers,
Arjun`
    },
    wordCount: 102,
    readTimeSec: 32,
    openRatePredict: 85
  },
  {
    id: 'fu_swiggy',
    appId: 'app_swiggy',
    company: 'Swiggy',
    companyInitial: 'SW',
    role: 'Engineering Manager Referral',
    priority: 'Low Priority',
    daysInactive: 11,
    lastDate: 'Oct 09',
    contextSummary: 'Warm referral by Rohan V. • Instamart Cart team',
    statusBadge: 'Followed up 10 days ago',
    recruiterName: 'Rohan V.',
    recruiterEmail: 'rohan.v@swiggy.in',
    recruiterInitial: 'RV',
    subjects: [
      'Check-in: Swiggy Engineering Manager Referral — Arjun Sharma',
      'Re: Instamart Cart Team Referral Follow-up (Arjun Sharma)',
      'Quick hello & update regarding Swiggy role'
    ],
    drafts: {
      polite: `Hi Rohan & Talent Partner,

I hope you are doing well.

Following up on our warm referral touchpoint on October 9th regarding the engineering team at Swiggy. I wanted to see if there are any updates regarding portfolio reviews or upcoming screen slots.

Thank you again for your assistance.

Best,
Arjun Sharma`,
      value: `Hi Rohan,

Hope you're doing great. Since we spoke on Oct 9, I reviewed Instamart's cart rehydration telemetry during surge hours and put together a few optimization hypotheses.

Happy to walk through them with the hiring manager whenever convenient!

Best,
Arjun`,
      warm: `Hi Rohan,

Hope things are going great with the new launch! Just checking in to see if any updates came down the pipeline regarding the team referral.

Thanks,
Arjun`
    },
    wordCount: 88,
    readTimeSec: 28,
    openRatePredict: 75
  }
];

export const INTERVIEW_DOSSIERS: InterviewDossier[] = [
  {
    id: 'dossier_zepto',
    company: 'Zepto',
    companyInitial: 'ZP',
    role: 'Senior Frontend Engineer',
    roundTitle: 'Round 2: Architecture Deep Dive',
    timeString: 'Tomorrow, 2:00 PM IST',
    duration: '45 mins',
    interviewer: 'Siddharth Rao',
    interviewerTitle: 'Principal Staff Engineer',
    meetPlatform: 'Google Meet',
    extractedDirective: '“Focus heavily on IndexedDB caching, Service Worker lifecycle, and Core Web Vitals optimization under ultra-low latency constraints (sub-10 minute grocery cart).”',
    technicalInquiries: [
      {
        title: '1. Cache-First vs. Stale-While-Revalidate',
        question: 'How would you architect offline product catalog browsing when 40,000 SKUs are locally synced in IndexedDB?'
      },
      {
        title: '2. Service Worker Sync Queues',
        question: 'Designing fallback transaction replay when a user clicks ‘Place Order’ entering an elevator dead zone.'
      },
      {
        title: '3. INP & Layout Shift in Flash Carts',
        question: 'Preventing Cumulative Layout Shift (CLS) during rapid real-time flash-sale price surges and ticker updates.'
      },
      {
        title: '4. Memory Leaks in Single Page Checkout',
        question: 'Profiling micro-frontend DOM detachment under sustained high-frequency WebSockets telemetry.'
      }
    ],
    behavioralQueries: [
      {
        title: '1. Critical Production Outage',
        scenario: 'Describe handling a catastrophic checkout UI breakage during peak festive surge with zero rollbacks allowed.',
        tip: 'Tip: Cite PhonePe scale stats'
      },
      {
        title: '2. Technical Debt vs Feature Ship',
        scenario: 'How do you push back on product managers requesting an un-architected quick feature that degrades client-side memory?'
      },
      {
        title: '3. Cross-functional Mentorship',
        scenario: 'Guiding 3 junior engineers to adopt strict TypeScript interfaces without slowing sprint velocity.'
      }
    ],
    smartQuestions: [
      {
        question: '“How does Zepto manage state drift between the driver geo-pings and consumer cart?”',
        rationale: 'Demonstrates acute comprehension of ultra-fast grocery delivery real-time constraints.'
      },
      {
        question: '“What is the current build artifact budget for web-storefront bundle sizes?”',
        rationale: 'Signals immediate ownership of Core Web Vitals and low-tier Android network speeds in tier-2 cities.'
      },
      {
        question: '“What does success look like for this role in the first 90 days?”',
        rationale: 'Reveals organizational readiness and internal telemetry maturity of the immediate squad.'
      }
    ]
  },
  {
    id: 'dossier_razorpay',
    company: 'Razorpay',
    companyInitial: 'RZ',
    role: 'Platform Engineer',
    roundTitle: 'Round 3: Distributed System Design & Idempotency',
    timeString: 'Friday, 4:30 PM IST',
    duration: '60 mins',
    interviewer: 'Abhinav Sharma',
    interviewerTitle: 'Director of Core Platform',
    meetPlatform: 'Zoom',
    extractedDirective: '“Deep dive into payment webhook idempotency, circuit breakers, distributed transaction state machines, and zero-loss message queues under payment gateway surges.”',
    technicalInquiries: [
      {
        title: '1. Webhook Deduplication & Idempotency Keys',
        question: 'How do you structure an in-memory Redis cluster backed by PostgreSQL to guarantee exactly-once payment processing when banks dispatch duplicate callbacks?'
      },
      {
        title: '2. Outbox Pattern for Asynchronous Events',
        question: 'Explain designing an transactional outbox pattern to eliminate dual-write hazards between merchant ledger DBs and Kafka topics.'
      },
      {
        title: '3. Circuit Breaking on Bank Latency Spikes',
        question: 'How do you configure dynamic sliding-window rate limiters to quarantine degraded partner bank APIs without dropping customer checkout requests?'
      }
    ],
    behavioralQueries: [
      {
        title: '1. Disagree and Commit on Tech Stack Choice',
        scenario: 'Describe a scenario where you strongly opposed an architectural decision (e.g. gRPC vs REST) but committed to executing it with high excellence.'
      },
      {
        title: '2. Post-Mortem Leadership',
        scenario: 'Walking through a blameless post-mortem where an undetected edge case dropped payments for 22 minutes.'
      }
    ],
    smartQuestions: [
      {
        question: '“How does Razorpay balance ledger write latency against multi-region active-active read replication?”',
        rationale: 'Shows deep distributed systems fluency directly relevant to high-value financial transactions.'
      },
      {
        question: '“What is the automated canary deployment strategy for high-risk core billing pipelines?”',
        rationale: 'Highlights operational maturity and production safety focus.'
      }
    ]
  },
  {
    id: 'dossier_blinkit',
    company: 'Blinkit',
    companyInitial: 'BL',
    role: 'Staff Engineer',
    roundTitle: 'Director HM Screen & Leadership Bar Raiser',
    timeString: 'Monday, 11:00 AM IST',
    duration: '45 mins',
    interviewer: 'Vikram Mehrotra',
    interviewerTitle: 'Director of Engineering',
    meetPlatform: 'Google Meet',
    extractedDirective: '“Focus on system scaling across dark-store picking algorithms, multi-tenant inventory locks, and cross-functional engineering management leadership.”',
    technicalInquiries: [
      {
        title: '1. Inventory Race Conditions in Flash Deliveries',
        question: 'When 20 users concurrently add the last carton of milk, how do you handle distributed reservation locks with sub-second expiry?'
      },
      {
        title: '2. Dark Store Picker Path Optimization',
        question: 'What heuristic algorithmic approaches would you propose to minimize warehouse picking traversal time for 15-item baskets?'
      }
    ],
    behavioralQueries: [
      {
        title: '1. Raising the Engineering Bar',
        scenario: 'How have you established code review guidelines, automated linting, and CI test thresholds in a fast-moving startup environment?'
      }
    ],
    smartQuestions: [
      {
        question: '“What is the most technically complex scaling bottleneck Blinkit solved during this past festive season?”',
        rationale: 'Opens up insightful architectural storytelling from the engineering director.'
      }
    ]
  }
];

export const SAFE_RECRUITERS_LIST = [
  { company: 'Google India', domain: 'google.com', dkimStatus: 'Verified 100%', lastContact: '5d ago' },
  { company: 'Zepto', domain: 'zeptonow.com', dkimStatus: 'Verified 100%', lastContact: 'Today' },
  { company: 'Swiggy', domain: 'swiggy.in', dkimStatus: 'Verified 100%', lastContact: 'Yesterday' },
  { company: 'Razorpay', domain: 'razorpay.com', dkimStatus: 'Verified 100%', lastContact: '2d ago' },
  { company: 'PhonePe', domain: 'phonepe.com', dkimStatus: 'Verified 100%', lastContact: 'Oct 12' },
  { company: 'Atlassian', domain: 'atlassian.com', dkimStatus: 'Verified 100%', lastContact: 'Oct 12' },
  { company: 'CRED', domain: 'cred.club', dkimStatus: 'Verified 100%', lastContact: 'Oct 11' },
  { company: 'Blinkit', domain: 'blinkit.com', dkimStatus: 'Verified 100%', lastContact: 'Oct 19' },
  { company: 'Microsoft', domain: 'microsoft.com', dkimStatus: 'Verified 100%', lastContact: '4d ago' },
  { company: 'Uber', domain: 'uber.com', dkimStatus: 'Verified 100%', lastContact: '6d ago' },
  { company: 'Zomato', domain: 'zomato.com', dkimStatus: 'Verified 100%', lastContact: 'Oct 14' },
  { company: 'Postman', domain: 'postman.com', dkimStatus: 'Verified 100%', lastContact: 'Oct 15' },
  { company: 'Amazon India', domain: 'amazon.jobs', dkimStatus: 'Verified 100%', lastContact: 'Oct 12' },
  { company: 'Flipkart', domain: 'flipkart.com', dkimStatus: 'Verified 100%', lastContact: 'Oct 04' },
  { company: 'Coinbase', domain: 'coinbase.com', dkimStatus: 'Verified 100%', lastContact: 'Oct 08' },
  { company: 'Stripe', domain: 'stripe.com', dkimStatus: 'Verified 100%', lastContact: 'Oct 05' },
  { company: 'Intuit', domain: 'intuit.com', dkimStatus: 'Verified 100%', lastContact: 'Oct 03' }
];
