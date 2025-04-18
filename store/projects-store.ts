import { create } from 'zustand';
import { Project } from '@/types/project';
import { mockProjects } from '@/mocks/projects';

interface ProjectsState {
  projects: Project[];
  isLoading: boolean;
  error: string | null;
  
  fetchProjects: () => Promise<void>;
  getProjectById: (id: string) => Project | undefined;
  getUpcomingDeadlines: (days: number) => Project[];
}

export const useProjectsStore = create<ProjectsState>((set, get) => ({
  projects: [],
  isLoading: false,
  error: null,
  
  fetchProjects: async () => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      set({ projects: mockProjects, isLoading: false });
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : "Failed to fetch projects" 
      });
    }
  },
  
  getProjectById: (id: string) => {
    return get().projects.find(project => project.id === id);
  },
  
  getUpcomingDeadlines: (days: number) => {
    const now = new Date();
    const futureDate = new Date();
    futureDate.setDate(now.getDate() + days);
    
    return get().projects.filter(project => {
      if (project.status === 'completed') return false;
      
      const deadlineDate = new Date(project.deadline);
      return deadlineDate >= now && deadlineDate <= futureDate;
    }).sort((a, b) => {
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    });
  },
}));