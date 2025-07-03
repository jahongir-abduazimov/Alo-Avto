"use client";
import { cn } from "@/lib/utils";

interface TabNavigationProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function TabNavigation({
  tabs,
  activeTab,
  onTabChange,
}: TabNavigationProps) {
  return (
    <div className="flex bg-gray-50 rounded-full p-1 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={cn(
            "flex-1 px-4 py-3 text-sm font-medium rounded-full transition-all",
            activeTab === tab
              ? "bg-blue-500 text-white shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
