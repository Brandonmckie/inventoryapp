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
import { useInventoryStore } from "@/store/useInventoryStore";

export function ProductFilters() {
    const {
        searchQuery, setSearchQuery,
        filterCategory, setFilterCategory,
        filterStatus, setFilterStatus,
        clearFilters
    } = useInventoryStore();

    const hasActiveFilters = filterCategory !== "all" || filterStatus !== "all" || searchQuery !== "";

    return (
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between bg-white p-4 rounded-md border shadow-sm mb-6 w-full">
            <div className="flex flex-1 flex-wrap items-center gap-2 sm:gap-4 w-full lg:w-auto">
                <div className="relative w-full sm:w-72">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search products, SKUs..."
                        className="w-full bg-muted/50 pl-8 rounded-md"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="w-[140px] flex">
                        <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="Frames">Frames</SelectItem>
                        <SelectItem value="Contacts">Contacts</SelectItem>
                        <SelectItem value="Accessories">Accessories</SelectItem>
                    </SelectContent>
                </Select>

                <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-[140px] flex">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="In Stock">In Stock</SelectItem>
                        <SelectItem value="Low Stock">Low Stock</SelectItem>
                        <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                    </SelectContent>
                </Select>

                <Button variant="outline" size="icon" className="shrink-0 lg:hidden">
                    <Filter className="h-4 w-4" />
                </Button>

                <div className="hidden lg:flex items-center gap-2">
                    {filterCategory !== "all" && (
                        <Badge variant="secondary" className="px-2 py-1 flex items-center gap-1 cursor-pointer" onClick={() => setFilterCategory("all")}>
                            {filterCategory} <span className="text-muted-foreground ml-1">×</span>
                        </Badge>
                    )}
                    {filterStatus !== "all" && (
                        <Badge variant="secondary" className="px-2 py-1 flex items-center gap-1 cursor-pointer" onClick={() => setFilterStatus("all")}>
                            {filterStatus} <span className="text-muted-foreground ml-1">×</span>
                        </Badge>
                    )}
                    {hasActiveFilters && (
                        <Button variant="ghost" size="sm" className="h-7 px-2 text-xs text-muted-foreground" onClick={clearFilters}>
                            Clear all
                        </Button>
                    )}
                </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2 w-full lg:w-auto mt-4 lg:mt-0">
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
