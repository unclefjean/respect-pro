import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, AuthState } from '@/types/user';
import { getUser } from '@/mocks/users';

interface AuthStore extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: Partial<User>, password: string) => Promise<boolean>;
  updateProfile: (userData: Partial<User>) => Promise<boolean>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        
        try {
          // Имитация API-вызова
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const user = getUser(email, password);
          
          if (user) {
            set({ user, isAuthenticated: true, isLoading: false });
            return true;
          } else {
            set({ 
              isLoading: false, 
              error: "Неверный email или пароль" 
            });
            return false;
          }
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : "Произошла неизвестная ошибка" 
          });
          return false;
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false, error: null });
      },

      register: async (userData: Partial<User>, password: string) => {
        set({ isLoading: true, error: null });
        
        try {
          // Имитация API-вызова
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // В реальном приложении вы бы отправили эти данные на бэкенд
          // Для этого мока мы просто притворимся, что это сработало
          
          // Создаем мок-пользователя
          const newUser: User = {
            id: Math.random().toString(36).substr(2, 9),
            email: userData.email || '',
            name: userData.name || '',
            role: userData.role || 'Клиент',
            avatar: userData.avatar,
            phone: userData.phone,
            company: userData.company,
            position: userData.position,
            createdAt: new Date().toISOString(),
          };
          
          set({ 
            user: newUser, 
            isAuthenticated: true, 
            isLoading: false 
          });
          
          return true;
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : "Произошла неизвестная ошибка" 
          });
          return false;
        }
      },

      updateProfile: async (userData: Partial<User>) => {
        set({ isLoading: true, error: null });
        
        try {
          // Имитация API-вызова
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const currentUser = get().user;
          
          if (!currentUser) {
            throw new Error("Пользователь не аутентифицирован");
          }
          
          // Обновляем данные пользователя
          const updatedUser: User = {
            ...currentUser,
            ...userData,
          };
          
          set({ 
            user: updatedUser, 
            isLoading: false 
          });
          
          return true;
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : "Произошла неизвестная ошибка" 
          });
          return false;
        }
      },
    }),
    {
      name: 'respect-auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);