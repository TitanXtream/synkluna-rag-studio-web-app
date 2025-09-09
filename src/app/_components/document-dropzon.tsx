"use client";

import React from "react";
import { cn } from "@/utils/tw-utils"; // or replace with your cn util
import { TrashIcon } from "lucide-react";

type DropzoneProps = {
  className?: string;
  accept?: string[]; // e.g. ['application/pdf','application/msword']
  maxSizeMB?: number; // per file
  multiple?: boolean;
  onChange?: (files: File[]) => void;
};

export default function DocumentDropzone({
  className,
  accept = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "text/plain",
    "application/zip",
    "image/png",
    "image/jpeg",
  ],
  maxSizeMB = 20,
  multiple = true,
  onChange,
}: DropzoneProps) {
  const [isDragging, setDragging] = React.useState(false);
  const [files, setFiles] = React.useState<File[]>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const acceptSet = React.useMemo(() => new Set(accept), [accept]);
  const maxBytes = maxSizeMB * 1024 * 1024;

  function validate(list: File[]) {
    const ok: File[] = [];
    const errors: string[] = [];
    for (const f of list) {
      // type check (allow by mime OR by extension if browser missing type)
      const typeOk =
        acceptSet.size === 0 ||
        acceptSet.has(f.type) ||
        [...acceptSet].some(
          (a) => a.endsWith("/*") && f.type.startsWith(a.replace("/*", ""))
        ) ||
        // fallback by extension
        [...acceptSet].some(
          (a) => a.includes("/") === false && f.name.toLowerCase().endsWith(a)
        );
      if (!typeOk) {
        errors.push(`❌ ${f.name}: unsupported type (${f.type || "unknown"})`);
        continue;
      }
      if (f.size > maxBytes) {
        errors.push(`❌ ${f.name}: too large (> ${maxSizeMB}MB)`);
        continue;
      }
      ok.push(f);
    }
    if (errors.length) {
      alert(errors.join("\n"));
    }
    return ok;
  }

  function addFiles(list: File[]) {
    const valid = validate(list);
    const next = multiple ? [...files, ...valid] : valid.slice(0, 1);
    setFiles(next);
    onChange?.(next);
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    const dtFiles = Array.from(e.dataTransfer.files || []);
    addFiles(dtFiles);
  }

  function onBrowse(e: React.ChangeEvent<HTMLInputElement>) {
    const inputFiles = Array.from(e.target.files || []);
    addFiles(inputFiles);
    e.target.value = ""; // allow reselect same files
  }

  function removeAt(i: number) {
    const next = files.filter((_, idx) => idx !== i);
    setFiles(next);
    onChange?.(next);
  }

  return (
    <div className={cn("w-full py-4", className)}>
      <div
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
        onClick={() => inputRef.current?.click()}
        onDragEnter={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setDragging(false);
        }}
        onDrop={onDrop}
        aria-label="Upload documents"
        className={cn(
          "relative flex flex-col items-center justify-center gap-2 rounded-2xl border border-white/10 p-4 text-center transition text-white",
          "bg-gradient-to-r from-primary1/20 via-primary2-500/20 to-primary1-500/20",
          "hover:from-primary2/30 hover:to-primary2-500/30 cursor-pointer",
          isDragging ? "ring-2 ring-offset-0 ring-primary2-400/60" : "ring-0"
        )}
      >
        {/* Glow backdrop */}
        <div className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-primary1 to-primary2 opacity-20 blur-2xl" />

        <div className="rounded-full bg-black/40 px-3 py-1 text-xs uppercase tracking-wide">
          Drag & drop files
        </div>
        <div className="text-sm opacity-80">
          or <span className="font-semibold ">click to browse</span>
        </div>

        <div className="text-xs opacity-60">
          Allowed: PDF, DOCX, XLSX, TXT, ZIP, PNG, JPG · Max {maxSizeMB}MB each
        </div>

        <input
          ref={inputRef}
          type="file"
          multiple={multiple}
          className="hidden"
          accept={accept
            .map((a) => (a.includes("/") ? a : `.${a.replace(/^\./, "")}`))
            .join(",")}
          onChange={onBrowse}
        />
      </div>

      {files.length > 0 && (
        <ul className=" mt-2 divide-y divide-white/5 rounded-xl border border-white/10 text-white overflow-auto max-h-[150px]">
          {files.map((f, i) => (
            <li
              key={i}
              className="flex items-center justify-between gap-3 pl-4 h-10"
            >
              <div className="min-w-0">
                <p className="truncate text-[0.65rem] font-medium">{f.name}</p>
                <p className="text-[0.60rem] opacity-60">
                  {(f.size / (1024 * 1024)).toFixed(2)} MB ·{" "}
                  {f.type || "unknown"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => removeAt(i)}
                className=" text-xs hover:bg-gradient-to-r from-primary to-secondary h-full max-w aspect-square shrink-0 flex items-center justify-center hover:text-primary1"
                aria-label={`Remove ${f.name}`}
              >
                <TrashIcon className="w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
