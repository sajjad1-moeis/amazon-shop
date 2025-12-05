import { cn } from "@/lib/utils";
import React from "react";

function TitreCard({ title, className, titleClassName }) {
  return (
    <div className={cn("flex items-center gap-3 mb-8", className)}>
      <div className="w-1 h-8 bg-primary-400 dark:bg-dark-title rounded-l"></div>
      <h2 className={cn("text-xl md:text-2xl font-bold text-primary-600 dark:text-dark-titre", titleClassName)}>
        {title}
      </h2>
    </div>
  );
}

export default TitreCard;
