import { create } from 'zustand';
import { Campaign } from '@/types/campaign';
import { mockCampaigns } from '@/mocks/campaigns';

interface CampaignsState {
  campaigns: Campaign[];
  isLoading: boolean;
  error: string | null;
  
  fetchCampaigns: () => Promise<void>;
  getCampaignById: (id: string) => Campaign | undefined;
  getActiveCampaigns: () => Campaign[];
}

export const useCampaignsStore = create<CampaignsState>((set, get) => ({
  campaigns: [],
  isLoading: false,
  error: null,
  
  fetchCampaigns: async () => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      set({ campaigns: mockCampaigns, isLoading: false });
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : "Failed to fetch campaigns" 
      });
    }
  },
  
  getCampaignById: (id: string) => {
    return get().campaigns.find(campaign => campaign.id === id);
  },
  
  getActiveCampaigns: () => {
    return get().campaigns.filter(campaign => campaign.status === 'active');
  },
}));