
import React from "react";
import { User } from "@/types/users";
import { useLanguage } from "@/features/language";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle
} from "@/components/ui/card";
import { CreditCard } from "lucide-react";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

interface PaymentsTabProps {
  user: User;
}

export function PaymentsTab({ user }: PaymentsTabProps) {
  const { currentLanguage } = useLanguage();
  const t = (lvText: string, enText: string) => 
    currentLanguage.code === 'lv' ? lvText : enText;
  
  // Demo maksājumu vēsture
  const payments = [
    {
      id: "payment-1",
      date: "2023-08-15",
      amount: "45.00 EUR",
      description: "Biļetes iegāde: Koncerts Dzintaros",
      status: "completed"
    },
    {
      id: "payment-2",
      date: "2023-07-20",
      amount: "25.00 EUR",
      description: "Biļetes iegāde: Teātra izrāde",
      status: "completed"
    },
    {
      id: "payment-3",
      date: "2023-06-10",
      amount: "30.00 EUR",
      description: "Biļetes iegāde: Basketbola spēle",
      status: "failed"
    }
  ];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("Maksājumu vēsture", "Payment History")}</CardTitle>
      </CardHeader>
      <CardContent>
        {payments.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("Datums", "Date")}</TableHead>
                <TableHead>{t("Apraksts", "Description")}</TableHead>
                <TableHead>{t("Summa", "Amount")}</TableHead>
                <TableHead>{t("Statuss", "Status")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell className="font-medium">{payment.description}</TableCell>
                  <TableCell>{payment.amount}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                      payment.status === 'completed' 
                        ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' 
                        : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                    }`}>
                      {payment.status === 'completed' ? t("Pabeigts", "Completed") : t("Neizdevās", "Failed")}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center p-8">
            <CreditCard className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
            <p className="mt-2 text-lg font-medium">{t("Nav maksājumu vēstures", "No payment history")}</p>
            <p className="text-sm text-muted-foreground">{t("Jūs vēl neesat veicis nevienu maksājumu", "You haven't made any payments yet")}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
