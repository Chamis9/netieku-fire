
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types/users";
import { useLanguage } from "@/features/language";

interface UserAvatarProps {
  user: User;
  size?: "sm" | "md" | "lg";
  forceRefresh?: boolean;
}

export function UserAvatar({ user, size = "md", forceRefresh = false }: UserAvatarProps) {
  const { currentLanguage } = useLanguage();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(user.avatar_url || null);
  const [refreshKey, setRefreshKey] = useState(Date.now());
  
  const t = (lvText: string, enText: string, ruText?: string) => 
    currentLanguage.code === 'lv' ? lvText : 
    currentLanguage.code === 'ru' ? (ruText || enText) : 
    enText;
  
  const sizeClasses = {
    sm: "h-10 w-10",
    md: "h-16 w-16",
    lg: "h-24 w-24"
  };
  
  // For demo users, check localStorage for avatar
  useEffect(() => {
    if (user.id.startsWith('mock-user-id')) {
      const storedAvatar = localStorage.getItem('demo_user_avatar');
      if (storedAvatar) {
        setAvatarUrl(storedAvatar);
      }
    } else {
      // Add cache busting to force reload
      if (user.avatar_url) {
        const cacheBuster = forceRefresh ? `?t=${refreshKey}` : '';
        setAvatarUrl(`${user.avatar_url}${cacheBuster}`);
      } else {
        setAvatarUrl(null);
      }
    }
  }, [user.id, user.avatar_url, forceRefresh, refreshKey]);
  
  // Force update when avatar_url changes
  useEffect(() => {
    setRefreshKey(Date.now());
  }, [user.avatar_url]);
  
  const getInitials = () => {
    // Get initials from first_name and last_name if available
    const firstInitial = user.first_name ? user.first_name.charAt(0).toUpperCase() : '';
    const lastInitial = user.last_name ? user.last_name.charAt(0).toUpperCase() : '';
    
    if (firstInitial || lastInitial) {
      return `${firstInitial}${lastInitial}`;
    }
    
    // Fallback to email if no name is available
    return user.email ? user.email.substring(0, 2).toUpperCase() : "?";
  };

  return (
    <Avatar className={`${sizeClasses[size]} border-2 border-primary/10`}>
      <AvatarImage 
        src={avatarUrl || ""} 
        alt={t("Lietotāja attēls", "User avatar", "Изображение пользователя")} 
        className="object-cover"
        key={refreshKey} // Add key to force refresh when avatar changes
      />
      <AvatarFallback className="bg-primary/10 text-primary">
        {getInitials()}
      </AvatarFallback>
    </Avatar>
  );
}
