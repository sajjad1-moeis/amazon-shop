"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import TableActions from "../../TableActions";

/**
 * تبدیل لیست دسته‌بندی (مسطح یا درختی) به آرایه‌ای با سطح و نام والد برای نمایش سلسله‌مراتب
 * پشتیبانی از parentId (مسطح) یا children (درختی)
 */
function buildCategoryRows(categories) {
  if (!Array.isArray(categories) || categories.length === 0) return [];

  const byId = new Map();
  categories.forEach((c) => byId.set(c.id, { ...c }));

  // اگر ساختار درختی (children) داریم، مسطح می‌کنیم
  const flat = [];
  function flatten(items, level = 0, parentName = null) {
    if (!Array.isArray(items)) return;
    items.forEach((item) => {
      flat.push({
        ...item,
        _level: level,
        _parentName: parentName,
      });
      if (Array.isArray(item.children) && item.children.length > 0) {
        flatten(item.children, level + 1, item.name);
      }
    });
  }

  const hasChildren = categories.some((c) => Array.isArray(c.children) && c.children.length > 0);
  if (hasChildren) {
    flatten(categories);
    return flat;
  }

  // ساختار مسطح با parentId یا parentCategoryId (مطابق ریسپانس API)
  const withDepth = [];
  const depthCache = new Map();
  const parentKey = (c) => c.parentCategoryId ?? c.parentId;
  function getDepth(id, visited = new Set()) {
    if (visited.has(id)) return 0;
    const cat = byId.get(id);
    if (!cat) return 0;
    const pid = parentKey(cat);
    if (pid == null || pid === "") return 0;
    if (depthCache.has(id)) return depthCache.get(id);
    visited.add(id);
    const d = 1 + getDepth(pid, visited);
    depthCache.set(id, d);
    return d;
  }

  categories.forEach((c) => {
    const depth = getDepth(c.id);
    const pid = parentKey(c);
    const parent = pid != null && pid !== "" ? byId.get(pid) : null;
    withDepth.push({
      ...c,
      _level: depth,
      _parentName: parent ? parent.name : null,
    });
  });

  // ترتیب: والد قبل از فرزند (بر اساس سطح، سپس id)
  withDepth.sort((a, b) => {
    if (a._level !== b._level) return a._level - b._level;
    return (a.id ?? 0) - (b.id ?? 0);
  });

  return withDepth;
}

const getCategoryStatusBadge = (isActive) => (
  <Badge
    variant="outline"
    className={
      isActive
        ? "bg-green-500/20 text-green-400 border-green-500/30"
        : "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  >
    {isActive ? "فعال" : "غیرفعال"}
  </Badge>
);

export default function CategoriesTable({ categories = [], onEdit, onDelete }) {
  const rows = useMemo(() => buildCategoryRows(categories), [categories]);

  if (rows.length === 0) {
    return <div className="p-8 text-center text-gray-400">دسته‌بندی‌ای یافت نشد</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-gray-700 hover:bg-gray-700/50">
            <TableHead className="text-gray-300 w-[80px]">عکس / آیکون</TableHead>
            <TableHead className="text-gray-300">نام</TableHead>
            <TableHead className="text-gray-300">Key (جستجو)</TableHead>
            <TableHead className="text-gray-300">Slug</TableHead>
            <TableHead className="text-gray-300">والد</TableHead>
            <TableHead className="text-gray-300">تعداد محصولات</TableHead>
            <TableHead className="text-gray-300">وضعیت</TableHead>
            <TableHead className="text-gray-300 text-left w-[120px]">عملیات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id} className="border-gray-700 hover:bg-gray-700/50">
              <TableCell className="text-gray-400">
                {row.iconUrl || row.imageUrl ? (
                  <span className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-gray-700 overflow-hidden shrink-0">
                    {row.iconUrl ? (
                      <Image
                        src={row.iconUrl}
                        alt=""
                        width={24}
                        height={24}
                        className="object-contain"
                        unoptimized
                      />
                    ) : (
                      <Image
                        src={row.imageUrl}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="40px"
                        unoptimized
                      />
                    )}
                  </span>
                ) : (
                  <span className="text-gray-500 text-xs">—</span>
                )}
              </TableCell>
              <TableCell className="text-white font-medium">
                <span
                  style={{ paddingRight: (row._level ?? 0) * 24 }}
                  className={row._level > 0 ? "border-r-2 border-amber-500/50 pr-2" : ""}
                >
                  {row._level > 0 && "└ "}
                  {row.name || "-"}
                </span>
              </TableCell>
              <TableCell className="text-gray-300 font-mono text-sm">
                {row.key ?? row.keyName ?? "-"}
              </TableCell>
              <TableCell className="text-gray-400 text-sm">{row.slug || "-"}</TableCell>
              <TableCell className="text-gray-400 text-sm">{row._parentName ?? "-"}</TableCell>
              <TableCell className="text-gray-400">
                {row.productsCount ?? row.productCount ?? row.count ?? 0}
              </TableCell>
              <TableCell>{getCategoryStatusBadge(row.isActive !== false)}</TableCell>
              <TableCell className="text-left">
                <TableActions
                  showView={false}
                  onEdit={() => onEdit?.(row.id)}
                  onDelete={() => onDelete?.(row.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
    </Table>
  );
}
