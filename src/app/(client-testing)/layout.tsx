export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="top-12.5">

    {children}
    </section>
  );
}
