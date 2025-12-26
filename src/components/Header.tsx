"use client";

import { ExternalLink, Shirt } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200 bg-zinc-50/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold tracking-tight text-zinc-900">
              MY ARCHIVE
            </span>
            <span className="text-zinc-300">/</span>
            <span className="text-sm font-medium text-zinc-500">STORE</span>
          </div>
          
          <nav className="hidden sm:flex items-center gap-1 ml-4">
            <Link
              href="/"
              className="px-3 py-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded transition-colors"
            >
              Productos
            </Link>
            <Link
              href="/ropa"
              className="px-3 py-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded transition-colors flex items-center gap-1.5"
            >
              <Shirt className="h-3.5 w-3.5" />
              Ropa
            </Link>
          </nav>
        </div>
        
        <a
          href="https://si-cb-vendes-mejor.com.ar"
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



