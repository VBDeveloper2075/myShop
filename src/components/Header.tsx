"use client";

import { useState } from "react";
import { ExternalLink, Shirt, Menu, X, Package } from "lucide-react";
import Link from "next/link";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200 bg-zinc-50/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-4">
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-2 -ml-2 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>

          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold tracking-tight text-zinc-900">
              MY ARCHIVE
            </span>
            <span className="text-zinc-300">/</span>
            <span className="text-sm font-medium text-zinc-500">STORE</span>
          </div>
          
          {/* Desktop navigation */}
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
          <span className="hidden xs:inline">Built by CB</span>
          <span className="xs:hidden">CB</span>
          <ExternalLink className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
        </a>
      </div>

      {/* Mobile navigation menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-zinc-200 bg-zinc-50">
          <nav className="flex flex-col p-2">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors"
            >
              <Package className="h-4 w-4" />
              Productos
            </Link>
            <Link
              href="/ropa"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors"
            >
              <Shirt className="h-4 w-4" />
              Ropa y Accesorios
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}



