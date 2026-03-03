"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Edit, Printer, Plus, Minus } from "lucide-react";
import Link from "next/link";

export default function ProductDetailPage() {
    return (
        <div className="flex-1 space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Link href="/inventory">
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-white border shadow-sm">
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h2 className="text-2xl font-bold tracking-tight">Ray-Ban Aviator Classic</h2>
                    <Badge variant="outline" className="text-green-600 bg-green-50 border-green-200">
                        In Stock
                    </Badge>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Product Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
                                <div>
                                    <dt className="text-sm font-medium text-muted-foreground">Category</dt>
                                    <dd className="mt-1 text-sm font-medium">Frames</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-muted-foreground">Brand</dt>
                                    <dd className="mt-1 text-sm font-medium">Ray-Ban</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-muted-foreground">Model Number</dt>
                                    <dd className="mt-1 text-sm font-medium">RB3025</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-muted-foreground">Color</dt>
                                    <dd className="mt-1 text-sm font-medium">Gold / G-15 Green</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-muted-foreground">Size</dt>
                                    <dd className="mt-1 text-sm font-medium">58-14-135</dd>
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
                                    <dd className="mt-1 text-2xl font-bold">$163.00</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-muted-foreground">Cost Price</dt>
                                    <dd className="mt-1 text-lg font-medium">$85.00</dd>
                                </div>
                            </dl>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Inventory Status</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <dt className="text-sm font-medium text-muted-foreground">Current Stock</dt>
                                <dd className="mt-1 text-3xl font-bold">12</dd>
                            </div>

                            <div className="space-y-3 pt-4 border-t">
                                <p className="text-sm font-medium">Quick Adjust</p>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="icon" className="shrink-0 text-destructive border-destructive/20 hover:bg-destructive/10">
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                    <div className="flex-1 flex items-center justify-center border rounded-md bg-muted/50 font-medium">
                                        1
                                    </div>
                                    <Button variant="outline" size="icon" className="shrink-0 text-green-600 border-green-200 hover:bg-green-50">
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                                <Button className="w-full mt-2">Update Stock</Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Barcode</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center justify-center space-y-4">
                            <div className="bg-white p-4 rounded-md border text-center w-full shadow-sm">
                                <div className="h-16 w-full flex space-x-1 items-center justify-center">
                                    <div className="w-1 h-full bg-black"></div>
                                    <div className="w-2 h-full bg-black"></div>
                                    <div className="w-1 h-full bg-black"></div>
                                    <div className="w-3 h-full bg-black"></div>
                                    <div className="w-1 h-full bg-black"></div>
                                    <div className="w-1 h-full bg-black"></div>
                                    <div className="w-2 h-full bg-black"></div>
                                    <div className="w-1 h-full bg-black"></div>
                                    <div className="w-3 h-full bg-black"></div>
                                    <div className="w-2 h-full bg-black"></div>
                                    <div className="w-1 h-full bg-black"></div>
                                    <div className="w-2 h-full bg-black"></div>
                                </div>
                                <p className="mt-2 text-xs font-mono font-medium tracking-widest text-muted-foreground">RB3025-58G</p>
                            </div>
                            <Button variant="outline" className="w-full" onClick={() => window.print()}>
                                <Printer className="h-4 w-4 mr-2" />
                                Print Label
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
