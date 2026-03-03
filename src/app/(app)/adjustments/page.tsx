"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, ArrowUpIcon, ArrowDownIcon, Edit3, PackageCheck, Download } from "lucide-react";
import { mockRecentActivity } from "@/lib/mock-data";

export default function AdjustmentsLogPage() {
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
        <div className="flex-1 space-y-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Adjustments Log</h2>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-md border shadow-sm">
                <div className="flex flex-1 items-center gap-4 w-full sm:w-auto">
                    <div className="relative w-full sm:w-72">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search items, users, notes..."
                            className="w-full bg-muted/50 pl-8 rounded-md"
                        />
                    </div>

                    <Button variant="outline" className="hidden sm:flex" onClick={() => alert("Filter by Type modal would open here.")}>
                        <Filter className="h-4 w-4 mr-2" />
                        Filter by Type
                    </Button>

                    <Button variant="outline" className="hidden sm:flex" onClick={() => alert("Filter by Date modal would open here.")}>
                        <Filter className="h-4 w-4 mr-2" />
                        Filter by Date
                    </Button>
                </div>

                <Button variant="outline" className="w-full sm:w-auto">
                    <Download className="h-4 w-4 mr-2" />
                    Export Log
                </Button>
            </div>

            <div className="rounded-md border bg-white">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[180px]">Date & Time</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Item</TableHead>
                            <TableHead className="text-right">Qty Change</TableHead>
                            <TableHead>User</TableHead>
                            <TableHead>Notes</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mockRecentActivity.map((activity) => (
                            <TableRow key={activity.id}>
                                <TableCell className="font-medium text-muted-foreground">{activity.date}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        {getActionIcon(activity.action)}
                                        <span>{activity.action}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium">{activity.item}</TableCell>
                                <TableCell className="text-right">
                                    <Badge
                                        variant={activity.quantity > 0 ? "outline" : "secondary"}
                                        className={`
                      ${activity.quantity > 0 ? "text-green-600 bg-green-50 border-green-200" : ""}
                      ${activity.quantity < 0 ? "text-blue-600 bg-blue-50" : ""}
                    `}
                                    >
                                        {activity.quantity > 0 ? "+" : ""}{activity.quantity}
                                    </Badge>
                                </TableCell>
                                <TableCell>{activity.user}</TableCell>
                                <TableCell className="text-muted-foreground text-sm max-w-[200px] truncate">
                                    {activity.note || "-"}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
