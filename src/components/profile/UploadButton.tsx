
import React from "react";
import { Button } from "@/components/ui/button";
import { Upload, Loader2 } from "lucide-react";

interface UploadButtonProps {
  isUploading: boolean;
  onClick: () => void;
  label: string;
  loadingLabel: string;
}

export function UploadButton({ isUploading, onClick, label, loadingLabel }: UploadButtonProps) {
  return (
    <Button 
      variant="outline" 
      size="sm" 
      className="w-full"
      onClick={onClick}
      disabled={isUploading}
    >
      {isUploading ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          {loadingLabel}
        </>
      ) : (
        <>
          <Upload className="h-4 w-4 mr-2" />
          {label}
        </>
      )}
    </Button>
  );
}
