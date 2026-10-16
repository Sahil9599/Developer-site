import React, { createContext, useContext, useState, useEffect } from 'react';
import { AnalyticsEvent, ServiceCategory, ClientInquiry } from '../types';

interface ServiceStat {
  category: ServiceCategory;
  name: string;
  views: number;
  portfolioClicks: number;
  inquiries: number;
  avgEngagementSeconds: number;
}

interface AnalyticsContextType {
  events: AnalyticsEvent[];
  trackEvent: (
    type: AnalyticsEvent['type'],
    serviceCategory?: ServiceCategory,
    label?: string,
    metadata?: Record<string, string | number>
  ) => void;
  serviceStats: Record<ServiceCategory, ServiceStat>;
  totalEventsCount: number;
  totalInquiriesCount: number;
  inquiries: ClientInquiry[];
  addInquiry: (inquiry: Omit<ClientInquiry, 'id' | 'submittedAt'>) => void;
  activeServiceFilter: ServiceCategory | 'all';
  setActiveServiceFilter: (cat: ServiceCategory | 'all') => void;
  simulateTrafficEvent: () => void;
  exportAnalyticsData: () => void;
  clearAnalytics: () => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

const INITIAL_EVENTS: AnalyticsEvent[] = [
  {
    id: 'evt-init-1',
    timestamp: Date.now() - 1000 * 60 * 42,
    type: 'service_inspect',
    serviceCategory: 'web',
    label: 'Inspected Web Application Engineering details',
    metadata: { section: 'services', dwellSeconds: 45 }
  },
  {
    id: 'evt-init-2',
    timestamp: Date.now() - 1000 * 60 * 35,
    type: 'portfolio_view',
    serviceCategory: 'mobile',
    label: 'Opened AuraPay Cross-Border Mobile Wallet case study',
    metadata: { project: 'aurapay-mobile', duration: '14 Weeks' }
  },
  {
    id: 'evt-init-3',
    timestamp: Date.now() - 1000 * 60 * 28,
    type: 'scene_interact',
    serviceCategory: 'desktop',
    label: 'Rotated 3D camera to Desktop Workstation Mainframe',
    metadata: { mode: 'focus_desktop', angle: 45 }
  },
  {
    id: 'evt-init-4',
    timestamp: Date.now() - 1000 * 60 * 18,
    type: 'estimator_use',
    serviceCategory: 'custom',
    label: 'Calculated project timeline for Custom Logistics Solution',
    metadata: { weeks: '14-18', budgetTier: 'Enterprise' }
  },
  {
    id: 'evt-init-5',
    timestamp: Date.now() - 1000 * 60 * 9,
    type: 'portfolio_view',
    serviceCategory: 'desktop',
    label: 'Reviewed ApexWave Studio Audio Workstation benchmarks',
    metadata: { metric: '<2.1ms Latency' }
  },
  {
    id: 'evt-init-6',
    timestamp: Date.now() - 1000 * 60 * 3,
    type: 'service_inspect',
    serviceCategory: 'custom',
    label: 'Viewed Custom Software Solutions architecture matrix',
    metadata: { focus: 'Kafka & Event Streams' }
  }
];

const INITIAL_INQUIRIES: ClientInquiry[] = [
  {
    id: 'inq-sample-1',
    name: 'Julian Mercer',
    email: 'j.mercer@strataholdings.io',
    company: 'Strata Holdings',
    serviceCategory: 'web',
    budgetRange: '$50,000 - $100,000',
    timeline: '3 - 4 Months',
    requirements: 'Real-time financial risk aggregation portal for private debt portfolio managers with sub-second recalculation.',
    submittedAt: 'Today, 01:15 AM'
  }
];

export const AnalyticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<AnalyticsEvent[]>(() => {
    try {
      const saved = localStorage.getItem('vanguard_analytics_events');
      return saved ? JSON.parse(saved) : INITIAL_EVENTS;
    } catch {
      return INITIAL_EVENTS;
    }
  });

  const [inquiries, setInquiries] = useState<ClientInquiry[]>(() => {
    try {
      const saved = localStorage.getItem('vanguard_inquiries');
      return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
    } catch {
      return INITIAL_INQUIRIES;
    }
  });

  const [activeServiceFilter, setActiveServiceFilter] = useState<ServiceCategory | 'all'>('all');

  useEffect(() => {
    try {
      localStorage.setItem('vanguard_analytics_events', JSON.stringify(events));
    } catch {
      // Ignore quota exceptions
    }
  }, [events]);

