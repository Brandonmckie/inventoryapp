import Link from "next/link";
import { ScanLine } from "lucide-react";

export function MarketingFooter() {
    return (
        <footer className="border-t border-zinc-800 bg-[#04070d] py-12 md:py-16">
            <div className="container mx-auto max-w-6xl px-4 flex flex-col items-center justify-center text-center space-y-6">
                <div className="flex items-center gap-2 mb-4">
                    <ScanLine className="h-6 w-6 text-teal-500" />
                    <span className="font-bold text-xl text-white tracking-tight">Recurra</span>
                </div>
                <p className="max-w-md text-zinc-400 text-sm">
                    Modern optical inventory management designed for clarity, speed, and precision. Built to empower your independent practice.
                </p>
                <div className="flex gap-6 text-sm text-zinc-500 pt-4">
                    <Link href="#" className="hover:text-zinc-300 transition-colors">Terms of Service</Link>
                    <Link href="#" className="hover:text-zinc-300 transition-colors">Privacy Policy</Link>
                    <Link href="#" className="hover:text-zinc-300 transition-colors">Contact Support</Link>
                </div>
                <p className="text-zinc-600 text-xs pt-8">
                    &copy; {new Date().getFullYear()} Recurra Technologies, Inc. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
