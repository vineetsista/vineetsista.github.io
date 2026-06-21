import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Bricolage_Grotesque, Instrument_Serif } from 'next/font/google';
import './globals.css';

// Display: characterful grotesque for big statements.
const display = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

// Human accent: an editorial serif italic for the personal voice.
const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});
import { ThemeProvider } from '@/components/shell/ThemeProvider';
import { Shell } from '@/components/shell/Shell';

const SITE = 'https://vineetsista.github.io';

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: 'Vineet Sista — Low-Latency Systems · Quant Dev · AI Products',
  description:
    'The portfolio of Vineet Sista, rendered as a low-latency trading terminal. CS Honors @ Ohio State, JPMorganChase SWE intern. Order books, ML research, and AI products — built to be fast.',
  keywords: [
    'Vineet Sista', 'quantitative developer', 'low-latency systems', 'C++',
    'order book', 'matching engine', 'HFT', 'machine learning', 'Ohio State',
    'JPMorganChase', 'software engineer',
  ],
  authors: [{ name: 'Vineet Sista', url: SITE }],
  creator: 'Vineet Sista',
  openGraph: {
    type: 'website',
    url: SITE,
    title: 'Vineet Sista — Low-Latency Systems · Quant Dev · AI Products',
    description:
      'A portfolio rendered as a live trading terminal. Order books, ML research, AI products — built to be fast.',
    siteName: 'VINEET SISTA // TERMINAL',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Vineet Sista — Terminal' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vineet Sista — Low-Latency Systems · Quant Dev · AI Products',
    description: 'A portfolio rendered as a live trading terminal. Built to be fast.',
    images: ['/og.png'],
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#080b11',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${GeistSans.variable} ${GeistMono.variable} ${display.variable} ${serif.variable}`}
    >
      <body className="font-sans antialiased">
        <ThemeProvider>
          <Shell>{children}</Shell>
        </ThemeProvider>
      </body>
    </html>
  );
}
