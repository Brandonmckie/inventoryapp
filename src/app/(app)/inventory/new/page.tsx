import { ProductFormWrapper } from "@/components/forms/ProductFormWrapper";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function NewProductPage() {
    return (
        <div className="flex-1 space-y-6">
            <div className="flex items-center space-x-4">
                <Link href="/inventory">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-white border shadow-sm">
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <h2 className="text-2xl font-bold tracking-tight">Add Product</h2>
            </div>

            <ProductFormWrapper />
        </div>
    );
}
