
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel 
} from "@/components/ui/form";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { Save, RefreshCw, Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/features/language";
import { languages } from "@/features/language";
import { useTheme } from "@/components/theme/ThemeProvider";

const appearanceFormSchema = z.object({
  theme: z.enum(["light", "dark", "system"]),
  language: z.string()
});

interface AppearanceAndLanguageProps {
  cardTitle?: string;
  cardDescription?: string;
  formDescriptionText?: string;
}

export function AppearanceAndLanguage({
  cardTitle,
  cardDescription,
  formDescriptionText
}: AppearanceAndLanguageProps) {
  const { toast } = useToast();
  const { currentLanguage, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  
  // Translation helper
  const t = (lvText: string, enText: string, ruText?: string) => {
    if (currentLanguage.code === 'lv') return lvText;
    if (currentLanguage.code === 'ru') return ruText || enText;
    return enText;
  };
  
  // Appearance settings form
  const appearanceForm = useForm<z.infer<typeof appearanceFormSchema>>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues: {
      theme: theme as "light" | "dark" | "system",
      language: currentLanguage.code
    },
  });
  
  const onAppearanceSubmit = (values: z.infer<typeof appearanceFormSchema>) => {
    console.log(values);
    setTheme(values.theme);
    const newLanguage = languages.find(lang => lang.code === values.language);
    if (newLanguage) {
      setLanguage(newLanguage);
    }
    toast({
      description: t(
        "Izskats un valodas iestatījumi ir veiksmīgi saglabāti", 
        "Appearance and language settings saved successfully",
        "Настройки внешнего вида и языка успешно сохранены"
      ),
    });
  };

  const handleThemeChange = (checked: boolean) => {
    const newTheme = checked ? "dark" : "light";
    setTheme(newTheme);
    
    toast({
      description: checked 
        ? t("Tumšais motīvs ieslēgts", "Dark mode enabled", "Тёмный режим включен") 
        : t("Gaišais motīvs ieslēgts", "Light mode enabled", "Светлый режим включен"),
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {cardTitle || t("Izskats un valoda", "Appearance and Language", "Внешний вид и язык")}
        </CardTitle>
        <CardDescription>
          {cardDescription || t(
            "Pārvaldiet lietotāja saskarnes izskatu un valodu", 
            "Manage the user interface appearance and language",
            "Управляйте внешним видом и языком пользовательского интерфейса"
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <FormLabel>{t("Tumšais motīvs", "Dark Mode", "Темный режим")}</FormLabel>
            <p className="text-sm text-muted-foreground">
              {t(
                "Ieslēdziet tumšo motīvu, lai samazinātu acu slodzi", 
                "Turn on dark mode to reduce eye strain",
                "Включите темный режим, чтобы уменьшить нагрузку на глаза"
              )}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Sun className="h-4 w-4 text-muted-foreground" />
            <Switch 
              checked={theme === "dark"}
              onCheckedChange={handleThemeChange}
            />
            <Moon className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
        
        <Form {...appearanceForm}>
          <form onSubmit={appearanceForm.handleSubmit(onAppearanceSubmit)}>
            <FormField
              control={appearanceForm.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("Valoda", "Language", "Язык")}</FormLabel>
                  <FormControl>
                    <Select 
                      onValueChange={(value) => {
                        field.onChange(value);
                        const newLanguage = languages.find(lang => lang.code === value);
                        if (newLanguage) {
                          setLanguage(newLanguage);
                          toast({
                            description: t(
                              `Valoda nomainīta uz: ${newLanguage.name}`, 
                              `Language changed to: ${newLanguage.name}`,
                              `Язык изменен на: ${newLanguage.name}`
                            ),
                          });
                        }
                      }} 
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={t("Izvēlēties valodu", "Select language", "Выбрать язык")} />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map(language => (
                          <SelectItem key={language.code} value={language.code}>
                            <div className="flex items-center gap-2">
                              <span>{language.flag}</span>
                              <span>{language.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    {formDescriptionText || t(
                      "Izvēlieties valodu", 
                      "Choose the language",
                      "Выберите язык"
                    )}
                  </FormDescription>
                </FormItem>
              )}
            />
            
            <div className="mt-6 flex justify-end space-x-2">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => appearanceForm.reset()}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                {t("Atiestatīt", "Reset", "Сбросить")}
              </Button>
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                {t("Saglabāt izmaiņas", "Save changes", "Сохранить изменения")}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
