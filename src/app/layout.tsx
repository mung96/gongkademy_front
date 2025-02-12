import localFont from 'next/font/local';
import './globals.css';
import ClientLayout from '@/components/ClientLayout';
import { AuthSessionProvider } from '@/app/AuthSessionProvider';

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
      <body>
        <ClientLayout>
          <AuthSessionProvider>
            <div className="flex h-fit min-h-dvh flex-col items-center">{children}</div>
          </AuthSessionProvider>
        </ClientLayout>
      </body>
    </html>
  );
}
