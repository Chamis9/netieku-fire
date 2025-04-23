
import { supabase } from "@/integrations/supabase/client";
import { Json } from "@/integrations/supabase/types";

export type ActivityType = 'subscriber' | 'user' | 'ticket' | 'system' | 'login' | 'logout' | 'settings';

export interface LogActivityParams {
  activityType: ActivityType;
  description: string;
  userId?: string;
  email?: string;
  metadata?: Record<string, any> | null;
}

/**
 * Logs an activity to the activity_log table
 */
export async function logActivity({
  activityType,
  description,
  userId,
  email,
  metadata
}: LogActivityParams) {
  try {
    const { error } = await supabase
      .from('activity_log')
      .insert({
        activity_type: activityType,
        description,
        user_id: userId,
        email,
        metadata: metadata as Json
      });
    
    if (error) {
      console.error('Error logging activity:', error);
    }
  } catch (error) {
    console.error('Error in logActivity:', error);
  }
}
