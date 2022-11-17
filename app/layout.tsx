import "@styles/globals.css";
import { Providers } from "./provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body className="bg-slate-900">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
