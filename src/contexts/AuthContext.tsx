
import React, { createContext, useContext } from "react";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { User } from "@/types/users";

interface AuthContextType {
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  userEmail: string | null;
  user: User | null;
  logout: () => Promise<void>;
  refreshUserData: () => Promise<void>;
  lastAvatarUpdate: number;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isAuthLoading: true,
  userEmail: null,
  user: null,
  logout: async () => {},
  refreshUserData: async () => {},
  lastAvatarUpdate: Date.now(),
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useSupabaseAuth();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};
