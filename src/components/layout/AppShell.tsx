"use client";

import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { useEffect } from "react";
import { useInventoryStore } from "@/store/useInventoryStore";

interface AppShellProps {
    children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
    const { initialize, isInitialized, isLoading } = useInventoryStore();

    useEffect(() => {
        initialize();
    }, [initialize]);

    return (
        <div className="flex bg-[#f3f5f8] min-h-screen">
            <div className="hidden lg:block lg:w-64 border-r">
                <Sidebar />
            </div>

            <div className="flex flex-1 flex-col overflow-hidden p-4 md:p-6 gap-4 md:gap-6">
                <div className="bg-white rounded-[1.5rem] shadow-sm border overflow-hidden flex flex-1 flex-col">
                    <TopBar />
                    <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 relative">
                        {(!isInitialized || isLoading) && (
                            <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                                    <p className="text-sm font-medium text-muted-foreground animate-pulse">Loading inventory...</p>
                                </div>
                            </div>
                        )}
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}
