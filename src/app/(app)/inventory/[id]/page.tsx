"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Edit, Printer, Plus, Minus } from "lucide-react";
import Link from "next/link";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useInventoryStore, Product } from "@/store/useInventoryStore";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetFooter,
} from "@/components/ui/sheet";

import JsBarcode from "jsbarcode";
import { useRef } from "react";

export default function ProductDetailPage() {
    const params = useParams();
    const id = params?.id as string;
    const searchParams = useSearchParams();
    const router = useRouter();
    const { products, adjustStock, updateProduct } = useInventoryStore();

    const product = products.find(p => p.id === id);

    const [isEditOpen, setIsEditOpen] = useState(false);
    const [quickAdjustAmount, setQuickAdjustAmount] = useState("1");
    // Form state for edit
    const [editForm, setEditForm] = useState<Partial<Product>>({});

    const handleEditImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditForm(prev => ({ ...prev, imageUrl: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const barcodeRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (product && !isEditOpen) {
            const t = setTimeout(() => setEditForm(product), 0);
            return () => clearTimeout(t);
        }
    }, [product, isEditOpen]);

    useEffect(() => {
        if (searchParams?.get("edit") === "true") {
            const t = setTimeout(() => {
                setIsEditOpen(true);
                router.replace(`/inventory/${id}`, { scroll: false });
            }, 0);
            return () => clearTimeout(t);
        }
    }, [searchParams, id, router]);

    // To sync quick adjust amount with product stock initially and when product changes
    useEffect(() => {
        if (product) {
            const t = setTimeout(() => setQuickAdjustAmount(product.stock.toString()), 0);
            return () => clearTimeout(t);
        }
    }, [product]);

    // Render Barcode
    useEffect(() => {
        if (product?.sku && barcodeRef.current) {
            JsBarcode(barcodeRef.current, product.sku, {
                format: "CODE128",
                width: 2,
                height: 60,
                displayValue: true,
                margin: 0,
                background: "transparent",
            });
        }
    }, [product?.sku]);

    if (!product) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center p-8 print:hidden">
                <h2 className="text-2xl font-bold">Product not found</h2>
                <Link href="/inventory" className="mt-4">
                    <Button variant="outline">Back to Inventory</Button>
                </Link>
            </div>
        );
    }

    const handleQuickAdjustSubmit = () => {
        const amount = parseInt(quickAdjustAmount, 10);
        if (!isNaN(amount) && amount >= 0) {
            adjustStock(product.id, amount);
        }
    };

    const handleIncrement = () => {
        setQuickAdjustAmount(prev => {
            const val = parseInt(prev, 10);
            return (isNaN(val) ? 1 : val + 1).toString();
        });
    };

    const handleDecrement = () => {
        setQuickAdjustAmount(prev => {
            const val = parseInt(prev, 10);
            return Math.max(0, isNaN(val) ? 0 : val - 1).toString();
        });
    };

    const handleSaveEdit = () => {
        // Form validations can be added here
        updateProduct(product.id, {
            ...editForm,
            price: Number(editForm.price),
            costPrice: Number(editForm.costPrice),
            stock: Number(editForm.stock),
        });
        setIsEditOpen(false);
    };

    const handleEditChange = (field: keyof Product, value: string) => {
        setEditForm(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="flex-1 space-y-6">
            <style jsx global>{`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    .print-area, .print-area * {
                        visibility: visible;
                    }
                    .print-area {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                    }
                }
            `}</style>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between print:hidden">
                <div className="flex flex-wrap items-center gap-4">
                    <Link href="/inventory">
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-white border shadow-sm">
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h2 className="text-2xl font-bold tracking-tight">{product.name}</h2>
                    <Badge variant="outline" className={`
                        ${product.status === "In Stock" ? "text-green-600 bg-green-50 border-green-200" :
                            product.status === "Low Stock" ? "text-orange-600 bg-orange-50 border-orange-200" :
                                "bg-destructive/10 text-destructive border-destructive/20"}
                    `}>
                        {product.status}
                    </Badge>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                    <Button variant="outline" className="w-full sm:w-auto" onClick={() => setIsEditOpen(true)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6 print:hidden">
                    <Card>
                        <CardHeader>
                            <CardTitle>Product Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
                                <div>
                                    <dt className="text-sm font-medium text-muted-foreground">Category</dt>
                                    <dd className="mt-1 text-sm font-medium">{product.category || "-"}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-muted-foreground">Brand</dt>
                                    <dd className="mt-1 text-sm font-medium">{product.brand || "-"}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-muted-foreground">Model Number</dt>
                                    <dd className="mt-1 text-sm font-medium">{product.modelNumber || "-"}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-muted-foreground">Color</dt>
                                    <dd className="mt-1 text-sm font-medium">{product.color || "-"}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-muted-foreground">Size</dt>
                                    <dd className="mt-1 text-sm font-medium">{product.size || "-"}</dd>
                                </div>
                            </dl>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Pricing</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
                                <div>
                                    <dt className="text-sm font-medium text-muted-foreground">Retail Price</dt>
                                    <dd className="mt-1 text-2xl font-bold">${product.price?.toFixed(2) || "0.00"}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-muted-foreground">Cost Price</dt>
                                    <dd className="mt-1 text-lg font-medium">${product.costPrice?.toFixed(2) || "0.00"}</dd>
                                </div>
                            </dl>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    {product.imageUrl && (
                        <Card className="print:hidden">
                            <CardContent className="p-4 flex items-center justify-center">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="max-w-full h-auto rounded-md max-h-64 object-contain shadow-sm border border-muted/50"
                                />
                            </CardContent>
                        </Card>
                    )}

                    <Card className="print:hidden">
                        <CardHeader>
                            <CardTitle>Inventory Status</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <dt className="text-sm font-medium text-muted-foreground">Current Stock</dt>
                                <dd className="mt-1 text-3xl font-bold">{product.stock}</dd>
                            </div>

                            <div className="space-y-3 pt-4 border-t">
                                <p className="text-sm font-medium">Quick Adjust</p>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="icon" onClick={handleDecrement} className="shrink-0 text-destructive border-destructive/20 hover:bg-destructive/10">
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                    <Input
                                        type="number"
                                        value={quickAdjustAmount}
                                        onChange={(e) => setQuickAdjustAmount(e.target.value)}
                                        className="flex-1 text-center font-bold"
                                    />
                                    <Button variant="outline" size="icon" onClick={handleIncrement} className="shrink-0 text-green-600 border-green-200 hover:bg-green-50">
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                                <Button className="w-full mt-2" onClick={handleQuickAdjustSubmit}>Update Stock</Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="print-area">
                        <CardHeader className="print:hidden">
                            <CardTitle>Barcode</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center justify-center space-y-4">
                            <div className="bg-white p-4 rounded-md border text-center w-full shadow-sm flex flex-col items-center justify-center">
                                <svg ref={barcodeRef} className="max-w-full h-auto"></svg>
                            </div>
                            <Button variant="outline" className="w-full print:hidden" onClick={() => window.print()}>
                                <Printer className="h-4 w-4 mr-2" />
                                Print Label
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Sheet open={isEditOpen} onOpenChange={setIsEditOpen}>
                <SheetContent className="overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle>Edit Product</SheetTitle>
                        <SheetDescription>
                            Make changes to product details here. Click save when you&apos;re done.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Product Name</Label>
                            <Input id="name" value={editForm.name || ""} onChange={(e) => handleEditChange("name", e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="sku">SKU</Label>
                            <Input id="sku" value={editForm.sku || ""} onChange={(e) => handleEditChange("sku", e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <Label>Product Image</Label>
                            <div className="space-y-2">
                                <Input id="imageUrl" value={editForm.imageUrl || ""} onChange={(e) => handleEditChange("imageUrl", e.target.value)} placeholder="Image URL (https://...)" />
                                <div className="text-xs text-center text-muted-foreground font-medium">OR</div>
                                <Input id="imageUpload" type="file" accept="image/*" onChange={handleEditImageUpload} />
                            </div>
                            {editForm.imageUrl && (
                                <div className="mt-2">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={editForm.imageUrl} alt="Preview" className="h-24 rounded-md object-contain border border-muted bg-white p-1" />
                                </div>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="category">Category</Label>
                            <Input id="category" value={editForm.category || ""} onChange={(e) => handleEditChange("category", e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="brand">Brand</Label>
                            <Input id="brand" value={editForm.brand || ""} onChange={(e) => handleEditChange("brand", e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="modelNumber">Model Number</Label>
                            <Input id="modelNumber" value={editForm.modelNumber || ""} onChange={(e) => handleEditChange("modelNumber", e.target.value)} />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="color">Color</Label>
                                <Input id="color" value={editForm.color || ""} onChange={(e) => handleEditChange("color", e.target.value)} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="size">Size</Label>
                                <Input id="size" value={editForm.size || ""} onChange={(e) => handleEditChange("size", e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="price">Retail Price ($)</Label>
                                <Input id="price" type="number" step="0.01" value={editForm.price ?? ""} onChange={(e) => handleEditChange("price", e.target.value)} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="costPrice">Cost Price ($)</Label>
                                <Input id="costPrice" type="number" step="0.01" value={editForm.costPrice ?? ""} onChange={(e) => handleEditChange("costPrice", e.target.value)} />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="stock">Stock Level</Label>
                            <Input id="stock" type="number" value={editForm.stock ?? ""} onChange={(e) => handleEditChange("stock", e.target.value)} />
                        </div>
                    </div>
                    <SheetFooter className="mt-6 flex-col sm:flex-row gap-2 sm:gap-0">
                        <Button variant="outline" className="w-full sm:w-auto" onClick={() => setIsEditOpen(false)}>Cancel</Button>
                        <Button className="w-full sm:w-auto" onClick={handleSaveEdit}>Save Changes</Button>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    );
}
