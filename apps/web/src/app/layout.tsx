import "~/app/_styles/globals.css";
import Provider from "~/app/_components/providers/provider";
import { Toaster } from 'react-hot-toast';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="light h-[100vh] w-100 text-foreground bg-background">
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
