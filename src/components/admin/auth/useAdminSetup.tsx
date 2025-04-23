
import { useState, useEffect } from "react";
import { setupAdminAccount } from "@/utils/authHelpers";

export function useAdminSetup() {
  const [setupComplete, setSetupComplete] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const setupAdmin = async () => {
      setIsInitializing(true);
      try {
        const success = await setupAdminAccount();
        setSetupComplete(success);
        
        if (success) {
          console.log("Administratora konts pieejams lietošanai");
        } else {
          console.error("Neizdevās uzstādīt administratora kontu");
        }
      } catch (error) {
        console.error("Error setting up admin account:", error);
        setSetupComplete(false);
      } finally {
        setIsInitializing(false);
      }
    };
    
    setupAdmin();
  }, []);

  return { setupComplete, isInitializing };
}
