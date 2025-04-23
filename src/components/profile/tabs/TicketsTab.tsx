
import React from "react";
import { User } from "@/types/users";
import { useLanguage } from "@/features/language";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Ticket as TicketIcon,
  Tag,
  Calendar,
  Clock
} from "lucide-react";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

interface TicketsTabProps {
  user: User;
}

export function TicketsTab({ user }: TicketsTabProps) {
  const { currentLanguage } = useLanguage();
  const t = (lvText: string, enText: string) => 
    currentLanguage.code === 'lv' ? lvText : enText;
  
  // Demo biļešu dati
  const myTickets = [
    {
      id: "ticket-1",
      event: "Koncerts Dzintaros",
      price: "45.00 EUR",
      date: "2023-07-15",
      status: "active"
    },
    {
      id: "ticket-2",
      event: "Teātra izrāde",
      price: "25.00 EUR",
      date: "2023-08-20",
      status: "used"
    }
  ];
  
  const purchasedTickets = [
    {
      id: "purchase-1",
      event: "Basketbola spēle",
      price: "30.00 EUR",
      date: "2023-09-05",
      status: "active"
    }
  ];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("Manas biļetes", "My Tickets")}</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="listed">
          <TabsList className="mb-4">
            <TabsTrigger value="listed">
              {t("Pievienotās biļetes", "Listed Tickets")}
            </TabsTrigger>
            <TabsTrigger value="purchased">
              {t("Iegādātās biļetes", "Purchased Tickets")}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="listed">
            {myTickets.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("Notikums", "Event")}</TableHead>
                    <TableHead>{t("Cena", "Price")}</TableHead>
                    <TableHead>{t("Datums", "Date")}</TableHead>
                    <TableHead>{t("Statuss", "Status")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {myTickets.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell className="font-medium">{ticket.event}</TableCell>
                      <TableCell>{ticket.price}</TableCell>
                      <TableCell>{ticket.date}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                          ticket.status === 'active' 
                            ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' 
                            : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                        }`}>
                          {ticket.status === 'active' ? t("Aktīva", "Active") : t("Izmantota", "Used")}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center p-8">
                <TicketIcon className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                <p className="mt-2 text-lg font-medium">{t("Nav pievienotu biļešu", "No listed tickets")}</p>
                <p className="text-sm text-muted-foreground">{t("Jūs vēl neesat pievienojis nevienu biļeti pārdošanā", "You haven't listed any tickets for sale yet")}</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="purchased">
            {purchasedTickets.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("Notikums", "Event")}</TableHead>
                    <TableHead>{t("Cena", "Price")}</TableHead>
                    <TableHead>{t("Datums", "Date")}</TableHead>
                    <TableHead>{t("Statuss", "Status")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {purchasedTickets.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell className="font-medium">{ticket.event}</TableCell>
                      <TableCell>{ticket.price}</TableCell>
                      <TableCell>{ticket.date}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                          ticket.status === 'active' 
                            ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' 
                            : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                        }`}>
                          {ticket.status === 'active' ? t("Aktīva", "Active") : t("Izmantota", "Used")}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center p-8">
                <Tag className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                <p className="mt-2 text-lg font-medium">{t("Nav iegādātu biļešu", "No purchased tickets")}</p>
                <p className="text-sm text-muted-foreground">{t("Jūs vēl neesat iegādājies nevienu biļeti", "You haven't purchased any tickets yet")}</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
