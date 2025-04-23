
import { Subscriber, SubscriberFetchResult } from '@/types/subscribers';
import { supabase } from '@/integrations/supabase/client';

/**
 * Filter subscribers based on a search term
 */
export function filterSubscribers(subscribers: Subscriber[], searchTerm: string): Subscriber[] {
  if (!searchTerm) return subscribers;
  
  const lowerCaseSearchTerm = searchTerm.toLowerCase();
  
  return subscribers.filter(subscriber => 
    subscriber.email?.toLowerCase().includes(lowerCaseSearchTerm)
  );
}

/**
 * Fetch subscribers from the database
 */
export async function fetchSubscribers(): Promise<SubscriberFetchResult> {
  try {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching subscribers:", error);
      return { data: null, error };
    }

    return { data: data as Subscriber[], error: null };
  } catch (error) {
    console.error("Unexpected error in fetchSubscribers:", error);
    return { 
      data: null, 
      error: error instanceof Error ? error : new Error('Unknown error occurred') 
    };
  }
}

/**
 * Creates a downloadable CSV blob
 */
export function createDownloadableCSV(subscribers: Subscriber[]): { 
  blob: Blob; 
  filename: string;
} {
  const filename = 'newsletter_subscribers.csv';
  const csvHeader = 'ID,Email,Created At\n';
  let csvContent = csvHeader;

  subscribers.forEach((subscriber) => {
    const row = `${subscriber.id},${subscriber.email},${subscriber.created_at}\n`;
    csvContent += row;
  });

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  
  return { blob, filename };
}

/**
 * Download a CSV file in a cross-browser compatible way
 */
export function downloadBlob(blob: Blob, filename: string): void {
  // Create an anchor element
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  
  // Modern browsers can use the download attribute
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Clean up the URL object
  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 100);
}
