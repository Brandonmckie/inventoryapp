"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export function ProductFormWrapper() {
    const [category, setCategory] = useState<string>("frames");

    return (
        <Card className="max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle>Add New Product</CardTitle>
                <CardDescription>
                    Enter the details for the new inventory item.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2 col-span-1 md:col-span-2">
                            <Label>Product Category</Label>
                            <Select defaultValue={category} onValueChange={setCategory}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="frames">Frames</SelectItem>
                                    <SelectItem value="contacts">Contact Lenses</SelectItem>
                                    <SelectItem value="accessories">Accessories</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="name">Product Name *</Label>
                            <Input id="name" placeholder="e.g. Ray-Ban Aviator" required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="sku">SKU / Barcode *</Label>
                            <div className="flex gap-2">
                                <Input id="sku" placeholder="Scan or type SKU" required className="flex-1" />
                                <Button type="button" variant="outline">Generate</Button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="brand">Brand</Label>
                            <Input id="brand" placeholder="e.g. Ray-Ban" />
                        </div>

                        {category === "frames" && (
                            <>
                                <div className="space-y-2">
                                    <Label htmlFor="model">Model Number</Label>
                                    <Input id="model" placeholder="e.g. RB3025" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="color">Color</Label>
                                    <Input id="color" placeholder="e.g. Gold / G-15 Green" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="size">Size</Label>
                                    <Input id="size" placeholder="e.g. 58-14-135" />
                                </div>
                            </>
                        )}

                        {category === "contacts" && (
                            <>
                                <div className="space-y-2">
                                    <Label htmlFor="bc">Base Curve (BC)</Label>
                                    <Input id="bc" placeholder="e.g. 8.4" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="dia">Diameter (DIA)</Label>
                                    <Input id="dia" placeholder="e.g. 14.0" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="sphere">Power / Sphere</Label>
                                    <Input id="sphere" placeholder="e.g. -2.50" />
                                </div>
                            </>
                        )}
                    </div>

                    <Separator />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="cost">Cost Price</Label>
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                                <Input id="cost" type="number" step="0.01" className="pl-7" placeholder="0.00" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="price">Retail Price *</Label>
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                                <Input id="price" type="number" step="0.01" className="pl-7" placeholder="0.00" required />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="stock">Initial Stock</Label>
                            <Input id="stock" type="number" placeholder="0" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="threshold">Low Stock Alert Threshold</Label>
                            <Input id="threshold" type="number" placeholder="5" />
                        </div>
                    </div>

                    <div className="flex justify-end gap-4">
                        <Button variant="outline" type="button">Cancel</Button>
                        <Button type="button">Save Product</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
