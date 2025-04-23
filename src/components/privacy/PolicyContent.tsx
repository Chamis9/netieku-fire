
import React from "react";
import { PolicySection } from "./PolicySection";
import { PrivacyPolicyContent } from "@/features/language/privacyPolicyTranslations";

interface PolicyContentProps {
  content: PrivacyPolicyContent;
}

export const PolicyContent: React.FC<PolicyContentProps> = ({ content }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">
        <span className="text-orange-500">{content.title}</span>
      </h1>
      <p className="dark:text-gray-300 text-gray-600 text-sm mb-8">{content.lastUpdated}</p>

      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg mb-8 dark:text-gray-300 text-gray-700">{content.intro}</p>
        
        {content.sections.map((section, index) => (
          <PolicySection key={index} section={section} />
        ))}
      </div>
    </div>
  );
};
