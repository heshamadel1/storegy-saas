/**
 * Dashboard page component that displays the business dashboard with key metrics, charts, top products, and team performance sections
 */
import { MetricsOverview } from "@/components/dashboard/metrics-overview";
import { QuickActions } from "@/components/dashboard/quick-actions";

const Dashboard = () => {
  return (
    <div className="flex-1 space-y-6 px-4 pt-0 md:px-6">
      {/* Dashboard Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center md:gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>

          <p className="text-start text-muted-foreground">
            Welcome to your admin dashboard
          </p>
        </div>
        <QuickActions />
      </div>

      {/* Dashboard Content */}
      <div className="@container/main space-y-6">
        {/* Key Metrics */}
        <MetricsOverview />
        {/* Charts */}
        <div className="grid grid-cols-1 gap-6 @5xl/main:grid-cols-2">
          {/* TODO: Add dashboard charts */}
        </div>
        {/* Top Products */}
        <div className="grid grid-cols-1 gap-6 @5xl/main:grid-cols-2">
          {/* TODO: Add top products and related insights */}
        </div>
        {/* Team Performance */}
        <div>{/* TODO: Add team performance section */}</div>
      </div>
    </div>
  );
};

export default Dashboard;
