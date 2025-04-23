import React from "react";
import { useLanguage } from "@/features/language";
import { UserAvatar } from "./UserAvatar";
import { User } from "@/types/users";
import { useTheme } from "@/components/theme/ThemeProvider";
import {
  User as UserIcon,
  Ticket,
  CreditCard,
  Settings,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface ProfileSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  user: User | null;
}

export function ProfileSidebar({ activeTab, onTabChange, user }: ProfileSidebarProps) {
  const { currentLanguage } = useLanguage();
  const { theme } = useTheme();
  const { logout, lastAvatarUpdate } = useAuth();
  const { toast } = useToast();
  
  const t = (lvText: string, enText: string, ruText?: string) => {
    if (currentLanguage.code === 'lv') return lvText;
    if (currentLanguage.code === 'ru') return ruText || enText;
    return enText;
  };
  
  const handleLogout = async () => {
    try {
      await logout();
      toast({
        description: t(
          "Jūs esat veiksmīgi izgājis no sistēmas",
          "You have been successfully logged out",
          "Вы успешно вышли из системы"
        ),
      });
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        variant: "destructive",
        description: t(
          "Kļūda izejot no sistēmas",
          "Error during logout process",
          "Ошибка при выходе из системы"
        ),
      });
    }
  };
  
  const navItems = [
    {
      id: "account",
      icon: <UserIcon size={18} />,
      label: t("Mans konts", "My Account", "Мой аккаунт")
    },
    {
      id: "tickets",
      icon: <Ticket size={18} />,
      label: t("Manas biļetes", "My Tickets", "Мои билеты")
    },
    {
      id: "payments",
      icon: <CreditCard size={18} />,
      label: t("Mani maksājumi", "My Payments", "Мои платежи")
    },
    {
      id: "settings",
      icon: <Settings size={18} />,
      label: t("Iestatījumi", "Settings", "Настройки")
    }
  ];
  
  const fullName = user && (user.first_name || user.last_name) 
    ? [user.first_name, user.last_name].filter(Boolean).join(" ")
    : t("Lietotājs", "User", "Пользователь");
  
  const completeUserObject: User = user ? {
    id: user.id,
    email: user.email,
    first_name: user.first_name || null,
    last_name: user.last_name || null,
    phone: user.phone || null,
    last_sign_in_at: user.last_sign_in_at || null,
    created_at: user.created_at || new Date().toISOString(),
    updated_at: user.updated_at || null,
    role: user.role || 'user',
    status: user.status || 'active',
    avatar_url: user.avatar_url || null
  } : {
    id: "",
    email: "",
    last_sign_in_at: null,
    created_at: new Date().toISOString(),
    updated_at: null,
    status: 'active'
  };
  
  return (
    <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col items-center space-y-2">
          <UserAvatar user={completeUserObject} size="lg" forceRefresh={true} />
          <h2 className="text-xl font-semibold mt-2">
            {fullName}
          </h2>
          <p className="text-sm text-muted-foreground">
            {user ? user.email : ""}
          </p>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <Button 
            key={item.id}
            variant={activeTab === item.id ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => onTabChange(item.id)}
          >
            <span className="mr-2">{item.icon}</span> {item.label}
          </Button>
        ))}
      </nav>
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <Button 
          variant="destructive"
          className="w-full justify-start"
          onClick={handleLogout}
        >
          <LogOut size={18} className="mr-2" />
          {t("Iziet", "Logout", "Выйти")}
        </Button>
      </div>
    </aside>
  );
}
