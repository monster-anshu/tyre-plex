import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import AuthProvider from '~/providers/auth-provider';
import { ReactQueryProvider } from '~/providers/react-query';
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
      <body className={`${poppinSans.variable} antialiased`}>
        <ReactQueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
