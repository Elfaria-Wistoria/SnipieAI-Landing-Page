"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Newspaper, Settings, LogOut, History, Package, CreditCard, Users, ShoppingBag, Activity } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { ModeToggle } from "@/components/ui/mode-toggle";

const sidebarItems = [
    {
        title: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
    },
    {
        title: "Revenue",
        href: "/admin/revenue",
        icon: CreditCard,
    },
    {
        title: "Buyers",
        href: "/admin/buyers",
        icon: ShoppingBag,
    },
    {
        title: "Daily Tracking",
        href: "/admin/daily-tracking",
        icon: Activity,
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
        <div className="flex h-screen w-64 flex-col border-r-2 border-black bg-white sticky top-0">
            <div className="p-6 border-b-2 border-black">
                <h2 className="text-2xl font-black tracking-tighter uppercase">Admin Panel</h2>
            </div>
            <div className="flex-1 px-4 py-4">
                <nav className="flex flex-col gap-3">
                    {sidebarItems.map((item) => (
                        <Link key={item.href} href={item.href}>
                            <Button
                                variant="ghost"
                                className={cn(
                                    "w-full justify-start gap-3 h-12 text-base font-bold transition-all",
                                    "border-2 border-transparent hover:bg-purple-100 hover:border-black hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
                                    (pathname === item.href || pathname?.startsWith(item.href + "/"))
                                        ? "bg-[#8B5CF6] text-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#7C3AED] hover:text-white"
                                        : "text-black"
                                )}
                            >
                                <item.icon className="h-5 w-5" />
                                {item.title}
                            </Button>
                        </Link>
                    ))}
                </nav>
            </div>
            <div className="p-4 border-t-2 border-black space-y-4 bg-gray-50">
                <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 h-10 border-2 border-transparent text-red-600 font-bold hover:bg-red-50 hover:border-red-600 hover:shadow-[2px_2px_0px_0px_rgba(220,38,38,1)] transition-all"
                    onClick={handleLogout}
                >
                    <LogOut className="h-4 w-4" />
                    Logout
                </Button>
            </div>
        </div>
    );
}
