"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Scan, Keyboard } from "lucide-react";
import { useState } from "react";

export default function ScanPage() {
    const [manualMode, setManualMode] = useState(false);

    return (
        <div className="flex-1 space-y-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Scan Barcode</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-6">
                    <Card className="flex flex-col h-[500px]">
                        <CardHeader>
                            <CardTitle>Camera Scanner</CardTitle>
                            <CardDescription>
                                Position the barcode within the frame to scan.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col justify-center items-center p-6 pb-8">
                            {!manualMode ? (
                                <div className="w-full max-w-md aspect-video bg-black rounded-lg border-2 border-dashed border-muted-foreground/50 flex flex-col items-center justify-center relative overflow-hidden">
                                    {/* Mock scanner UI */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-3/4 h-32 border-2 border-primary/50 relative">
                                            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-primary/80 animate-pulse shadow-[0_0_8px_rgba(var(--primary),0.8)]" />
                                        </div>
                                    </div>
                                    <Scan className="h-10 w-10 text-muted-foreground mb-4 z-10" />
                                    <p className="text-muted-foreground font-medium z-10 text-sm">Camera inactive (Mock UI)</p>
                                </div>
                            ) : (
                                <div className="w-full max-w-sm space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium leading-none">Enter Barcode Manually</label>
                                        <Input placeholder="e.g. RB3025-58G" autoFocus />
                                    </div>
                                    <Button className="w-full">Lookup Product</Button>
                                </div>
                            )}

                            <div className="mt-8 flex justify-center">
                                <Button
                                    variant="outline"
                                    onClick={() => setManualMode(!manualMode)}
                                    className="rounded-full"
                                >
                                    {manualMode ? (
                                        <>
                                            <Scan className="mr-2 h-4 w-4" />
                                            Switch to Camera
                                        </>
                                    ) : (
                                        <>
                                            <Keyboard className="mr-2 h-4 w-4" />
                                            Manual Entry
                                        </>
                                    )}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Scans</CardTitle>
                            <CardDescription>Items scanned today</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center border-b pb-2">
                                    <div>
                                        <p className="text-sm font-medium">RB2140</p>
                                        <p className="text-xs text-muted-foreground">Ray-Ban Wayfarer</p>
                                    </div>
                                    <span className="text-xs text-muted-foreground">10 mins ago</span>
                                </div>
                                <div className="flex justify-between items-center border-b pb-2">
                                    <div>
                                        <p className="text-sm font-medium">ACU-OAS</p>
                                        <p className="text-xs text-muted-foreground">Acuvue Oasys</p>
                                    </div>
                                    <span className="text-xs text-muted-foreground">1 hour ago</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-sm font-medium">TF5401</p>
                                        <p className="text-xs text-muted-foreground">Tom Ford FT5401</p>
                                    </div>
                                    <span className="text-xs text-muted-foreground">2 hours ago</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
