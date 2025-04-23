
import { supabase } from "@/integrations/supabase/client";
import { User } from "@/types/users";
import { useToast } from "@/hooks/use-toast";

interface AvatarUploadOptions {
  file: File;
  user: User;
  toast: ReturnType<typeof useToast>["toast"];
  t: (lvText: string, enText: string, ruText?: string) => string;
}

export async function uploadAvatarToSupabase({ file, user, toast, t }: AvatarUploadOptions) {
  try {
    // Check if we have a valid session before uploading
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) {
      console.error("No active session found");
      throw new Error("You must be logged in to upload an avatar");
    }
    
    // Create a unique file path using user ID and timestamp
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}/${Date.now()}.${fileExt}`;
    
    console.log("Preparing to upload avatar to path:", fileName);
    console.log("Current user ID:", user.id);
    console.log("Current auth user ID:", sessionData.session.user.id);
    
    // Upload the file to Supabase Storage
    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true
      });
    
    if (error) {
      console.error("Upload error:", error);
      throw error;
    }
    
    console.log("File uploaded successfully, data:", data);
    
    // Get public URL for the uploaded file
    const { data: publicUrlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName);
    
    const publicUrl = publicUrlData?.publicUrl;
    
    if (!publicUrl) {
      console.error("Failed to generate public URL");
      throw new Error("Failed to generate public URL for uploaded avatar");
    }
    
    console.log("Generated public URL:", publicUrl);
    
    // Update the user's avatar URL in the database
    const { error: updateError } = await supabase
      .from('registered_users')
      .update({ 
        avatar_url: publicUrl,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id);
    
    if (updateError) {
      console.error("Database update error:", updateError);
      throw updateError;
    }
    
    toast({
      description: t(
        "Profila attēls veiksmīgi atjaunināts",
        "Profile picture successfully updated",
        "Изображение профиля успешно обновлено"
      )
    });
    
    return publicUrl;
    
  } catch (error) {
    console.error("Error uploading avatar:", error);
    
    let errorMessage = t(
      "Neizdevās augšupielādēt attēlu. Lūdzu, mēģiniet vēlreiz.",
      "Failed to upload image. Please try again.",
      "Не удалось загрузить изображение. Пожалуйста, попробуйте еще раз."
    );
    
    if (error instanceof Error) {
      if (error.message.includes("storage") || error.message.includes("bucket")) {
        errorMessage = t(
          "Failu glabātava nav pieejama. Lūdzu, sazinieties ar administrātoru.",
          "File storage is unavailable. Please contact the administrator.",
          "Хранилище файлов недоступно. Пожалуйста, свяжитесь с администратором."
        );
      } else if (error.message.includes("auth") || error.message.includes("logged in")) {
        errorMessage = t(
          "Jums jāpiesakās, lai augšupielādētu attēlu.",
          "You must be logged in to upload an image.",
          "Вы должны быть авторизованы, чтобы загрузить изображение."
        );
      }
    }
    
    toast({
      variant: "destructive",
      title: t("Kļūda", "Error", "Ошибка"),
      description: errorMessage
    });
    
    return null;
  }
}

export async function handleDemoUserAvatar(file: File, onAvatarUpdate: (url: string) => void, toast: ReturnType<typeof useToast>["toast"], t: (lvText: string, enText: string, ruText?: string) => string) {
  try {
    // Convert file to data URL
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const dataUrl = event.target.result.toString();
        
        // Store in localStorage
        localStorage.setItem('demo_user_avatar', dataUrl);
        
        // Update avatar in state
        onAvatarUpdate(dataUrl);
        
        toast({
          description: t(
            "Profila attēls veiksmīgi atjaunināts",
            "Profile picture successfully updated",
            "Изображение профиля успешно обновлено"
          )
        });
      }
    };
    reader.readAsDataURL(file);
    return true;
  } catch (error) {
    console.error("Error handling demo user avatar:", error);
    toast({
      variant: "destructive",
      title: t("Kļūda", "Error", "Ошибка"),
      description: t(
        "Neizdevās augšupielādēt attēlu. Lūdzu, mēģiniet vēlreiz.",
        "Failed to upload image. Please try again.",
        "Не удалось загрузить изображение. Пожалуйста, попробуйте еще раз."
      )
    });
    return false;
  }
}

export function validateAvatarFile(file: File, toast: ReturnType<typeof useToast>["toast"], t: (lvText: string, enText: string, ruText?: string) => string): boolean {
  // Check file type
  if (!file.type.startsWith('image/')) {
    toast({
      variant: "destructive",
      title: t("Kļūda", "Error", "Ошибка"),
      description: t(
        "Lūdzu, izvēlieties attēla failu",
        "Please select an image file",
        "Пожалуйста, выберите файл изображения"
      )
    });
    return false;
  }
  
  // Check file size (max 2MB)
  if (file.size > 2 * 1024 * 1024) {
    toast({
      variant: "destructive",
      title: t("Kļūda", "Error", "Ошибка"),
      description: t(
        "Attēls ir pārāk liels. Maksimālais izmērs ir 2MB",
        "Image is too large. Maximum size is 2MB",
        "Изображение слишком большое. Максимальный размер - 2МБ"
      )
    });
    return false;
  }
  
  return true;
}
