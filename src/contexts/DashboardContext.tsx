// src/contexts/DashboardContext.tsx
'use client';

import React, { createContext, useState, ReactNode, useContext } from 'react';

interface DashboardContextProps {
  selectedPrompt: string | null;
  setSelectedPrompt: (prompt: string) => void;
  selectedRatio: string | null;
  setSelectedRatio: (ratio: string) => void;
}

export const DashboardContext = createContext<DashboardContextProps | undefined>(undefined);

interface DashboardProviderProps {
  children: ReactNode;
}

export const DashboardProvider = ({ children }: DashboardProviderProps) => {
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
  const [selectedRatio, setSelectedRatio] = useState<string | null>(null);

  return (
    <DashboardContext.Provider value={{ selectedPrompt, setSelectedPrompt, selectedRatio, setSelectedRatio }}>
      {children}
    </DashboardContext.Provider>
  );
};

// Custom hook for using the DashboardContext
export const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboardContext must be used within a DashboardProvider');
  }
  return context;
};
