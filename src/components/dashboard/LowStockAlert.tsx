import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockLowStock } from "@/lib/mock-data";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

export function LowStockAlert() {
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
                    {mockLowStock.map((item) => (
                        <Link href={`/inventory/${item.id}`} key={item.id} className="flex items-center justify-between p-2 -mx-2 rounded-md hover:bg-muted/50 transition-colors">
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">{item.name}</p>
                                <p className="text-xs text-muted-foreground">{item.sku}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Badge variant={item.stock === 0 ? "destructive" : "outline"} className={item.stock > 0 ? "text-orange-500 border-orange-500/20 bg-orange-500/10" : ""}>
                                    {item.stock} left
                                </Badge>
                            </div>
                        </Link>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
