import type { Metadata } from 'next';
import '../styles/globals.css';
import AppProviders from '../components/AppProviders';
import Template from './template';
import CustomCursor from '../components/CustomCursor';

export const metadata: Metadata = {
  title: 'Ocean Explorer — Journey Into The Deep',
  description: 'A cinematic, immersive scroll-driven journey into the world\'s oceans.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <AppProviders>
          <Template>{children}</Template>
          <CustomCursor />
        </AppProviders>
      </body>
    </html>
  );
}
