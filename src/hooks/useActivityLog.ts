
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Activity } from "@/components/admin/activity/types";
import { useLanguage } from "@/features/language";

export function useActivityLog(pageSize = 10, enabled = true) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { currentLanguage } = useLanguage();
  
  const t = (lvText: string, enText: string, ruText?: string) => {
    if (currentLanguage.code === 'lv') return lvText;
    if (currentLanguage.code === 'ru') return ruText || enText;
    return enText;
  };
  
  const fetchActivities = async () => {
    if (!enabled) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const { count, error: countError } = await supabase
        .from('activity_log')
        .select('*', { count: 'exact', head: true });
      
      if (countError) {
        throw countError;
      }
      
      if (count !== null) {
        setTotalCount(count);
      }
      
      const from = (currentPage - 1) * pageSize;
      const to = from + pageSize - 1;
      
      const { data, error } = await supabase
        .from('activity_log')
        .select('*')
        .order('created_at', { ascending: false })
        .range(from, to);
      
      if (error) {
        throw error;
      }
      
      setActivities(data as Activity[] || []);
    } catch (err) {
      console.error('Error fetching activities:', err);
      setError(t(
        'Neizdevās ielādēt aktivitātes. Lūdzu, mēģiniet vēlreiz.', 
        'Failed to load activities. Please try again.',
        'Не удалось загрузить действия. Пожалуйста, попробуйте еще раз.'
      ));
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fetch activities when enabled, currentPage changes
  useEffect(() => {
    if (enabled) {
      fetchActivities();
    }
  }, [enabled, currentPage]);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  const totalPages = Math.ceil(totalCount / pageSize);
  
  return {
    activities,
    isLoading,
    error,
    totalCount,
    currentPage,
    totalPages,
    handlePageChange,
    refresh: fetchActivities
  };
}
