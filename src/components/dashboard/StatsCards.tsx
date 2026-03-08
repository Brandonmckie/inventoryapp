"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Package, AlertCircle, TrendingUp } from "lucide-react";
import { useInventoryStore } from "@/store/useInventoryStore";

export function StatsCards() {
    const products = useInventoryStore((state) => state.products);

    const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);
    const totalProducts = products.length;
    const lowStockItems = products.filter(p => p.stock <= 5).length;
    const categoriesCount = new Set(products.map(p => p.category)).size;

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground flex items-center mt-1">
                        <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                        <span className="text-green-500 font-medium">+20.1%</span> from last month
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{totalProducts}</div>
                    <p className="text-xs text-muted-foreground flex items-center mt-1">
                        <span className="text-muted-foreground font-medium">Live from Inventory</span>
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Low Stock Alerts</CardTitle>
                    <AlertCircle className="h-4 w-4 text-destructive" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-destructive">{lowStockItems}</div>
                    <p className="text-xs text-muted-foreground flex items-center mt-1">
                        <span className="text-muted-foreground font-medium">Items with ≤ 5 stock</span>
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Categories</CardTitle>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground"
                    >
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{categoriesCount}</div>
                    <p className="text-xs text-muted-foreground flex items-center mt-1">
                        Across all inventory
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
