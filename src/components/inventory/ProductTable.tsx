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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, ArrowUpDown, Plus, Minus } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useInventoryStore, Product } from "@/store/useInventoryStore";

export function ProductTable() {
    const { products, deleteProduct, adjustStock, searchQuery, filterCategory, filterStatus } = useInventoryStore();
    const router = useRouter();

    const [adjustProduct, setAdjustProduct] = useState<Product | null>(null);
    const [adjustAmount, setAdjustAmount] = useState<string>("0");

    const handleOpenAdjust = (product: Product, e: React.MouseEvent) => {
        e.stopPropagation();
        setAdjustProduct(product);
        setAdjustAmount(product.stock.toString());
    };

    const handleSaveAdjust = () => {
        if (adjustProduct) {
            const num = parseInt(adjustAmount, 10);
            if (!isNaN(num) && num >= 0) {
                adjustStock(adjustProduct.id, num);
            }
            setAdjustProduct(null);
        }
    };

    const handleIncrement = () => {
        setAdjustAmount(prev => {
            const val = parseInt(prev, 10);
            return (isNaN(val) ? 1 : val + 1).toString();
        });
    };

    const handleDecrement = () => {
        setAdjustAmount(prev => {
            const val = parseInt(prev, 10);
            return Math.max(0, isNaN(val) ? 0 : val - 1).toString();
        });
    };

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.sku.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = filterCategory === "all" || product.category === filterCategory;
        const matchesStatus = filterStatus === "all" || product.status === filterStatus;

        return matchesSearch && matchesCategory && matchesStatus;
    });

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
                    {filteredProducts.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                                No products found matching your filters.
                            </TableCell>
                        </TableRow>
                    ) : (
                        filteredProducts.map((product) => (
                            <TableRow
                                key={product.id}
                                onClick={() => router.push(`/inventory/${product.id}`)}
                                className="cursor-pointer hover:bg-muted/50 transition-colors"
                            >
                                <TableCell className="font-medium text-muted-foreground">{product.sku}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-8 w-8 rounded-md border shadow-sm">
                                            {product.imageUrl && <AvatarImage src={product.imageUrl} alt={product.name} className="object-cover" />}
                                            <AvatarFallback className="bg-muted text-xs">{product.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                        <span className="font-medium">{product.name}</span>
                                    </div>
                                </TableCell>
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
                                            <Button variant="ghost" className="h-8 w-8 p-0" onClick={(e) => e.stopPropagation()}>
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem asChild><Link href={`/inventory/${product.id}`}>View Details</Link></DropdownMenuItem>
                                            <DropdownMenuItem asChild><Link href={`/inventory/${product.id}?edit=true`}>Edit Product</Link></DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={(e) => handleOpenAdjust(product, e)}>Adjust Stock</DropdownMenuItem>
                                            <DropdownMenuItem className="text-destructive" onClick={(e) => {
                                                e.stopPropagation();
                                                deleteProduct(product.id);
                                            }}>Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
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

            <Dialog open={!!adjustProduct} onOpenChange={(open) => !open && setAdjustProduct(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Quick Adjust Stock</DialogTitle>
                        <DialogDescription>
                            Update the stock level for <span className="font-medium text-foreground">{adjustProduct?.name}</span> ({adjustProduct?.sku}).
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="flex items-center justify-center space-x-4">
                            <Button variant="outline" size="icon" onClick={handleDecrement} className="h-10 w-10 shrink-0 text-destructive border-destructive/20 hover:bg-destructive/10">
                                <Minus className="h-4 w-4" />
                            </Button>
                            <Input
                                type="number"
                                value={adjustAmount}
                                onChange={(e) => setAdjustAmount(e.target.value)}
                                className="w-24 text-center font-bold text-lg h-10"
                            />
                            <Button variant="outline" size="icon" onClick={handleIncrement} className="h-10 w-10 shrink-0 text-green-600 border-green-200 hover:bg-green-50">
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setAdjustProduct(null)}>Cancel</Button>
                        <Button onClick={handleSaveAdjust}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
