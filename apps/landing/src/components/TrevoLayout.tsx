import React from "react";
import TrevoNavbar from "./TrevoNavbar";
import TrevoFooter from "./TrevoFooter";
import InteractiveParticles from "./InteractiveParticles";

interface TrevoLayoutProps {
  children: React.ReactNode;
}

const TrevoLayout: React.FC<TrevoLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <InteractiveParticles />
      <TrevoNavbar />
      <main className="flex-grow relative z-10">
        {children}
      </main>
      <TrevoFooter />
    </div>
  );
};

export default TrevoLayout;
