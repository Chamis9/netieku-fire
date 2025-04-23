
import React, { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { 
  MoreHorizontal, 
  Mail, 
  Trash, 
  Edit,
  Save,
  ArrowUpDown,
  ArrowUp,
  ArrowDown
} from "lucide-react";
import { useLanguage } from "@/features/language";
import { Subscriber } from "@/hooks/useSubscribers";

type SortField = 'id' | 'email' | 'created_at';
type SortDirection = 'asc' | 'desc' | null;

interface SubscriberListTableProps {
  subscribers: Subscriber[];
  onDelete: (id: number) => Promise<void>;
  onUpdate: (id: number, email: string) => Promise<void>;
}

export function SubscriberListTable({ subscribers, onDelete, onUpdate }: SubscriberListTableProps) {
  const [editingSubscriber, setEditingSubscriber] = useState<Subscriber | null>(null);
  const [editedEmail, setEditedEmail] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  
  const { currentLanguage } = useLanguage();
  
  // Translation helper
  const t = (lvText: string, enText: string) => currentLanguage.code === 'lv' ? lvText : enText;

  const handleEditClick = (subscriber: Subscriber) => {
    setEditingSubscriber(subscriber);
    setEditedEmail(subscriber.email || "");
    setDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    if (editingSubscriber && editedEmail.trim() !== "") {
      setIsProcessing(true);
      try {
        await onUpdate(editingSubscriber.id, editedEmail);
        setDialogOpen(false);
      } finally {
        setIsProcessing(false);
        setEditingSubscriber(null);
      }
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm(t('Vai tiešām vēlaties dzēst šo abonentu?', 'Are you sure you want to delete this subscriber?'))) {
      setIsProcessing(true);
      try {
        await onDelete(id);
      } finally {
        setIsProcessing(false);
      }
    }
  };
  
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Cycle through: asc -> desc -> null
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortField(null);
        setSortDirection(null);
      }
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // Sort the subscribers based on sort state
  const sortedSubscribers = [...subscribers];
  if (sortField && sortDirection) {
    sortedSubscribers.sort((a, b) => {
      let valueA = a[sortField];
      let valueB = b[sortField];
      
      // Handle null values
      if (valueA === null) return sortDirection === 'asc' ? -1 : 1;
      if (valueB === null) return sortDirection === 'asc' ? 1 : -1;
      
      // Special case for dates
      if (sortField === 'created_at') {
        valueA = new Date(valueA).getTime();
        valueB = new Date(valueB).getTime();
      }
      
      if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
      if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }
  
  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="ml-1 h-4 w-4" />;
    }
    return sortDirection === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />;
  };

  return (
    <>
      <div className="rounded-md border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button 
                  variant="ghost" 
                  onClick={() => handleSort('id')} 
                  className="p-0 h-auto font-medium text-muted-foreground hover:text-foreground flex items-center"
                >
                  ID
                  {renderSortIcon('id')}
                </Button>
              </TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  onClick={() => handleSort('email')} 
                  className="p-0 h-auto font-medium text-muted-foreground hover:text-foreground flex items-center"
                >
                  {t('E-pasts', 'Email')}
                  {renderSortIcon('email')}
                </Button>
              </TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  onClick={() => handleSort('created_at')} 
                  className="p-0 h-auto font-medium text-muted-foreground hover:text-foreground flex items-center"
                >
                  {t('Pievienošanās datums', 'Join Date')}
                  {renderSortIcon('created_at')}
                </Button>
              </TableHead>
              <TableHead className="text-right">{t('Darbības', 'Actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedSubscribers.length > 0 ? (
              sortedSubscribers.map(subscriber => (
                <TableRow key={subscriber.id}>
                  <TableCell>{subscriber.id}</TableCell>
                  <TableCell className="font-medium">{subscriber.email}</TableCell>
                  <TableCell>
                    {new Date(subscriber.created_at).toLocaleDateString(currentLanguage.code === 'lv' ? 'lv-LV' : 'en-US')}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" disabled={isProcessing}>
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">{t('Izvēlne', 'Menu')}</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditClick(subscriber)}>
                          <Edit className="h-4 w-4 mr-2" />
                          {t('Rediģēt', 'Edit')}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="h-4 w-4 mr-2" />
                          {t('Sūtīt e-pastu', 'Send Email')}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-red-500 focus:text-red-500"
                          onClick={() => handleDelete(subscriber.id)}
                        >
                          <Trash className="h-4 w-4 mr-2" />
                          {t('Dzēst', 'Delete')}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6">
                  {t('Nav atrasts neviens abonents.', 'No subscribers found.')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Subscriber Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('Rediģēt abonentu', 'Edit Subscriber')}</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <label htmlFor="email" className="text-sm font-medium mb-2 block">
              {t('E-pasta adrese', 'Email Address')}
            </label>
            <Input
              id="email"
              value={editedEmail}
              onChange={(e) => setEditedEmail(e.target.value)}
              placeholder="example@example.com"
              disabled={isProcessing}
            />
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" disabled={isProcessing}>{t('Atcelt', 'Cancel')}</Button>
            </DialogClose>
            <Button onClick={handleSaveEdit} disabled={isProcessing}>
              {isProcessing ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t('Saglabā...', 'Saving...')}
                </span>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  {t('Saglabāt', 'Save')}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
