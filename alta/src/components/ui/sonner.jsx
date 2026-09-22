import * as React from "react";
import { CheckCircle2, Info, LoaderCircle, XCircle } from "lucide-react";
import { Toaster as Sonner, toast } from "sonner";

function Toaster(props) {
  return (
    <Sonner
      theme="dark"
      position="bottom-center"
      icons={{
        success: <CheckCircle2 className="size-4 text-success" />,
        info: <Info className="size-4 text-accent" />,
        error: <XCircle className="size-4 text-destructive" />,
        loading: <LoaderCircle className="size-4 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast: "border-border bg-[var(--glass-background)] text-foreground shadow-[var(--shadow-raised)] backdrop-blur-[var(--glass-blur)]",
          title: "text-[length:var(--type-body-emphasis-size)] [font-weight:var(--type-body-emphasis-weight)]",
          description: "text-muted-foreground",
          actionButton: "bg-primary text-primary-foreground",
        },
      }}
      {...props}
    />
  );
}

export { Toaster, toast };
