"use client";
import React, { useState } from "react";
import useTab from "./hooks/useTab";

type TabContainerProps = {
  children: React.ReactNode;
};

const TabContainer: React.FC<TabContainerProps> = ({ children }) => {
  const { activeTab, handleTabClick } = useTab();

  return (
    <div>
      <div className="flex gap-2">
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            return (
              <button
                className={activeTab === index ? 'rounded-t bg-white p-2 font-bold shadow-inner' : ''}
                onClick={() => handleTabClick(index)}
              >
                {child.props.label}
              </button>
            );
          }
          return null;
        })}
      </div>
      <div className=" pt-6 px-4 pb-4 bg-white rounded-r rounded-bl">
        {React.Children.map(children, (child, index) => {
          if (index === activeTab) {
            return child;
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default TabContainer;
