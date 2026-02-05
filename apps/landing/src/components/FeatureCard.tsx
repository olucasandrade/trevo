import React, { useState } from "react";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
  badge?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  delay = 0,
  badge,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`trevo-card opacity-0 animate-fade-in-up transition-all duration-300 ${isHovered ? 'scale-105 bg-trevo-purple/10 border-trevo-purple/40' : ''}`}
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`bg-gradient-to-br from-trevo-purple to-trevo-dark-purple rounded-full w-12 h-12 flex items-center justify-center transition-transform duration-300 ${isHovered ? 'rotate-12 scale-110' : ''}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        {badge && (
          <span className="text-xs px-2 py-1 bg-trevo-purple/20 text-trevo-light-purple rounded-full">
            {badge}
          </span>
        )}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-white/70">{description}</p>
    </div>
  );
};

export default FeatureCard;
