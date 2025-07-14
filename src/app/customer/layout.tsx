import CustomerAppBar from "@/components/layout/customer-app-bar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-red-100 pb-20">
      {children}
      <CustomerAppBar />
    </div>
  );
}
