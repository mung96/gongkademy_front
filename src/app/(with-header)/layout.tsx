import Header from '@/components/Header';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full border-2 border-system-red-100 px-4 tablet:px-6">
      <Header />
      {children}
    </div>
  );
}
