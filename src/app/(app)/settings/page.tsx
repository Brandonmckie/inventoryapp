"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/utils/supabase/client";

import { User } from "@supabase/supabase-js";

export default function SettingsPage() {
    const supabase = createClient();
    const [user, setUser] = useState<User | null>(null);
    const [fullName, setFullName] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const { data } = await supabase.auth.getUser();
            if (data?.user) {
                setUser(data.user);
                setFullName(data.user.user_metadata?.full_name || "");
            }
        };
        fetchUser();
    }, [supabase]);

    const handleSaveProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        setIsSaving(true);

        const { error } = await supabase.auth.updateUser({
            data: { full_name: fullName }
        });

        setIsSaving(false);

        if (error) {
            setMessage(`Error updating profile: ${error.message}`);
        } else {
            setMessage("Profile updated successfully!");
        }
    };

    return (
        <div className="flex-1 space-y-6">
            <div className="flex items-center space-x-4">
                <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Profile Details</CardTitle>
                        <CardDescription>
                            Update your personal information.
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSaveProfile}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" value={user?.email || ""} disabled />
                                <p className="text-xs text-muted-foreground">Your email cannot be changed from the dashboard.</p>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="fullName">Full Name</Label>
                                <Input
                                    id="fullName"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="e.g. John Doe"
                                />
                            </div>

                            {message && (
                                <div className={`text-sm font-medium ${message.includes('Error') ? 'text-destructive' : 'text-green-600'}`}>
                                    {message}
                                </div>
                            )}
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" disabled={isSaving || !user}>
                                {isSaving ? "Saving..." : "Save Changes"}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Store Settings</CardTitle>
                        <CardDescription>Manage your business details.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Store Name</Label>
                            <Input defaultValue="Recurra Optical" disabled />
                        </div>
                        <div className="space-y-2">
                            <Label>Currency</Label>
                            <Input defaultValue="USD ($)" disabled />
                            <p className="text-xs text-muted-foreground">Contact support to change your store currency.</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
