export const projects = [
  {
    id: 'fynix-v2',
    title: 'Fynix v2 — Event-Driven Personal Finance Platform',
    period: 'May 2026 — Present',
    problem:
      'Personal and shared finance apps need multi-tenant isolation, reliable event processing, and fintech-grade security — not just CRUD dashboards.',
    built:
      'Built a production-grade finance platform with Java Spring Boot, Kafka, PostgreSQL, Redis, and Keycloak — featuring multi-tenant workspaces, OAuth2/OIDC auth, Outbox Pattern event publishing, AI expense categorization, DLQ retry handling, and observability via Prometheus, Grafana, and OpenTelemetry.',
    impact:
      'Delivered tenant-isolated workspaces with RBAC, idempotent APIs, immutable audit trails, and integration tests via Testcontainers (PostgreSQL + Kafka + Redis).',
    stack: [
      'Java',
      'Spring Boot',
      'Kafka',
      'PostgreSQL',
      'Redis',
      'Keycloak',
      'React',
      'Docker',
    ],
    links: {
      github: 'https://github.com/omkdev/Fynix-v2',
      live: null,
    },
    image: null,
  },
  {
    id: 'my-auth-app',
    title: 'Secure Android Authentication (OAuth2/OIDC)',
    period: 'Apr 2026 — Present',
    problem:
      'Mobile fintech apps need browser-based OAuth2/OIDC with PKCE and hardware-backed token storage — plain SharedPreferences is not acceptable for production.',
    built:
      'Built a production-grade Android auth system using AppAuth-Android with Keycloak, PKCE, AES/GCM KeyStore encryption, Jetpack DataStore migration path, reactive MVVM with Kotlin Flow, ProGuard/R8 hardening, and idempotent token refresh.',
    impact:
      'Tokens never stored in plain text; authorization code interception mitigated via PKCE; lifecycle-safe UI updates with repeatOnLifecycle.',
    stack: ['Kotlin', 'Android', 'OAuth2', 'OIDC', 'PKCE', 'Keycloak', 'KeyStore'],
    links: {
      github: 'https://github.com/omkdev/MyAuthApp',
      live: null,
    },
    image: null,
  },
  {
    id: 'sudamafood',
    title: 'SudamaFood — Menu & Order App',
    badge: 'Early project',
    period: 'College Project',
    problem:
      'A local pohe shop needed digital menu, order, billing, and daily sales tracking instead of manual paper-based management.',
    built:
      'Built a Java Swing desktop app integrated with MySQL for inventory & menu management, order processing, daily sales tracking, and customer bill printing.',
    impact:
      'End-to-end shop management system covering billing, inventory, and sales reporting in one desktop application.',
    stack: ['Java', 'Java Swing', 'MySQL', 'JDBC'],
    links: {
      github: 'https://github.com/omkdev/SudamaFood-Menu-Order-App',
      live: null,
    },
    image: null,
  },
]
