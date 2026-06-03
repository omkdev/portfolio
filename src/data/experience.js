export const experience = [
  {
    id: 'trully-associate',
    role: 'Associate Software Engineer',
    company: 'Trully Capital Fintech Pvt Ltd',
    location: 'Pune District, Maharashtra · On-site',
    period: 'Feb 2026 — Present',
    current: true,
    description:
      'Backend & security systems for UDT & UDC — secure document sharing and financial workflows in the fintech domain.',
    highlights: [
      'Built a secure document-processing backend (Node.js, MongoDB) supporting 100+ concurrent users with separated auth, access control, and audit layers',
      'Designed zero-trust authentication (OTP + JWT) with per-resource access control, reducing unauthorized access risk by ~90%',
      'Implemented RBAC, MFA (OTP + WebAuthn), rate limiting, and HttpOnly cookie strategies',
      'Developed real-time event-driven workflows with WebSockets for multi-actor approval flows',
      'Reduced third-party API costs by ~40% via a TTL-based MongoDB caching layer',
      'Deployed on AWS (EC2 / Elastic Beanstalk) with Nginx and CI/CD via GitHub Actions',
    ],
  },
  {
    id: 'nsoc-oss',
    role: 'Open Source Contributor',
    company: 'Nexus Spring of Code (NSoC) 2026',
    location: 'Remote',
    period: 'May 2026',
    description:
      'Contributed security hardening and production fixes to open-source codebases through NSoC — Nexus Spring of Code, a structured open-source program for 2026.',
    highlights: [
      'Aurakriti (fintech-adjacent e-commerce): JWT hardening with jose, Upstash Redis rate limiting, CSRF protection, and Helmet with CSP/HSTS — merged security PR',
      'Additional Aurakriti work: admin API exposure fix and atomic payment-verify locking to prevent duplicate orders',
      '6 merged PRs across 3 repositories (Aurakriti, Vector social platform, Weatherify)',
    ],
    links: {
      github: 'https://github.com/omkdev',
      showcase: 'https://github.com/adarshtiwaridev/Aurakriti/pull/55',
    },
  },
  {
    id: 'trully-intern',
    role: 'Software Engineer Intern',
    company: 'Trully Capital Fintech Pvt Ltd',
    location: 'Pune District, Maharashtra · On-site',
    period: 'Jul 2025 — Feb 2026',
    description:
      'Full-stack and backend work on CRM, lending workflows, and production fintech systems — promoted to Associate Software Engineer after 6 months.',
    highlights: [
      'Designed CRM modules (PHP / CodeIgniter) for lead intake, underwriting, and PAN/GST/ITR workflows',
      'Built React frontends and Node.js/Express services with MySQL, saving ~70 hours/month in manual ops',
      'Implemented JWT, OTP-based verification, and multi-consent authentication flows',
      'Deployed on AWS Elastic Beanstalk with RDS (MySQL), SSL via ACM, and 99.5%+ API uptime',
    ],
  },
  {
    id: 'prodigy-intern',
    role: 'Android Developer Intern',
    company: 'Prodigy InfoTech',
    location: 'Phaltan, Maharashtra',
    period: 'Jun 2023 — Jul 2023',
    description:
      'Built Android modules with Java & Android Studio — UI, navigation, API integration, and SQLite.',
    highlights: [
      'Developed form validation, activity transitions, and layout optimization modules',
      'Gained hands-on experience with API integration and application debugging',
    ],
  },
  {
    id: 'oasis-intern',
    role: 'Java Developer Intern',
    company: 'Oasis Infobyte',
    location: 'Phaltan, Maharashtra · Remote',
    period: 'Mar 2023 — Apr 2023',
    description:
      'Java-based projects focused on OOP, core Java, and console application development.',
    highlights: [
      'Built CRUD and utility applications using collections, exception handling, and file I/O',
    ],
  },
]
