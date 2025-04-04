import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="h-fit min-h-dvh w-full">{children}</div>
      <Footer />
    </>
  );
}
