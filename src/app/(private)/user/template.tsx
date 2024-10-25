import DashboardSidebar from "./_components/DashboardSidebar";
import TopbarBanner from "@/components/shared/TopbarBanner";
import Container from "@/components/shared/Container";

export default function template({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <TopbarBanner></TopbarBanner>

      {/* ============== Desktop Version =============== */}
      <div className="min-h-screen bg-primary-white py-10">
        <Container className="items-start gap-x-8 xl:flex">
          <DashboardSidebar />
          <div className="flex-grow">{children}</div>
        </Container>
      </div>
    </div>
  );
}
