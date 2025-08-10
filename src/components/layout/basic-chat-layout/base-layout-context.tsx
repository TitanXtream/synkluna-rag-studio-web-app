"use client";
import React from "react";

interface BaseLayoutContextType {
  isSideBarOpen: boolean;
  setIsSideBarOpen: (open: boolean) => void;
}

const baseLayoutContext = React.createContext<BaseLayoutContextType>({
  isSideBarOpen: false,
  setIsSideBarOpen: (open: boolean) => {},
});

const BaseLayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSideBarOpen, setIsSideBarOpen] = React.useState(false);
  return (
    <baseLayoutContext.Provider value={{ isSideBarOpen, setIsSideBarOpen }}>
      {children}
    </baseLayoutContext.Provider>
  );
};

export default BaseLayoutProvider;

export const useBaseLayoutContext = () => {
  const context = React.useContext(baseLayoutContext);
  if (!context) {
    throw new Error(
      "useBaseLayoutContext must be used within a BaseLayoutProvider"
    );
  }
  return context;
};
