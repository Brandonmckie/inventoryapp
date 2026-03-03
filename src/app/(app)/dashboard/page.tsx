import { StatsCards } from "@/components/dashboard/StatsCards";
import { TopProducts } from "@/components/dashboard/TopProducts";
import { LowStockAlert } from "@/components/dashboard/LowStockAlert";
import { RecentActivity } from "@/components/dashboard/RecentActivity";

export default function DashboardPage() {
    return (
        <div className="flex-1 space-y-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
            </div>

            <StatsCards />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <TopProducts />
                <LowStockAlert />
            </div>

            <div className="grid gap-4">
                <RecentActivity />
            </div>
        </div>
    );
}
