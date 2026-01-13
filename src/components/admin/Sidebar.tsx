"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Newspaper, Settings, LogOut, History, Package, CreditCard } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

const sidebarItems = [
    {
        title: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
    },
    {
        title: "News",
        href: "/admin/news",
        icon: Newspaper,
    },
    {
        title: "Changelog",
        href: "/admin/changelog",
        icon: History,
    },
    {
        title: "Products",
        href: "/admin/products",
        icon: Package,
    },
    {
        title: "Pricing",
        href: "/admin/pricing",
        icon: CreditCard,
    },
    {
        title: "Settings",
        href: "/admin/settings",
        icon: Settings,
    },
];

export function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/admin/login");
    };

    return (
        <div className="flex h-full w-64 flex-col border-r bg-background">
            <div className="p-6">
                <h2 className="text-lg font-bold tracking-tight">Admin</h2>
            </div>
            <div className="flex-1 px-4 py-2">
                <nav className="flex flex-col gap-2">
                    {sidebarItems.map((item) => (
                        <Link key={item.href} href={item.href}>
                            <Button
                                variant="ghost"
                                className={cn(
                                    "w-full justify-start gap-2",
                                    pathname === item.href || pathname?.startsWith(item.href + "/")
                                        ? "bg-muted"
                                        : ""
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.title}
                            </Button>
                        </Link>
                    ))}
                </nav>
            </div>
            <div className="p-4 border-t">
                <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={handleLogout}
                >
                    <LogOut className="h-4 w-4" />
                    Logout
                </Button>
            </div>
        </div>
    );
}
