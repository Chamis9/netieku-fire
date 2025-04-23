
import React from "react";
import { PrivacyPolicySection } from "@/features/language/privacyPolicyTranslations";

interface PolicySectionProps {
  section: PrivacyPolicySection;
}

export const PolicySection: React.FC<PolicySectionProps> = ({ section }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl md:text-2xl font-semibold mb-3 text-orange-500">
        {section.title}
      </h2>
      <p className="dark:text-gray-300 text-gray-700 mb-3" dangerouslySetInnerHTML={{ __html: section.content }} />
      
      {section.list && section.list.length > 0 && (
        <ul className="list-disc list-inside dark:text-gray-300 text-gray-700 space-y-2">
          {section.list.map((item, itemIndex) => (
            <li key={itemIndex}>{item}</li>
          ))}
        </ul>
      )}
      
      {section.additionalInfo && (
        <p className="dark:text-gray-300 text-gray-700 mt-3" dangerouslySetInnerHTML={{ __html: section.additionalInfo }} />
      )}
    </div>
  );
};
