type TopicLinkType = "phone" | "dialob" | "internal" | "external" | "workflow";
interface Site {
  id: string;
  images: string;
  locale: string;

  topics: Record<string, Topic>;
  blobs: Record<string, Blob>;
  links: Record<string, TopicLink>;
}

interface Blob {
  id: string;
  value: string;
}

interface Topic {
  id: string;
  name: string;
  links: string[];
  headings: TopicHeading[];
  parent?: string;
  blob?: string;
}

interface TopicLink {
  id: string;
  type: TopicLinkType;
  name: string;
  value: string;
  secured: boolean;
}

interface TopicHeading {
  id: string;
  name: string;
  order: number;
  level: number;
}

interface Service {
  getSite: (locale: string) => Promise<Site>;
  getSiteLoading: (locale: string) => Site;
}

interface ServiceConfig {
  content: { url: string };
  defaultLocale: string;
  dev?: boolean;
}

export type { ServiceConfig, Service, TopicHeading, TopicLink, Topic, Blob, Site, TopicLinkType };


