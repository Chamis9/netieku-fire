import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Link } from "react-router-dom";
import { UserCircle, Ticket, Wallet, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/profile/UserAvatar";
import { User } from "@/types/users";
import { useTheme } from "@/components/theme/ThemeProvider";

interface UserHoverCardProps {
  user: User;
  translations: Record<string, string>;
  onLogout: () => void;
  onLinkClick: () => void;
}

export function UserHoverCard({ user, translations, onLogout, onLinkClick }: UserHoverCardProps) {
  const { theme } = useTheme();

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Link
          to={`/profile/${user.id}/account`}
          onClick={onLinkClick}
          className="flex items-center gap-2 text-white hover:text-orange-400 transition-colors relative z-10"
          title="My Profile"
        >
          <UserAvatar user={user} size="sm" />
        </Link>
      </HoverCardTrigger>
      <HoverCardContent 
        className={`w-64 p-0 overflow-hidden 
          ${theme === 'dark' ? 'dark:bg-gray-800 dark:border-gray-700' : ''}`}
      >
        <div className="flex flex-col">
          <div className="flex items-center gap-3 p-4 border-b">
            <UserAvatar user={user} size="md" />
            <div>
              <p className="font-medium text-sm">
                {user.first_name} {user.last_name}
              </p>
            </div>
          </div>
          
          <Link
            to={`/profile/${user.id}/account`}
            className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 block w-full text-left text-sm flex items-center gap-2"
          >
            <UserCircle size={16} />
            {translations.myAccount}
          </Link>
          
          <Link
            to={`/profile/${user.id}/tickets`}
            className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 block w-full text-left text-sm flex items-center gap-2"
          >
            <Ticket size={16} />
            {translations.myTickets}
          </Link>
          
          <Link
            to={`/profile/${user.id}/payments`}
            className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 block w-full text-left text-sm flex items-center gap-2"
          >
            <Wallet size={16} />
            {translations.myPayments}
          </Link>
          
          <div className="border-t">
            <Button
              variant="ghost"
              className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 w-full justify-start text-sm flex items-center gap-2"
              onClick={onLogout}
            >
              <LogOut size={16} />
              {translations.logout}
            </Button>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
