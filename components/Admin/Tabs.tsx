import React, { FC } from "react";
import styles from "../../pages/admin/styles.module.css";

type TabsProps = {
  tabs: {
    label: React.ReactNode;
    index: number;
    Component: FC<{ index: number }>;
  }[];
  selectedTab: number;
  onClick: (index: number) => void;
  orientation?: "vertical" | "horizontal";
  className?: string;
};

/**
 * Available Props
 * @param className string
 * @param tab Array of object
 * @param selectedTab number
 * @param onClick Function to set the active tab
 * @param orientation Tab orientation Vertical | Horizontal
 */
const Tabs: FC<TabsProps> = ({
  className = styles.tabComponent,
  tabs = [],
  selectedTab = 0,
  onClick,
  orientation = "horizontal"
}) => {
  const activeTab = tabs.find((tab) => tab.index === selectedTab);

  return (
    <div
      className={
        orientation === "vertical" ? className + " vertical" : className
      }
    >
      <div role="tablist" aria-orientation={orientation}>
        {tabs.map((tab) => (
          <button
            className={selectedTab === tab.index ? "active" : ""}
            onClick={() => onClick(tab.index)}
            key={tab.index}
            type="button"
            role="tab"
            aria-selected={selectedTab === tab.index}
            aria-controls={`tabpanel-${tab.index}`}
            tabIndex={selectedTab === tab.index ? 0 : -1}
            id={`btn-${tab.index}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        aria-labelledby={`btn-${selectedTab}`}
        id={`tabpanel-${selectedTab}`}
      >
        {activeTab && <activeTab.Component index={selectedTab} />}
      </div>
    </div>
  );
};

export default Tabs;
