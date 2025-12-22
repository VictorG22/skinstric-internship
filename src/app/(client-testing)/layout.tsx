export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="mt-18.75 min-h-[calc(100vh-75px)]">

    {children}
    </section>
  );
}
