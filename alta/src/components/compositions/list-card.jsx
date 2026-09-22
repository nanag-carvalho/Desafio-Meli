import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "cn";

function ListCard({ className, title, action, children }) {
  return (
    <Card className={cn("gap-2", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {action && <div data-slot="card-action">{action}</div>}
      </CardHeader>
      <CardContent className="grid gap-2">{children}</CardContent>
    </Card>
  );
}

export { ListCard };
