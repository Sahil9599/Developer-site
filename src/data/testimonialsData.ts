import { Testimonial } from '../types';

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 't-1',
    author: 'Elena Rostova',
    role: 'Chief Technology Officer',
    company: 'AuraPay Financial Corp',
    location: 'Zurich & London',
    serviceCategory: 'mobile',
    serviceName: 'Mobile Application Development',
    avatarInitials: 'ER',
    accentColor: '#38bdf8',
    quote: 'Prior to engaging Vanguard, our mobile app suffered from recurring offline dropouts in low-connectivity territories. Vanguard redesigned our synchronization core with local encrypted SQLite queues and biometric signing. The result was transformative: our daily transaction volume grew by 240% while dispute rates dropped to virtually zero.',
    outcome: 'Increased daily active transactions by 240% and reduced payment abandonment in offline zones from 18% down to 0.4%.',
    metrics: '+240% Transaction Growth',
    rating: 5,
    projectYear: '2025'
  },
  {
    id: 't-2',
    author: 'Marcus Vance',
    role: 'VP of Industrial Systems',
    company: 'GridCore Dynamics',
    location: 'Chicago, IL',
    serviceCategory: 'web',
    serviceName: 'Web Application Engineering',
    avatarInitials: 'MV',
    accentColor: '#10b981',
    quote: 'Our control room operators were blind during emergency electrical spikes because our legacy monitoring dashboard would crash under load. Vanguard delivered a reactive web telemetry console that ingests 25,000 live data events every second with sub-second time-to-interactive. It is the most dependable piece of infrastructure we operate.',
    outcome: 'Zero control room outages during peak grid strain and reduced AWS server footprint by 62%.',
    metrics: '450k+ Concurrent Sensor Streams',
    rating: 5,
    projectYear: '2025'
  },
  {
    id: 't-3',
    author: 'Dr. Alistair Sterling',
    role: 'Head of Audio R&D',
    company: 'Apex Acoustic Labs',
    location: 'Berlin, Germany',
    serviceCategory: 'desktop',
    serviceName: 'Desktop Application Development',
    avatarInitials: 'AS',
    accentColor: '#818cf8',
    quote: 'Desktop audio software requires uncompromising discipline regarding thread allocation and memory buffers. Vanguard built our cross-platform desktop application using Rust and Tauri, achieving a 2.1ms round-trip latency that rivaled native C++ codebases while maintaining a modern, fluid visual interface.',
    outcome: 'Delivered cross-platform releases for macOS and Windows with 60 FPS sustained audio waveform rendering and under 45MB base RAM.',
    metrics: '<2.1ms Round-Trip Audio Latency',
    rating: 5,
    projectYear: '2024'
  },
  {
    id: 't-4',
    author: 'Nadia Chen',
    role: 'SVP of Global Operations',
    company: 'Vanguard Global Freight',
    location: 'Singapore',
    serviceCategory: 'custom',
    serviceName: 'Custom Software Solutions',
    avatarInitials: 'NC',
    accentColor: '#f59e0b',
    quote: 'Every enterprise vendor told us we needed to change our operational workflow to fit their packaged software. Vanguard took the opposite approach: they built a custom heuristic dispatch engine around our exact packing geometries and automated guided vehicles. We saved $1.4 million in fuel and labor in the first year alone.',
    outcome: 'Reduced warehouse forklift travel distance by 28% and eliminated 100% of dock door scheduling conflicts.',
    metrics: '$1.4M Direct Annual Savings',
    rating: 5,
    projectYear: '2025'
  }
];
