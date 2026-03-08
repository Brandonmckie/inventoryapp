import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScanLine } from "lucide-react";
import { User } from "@supabase/supabase-js";

interface MarketingNavProps {
    user: User | null;
}

export function MarketingNav({ user }: MarketingNavProps) {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-[#060a12]/80 backdrop-blur supports-[backdrop-filter]:bg-[#060a12]/60">
            <div className="container mx-auto max-w-6xl px-4 flex h-16 items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-500 shadow-sm">
                        <ScanLine className="h-5 w-5 text-white" />
                    </div>
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="font-bold text-xl text-white tracking-tight">Recurra</span>
                    </Link>
                </div>
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-300">
                    <Link href="#features" className="hover:text-white transition-colors">Features</Link>
                    <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
                    <Link href="#testimonials" className="hover:text-white transition-colors">Customers</Link>
                </nav>
                <div className="flex items-center gap-4">
                    {user ? (
                        <Link href="/dashboard">
                            <Button size="sm" className="bg-teal-500 hover:bg-teal-600 text-white font-medium border-0">
                                Go to Dashboard
                            </Button>
                        </Link>
                    ) : (
                        <>
                            <Link href="/login" className="hidden sm:block text-sm font-medium text-zinc-300 hover:text-white transition-colors">
                                Sign In
                            </Link>
                            <Link href="/register">
                                <Button size="sm" className="bg-white text-zinc-900 hover:bg-zinc-200 font-medium">
                                    Get Started
                                </Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
