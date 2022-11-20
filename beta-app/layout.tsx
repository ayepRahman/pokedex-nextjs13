import Header from "@components/Header";
import "@styles/globals.css";
import Head from "./head";
import { Providers } from "./provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <Head />
      <body className="bg-neutral-100">
        <Providers>
          <Header></Header>

          {children}
        </Providers>
      </body>
    </html>
  );
}
