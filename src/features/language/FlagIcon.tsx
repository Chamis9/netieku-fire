
import React from "react";

interface FlagIconProps {
  countryCode: string;
  className?: string;
}

export const FlagIcon: React.FC<FlagIconProps> = ({ countryCode, className }) => (
  <div className={`w-6 h-4 inline-flex items-center justify-center mr-2 overflow-hidden ${className || ""}`}>
    <img 
      src={`/flags/${countryCode.toLowerCase()}.svg`}
      width="20"
      height="15"
      alt=""
      className="max-w-full max-h-full object-contain"
    />
  </div>
);
