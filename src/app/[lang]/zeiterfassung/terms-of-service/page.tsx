import type { Metadata } from 'next';

import { LegalDocument } from '../LegalDocument';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Zeiterfassung',
  description: 'Terms and Conditions for the Zeiterfassung app',
  robots: 'noindex, nofollow',
};

export default function TermsOfServicePage() {
  return <LegalDocument file="terms-of-service" />;
}
