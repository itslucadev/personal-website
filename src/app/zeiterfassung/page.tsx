import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Zeiterfassung',
  description: 'Rechtliche Informationen zur Zeiterfassungs-App',
  robots: 'noindex, nofollow',
};

export default function ZeiterfassungPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-8">Zeiterfassung</h1>

        <nav className="space-y-4">
          <Link
            href="/zeiterfassung/privacy-policy"
            className="block p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
          >
            <h2 className="font-semibold">Datenschutzerklärung</h2>
            <p className="text-sm text-muted-foreground">
              Informationen zum Datenschutz und Ihren Rechten
            </p>
          </Link>

          <Link
            href="/zeiterfassung/terms-of-service"
            className="block p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
          >
            <h2 className="font-semibold">Allgemeine Geschäftsbedingungen</h2>
            <p className="text-sm text-muted-foreground">
              Nutzungsbedingungen für die App
            </p>
          </Link>
        </nav>
      </main>
    </div>
  );
}
