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
import { mockProducts } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function ProductTable() {
    const [data] = useState(mockProducts);
    const router = useRouter();

    return (
        <div className="rounded-md border bg-white">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">SKU</TableHead>
                        <TableHead>
                            <Button variant="ghost" className="-ml-4 h-8 data-[state=open]:bg-accent">
                                <span>Product Name</span>
                                <ArrowUpDown className="ml-2 h-4 w-4" />
                            </Button>
                        </TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-right">Stock</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((product) => (
                        <TableRow
                            key={product.id}
                            onClick={() => router.push(`/inventory/${product.id}`)}
                            className="cursor-pointer hover:bg-muted/50 transition-colors"
                        >
                            <TableCell className="font-medium text-muted-foreground">{product.sku}</TableCell>
                            <TableCell className="font-medium">{product.name}</TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                            <TableCell className="text-right">{product.stock}</TableCell>
                            <TableCell>
                                <Badge
                                    variant={
                                        product.status === "In Stock"
                                            ? "outline"
                                            : product.status === "Low Stock"
                                                ? "secondary"
                                                : "destructive"
                                    }
                                    className={`
                    ${product.status === "In Stock"
                                            ? "text-green-600 bg-green-50 border-green-200"
                                            : product.status === "Low Stock"
                                                ? "text-orange-600 bg-orange-50"
                                                : ""
                                        }
                  `}
                                >
                                    {product.status}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                            <span className="sr-only">Open menu</span>
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuItem asChild><Link href={`/inventory/${product.id}`}>View Details</Link></DropdownMenuItem>
                                        <DropdownMenuItem asChild><Link href={`/inventory/${product.id}`}>Edit Product</Link></DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem asChild onClick={(e) => e.stopPropagation()}><Link href={`/inventory/${product.id}`}>Adjust Stock</Link></DropdownMenuItem>
                                        <DropdownMenuItem className="text-destructive" onClick={(e) => {
                                            e.stopPropagation();
                                            alert(`Deleted ${product.name} (Mock)`);
                                        }}>Delete</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="flex items-center justify-end space-x-2 py-4 px-4 border-t">
                <Button variant="outline" size="sm" disabled>
                    Previous
                </Button>
                <Button variant="outline" size="sm" disabled>
                    Next
                </Button>
            </div>
        </div>
    );
}
