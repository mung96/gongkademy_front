export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full px-4 border-2 border-system-red-100 tablet:px-6">
      {children}
    </div>
  );
}