  useEffect(() => {
    try {
      localStorage.setItem('vanguard_inquiries', JSON.stringify(inquiries));
    } catch {
      // Ignore quota exceptions
    }
  }, [inquiries]);

  const trackEvent = (
    type: AnalyticsEvent['type'],
    serviceCategory?: ServiceCategory,
    label: string = 'User Interaction',
    metadata?: Record<string, string | number>
  ) => {
    const newEvent: AnalyticsEvent = {
      id: `evt-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: Date.now(),
      type,
      serviceCategory,
      label,
      metadata
    };
    setEvents(prev => [newEvent, ...prev.slice(0, 99)]);
  };

  const addInquiry = (inquiryData: Omit<ClientInquiry, 'id' | 'submittedAt'>) => {
    const newInquiry: ClientInquiry = {
      ...inquiryData,
      id: `inq-${Date.now()}`,
      submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setInquiries(prev => [newInquiry, ...prev]);
    trackEvent('contact_submit', inquiryData.serviceCategory, `New Inquiry from ${inquiryData.company || inquiryData.name}`, {
      budget: inquiryData.budgetRange,
      category: inquiryData.serviceCategory
    });
  };

  const simulateTrafficEvent = () => {
    const categories: ServiceCategory[] = ['mobile', 'web', 'desktop', 'custom'];
    const chosenCat = categories[Math.floor(Math.random() * categories.length)];
    const simTypes: { type: AnalyticsEvent['type']; label: string }[] = [
      { type: 'service_inspect', label: `Prospective client inspected ${chosenCat.toUpperCase()} service technical specs` },
      { type: 'portfolio_view', label: `Visitor drilled down into ${chosenCat.toUpperCase()} case study metrics` },
      { type: 'scene_interact', label: `User toggled exploded 3D view for ${chosenCat.toUpperCase()} model` },
      { type: 'estimator_use', label: `Configured interactive estimator for ${chosenCat.toUpperCase()} architecture` }
    ];
    const picked = simTypes[Math.floor(Math.random() * simTypes.length)];
    trackEvent(picked.type, chosenCat, picked.label, { simulated: 1, dwell: Math.floor(Math.random() * 90) + 10 });
  };

  const exportAnalyticsData = () => {
    const dataToExport = {
      generatedAt: new Date().toISOString(),
      totalEvents: events.length,
      totalInquiries: inquiries.length,
      events,
      inquiries
    };
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `vanguard-service-analytics-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const clearAnalytics = () => {
    setEvents([]);
    localStorage.removeItem('vanguard_analytics_events');
  };

  // Compute aggregated stats per service
  const serviceStats: Record<ServiceCategory, ServiceStat> = {
    mobile: {
      category: 'mobile',
      name: 'Mobile Application Development',
      views: 124,
      portfolioClicks: 82,
      inquiries: 19,
      avgEngagementSeconds: 142
    },
    web: {
      category: 'web',
      name: 'Web Application Engineering',
      views: 186,
      portfolioClicks: 114,
      inquiries: 31,
      avgEngagementSeconds: 185
    },
    desktop: {
      category: 'desktop',
      name: 'Desktop Application Development',
      views: 94,
      portfolioClicks: 61,
      inquiries: 14,
      avgEngagementSeconds: 168
    },
    custom: {
      category: 'custom',
      name: 'Custom Software Solutions',
      views: 142,
      portfolioClicks: 95,
      inquiries: 24,
      avgEngagementSeconds: 210
    }
  };

  // Add real session events dynamically
  events.forEach(evt => {
    if (evt.serviceCategory && serviceStats[evt.serviceCategory]) {
      if (evt.type === 'service_inspect') {
        serviceStats[evt.serviceCategory].views += 1;
      } else if (evt.type === 'portfolio_view') {
        serviceStats[evt.serviceCategory].portfolioClicks += 1;
      } else if (evt.type === 'contact_submit') {
        serviceStats[evt.serviceCategory].inquiries += 1;
      }
    }
  });

  return (
    <AnalyticsContext.Provider
      value={{
        events,
        trackEvent,
        serviceStats,
        totalEventsCount: events.length,
        totalInquiriesCount: inquiries.length,
        inquiries,
        addInquiry,
        activeServiceFilter,
        setActiveServiceFilter,
        simulateTrafficEvent,
        exportAnalyticsData,
        clearAnalytics
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};
