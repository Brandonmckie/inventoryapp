import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockRecentActivity } from "@/lib/mock-data";
import { ArrowDownIcon, ArrowUpIcon, Edit3, PackageCheck } from "lucide-react";

export function RecentActivity() {
    const getActionIcon = (action: string) => {
        switch (action) {
            case "Restock":
                return <ArrowUpIcon className="h-4 w-4 text-green-500" />;
            case "Sale":
                return <ArrowDownIcon className="h-4 w-4 text-blue-500" />;
            case "Adjustment":
                return <Edit3 className="h-4 w-4 text-orange-500" />;
            case "New Item":
                return <PackageCheck className="h-4 w-4 text-purple-500" />;
            default:
                return null;
        }
    };

    return (
        <Card className="col-span-full">
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {mockRecentActivity.map((activity) => (
                        <div key={activity.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b last:border-0 pb-4 last:pb-0">
                            <div className="flex items-start gap-4">
                                <div className="mt-1 bg-muted p-2 rounded-full">
                                    {getActionIcon(activity.action)}
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        {activity.action}: {activity.item}
                                    </p>
                                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                                        {activity.user} • {activity.date}
                                        {activity.note && `\nNote: ${activity.note}`}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Badge
                                    variant={activity.quantity > 0 ? "outline" : "secondary"}
                                    className={`
                    ${activity.quantity > 0 ? "text-green-600 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-500/10 dark:border-green-500/20" : ""}
                    ${activity.quantity < 0 ? "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-500/10" : ""}
                  `}
                                >
                                    {activity.quantity > 0 ? "+" : ""}{activity.quantity} units
                                </Badge>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
