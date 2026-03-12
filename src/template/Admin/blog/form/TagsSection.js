"use client";

import React from "react";

export default function TagsSection({ tags, selectedTagIds, onTagToggle }) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider pb-2 border-b border-gray-700/60">
        تگ‌ها
      </h3>
      <div className="flex flex-wrap gap-2 p-4 bg-gray-800/50 border border-gray-700/60 rounded-xl">
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





