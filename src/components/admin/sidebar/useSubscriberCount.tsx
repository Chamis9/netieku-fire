
import { useState, useEffect } from "react";

/**
 * Custom hook to track subscriber count, listening for updates via custom events
 * @returns Current subscriber count
 */
export function useSubscriberCount() {
  const [subscriberCount, setSubscriberCount] = useState(0);
  
  useEffect(() => {
    // Handler for subscriber count update events
    const handleSubscriberCountUpdate = (event: CustomEvent) => {
      setSubscriberCount(event.detail.count);
    };

    // Cast the event listener to match CustomEvent type
    const eventListener = ((e: Event) => {
      handleSubscriberCountUpdate(e as CustomEvent);
    }) as EventListener;

    // Set up and clean up event listener
    window.addEventListener('subscriberCountUpdated', eventListener);
    return () => {
      window.removeEventListener('subscriberCountUpdated', eventListener);
    };
  }, []);
  
  return subscriberCount;
}
