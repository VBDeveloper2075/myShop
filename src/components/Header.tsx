"use client";

import { ExternalLink } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200 bg-zinc-50/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold tracking-tight text-zinc-900">
            MY ARCHIVE
          </span>
          <span className="text-zinc-300">/</span>
          <span className="text-sm font-medium text-zinc-500">STORE</span>
        </div>
        
        <a
          href="https://cbagency.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-1.5 text-xs text-zinc-400 transition-colors hover:text-zinc-900"
        >
          <span>Built by CB</span>
          <ExternalLink className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
        </a>
      </div>
    </header>
  );
}



