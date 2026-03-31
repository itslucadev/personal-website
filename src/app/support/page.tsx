import type { Metadata } from 'next';
import { SupportContent } from '@/components/SupportContent';

export const metadata: Metadata = {
  title: 'Support - Luca Becker',
  description:
    "Get help, find answers to frequently asked questions, or reach out directly. Support hub for Luca Becker's apps and services.",
  robots: 'index, follow',
};

export default function SupportPage() {
  return <SupportContent />;
}
