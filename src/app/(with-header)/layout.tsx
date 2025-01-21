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
      <div className="h-full px-4 pt-9 tablet:px-6 tablet:pt-12 desktop:pt-16">{children}</div>
      <Footer />
    </>
  );
}
