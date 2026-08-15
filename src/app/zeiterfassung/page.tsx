import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Zeiterfassung",
  description: "Rechtliche Informationen zur Zeiterfassungs-App",
  robots: "noindex, nofollow",
};

export default function ZeiterfassungPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="mb-8 font-bold text-3xl">Zeiterfassung</h1>

        <nav className="space-y-4">
          <Link
            className="block rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
            href="/zeiterfassung/privacy-policy"
          >
            <h2 className="font-semibold">Datenschutzerklärung</h2>
            <p className="text-muted-foreground text-sm">
              Informationen zum Datenschutz und Ihren Rechten
            </p>
          </Link>

          <Link
            className="block rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
            href="/zeiterfassung/terms-of-service"
          >
            <h2 className="font-semibold">Allgemeine Geschäftsbedingungen</h2>
            <p className="text-muted-foreground text-sm">
              Nutzungsbedingungen für die App
            </p>
          </Link>
        </nav>
      </main>
    </div>
  );
}
