// userStore.ts
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { MMKV } from 'react-native-mmkv';
import { PrismaClient } from '@prisma/client/react-native';

// Initialize MMKV storage
export const storage = new MMKV({
  id: 'user-storage',
  encryptionKey: 'your-encryption-key' // Consider using a secure method to generate this
});

// MMKV storage adapter for Zustand
const mmkvStorage = {
  getItem: (name: string) => {
    const value = storage.getString(name);
    return value ? Promise.resolve(value) : Promise.resolve(null);
  },
  setItem: (name: string, value: string) => {
    storage.set(name, value);
    return Promise.resolve(true);
  },
  removeItem: (name: string) => {
    storage.delete(name);
    return Promise.resolve();
  },
};

// Type definitions
type User = {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
};

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUserData: () => Promise<void>;
}

// Initialize Prisma client
const prisma = new PrismaClient();

// Create the store
export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      
      login: async (email: string, password: string) => {
        try {
          set({ isLoading: true, error: null });
          
          // In a real app, you should hash the password before comparing
          const user = await prisma.user.findFirst({
            where: { 
              email,
              password // In production, you'd compare hashed passwords
            },
            select: {
              id: true,
              username: true,
              email: true,
              createdAt: true
            }
          });
          
          if (!user) {
            throw new Error('Invalid email or password');
          }
          
          set({ 
            user, 
            isAuthenticated: true, 
            isLoading: false 
          });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'An unknown error occurred', 
            isLoading: false 
          });
        }
      },
      
      register: async (username: string, email: string, password: string) => {
        try {
          set({ isLoading: true, error: null });
          
          // Check if user already exists
          const existingUser = await prisma.user.findFirst({
            where: {
              OR: [
                { email },
                { username }
              ]
            }
          });
          
          if (existingUser) {
            throw new Error('User with this email or username already exists');
          }
          
          // In a real app, you would hash the password before storing
          const newUser = await prisma.user.create({
            data: {
              username,
              email,
              password, // In production, store hashed password
              // Create default categories
              categories: {
                create: [
                  {
                    name: "Personal",
                    type: "BOTH",
                    colorCode: "#3498db",
                    isDefault: true
                  },
                  {
                    name: "Work",
                    type: "BOTH",
                    colorCode: "#e74c3c",
                    isDefault: true
                  },
                  {
                    name: "Health",
                    type: "HABIT",
                    colorCode: "#2ecc71",
                    isDefault: true
                  },
                  {
                    name: "Errands",
                    type: "TODO",
                    colorCode: "#f39c12",
                    isDefault: true
                  }
                ]
              }
            },
            select: {
              id: true,
              username: true,
              email: true,
              createdAt: true
            }
          });
          
          set({ 
            user: newUser, 
            isAuthenticated: true, 
            isLoading: false 
          });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'An unknown error occurred', 
            isLoading: false 
          });
        }
      },
      
      logout: async () => {
        try {
          set({ isLoading: true });
          // Close any active connections or perform cleanup
          
          set({ 
            user: null, 
            isAuthenticated: false, 
            isLoading: false,
            error: null
          });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Logout failed', 
            isLoading: false 
          });
        }
      },
      
      refreshUserData: async () => {
        const { user } = get();
        if (!user) return;
        
        try {
          set({ isLoading: true });
          
          const refreshedUser = await prisma.user.findUnique({
            where: { id: user.id },
            select: {
              id: true,
              username: true,
              email: true,
              createdAt: true
            }
          });
          
          if (!refreshedUser) {
            throw new Error('User not found');
          }
          
          set({ 
            user: refreshedUser, 
            isLoading: false 
          });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to refresh user data', 
            isLoading: false 
          });
        }
      }
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => mmkvStorage),
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);