import React from "react";

type TabProps = {
  children: React.ReactNode;
  label: string;
};

const Tab:React.FC<TabProps> = ({children,label}) => {
  return <div>{children}</div>;
};

export default Tab;
