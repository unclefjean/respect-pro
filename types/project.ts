export type ProjectStatus = 'planning' | 'in_progress' | 'review' | 'completed' | 'on_hold';

export interface Project {
  id: string;
  title: string;
  description: string;
  clientId: string;
  clientName: string;
  status: ProjectStatus;
  deadline: string;
  startDate: string;
  budget?: number;
  assignedTo: string[];
  progress: number; // 0-100
  tags: string[];
  priority: 'low' | 'medium' | 'high' | 'urgent';
}