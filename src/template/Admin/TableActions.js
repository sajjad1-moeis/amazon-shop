"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash } from "iconsax-reactjs";

export default function TableActions({
  onView,
  onEdit,
  onDelete,
  showView = true,
  showEdit = true,
  showDelete = true,
  customActions,
}) {
  return (
    <div className="flex items-center gap-2">
      {showView && (
        <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-400 hover:bg-blue-400/20" onClick={onView}>
          <Eye size={18} />
        </Button>
      )}
      {showEdit && (
        <Button variant="ghost" size="icon" className="h-8 w-8 text-green-400 hover:bg-green-400/20" onClick={onEdit}>
          <Edit size={18} />
        </Button>
      )}
      {showDelete && (
        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400 hover:bg-red-400/20" onClick={onDelete}>
          <Trash size={18} />
        </Button>
      )}
      {customActions}
    </div>
  );
}

