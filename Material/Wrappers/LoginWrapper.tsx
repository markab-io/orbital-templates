import React, { ReactNode } from "react";

interface LoginWrapperProps {
  backgroundImage: string;
  children: ReactNode;
}

const LoginWrapper: React.FC<LoginWrapperProps> = ({
  backgroundImage,
  children,
}) => {
  return (
    <main
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        width: "100%",
        height: "1000px",
        objectFit: "cover",
      }}
    >
      {children}
    </main>
  );
};

export default LoginWrapper;
