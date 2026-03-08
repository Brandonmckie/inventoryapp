"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Scan, Keyboard } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useInventoryStore } from "@/store/useInventoryStore";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ScanPage() {
    const [manualMode, setManualMode] = useState(false);
    const [manualSku, setManualSku] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const products = useInventoryStore((state) => state.products);

    const handleLookup = (skuToFind: string) => {
        setError("");
        const product = products.find(p => p.sku.toLowerCase() === skuToFind.toLowerCase());
        if (product) {
            router.push(`/inventory/${product.id}`);
        } else {
            setError(`Product with SKU "${skuToFind}" not found.`);
        }
    };

    const handleManualSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (manualSku) {
            handleLookup(manualSku);
        }
    };

    const scannerRef = useRef<Html5QrcodeScanner | null>(null);

    useEffect(() => {
        if (!manualMode) {
            // Delay initialization slightly to handle React 18 Strict Mode double-mounts
            const timer = setTimeout(() => {
                if (!document.getElementById("reader")) return;

                if (!scannerRef.current) {
                    const scanner = new Html5QrcodeScanner(
                        "reader",
                        { fps: 5, qrbox: { width: 250, height: 250 }, formatsToSupport: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] },
                        /* verbose= */ false
                    );
                    scannerRef.current = scanner;

                    scanner.render(
                        (decodedText) => {
                            handleLookup(decodedText);
                            if (scannerRef.current) {
                                scannerRef.current.pause(true); // pause instead of clear to avoid UI jank before redirect
                            }
                        },
                        () => {
                            // ignore frequent stream errors
                        }
                    );
                }
            }, 100);

            return () => {
                clearTimeout(timer);
                if (scannerRef.current) {
                    scannerRef.current.clear().catch(console.error);
                    scannerRef.current = null;
                }
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [manualMode]);

    return (
        <div className="flex-1 space-y-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Scan Barcode</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-6">
                    <Card className="flex flex-col min-h-[500px]">
                        <CardHeader>
                            <CardTitle>Camera Scanner</CardTitle>
                            <CardDescription>
                                Position the barcode within the frame to scan.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col justify-center items-center p-6 pb-8">
                            {!manualMode ? (
                                <div className="w-full max-w-md mx-auto space-y-4">
                                    {typeof window !== 'undefined' && !window.isSecureContext && (
                                        <div className="bg-destructive/15 text-destructive p-3 rounded-md text-sm font-medium flex items-center gap-2">
                                            <span>⚠️ Camera access requires a secure connection (HTTPS) or localhost. The scanner may not load on your phone without it.</span>
                                        </div>
                                    )}
                                    <div className="w-full bg-white dark:bg-muted rounded-lg overflow-hidden min-h-[300px] border" id="reader" style={{ border: 'none' }}>
                                    </div>
                                    <style dangerouslySetInnerHTML={{
                                        __html: `
                                        #reader { padding: 0 !important; border: 1px solid hsl(var(--border)) !important; border-radius: 0.5rem; overflow: hidden; }
                                        #reader button { background-color: hsl(var(--primary)); color: hsl(var(--primary-foreground)); padding: 0.5rem 1rem; border-radius: 0.375rem; font-weight: 500; margin: 0.5rem; cursor: pointer; transition: opacity 0.2s; border: none; }
                                        #reader button:hover { opacity: 0.9; }
                                        #reader select { padding: 0.5rem; border-radius: 0.375rem; border: 1px solid hsl(var(--border)); background: hsl(var(--background)); color: hsl(var(--foreground)); margin: 0.5rem; }
                                        #reader a { color: hsl(var(--primary)); text-decoration: underline; }
                                        #reader__dashboard_section_csr span { color: hsl(var(--foreground)); }
                                    `}} />
                                </div>
                            ) : (
                                <form onSubmit={handleManualSubmit} className="w-full max-w-sm space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium leading-none">Enter Barcode Manually</label>
                                        <Input
                                            placeholder="e.g. RB3025-58G"
                                            autoFocus
                                            value={manualSku}
                                            onChange={(e) => setManualSku(e.target.value)}
                                        />
                                        {error && <p className="text-sm text-destructive font-medium">{error}</p>}
                                    </div>
                                    <Button type="submit" className="w-full">Lookup Product</Button>
                                </form>
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
                                {products.slice(0, 3).map((p) => (
                                    <Link href={`/inventory/${p.id}`} key={p.id} className="flex justify-between items-center border-b pb-2 hover:bg-muted/50 rounded-md -mx-2 px-2 transition-colors">
                                        <div>
                                            <p className="text-sm font-medium">{p.sku}</p>
                                            <p className="text-xs text-muted-foreground">{p.name}</p>
                                        </div>
                                        <span className="text-xs text-muted-foreground">Recent</span>
                                    </Link>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
