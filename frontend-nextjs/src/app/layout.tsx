import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppinSans = Poppins({
  variable: '--font-poppins-sans',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Next App',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppinSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
