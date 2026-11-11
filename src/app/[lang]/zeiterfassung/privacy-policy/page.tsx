import type { Metadata } from 'next';

import { LegalDocument } from '../LegalDocument';

export const metadata: Metadata = {
  title: 'Privacy Policy | Zeiterfassung',
  description: 'Privacy Policy for the Zeiterfassung app',
  robots: 'noindex, nofollow',
};

export default function PrivacyPolicyPage() {
  return <LegalDocument file="privacy-policy" />;
}
