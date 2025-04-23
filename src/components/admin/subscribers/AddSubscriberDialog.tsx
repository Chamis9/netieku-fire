
import React, { useState } from "react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/features/language";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface AddSubscriberDialogProps {
  open: boolean;
  onClose: () => void;
  onSubscriberAdded: () => void;
}

export function AddSubscriberDialog({ 
  open, 
  onClose, 
  onSubscriberAdded 
}: AddSubscriberDialogProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { currentLanguage } = useLanguage();
  
  const t = (lvText: string, enText: string) => currentLanguage.code === 'lv' ? lvText : enText;
  
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        variant: "destructive",
        description: t("E-pasta adrese ir obligāta", "Email address is required")
      });
      return;
    }
    
    if (!isValidEmail(email)) {
      toast({
        variant: "destructive",
        description: t("Lūdzu, ievadiet derīgu e-pasta adresi", "Please enter a valid email address")
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .insert({ email })
        .select();
      
      if (error) {
        if (error.code === '23505') { // Unique violation error code
          toast({
            variant: "destructive",
            description: t("Šī e-pasta adrese jau eksistē", "This email address already exists")
          });
        } else {
          console.error("Error adding subscriber:", error);
          toast({
            variant: "destructive",
            description: t("Kļūda pievienojot abonentu", "Error adding subscriber")
          });
        }
      } else {
        toast({
          description: t("Abonents veiksmīgi pievienots", "Subscriber added successfully")
        });
        setEmail("");
        onSubscriberAdded();
        onClose();
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      toast({
        variant: "destructive",
        description: t("Kļūda pievienojot abonentu", "Error adding subscriber")
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={(value) => !value && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("Pievienot jaunu abonentu", "Add new subscriber")}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="grid w-full items-center gap-2">
            <label htmlFor="email" className="text-sm font-medium">
              {t("E-pasta adrese", "Email address")}
            </label>
            <Input
              id="email"
              type="email"
              placeholder="example@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              required
            />
          </div>
          
          <DialogFooter className="pt-4">
            <DialogClose asChild>
              <Button variant="outline" type="button" disabled={isSubmitting}>
                {t("Atcelt", "Cancel")}
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("Pievieno...", "Adding...")}
                </>
              ) : (
                t("Pievienot", "Add")
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
