
import { Json } from "@/integrations/supabase/types";

export type ActivityType = 'subscriber' | 'user' | 'ticket' | 'system' | 'login' | 'logout' | 'settings';

export type Activity = {
  id: string;
  activity_type: string; // String to match database type
  description: string;
  email?: string | null;
  created_at: string;
  metadata?: Json | null; // Using Json type from Supabase
  user_id?: string | null;
};

export type ActivityLogModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};
