"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UploadCloud, FileType, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function ImportPage() {
    const [step, setStep] = useState(1);

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
                                Upload a CSV or Excel file containing your inventory data.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 flex flex-col items-center justify-center space-y-4 hover:bg-muted/50 transition-colors cursor-pointer">
                                <div className="p-4 bg-primary/10 rounded-full">
                                    <UploadCloud className="w-8 h-8 text-primary" />
                                </div>
                                <div className="text-center space-y-1">
                                    <p className="text-sm font-medium">Click to upload or drag and drop</p>
                                    <p className="text-xs text-muted-foreground">CSV, XLS, or XLSX (max. 10MB)</p>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-between items-center bg-muted/50 p-4 rounded-md">
                                <div className="flex items-center gap-3">
                                    <FileType className="h-8 w-8 text-blue-500" />
                                    <div>
                                        <p className="text-sm font-medium">sample_inventory.csv</p>
                                        <p className="text-xs text-muted-foreground">24 KB • Upload complete</p>
                                    </div>
                                </div>
                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                            </div>

                            <div className="mt-6 flex justify-end">
                                <Button onClick={() => setStep(2)}>Continue to Mapping</Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Step 2: Mapping (Mock) */}
                {step === 2 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Map Columns</CardTitle>
                            <CardDescription>
                                Match the columns in your file to the required product fields.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="bg-muted/50 p-8 rounded-md text-center">
                                <p className="text-muted-foreground mb-4">Column mapping UI will render here</p>
                                <div className="flex justify-center gap-4">
                                    <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                                    <Button onClick={() => setStep(3)}>Continue to Review</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Step 3: Review (Mock) */}
                {step === 3 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Review & Import</CardTitle>
                            <CardDescription>
                                Review the data before importing into your inventory.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="bg-muted/50 p-8 rounded-md text-center">
                                <p className="text-muted-foreground mb-4">Import summary and data preview will render here</p>
                                <div className="flex justify-center gap-4">
                                    <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
                                    <Button onClick={() => alert("Import complete! Your products have been added.")}>Start Import</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
