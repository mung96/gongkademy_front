import localFont from 'next/font/local';
import './globals.css';
import ClientLayout from '@/components/ClientLayout';
import { Metadata } from 'next';
import GoogleAnalytics from '@/lib/GoogleAnalytics';

export const metadata: Metadata = {
  title: '공카데미',
  description: '공카데미',
  icons: {
    icon: '/assets/공카데미로고.png',
  },
};

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable} font-pretendard`}>
      {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
      ) : null}
      <body>
        <ClientLayout>
          <div className="flex h-fit min-h-dvh flex-col items-center">{children}</div>
        </ClientLayout>
      </body>
    </html>
  );
}
