
import React from "react";
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from "lucide-react";
import { useLanguage } from "@/features/language";

interface ContactInfoProps {
  translations: {
    companyName: string;
    addressTitle: string;
    address: string;
    emailTitle: string;
    email: string;
    phoneTitle: string;
    phone: string;
    socialTitle: string;
  };
}

export const ContactInfo: React.FC<ContactInfoProps> = ({ translations: t }) => {
  return (
    <div className="space-y-8 bg-white/95 dark:bg-gray-800/95 p-6 rounded-lg shadow-lg">
      <div className="space-y-1">
        <h3 className="text-xl font-semibold text-orange-500">{t.companyName}</h3>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <MapPin className="text-orange-500" size={24} />
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{t.addressTitle}</h3>
        </div>
        <p className="pl-9 text-gray-700 dark:text-gray-200 font-medium">{t.address}</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <Mail className="text-orange-500" size={24} />
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{t.emailTitle}</h3>
        </div>
        <p className="pl-9">
          <a href={`mailto:${t.email}`} className="text-gray-700 dark:text-gray-200 font-medium hover:text-orange-500 transition-colors">
            {t.email}
          </a>
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <Phone className="text-orange-500" size={24} />
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{t.phoneTitle}</h3>
        </div>
        <p className="pl-9">
          <a href="tel:+37120000000" className="text-gray-700 dark:text-gray-200 font-medium hover:text-orange-500 transition-colors">
            {t.phone}
          </a>
        </p>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{t.socialTitle}</h3>
        <div className="flex space-x-4 pl-2">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
             className="p-2 bg-gray-800/80 dark:bg-white/10 rounded-full hover:bg-gray-900 dark:hover:bg-white/20 transition-colors" 
             aria-label="Instagram">
            <Instagram size={20} className="text-white" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
             className="p-2 bg-gray-800/80 dark:bg-white/10 rounded-full hover:bg-gray-900 dark:hover:bg-white/20 transition-colors"
             aria-label="Facebook">
            <Facebook size={20} className="text-white" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
             className="p-2 bg-gray-800/80 dark:bg-white/10 rounded-full hover:bg-gray-900 dark:hover:bg-white/20 transition-colors"
             aria-label="X (Twitter)">
            <Twitter size={20} className="text-white" />
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer"
             className="p-2 bg-gray-800/80 dark:bg-white/10 rounded-full hover:bg-gray-900 dark:hover:bg-white/20 transition-colors"
             aria-label="TikTok">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="text-white"
            >
              <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};
