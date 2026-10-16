import { ServiceItem } from '../types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'mobile',
    numericIndex: '01',
    title: 'Mobile Application Development',
    shortDesc: 'Native iOS & Android apps with offline synchronization, biometric security, and fluid 120Hz gesture interaction.',
    fullDesc: 'We architect production-ready mobile systems built to withstand erratic network conditions, demanding cryptographic requirements, and intense real-time telemetry. From low-level native Swift and Kotlin modules to cross-platform React Native and Flutter codebases, our mobile applications prioritize battery efficiency, sub-16ms frame times, and strict app-store compliance.',
    architectureHighlights: [
      'Offline-First Local SQLite / WatermelonDB sync engine',
      'Hardware-backed Secure Enclave biometric key storage',
      'Zero-lag native UI thread offloading with WebAssembly/C++',
      'Background task orchestration and push messaging queues'
    ],
    technologies: ['Swift', 'Kotlin', 'React Native', 'Flutter', 'SQLite', 'WebSockets', 'CoreBluetooth'],
    deliverables: [
      'Published App Store & Google Play binaries',
      'Automated Fastlane CI/CD distribution pipelines',
      'Offline state persistence test suites',
      'Comprehensive crash analytics & crash-free sessions SLA'
    ],
    typicalTimeline: '8–14 Weeks',
    metricBadge: {
      value: '99.98%',
      label: 'Crash-Free Sessions'
    }
  },
  {
    id: 'web',
    numericIndex: '02',
    title: 'Web Application Engineering',
    shortDesc: 'High-throughput SaaS platforms, reactive customer portals, and micro-frontend architectures with sub-400ms time-to-interactive.',
    fullDesc: 'We engineer web applications capable of managing high concurrent traffic, mission-critical workflows, and complex data visualizations. Focusing on zero-layout-shift performance, edge compute routing, and robust state machines, our web solutions combine responsive user interfaces with type-safe distributed backend services.',
    architectureHighlights: [
      'Edge-rendered streaming SSR with Next.js & Vite',
      'Optimistic state reconciliation with automatic retry',
      'Role-based access control (RBAC) & tenant isolation',
      'Distributed Redis caching and micro-frontend modularity'
    ],
    technologies: ['TypeScript', 'React 19', 'Next.js', 'Node.js', 'Tailwind CSS', 'PostgreSQL', 'Redis'],
    deliverables: [
      'Responsive Web Application with full PWA capability',
      'Scalable GraphQL / REST API microservice endpoints',
      'Automated end-to-end Playwright verification suite',
      'Lighthouse 95+ Core Web Vitals certification'
    ],
    typicalTimeline: '6–12 Weeks',
    metricBadge: {
      value: '<380ms',
      label: 'Median Time-To-Interactive'
    }
  },
  {
    id: 'desktop',
    numericIndex: '03',
    title: 'Desktop Application Development',
    shortDesc: 'Native and cross-platform desktop software engineered for hardware interfacing, local compute, and intensive computational pipelines.',
    fullDesc: 'When web browsers reach sandbox constraints, we engineer robust desktop applications that leverage multi-core CPU threading, GPU acceleration, direct file system access, and specialized peripheral hardware. Built with Rust, Tauri, C++, and Electron, our desktop suites deliver zero-latency workstation productivity.',
    architectureHighlights: [
      'Multi-threaded worker pools for parallel computational workloads',
      'Low-overhead memory footprint utilizing Rust and native runtimes',
      'Direct OS kernel hooks, USB/Serial peripheral protocols, and HID drivers',
      'Delta auto-update mechanisms with cryptographic code signing'
    ],
    technologies: ['Tauri', 'Rust', 'Electron', 'C++', 'WebAssembly', 'Node Native Addons', 'SQLite'],
    deliverables: [
      'Cross-platform signed installers for macOS, Windows, and Linux',
      'Hardware communication driver bridges and mock test rigs',
      'Local-first encrypted database schema migrations',
      'Automatic update server integration with rollback support'
    ],
    typicalTimeline: '10–16 Weeks',
    metricBadge: {
      value: '60+ FPS',
      label: 'Complex Canvas & GPU Render'
    }
  },
  {
    id: 'custom',
    numericIndex: '04',
    title: 'Custom Software Solutions',
    shortDesc: 'Tailored enterprise architectures, event-driven integration pipelines, and bespoke automation engines solving unique business logic.',
    fullDesc: 'Off-the-shelf software inevitably forces compromise onto unique operational models. We build custom software engines tailored precisely around your operational constraints, proprietary calculations, and legacy system integrations. Our architectures feature event-driven decoupling, idempotent task executors, and audit-compliant data lineage.',
    architectureHighlights: [
      'Event-driven asynchronous message queuing with Kafka / RabbitMQ',
      'Idempotent transactional workflows with distributed compensation',
      'Legacy ERP, CRM, and mainframe bi-directional connectors',
      'Comprehensive telemetry, audit trails, and automated compliance reports'
    ],
    technologies: ['Go', 'Python', 'TypeScript', 'Docker', 'Kubernetes', 'PostgreSQL', 'Apache Kafka'],
    deliverables: [
      'Custom backend engine and administrative orchestration suite',
      'Containerized infrastructure manifests (Docker & Terraform)',
      'High-throughput message pipeline with dead-letter queue monitoring',
      'Executive dashboard with real-time audit logging'
    ],
    typicalTimeline: '12–20 Weeks',
    metricBadge: {
      value: '99.99%',
      label: 'Uptime Availability SLA'
    }
  }
];
