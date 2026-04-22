import type { Metadata } from 'next';

import ServiciiClientPage from './servicii-client';

export const metadata: Metadata = {
  title: 'Servicii Duo Dent',
  description:
  'Descoperă serviciile Duo Dent, organizate pe categorii, cu informații orientative despre disponibilitate, locații și prețuri.',
};

export default function ServiciiPage() {
  return <ServiciiClientPage />;
}
