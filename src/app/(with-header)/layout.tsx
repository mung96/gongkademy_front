export default function Layout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={'border-2 border-system-red-100 h-full px-4 tablet:px-6'}>
      {children}
    </div>
  );
}
