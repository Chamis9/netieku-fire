
import React, { useEffect, useState } from "react";
import { useSubscribers } from "@/hooks/useSubscribers";
import { useLanguage } from "@/features/language";
import { SubscriberListHeader } from "@/components/admin/subscribers/SubscriberListHeader";
import { SubscriberListTable } from "@/components/admin/subscribers/SubscriberListTable";
import { EmptyOrErrorState } from "@/components/admin/subscribers/EmptyOrErrorState";
import { AddSubscriberDialog } from "@/components/admin/subscribers/AddSubscriberDialog";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";

export function AdminSubscribers() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  const { 
    subscribers, 
    searchTerm, 
    isLoading, 
    error, 
    isAuth,
    handleSearch, 
    handleDeleteSubscriber,
    handleUpdateSubscriber,
    handleDownloadCSV,
    refreshSubscribers,
    totalSubscribers
  } = useSubscribers();
  
  const { currentLanguage } = useLanguage();
  
  const t = (lvText: string, enText: string) => currentLanguage.code === 'lv' ? lvText : enText;

  const handleRetry = () => {
    console.log("Manual refresh triggered");
    refreshSubscribers();
  };

  // Share the total subscribers count with the parent component
  useEffect(() => {
    // Using CustomEvent to pass data to parent component
    const event = new CustomEvent('subscriberCountUpdated', { 
      detail: { count: totalSubscribers } 
    });
    window.dispatchEvent(event);
  }, [totalSubscribers]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('E-pasta abonenti', 'Email Subscribers')}</h1>
        <p className="text-muted-foreground">{t('Pārvaldiet jūsu jaunumu abonentu sarakstu', 'Manage your newsletter subscriber list')}</p>
      </div>
      
      <div className="flex justify-end">
        <Button 
          onClick={handleRetry}
          variant="outline"
          disabled={isLoading}
          className="flex items-center"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          {t('Atjaunot datus no datubāzes', 'Refresh Data from Database')}
        </Button>
      </div>
      
      {!isAuth && (
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            <h3 className="font-medium">{t('Autentifikācijas kļūda', 'Authentication Error')}</h3>
          </div>
          <p className="mt-2 text-sm">
            {t('Jums jāpieslēdzas ar administratora kontu, lai piekļūtu abonentiem.', 
              'You need to sign in with an administrator account to access subscribers.')}
          </p>
        </div>
      )}
      
      {isAuth && (
        <>
          <SubscriberListHeader 
            searchTerm={searchTerm}
            onSearchChange={handleSearch}
            onDownloadCSV={handleDownloadCSV}
            onAddSubscriber={() => setIsAddDialogOpen(true)}
          />
          
          {isLoading ? (
            <EmptyOrErrorState 
              isLoading={true} 
              error=""
            />
          ) : error ? (
            <div className="bg-red-50 border border-red-200 p-4 rounded-md text-red-800 dark:bg-red-900/20 dark:text-red-200">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                <h3 className="font-medium">{t('Datu ielādes kļūda', 'Data Loading Error')}</h3>
              </div>
              <p className="mt-2 text-sm">{error}</p>
              <div className="mt-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleRetry}
                  className="flex items-center"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  {t('Mēģināt vēlreiz', 'Try Again')}
                </Button>
              </div>
            </div>
          ) : subscribers.length === 0 && searchTerm ? (
            <EmptyOrErrorState 
              isLoading={false} 
              error=""
              searchTerm={searchTerm} 
            />
          ) : subscribers.length === 0 ? (
            <div className="flex justify-center items-center h-64 text-center">
              <div>
                <p className="text-muted-foreground">
                  {t('Nav neviena abonenta. Pievienojiet pirmo abonentu, izmantojot jaunumu pietiekšanās formu vai pievienojot manuāli.', 
                    'No subscribers yet. Add your first subscriber using the newsletter signup form or add one manually.')}
                </p>
                <div className="flex justify-center gap-2 mt-4">
                  <Button variant="outline" onClick={handleRetry}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    {t('Atsvaidzināt datus', 'Refresh Data')}
                  </Button>
                  <Button onClick={() => setIsAddDialogOpen(true)}>
                    {t('Pievienot abonentu', 'Add Subscriber')}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <SubscriberListTable 
              subscribers={subscribers} 
              onDelete={handleDeleteSubscriber}
              onUpdate={handleUpdateSubscriber}
            />
          )}
          
          <AddSubscriberDialog 
            open={isAddDialogOpen}
            onClose={() => setIsAddDialogOpen(false)}
            onSubscriberAdded={refreshSubscribers}
          />
        </>
      )}
    </div>
  );
}

// Add default export for lazy loading compatibility
export default AdminSubscribers;
