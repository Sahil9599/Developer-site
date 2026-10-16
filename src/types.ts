export type ServiceCategory = 'mobile' | 'web' | 'desktop' | 'custom';

export interface ServiceItem {
  id: ServiceCategory;
  numericIndex: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  architectureHighlights: string[];
  technologies: string[];
  deliverables: string[];
  typicalTimeline: string;
  metricBadge: {
    value: string;
    label: string;
  };
}

export interface PortfolioProject {
  id: string;
  title: string;
  client: string;
  industry: string;
  category: ServiceCategory;
  categoryLabel: string;
  year: string;
  duration: string;
  summary: string;
  problem: string;
  solution: string;
  metrics: {
    primary: string;
    label: string;
  }[];
  techStack: string[];
  keyFeatures: string[];
  demoType: 'fintech' | 'telemetry' | 'audio' | 'logistics' | 'health' | 'trading';
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  company: string;
  location: string;
  serviceCategory: ServiceCategory;
  serviceName: string;
  avatarInitials: string;
  accentColor: string;
  quote: string;
  outcome: string;
  metrics: string;
  rating: number;
  projectYear: string;
}

export interface AnalyticsEvent {
  id: string;
  timestamp: number;
  type: 'service_inspect' | 'portfolio_view' | 'estimator_use' | 'contact_submit' | 'scene_interact';
  serviceCategory?: ServiceCategory;
  label: string;
  metadata?: Record<string, string | number>;
}

export interface ClientInquiry {
  id: string;
  name: string;
  email: string;
  company: string;
  serviceCategory: ServiceCategory;
  budgetRange: string;
  timeline: string;
  requirements: string;
  estimatorConfig?: {
    platform: string;
    estimatedCost: string;
    estimatedWeeks: string;
  };
  submittedAt: string;
}
