
import React from "react";

interface CountryCodeDisplayProps {
  countryCode: string;
  countryAbbr: string;
}

export const CountryCodeDisplay = ({ countryCode, countryAbbr }: CountryCodeDisplayProps) => {
  return (
    <div className="flex items-center space-x-2">
      <span className="font-medium text-xs bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">
        {countryAbbr.toUpperCase()}
      </span>
      <span>{countryCode}</span>
    </div>
  );
};

export default CountryCodeDisplay;
