import "./styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="light text-foreground bg-background">
        <NextUIProvider>{children}</NextUIProvider>
      </body>
    </html>
  );
}
