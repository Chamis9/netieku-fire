
import { useLanguage } from "@/features/language";
import { getPrivacyPolicyContent, PrivacyPolicyContent } from "@/features/language/privacyPolicyTranslations";

export const usePrivacyPolicy = (): PrivacyPolicyContent => {
  const { currentLanguage } = useLanguage();
  return getPrivacyPolicyContent(currentLanguage.code);
};
