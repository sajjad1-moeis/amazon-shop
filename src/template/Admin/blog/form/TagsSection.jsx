"use client";

import React from "react";
import { Label } from "@/components/ui/label";

export default function TagsSection({ tags, selectedTagIds, onTagToggle }) {
  return (
    <div className="space-y-2">
      <Label className="text-gray-300">تگ‌ها</Label>
      <div className="flex flex-wrap gap-2 p-3 bg-gray-800 border border-gray-700 rounded-lg">
        {tags.length === 0 ? (
          <span className="text-gray-400 text-sm">تگی یافت نشد</span>
        ) : (
          tags.map((tag) => (
            <label
              key={tag.id}
              className="flex items-center gap-2 cursor-pointer text-gray-300 hover:text-white"
            >
              <input
                type="checkbox"
                checked={selectedTagIds.includes(tag.id)}
                onChange={() => onTagToggle(tag.id)}
                className="w-4 h-4"
              />
              <span>{tag.name}</span>
            </label>
          ))
        )}
      </div>
    </div>
  );
}

