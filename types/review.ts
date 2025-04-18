export interface Review {
    id: string;
    clientId: string;
    clientName: string;
    clientCompany?: string;
    clientAvatar?: string;
    projectId?: string;
    projectName?: string;
    rating: number; // 1-5
    comment: string;
    date: string;
    featured: boolean;
  }