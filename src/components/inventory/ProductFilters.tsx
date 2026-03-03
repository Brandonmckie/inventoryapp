"use client";

import { Search, Filter, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export function ProductFilters() {
    return (
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-md border shadow-sm mb-6">
            <div className="flex flex-1 items-center gap-4 w-full sm:w-auto">
                <div className="relative w-full sm:w-72">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search products, SKUs..."
                        className="w-full bg-muted/50 pl-8 rounded-md"
                    />
                </div>

                <Select defaultValue="all">
                    <SelectTrigger className="w-[140px] flex">
                        <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="frames">Frames</SelectItem>
                        <SelectItem value="contacts">Contacts</SelectItem>
                        <SelectItem value="accessories">Accessories</SelectItem>
                    </SelectContent>
                </Select>

                <Select defaultValue="all">
                    <SelectTrigger className="w-[140px] flex">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="in_stock">In Stock</SelectItem>
                        <SelectItem value="low_stock">Low Stock</SelectItem>
                        <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                    </SelectContent>
                </Select>

                <Button variant="outline" size="icon" className="shrink-0 lg:hidden">
                    <Filter className="h-4 w-4" />
                </Button>

                <div className="hidden lg:flex items-center gap-2">
                    <Badge variant="secondary" className="px-2 py-1 flex items-center gap-1 cursor-pointer">
                        Frames <span className="text-muted-foreground ml-1">×</span>
                    </Badge>
                    <Button variant="ghost" size="sm" className="h-7 px-2 text-xs text-muted-foreground">
                        Clear all
                    </Button>
                </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto mt-4 sm:mt-0">
                <Button variant="outline" className="w-full sm:w-auto" onClick={() => alert("Exporting data to CSV...")}>
                    Export CSV
                </Button>
                <Link href="/inventory/new" className="w-full sm:w-auto block">
                    <Button className="w-full sm:w-auto">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Product
                    </Button>
                </Link>
            </div>
        </div>
    );
}
