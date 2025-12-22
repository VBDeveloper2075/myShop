import { ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-zinc-400">
            Venta privada de artículos personales. Sin garantía comercial.
          </p>
          <a
            href="https://cbagency.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 text-xs text-zinc-400 transition-colors hover:text-zinc-900"
          >
            <span>Web desarrollada por CB Agency</span>
            <ExternalLink className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
          </a>
        </div>
      </div>
    </footer>
  );
}



