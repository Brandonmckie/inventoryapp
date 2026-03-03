import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

const topProducts = [
    { rank: 1, name: "Ray-Ban Aviator", category: "Frames", sales: 124, revenue: "$18,600" },
    { rank: 2, name: "Acuvue Oasys", category: "Contacts", sales: 89, revenue: "$4,005" },
    { rank: 3, name: "Oakley Holbrook", category: "Frames", sales: 67, revenue: "$9,045" },
    { rank: 4, name: "Lens Cleaning Kit", category: "Accessories", sales: 210, revenue: "$3,150" },
    { rank: 5, name: "Tom Ford FT5401", category: "Frames", sales: 42, revenue: "$13,440" },
];

export function TopProducts() {
    return (
        <Card className="col-span-2">
            <CardHeader>
                <CardTitle>Top Products</CardTitle>
                <CardDescription>
                    Best performing items this month by sales volume.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-8">
                    {topProducts.map((product) => (
                        <Link href={`/inventory/${product.rank}`} key={product.rank} className="flex items-center hover:bg-muted/50 p-2 -mx-2 rounded-md transition-colors">
                            <Avatar className="h-9 w-9 flex items-center justify-center space-y-0 border bg-muted/50 rounded-md">
                                <AvatarFallback className="bg-transparent text-xs font-medium">#{product.rank}</AvatarFallback>
                            </Avatar>
                            <div className="ml-4 space-y-1">
                                <p className="text-sm font-medium leading-none">{product.name}</p>
                                <p className="text-sm text-muted-foreground">{product.category}</p>
                            </div>
                            <div className="ml-auto font-medium text-right hover:text-primary transition-colors">
                                <p className="text-sm">{product.sales} sold</p>
                                <p className="text-xs text-muted-foreground">{product.revenue}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
