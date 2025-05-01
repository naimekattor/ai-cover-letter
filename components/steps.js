import { cn } from "@/lib/utils";
import { useState, useEffect } from "react"; // Import necessary hooks

export function Steps({ steps }) {
  return (
    <div className="flex items-center justify-center w-full mb-8">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          {index > 0 && (
            <div
              className={cn(
                "h-[2px] w-10 mx-2",
                step.status === "upcoming" ? "bg-gray-200" : "bg-primary"
              )}
            />
          )}
          <div className="flex flex-col items-center gap-1">
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full border-2",
                step.status === "upcoming"
                  ? "border-gray-200 text-gray-400"
                  : step.status === "current"
                  ? "border-primary text-primary"
                  : "border-primary bg-primary text-primary-foreground"
              )}
            >
              {step.icon && <step.icon className="h-5 w-5" />}
            </div>
            <span
              className={cn(
                "text-xs font-medium",
                step.status === "upcoming" ? "text-gray-400" : "text-primary"
              )}
            >
              {step.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
