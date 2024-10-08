import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <main className="min-h-screen">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
