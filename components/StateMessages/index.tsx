import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

 function AlertDestructive() {
  return (
    <Alert variant="destructive" className="max-w-md">
      <AlertCircleIcon />
      <AlertTitle>Error loading Recipes</AlertTitle>
      <AlertDescription>
        The recipes could not be loaded. Please check your network connection.
      </AlertDescription>
    </Alert>
  );
}

import { cn } from "cn";
import { LoaderIcon } from "lucide-react";

 function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  );
}

 function SpinnerCustom() {
  return (
    <div className="flex items-center gap-4">
      <Spinner />
    </div>
  );
}

export { AlertDestructive, Spinner, SpinnerCustom };
