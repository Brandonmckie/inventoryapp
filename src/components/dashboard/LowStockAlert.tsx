"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useInventoryStore } from "@/store/useInventoryStore";

export function LowStockAlert() {
    const products = useInventoryStore((state) => state.products);

    // Sort by stock ascending, filter for low stock (<= 5), take top 5
    const lowStockItems = [...products]
        .filter(p => p.stock <= 5)
        .sort((a, b) => a.stock - b.stock)
        .slice(0, 5);

    return (
        <Card className="col-span-1 border-destructive/20 shadow-sm">
            <CardHeader>
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                    Low Stock Alerts
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {lowStockItems.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No low stock items right now.</p>
                    ) : (
                        lowStockItems.map((item) => (
                            <Link href={`/inventory/${item.id}`} key={item.id} className="flex items-center gap-3 p-2 -mx-2 rounded-md hover:bg-muted/50 transition-colors">
                                <Avatar className="h-8 w-8 rounded-md border">
                                    {item.imageUrl && <AvatarImage src={item.imageUrl} alt={item.name} className="object-cover" />}
                                    <AvatarFallback className="bg-muted text-xs">{item.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <div className="space-y-1 flex-1">
                                    <p className="text-sm font-medium leading-none">{item.name}</p>
                                    <p className="text-xs text-muted-foreground">{item.sku}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge variant={item.stock === 0 ? "destructive" : "outline"} className={item.stock > 0 ? "text-orange-500 border-orange-500/20 bg-orange-500/10" : ""}>
                                        {item.stock} left
                                    </Badge>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
