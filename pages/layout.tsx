import Header from "@components/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" bg-slate-50">
      <Header />
      {children}
    </div>
  );
}
