"use client";

import { cn } from "@/lib/utils";
import {
    Box,
    LayoutDashboard,
    ScanLine,
    Settings,
    Upload,
    History
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
    },
    {
        label: "Inventory",
        icon: Box,
        href: "/inventory",
    },
    {
        label: "Scan",
        icon: ScanLine,
        href: "/scan",
    },
    {
        label: "Import",
        icon: Upload,
        href: "/import",
    },
    {
        label: "Adjustments Log",
        icon: History,
        href: "/adjustments",
    },
    {
        label: "Settings",
        icon: Settings,
        href: "/settings",
    }
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="flex h-full w-64 flex-col bg-[#0b1324] text-white">
            <div className="flex h-16 shrink-0 items-center px-6">
                <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-500">
                        <ScanLine className="h-5 w-5 text-white" />
                    </div>
                    Recurra
                </div>
            </div>

            <div className="flex flex-1 flex-col justify-between overflow-y-auto py-4">
                <nav className="space-y-1 px-4">
                    <div className="space-y-2 mt-2">
                        {routes.map((route) => (
                            <Link
                                key={route.href}
                                href={route.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                    pathname === route.href || (pathname.startsWith(route.href) && route.href !== "/")
                                        ? "bg-white/10 text-white"
                                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                                )}
                            >
                                <route.icon className="h-5 w-5" />
                                {route.label}
                            </Link>
                        ))}
                    </div>
                </nav>
            </div>
        </div>
    );
}
