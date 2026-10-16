import { PortfolioProject } from '../types';

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'aurapay-mobile',
    title: 'AuraPay Cross-Border Mobile Wallet',
    client: 'AuraPay Financial Corp',
    industry: 'Fintech & Digital Banking',
    category: 'mobile',
    categoryLabel: 'Mobile App Development',
    year: '2025',
    duration: '14 Weeks',
    summary: 'High-security multi-currency digital wallet app featuring biometric authentication, zero-knowledge settlement, and offline QR payment synchronization.',
    problem: 'Existing mobile payment solutions struggled with high-latency transaction confirmations in emerging markets where cellular coverage drops frequently, resulting in an unacceptable 18% cart abandonment rate.',
    solution: 'Designed and deployed an offline-first mobile architecture powered by SQLite encryption, local state trees, and cryptographic time-stamped vouchers that synchronize idempotently once connectivity restores.',
    metrics: [
      { primary: '+240%', label: 'Daily Active Transactions' },
      { primary: '0.01%', label: 'Dispute Rate Under SLA' },
      { primary: '85ms', label: 'Biometric Touch-to-Pay Speed' }
    ],
    techStack: ['React Native', 'TypeScript', 'Secure Enclave', 'SQLite', 'WebSockets', 'Node.js'],
    keyFeatures: [
      'Hardware-level biometric authorization with fallbacks',
      'Offline queued transaction journal with cryptographic signatures',
      'Live exchange rate ticker with micro-caching',
      'Instant push-notification confirmation mesh'
    ],
    demoType: 'fintech'
  },
  {
    id: 'pulsegrid-web',
    title: 'PulseGrid Enterprise Telemetry & Energy Web Platform',
    client: 'GridCore Dynamics',
    industry: 'Industrial IoT & Clean Energy',
    category: 'web',
    categoryLabel: 'Web Application Development',
    year: '2025',
    duration: '12 Weeks',
    summary: 'Cloud-native real-time operational dashboard visualizing over 450,000 smart grid sensors across 14 municipal substations with sub-second latency.',
    problem: 'The client’s legacy web monitoring portal froze when rendering simultaneous live WebSocket updates, causing operators to miss anomalous voltage surges during peak load spikes.',
    solution: 'Engineered an edge-buffered web application utilizing Web Workers to ingest 25,000 telemetry events per second, rendering directly to an HTML5 Canvas pipeline with interactive timeline scrubbing.',
    metrics: [
      { primary: '450k+', label: 'Concurrent Telemetry Streams' },
      { primary: '310ms', label: 'Average Time-To-Interactive' },
      { primary: '-62%', label: 'Infrastructure Server Footprint' }
    ],
    techStack: ['React 19', 'TypeScript', 'Tailwind CSS', 'Web Workers', 'WebSockets', 'Go Microservices', 'TimescaleDB'],
    keyFeatures: [
      'Sub-second real-time sensor heatmap and topological drill-down',
      'Configurable anomaly alert thresholds with webhook dispatch',
      'Historical load replay engine with 1-second granularity',
      'Role-based operator security isolation'
    ],
    demoType: 'telemetry'
  },
  {
    id: 'apexwave-desktop',
    title: 'ApexWave Studio Pro Audio Workstation',
    client: 'Apex Acoustic Labs',
    industry: 'Creative Audio & Acoustics',
    category: 'desktop',
    categoryLabel: 'Desktop Application Development',
    year: '2024',
    duration: '16 Weeks',
    summary: 'Professional 64-bit cross-platform desktop application delivering multi-track spatial audio editing, real-time spectral visualization, and low-latency ASIO/CoreAudio driver support.',
    problem: 'Browser and standard electron wrappers introduced audio buffer underruns and garbage collection pauses that degraded live studio recording sessions.',
    solution: 'Constructed a hybrid architecture with a Rust computational backend executing lock-free circular audio ring buffers, paired with a GPU-accelerated Tauri interface rendering 60 FPS waveforms.',
    metrics: [
      { primary: '<2.1ms', label: 'Round-Trip Audio Buffer Latency' },
      { primary: '60 FPS', label: 'Sustained Spectral Display' },
      { primary: '45MB', label: 'Lightweight Memory Baseline' }
    ],
    techStack: ['Tauri', 'Rust', 'TypeScript', 'WebAssembly', 'C++ DSP Engine', 'SQLite'],
    keyFeatures: [
      'Zero-latency multi-channel audio buffer monitoring',
      'Real-time Fast Fourier Transform (FFT) visual spectrum analyzer',
      'Lossless non-destructive timeline editing',
      'Cross-platform signed releases for Windows and macOS'
    ],
    demoType: 'audio'
  },
  {
    id: 'omniflow-custom',
    title: 'OmniFlow Autonomous Dispatch & Warehouse Routing',
    client: 'Vanguard Global Freight',
    industry: 'Supply Chain & Logistics',
    category: 'custom',
    categoryLabel: 'Custom Software Solutions',
    year: '2025',
    duration: '18 Weeks',
    summary: 'Tailored enterprise orchestration system that recalculates 50,000 cross-docking routes dynamically in response to freight delays, weather, and facility throughput.',
    problem: 'Generic ERP modules could not accommodate proprietary weight distribution constraints and custom pallet packing logic, creating shipping bottlenecks costing $120,000 monthly.',
    solution: 'Designed and deployed a bespoke event-driven routing core using constraint satisfaction heuristics, integrated directly with automated guided vehicles (AGVs) and warehouse scanners.',
    metrics: [
      { primary: '-28%', label: 'Forklift Travel Distance Saved' },
      { primary: '99.99%', label: 'Operational Dispatch Uptime' },
      { primary: '$1.4M', label: 'Annual Cost Reduction' }
    ],
    techStack: ['Python', 'Go', 'Docker', 'PostgreSQL', 'Redis', 'Kafka', 'React Admin'],
    keyFeatures: [
      'Dynamic heuristic pallet layout algorithm',
      'Real-time dock door allocation matrix',
      'Bi-directional automated guided vehicle (AGV) telemetry',
      'Full cryptographic audit trail for compliance verification'
    ],
    demoType: 'logistics'
  },
  {
    id: 'neurosync-health',
    title: 'NeuroSync Mobile Remote Patient Monitoring',
    client: 'NeuroSync Clinical Networks',
    industry: 'Healthcare & Medical Devices',
    category: 'mobile',
    categoryLabel: 'Mobile App Development',
    year: '2024',
    duration: '14 Weeks',
    summary: 'HIPAA-compliant tablet and phone suite connecting outpatient neurological monitors via Bluetooth Low Energy with real-time symptom recording.',
    problem: 'Elderly patients struggled with complicated pairing workflows, and intermittent connection drops often resulted in silent failure of critical biosensor uploads.',
    solution: 'Built a resilient Bluetooth Low Energy (BLE) background manager with zero-touch auto-reconnect, automated packet fragmentation verification, and high-contrast accessible touch controls.',
    metrics: [
      { primary: '99.4%', label: 'Sensor Data Sync Completion' },
      { primary: '100%', label: 'HIPAA & SOC2 Audit Pass' },
      { primary: '4.9 / 5', label: 'Patient Usability Score' }
    ],
    techStack: ['Flutter', 'Dart', 'Bluetooth LE', 'AES-256 GCM', 'Fastlane', 'Node.js'],
    keyFeatures: [
      'Single-tap pairing with medical grade biosensors',
      'On-device encrypted cache with tamper-evident logs',
      'High-contrast accessible accessibility controls for clinical patients',
      'Automated clinician escalation alerts for critical biosensor thresholds'
    ],
    demoType: 'health'
  },
  {
    id: 'quantedge-trading',
    title: 'QuantEdge Terminal Financial Modeling Suite',
    client: 'QuantEdge Asset Management',
    industry: 'Capital Markets & Quant Trading',
    category: 'desktop',
    categoryLabel: 'Desktop Application Development',
    year: '2025',
    duration: '15 Weeks',
    summary: 'Workstation software suite for derivatives traders executing Monte Carlo simulations and multi-leg risk surface projections at machine speed.',
    problem: 'Cloud-based web spreadsheets lagged significantly during high-volatility market open events, causing execution slippage and delayed risk parameter adjustments.',
    solution: 'Engineered a standalone desktop application leveraging AVX2 vectorized SIMD routines, multi-threaded C++ calculations, and an ergonomic multi-monitor window tiling manager.',
    metrics: [
      { primary: '10,000x', label: 'Monte Carlo Iterations / Sec' },
      { primary: '<15ms', label: 'Live Surface Re-computation' },
      { primary: 'Zero', label: 'Volatilty Spike Freezes' }
    ],
    techStack: ['C++', 'Electron', 'WebAssembly', 'DirectX/WebGL', 'Node.js', 'Redis'],
    keyFeatures: [
      'Dynamic multi-dimensional volatility surface rendering',
      'Multi-monitor detachable layout management',
      'Local-first zero-latency financial order staging',
      'Direct DMA feed connector for live equity prices'
    ],
    demoType: 'trading'
  }
];
