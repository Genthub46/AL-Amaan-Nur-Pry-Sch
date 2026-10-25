import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AL-Amaanah Nursery & Primary School, Ado-Ekiti | Portal',
  description: 'Center for Western Academic Excellence, Holy Quran Tahfeez & Sound Islamic Character in Ado-Ekiti, Ekiti State, Nigeria.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-school-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
