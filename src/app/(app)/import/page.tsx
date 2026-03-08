"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UploadCloud, FileType, CheckCircle2 } from "lucide-react";
import { useState, useRef } from "react";
import Papa from "papaparse";
import { useInventoryStore } from "@/store/useInventoryStore";
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function ImportPage() {
    const [step, setStep] = useState(1);
    const [fileParams, setFileParams] = useState<{ name: string, size: number } | null>(null);
    const [csvData, setCsvData] = useState<Record<string, unknown>[]>([]);
    const [columns, setColumns] = useState<string[]>([]);
    const [mappings, setMappings] = useState<Record<string, string>>({
        name: "",
        sku: "",
        price: "",
        category: "",
        stock: "",
    });

    const fileInputRef = useRef<HTMLInputElement>(null);
    const { addProduct, addActivity } = useInventoryStore();
    const router = useRouter();

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setFileParams({ name: file.name, size: file.size });

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                if (results.data.length > 0) {
                    setCsvData(results.data as Record<string, unknown>[]);
                    setColumns(Object.keys(results.data[0] as Record<string, unknown>));
                }
            }
        });
    };

    const handleMappingChange = (field: string, value: string) => {
        setMappings(prev => ({ ...prev, [field]: value }));
    };

    const handleImport = () => {
        let importedCount = 0;
        csvData.forEach((row) => {
            const name = String(row[mappings.name] || "");
            const sku = String(row[mappings.sku] || "");
            if (name && sku) {
                const stock = parseInt(String(row[mappings.stock] || "0"), 10) || 0;
                addProduct({
                    name,
                    sku,
                    price: parseFloat(String(row[mappings.price] || "0")) || 0,
                    category: String(row[mappings.category] || "Imported"),
                    stock,
                    threshold: 5,
                });
                importedCount++;
            }
        });

        if (importedCount > 0) {
            addActivity({
                action: "New Item",
                item: `Bulk Import (${importedCount} items)`,
                quantity: importedCount,
            });
        }

        router.push("/inventory");
    };

    return (
        <div className="flex-1 space-y-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Import Inventory</h2>
            </div>

            <div className="max-w-4xl mx-auto space-y-8">
                {/* Stepper */}
                <div className="flex items-center justify-between relative">
                    <div className="absolute left-0 top-1/2 w-full h-0.5 bg-muted -z-10 transform -translate-y-1/2"></div>

                    <div className="flex flex-col items-center gap-2">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                            1
                        </div>
                        <span className="text-sm font-medium">Upload</span>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                            2
                        </div>
                        <span className="text-sm font-medium">Map Columns</span>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 3 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                            3
                        </div>
                        <span className="text-sm font-medium">Review</span>
                    </div>
                </div>

                {/* Step 1: Upload */}
                {step === 1 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Upload Data File</CardTitle>
                            <CardDescription>
                                Upload a CSV file containing your inventory data.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <input
                                type="file"
                                accept=".csv"
                                className="hidden"
                                ref={fileInputRef}
                                onChange={handleFileUpload}
                            />

                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 flex flex-col items-center justify-center space-y-4 hover:bg-muted/50 transition-colors cursor-pointer"
                            >
                                <div className="p-4 bg-primary/10 rounded-full">
                                    <UploadCloud className="w-8 h-8 text-primary" />
                                </div>
                                <div className="text-center space-y-1">
                                    <p className="text-sm font-medium">Click to upload CSV</p>
                                    <p className="text-xs text-muted-foreground">CSV formatting supported</p>
                                </div>
                            </div>

                            {fileParams && (
                                <div className="mt-6 flex justify-between items-center bg-muted/50 p-4 rounded-md border">
                                    <div className="flex items-center gap-3">
                                        <FileType className="h-8 w-8 text-blue-500" />
                                        <div>
                                            <p className="text-sm font-medium">{fileParams.name}</p>
                                            <p className="text-xs text-muted-foreground">{(fileParams.size / 1024).toFixed(1)} KB • Upload complete</p>
                                        </div>
                                    </div>
                                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                                </div>
                            )}

                            <div className="mt-6 flex flex-col sm:flex-row justify-end gap-2">
                                <Button className="w-full sm:w-auto" onClick={() => setStep(2)} disabled={csvData.length === 0}>Continue to Mapping</Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Step 2: Mapping */}
                {step === 2 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Map Columns</CardTitle>
                            <CardDescription>
                                Match the columns in your file to the required product fields.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {Object.keys(mappings).map((field) => (
                                    <div key={field} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start md:items-center bg-muted/30 p-4 rounded-md border">
                                        <Label className="capitalize font-medium text-base">{field} {['name', 'sku', 'price'].includes(field) && "*"}</Label>
                                        <Select
                                            value={mappings[field]}
                                            onValueChange={(val) => handleMappingChange(field, val)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder={`Select column for ${field}`} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {columns.map((col) => (
                                                    <SelectItem key={col} value={col}>{col}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                ))}

                                <div className="flex flex-col-reverse sm:flex-row justify-end gap-4 pt-4">
                                    <Button className="w-full sm:w-auto" variant="outline" onClick={() => setStep(1)}>Back</Button>
                                    <Button
                                        className="w-full sm:w-auto"
                                        onClick={() => setStep(3)}
                                        disabled={!mappings.name || !mappings.sku || !mappings.price}
                                    >
                                        Continue to Review
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Step 3: Review */}
                {step === 3 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Review & Import</CardTitle>
                            <CardDescription>
                                Review the data before importing into your inventory.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="bg-muted/50 p-8 rounded-md text-center border">
                                <p className="text-lg font-medium mb-2">Ready to Import {csvData.length} products</p>
                                <p className="text-muted-foreground mb-6">File: {fileParams?.name}</p>
                                <div className="flex flex-col-reverse sm:flex-row justify-center gap-4">
                                    <Button className="w-full sm:w-auto" variant="outline" onClick={() => setStep(2)}>Back</Button>
                                    <Button className="w-full sm:w-auto" onClick={handleImport}>Start Import</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
