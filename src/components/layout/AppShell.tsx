"use client";

import { cn } from "@/lib/utils";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

interface AppShellProps {
    children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
    return (
        <div className="flex bg-[#f3f5f8] min-h-screen">
            <div className="hidden lg:block lg:w-64 border-r">
                <Sidebar />
            </div>

            <div className="flex flex-1 flex-col overflow-hidden p-6 gap-6">
                <div className="bg-white rounded-[1.5rem] shadow-sm border overflow-hidden flex flex-1 flex-col">
                    <TopBar />
                    <main className="flex-1 overflow-y-auto overflow-x-hidden p-6">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}
