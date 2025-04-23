
import { useState, useEffect } from 'react';

const GLOBAL_EMAILS_STORAGE_KEY = 'globalPreviousEmails';

export const usePreviousEmails = () => {
  const [previousEmails, setPreviousEmails] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    try {
      const savedEmails = localStorage.getItem(GLOBAL_EMAILS_STORAGE_KEY);
      if (savedEmails) {
        setPreviousEmails(JSON.parse(savedEmails));
      }
    } catch (error) {
      console.error("Error loading saved emails:", error);
    }
  }, []);

  return {
    previousEmails,
    showDropdown,
    setShowDropdown
  };
};
