export interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  markdownContent: string;
  category: 'technology' | 'health-safety' | 'industry-insights';
  tags: string[];
  featuredImage: {
    url: string;
    alt: string;
    credit?: string;
  };
  status: 'draft' | 'published';
  author: {
    name: string;
    role: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
  publishedAt?: any; // Firestore timestamp
  createdAt?: any;
  updatedAt?: any;
  views: number;
  readTime: number;
  metadata?: {
    generatedBy: string;
    scheduledRun?: boolean;
    manualTrigger?: boolean;
    wordCount: number;
  };
}