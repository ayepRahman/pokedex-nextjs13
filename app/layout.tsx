import "@styles/globals.css";
import { Providers } from "./provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <title>Pokedex | Nextjs13</title>
      </head>
      <body className="bg-neutral-100">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
