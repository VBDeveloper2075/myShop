import { ExternalLink, Zap, Database } from "lucide-react";

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
            className="group inline-flex items-center gap-2 text-xs text-zinc-500 transition-colors hover:text-zinc-900"
          >
            <span className="flex items-center gap-1.5">
              <Zap className="h-3 w-3 text-amber-500" />
              <Database className="h-3 w-3 text-emerald-500" />
            </span>
            <span>
              Desarrollado con tecnología <strong className="font-semibold">Jamstack</strong> por{" "}
              <strong className="font-semibold text-zinc-700 group-hover:text-zinc-900">
                CB Jamstack Agency
              </strong>
            </span>
            <ExternalLink className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
          </a>
        </div>
        <div className="mt-4 text-center sm:text-right">
          <p className="text-[10px] text-zinc-400">
            Expertos en velocidad y control de datos
          </p>
        </div>
      </div>
    </footer>
  );
}
