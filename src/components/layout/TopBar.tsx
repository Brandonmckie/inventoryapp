"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Search, Settings, Menu } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Sidebar } from "./Sidebar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useInventoryStore } from "@/store/useInventoryStore";
import { createClient } from "@/utils/supabase/client";

import { User } from "@supabase/supabase-js";

export function TopBar() {
    const pathname = usePathname();
    const router = useRouter();
    const setSearchQuery = useInventoryStore((state) => state.setSearchQuery);
    const clearStore = useInventoryStore((state) => state.clearStore);
    const supabase = createClient();
    const [user, setUser] = useState<User | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const { data } = await supabase.auth.getUser();
            setUser(data.user);
        };
        fetchUser();
    }, [supabase]);

    useEffect(() => {
        // eslint-disable-next-line
        setMobileMenuOpen(false);
    }, [pathname]);

    // Create a readable title from the pathname
    const title = pathname === "/"
        ? "Dashboard"
        : pathname.split("/").pop()?.replace("-", " ");

    const formattedTitle = title
        ? title.charAt(0).toUpperCase() + title.slice(1)
        : "Dashboard";

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const val = (e.target as HTMLInputElement).value;
            setSearchQuery(val);
            if (pathname !== '/inventory') {
                router.push('/inventory');
            }
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        clearStore();
        router.push("/");
    };

    return (
        <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background px-4 md:px-6">
            <div className="flex items-center gap-3">
                <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="lg:hidden shrink-0">
                            <Menu className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-64 p-0 border-r-0">
                        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                        <SheetDescription className="sr-only">Access application features and settings</SheetDescription>
                        <Sidebar />
                    </SheetContent>
                </Sheet>
                <h1 className="text-lg md:text-xl font-semibold tracking-tight whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px] sm:max-w-none">{formattedTitle}</h1>
            </div>

            <div className="flex items-center gap-2 md:gap-4 ml-auto">
                <div className="relative w-full max-w-[150px] md:max-w-xs hidden sm:block">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search..."
                        className="w-full rounded-full bg-muted/50 pl-8 pr-4 shadow-none focus-visible:ring-1"
                        onKeyDown={handleSearch}
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
                                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.user_metadata?.full_name || user?.email || 'User'}`} alt="@user" />
                                <AvatarFallback>{user?.user_metadata?.full_name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}</AvatarFallback>
                            </Avatar>
                            <div className="hidden flex-col text-sm sm:flex">
                                <span className="font-medium leading-none">{user?.user_metadata?.full_name || 'User'}</span>
                                <span className="text-xs text-muted-foreground">{user?.email || 'user@example.com'}</span>
                            </div>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild><Link href="/settings">Profile</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/settings">Settings</Link></DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive cursor-pointer" onClick={handleLogout}>Log out</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
