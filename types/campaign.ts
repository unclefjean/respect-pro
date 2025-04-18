export type CampaignType = 'digital' | 'print' | 'social' | 'tv' | 'radio' | 'outdoor' | 'mixed';
export type CampaignStatus = 'draft' | 'active' | 'paused' | 'completed' | 'scheduled';

export interface Campaign {
  id: string;
  title: string;
  description: string;
  type: CampaignType;
  status: CampaignStatus;
  clientId: string;
  clientName: string;
  startDate: string;
  endDate: string;
  budget: number;
  reach?: number;
  engagement?: number;
  conversion?: number;
  platforms: string[];
  assets: string[];
}