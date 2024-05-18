import React, { ReactNode } from "react";

interface IconProps {
  children: ReactNode;
}

export const Icon: React.FC<IconProps> = ({ children }) => {
  return <i className="material-icons">{children}</i>;
};
