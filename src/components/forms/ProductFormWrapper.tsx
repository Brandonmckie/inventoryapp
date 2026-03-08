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
import { useInventoryStore } from "@/store/useInventoryStore";
import { useRouter } from "next/navigation";

export function ProductFormWrapper() {
    const router = useRouter();
    const addProduct = useInventoryStore((state) => state.addProduct);
    const addActivity = useInventoryStore((state) => state.addActivity);
    const [category, setCategory] = useState<string>("frames");
    const [sku, setSku] = useState("");
    const [localImage, setLocalImage] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState("");
    const [imageError, setImageError] = useState(false);

    const validateImageUrl = () => {
        if (!imageUrl) {
            setImageError(false);
            return;
        }
        const img = new window.Image();
        img.onload = () => setImageError(false);
        img.onerror = () => setImageError(true);
        img.src = imageUrl;
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setLocalImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleGenerateSKU = () => {
        const prefix = category === "frames" ? "FRM" : category === "contacts" ? "CON" : "ACC";
        const randomNum = Math.floor(10000 + Math.random() * 90000);
        setSku(`${prefix}-${randomNum}`);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (imageError) {
            return; // Prevent submission if image URL is visibly invalid
        }

        const formData = new FormData(e.currentTarget);

        addProduct({
            name: formData.get("name") as string,
            sku: sku || (formData.get("sku") as string),
            category: category === "frames" ? "Frames" : category === "contacts" ? "Contacts" : "Accessories",
            brand: (formData.get("brand") as string) || undefined,
            modelNumber: (formData.get("model") as string) || undefined,
            color: (formData.get("color") as string) || undefined,
            size: (formData.get("size") as string) || undefined,
            price: Number(formData.get("price")) || 0,
            costPrice: Number(formData.get("cost")) || 0,
            stock: Number(formData.get("stock")) || 0,
            threshold: Number(formData.get("threshold")) || 5,
            imageUrl: localImage || imageUrl || undefined,
        });

        addActivity({
            action: "New Item",
            item: formData.get("name") as string,
            quantity: Number(formData.get("stock")) || 0,
        });

        router.push("/inventory");
    };

    return (
        <Card className="max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle>Add New Product</CardTitle>
                <CardDescription>
                    Enter the details for the new inventory item.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form className="space-y-8" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2 col-span-1 md:col-span-2">
                            <Label>Product Category</Label>
                            <Select value={category} onValueChange={setCategory}>
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
                            <Input id="name" name="name" placeholder="e.g. Ray-Ban Aviator" required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="sku">SKU / Barcode *</Label>
                            <div className="flex gap-2">
                                <Input id="sku" name="sku" value={sku} onChange={(e) => setSku(e.target.value)} placeholder="Scan or type SKU" required className="flex-1" />
                                <Button type="button" variant="outline" onClick={handleGenerateSKU}>Generate</Button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="brand">Brand</Label>
                            <Input id="brand" name="brand" placeholder="e.g. Ray-Ban" />
                        </div>

                        {category === "frames" && (
                            <>
                                <div className="space-y-2">
                                    <Label htmlFor="model">Model Number</Label>
                                    <Input id="model" name="model" placeholder="e.g. RB3025" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="color">Color</Label>
                                    <Input id="color" name="color" placeholder="e.g. Gold / G-15 Green" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="size">Size</Label>
                                    <Input id="size" name="size" placeholder="e.g. 58-14-135" />
                                </div>
                            </>
                        )}

                        {category === "contacts" && (
                            <>
                                <div className="space-y-2">
                                    <Label htmlFor="bc">Base Curve (BC)</Label>
                                    <Input id="bc" name="bc" placeholder="e.g. 8.4" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="dia">Diameter (DIA)</Label>
                                    <Input id="dia" name="dia" placeholder="e.g. 14.0" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="sphere">Power / Sphere</Label>
                                    <Input id="sphere" name="sphere" placeholder="e.g. -2.50" />
                                </div>
                            </>
                        )}
                    </div>

                    <Separator />

                    <div className="space-y-4 col-span-1 md:col-span-2 mb-6">
                        <Label>Product Image</Label>
                        <div className="flex flex-col sm:flex-row gap-4 sm:items-end">
                            <div className="flex-1 space-y-2">
                                <Label htmlFor="imageUrl" className="text-xs text-muted-foreground">Image URL</Label>
                                <Input
                                    id="imageUrl"
                                    name="imageUrl"
                                    value={imageUrl}
                                    onChange={(e) => {
                                        setImageUrl(e.target.value);
                                        setImageError(false);
                                    }}
                                    onBlur={validateImageUrl}
                                    placeholder="https://example.com/image.jpg"
                                    disabled={!!localImage}
                                />
                                {imageError && (
                                    <p className="text-xs text-destructive mt-1">
                                        Please provide a valid, publicly accessible image URL.
                                    </p>
                                )}
                            </div>
                            <div className="flex items-center justify-center text-sm font-medium text-muted-foreground px-2">OR</div>
                            <div className="flex-1 space-y-2">
                                <Label htmlFor="imageUpload" className="text-xs text-muted-foreground">Upload Local Image</Label>
                                <Input id="imageUpload" type="file" accept="image/*" onChange={handleImageUpload} />
                            </div>
                        </div>
                        {localImage && (
                            <div className="mt-4 p-4 border rounded-md bg-muted/20 flex flex-col items-start gap-4 inline-flex">
                                <div>
                                    <p className="text-sm font-medium mb-2">Image Preview:</p>
                                    <img src={localImage} alt="Preview" className="h-32 rounded-md object-contain border border-muted bg-white" />
                                </div>
                                <Button type="button" variant="ghost" size="sm" onClick={() => setLocalImage(null)} className="text-destructive">Remove Image</Button>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="cost">Cost Price</Label>
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                                <Input id="cost" name="cost" type="number" step="0.01" className="pl-7" placeholder="0.00" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="price">Retail Price *</Label>
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                                <Input id="price" name="price" type="number" step="0.01" className="pl-7" placeholder="0.00" required />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="stock">Initial Stock</Label>
                            <Input id="stock" name="stock" type="number" placeholder="0" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="threshold">Low Stock Alert Threshold</Label>
                            <Input id="threshold" name="threshold" type="number" placeholder="5" />
                        </div>
                    </div>

                    <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-4">
                        <Button className="w-full sm:w-auto" variant="outline" type="button" onClick={() => router.push("/inventory")}>Cancel</Button>
                        <Button className="w-full sm:w-auto" type="submit">Save Product</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
