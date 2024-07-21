import Provider from "./_components/providers/provider";
import "./styles/globals.css";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="light text-foreground bg-background">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
