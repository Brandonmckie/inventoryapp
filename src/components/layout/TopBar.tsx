"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Search, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function TopBar() {
    const pathname = usePathname();

    // Create a readable title from the pathname
    const title = pathname === "/"
        ? "Dashboard"
        : pathname.split("/").pop()?.replace("-", " ");

    const formattedTitle = title
        ? title.charAt(0).toUpperCase() + title.slice(1)
        : "Dashboard";

    return (
        <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background px-6">
            <div className="flex items-center gap-4">
                <h1 className="text-xl font-semibold tracking-tight">{formattedTitle}</h1>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search here..."
                        className="w-full rounded-full bg-muted/50 pl-8 pr-4 shadow-none focus-visible:ring-1"
                        onChange={(e) => {
                            // Basic mock search behavior
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                alert(`Searching for: ${(e.target as HTMLInputElement).value}`);
                            }
                        }}
                    />
                </div>

                <Link href="/settings">
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <Settings className="h-5 w-5 text-muted-foreground" />
                    </Button>
                </Link>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="relative rounded-full">
                            <Bell className="h-5 w-5 text-muted-foreground" />
                            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive"></span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Low stock: Ray-Ban Aviator</DropdownMenuItem>
                        <DropdownMenuItem>New order #1024</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="flex items-center gap-2 pl-2 hover:bg-muted/50 p-1 pr-3 rounded-md cursor-pointer transition-colors">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="https://github.com/shadcn.png" alt="@user" />
                                <AvatarFallback>US</AvatarFallback>
                            </Avatar>
                            <div className="hidden flex-col text-sm sm:flex">
                                <span className="font-medium leading-none">Tusher Sardar</span>
                                <span className="text-xs text-muted-foreground">tusheronno@gmail.com</span>
                            </div>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild><Link href="/settings">Profile</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/settings">Settings</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild className="text-destructive"><Link href="/">Log out</Link></DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
