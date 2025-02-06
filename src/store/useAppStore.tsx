import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const mockCredentials = {
  email: "test@example.com",
  password: "password123",
};

export interface User {
  email: string;
  name: string;
  profilePic: string | null;
}

export interface ChatMessage {
  content: string;
  role: "system" | "user" | "assistant";
}

interface AppState {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  setUser: (user: User) => void;

  messages: ChatMessage[];
  addMessage: (message: ChatMessage) => void;
  updateLastMessage: (partialText: string) => void;
  resetChat: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      login: (email, password) => {
        if (
          email === mockCredentials.email &&
          password === mockCredentials.password
        ) {
          const newUser: User = {
            email,
            name: "Test User",
            profilePic: null,
          };

          set({ user: newUser });

          return true;
        }

        return false;
      },
      logout: () => {
        set({ user: null });
      },
      setUser: (user) => {
        set({ user });
      },

      messages: [],
      addMessage: (message) => {
        set((state) => ({ messages: [...state.messages, message] }));
      },
      updateLastMessage: (token: string) => {
        set((state) => {
          const messages = [...state.messages];

          if (messages.length > 0) {
            const lastMessage = messages[messages.length - 1];

            if (lastMessage.role === "assistant") {
              lastMessage.content += token;
            }
          }

          return { messages };
        });
      },
      resetChat: () => set({ messages: [] }),
    }),
    {
      name: "chat-app-storage",
      getStorage: () => AsyncStorage,
    }
  )
);
