import { create } from 'zustand';
import { Review } from '@/types/review';
import { mockReviews } from '@/mocks/reviews';

interface ReviewsState {
  reviews: Review[];
  isLoading: boolean;
  error: string | null;
  
  fetchReviews: () => Promise<void>;
  getFeaturedReviews: () => Review[];
}

export const useReviewsStore = create<ReviewsState>((set, get) => ({
  reviews: [],
  isLoading: false,
  error: null,
  
  fetchReviews: async () => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      set({ reviews: mockReviews, isLoading: false });
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : "Failed to fetch reviews" 
      });
    }
  },
  
  getFeaturedReviews: () => {
    return get().reviews.filter(review => review.featured);
  },
}));