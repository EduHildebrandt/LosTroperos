"use client";

import React, { useState } from "react";
import { seedDatabase } from "@/services/productService";
import { Database, CheckCircle, AlertTriangle, RefreshCw } from "lucide-react";

export default function DatabaseSeedBanner() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleSeed = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await seedDatabase();
      setResult(res);
    } catch (err: unknown) {
      setResult({
        success: false,
        message: err instanceof Error ? err.message : String(err),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f5ede0] border-b border-[#dfd2be] px-4 py-2.5 text-xs text-[#4d2f1f]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-[#8c5836] shrink-0" />
          <span>
            <strong>Base de Datos PostgreSQL (Prisma ORM):</strong> Modo resiliente activo. Podés configurar tu{" "}
            <code className="bg-[#ebdcc9] px-1.5 py-0.5 rounded text-[11px] font-mono text-[#3d2314]">
              DATABASE_URL
            </code>{" "}
            en <code className="bg-[#ebdcc9] px-1.5 py-0.5 rounded text-[11px] font-mono">.env.local</code> para sincronizar en vivo.
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleSeed}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg leather-gradient text-amber-100 font-bold hover:brightness-110 active:scale-95 transition-all text-[11px] shadow-xs disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Sembrar Catálogo en PostgreSQL</span>
          </button>
        </div>
      </div>

      {result && (
        <div
          className={`max-w-7xl mx-auto mt-2 p-2.5 rounded-xl text-xs flex items-center gap-2 ${
            result.success
              ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
              : "bg-amber-100 text-amber-900 border border-amber-300"
          }`}
        >
          {result.success ? (
            <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
          )}
          <span>{result.message}</span>
        </div>
      )}
    </div>
  );
}
