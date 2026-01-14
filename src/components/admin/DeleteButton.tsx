"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { getLogger } from "@/lib/logger";

const logger = getLogger("DeleteButton");

interface DeleteButtonProps {
    table: "products" | "pricing_plans";
    id: string;
    onSuccess?: () => void;
    revalidateAction?: () => Promise<{ success: boolean; error?: string }>;
}

export default function DeleteButton({ table, id, onSuccess, revalidateAction }: DeleteButtonProps) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this item? This action cannot be undone.")) {
            return;
        }

        setLoading(true);
        try {
            // Debug: Check auth state
            const { data: { user }, error: authError } = await supabase.auth.getUser();
            if (authError || !user) {
                logger.error({ authError, user }, "No authenticated user found in DeleteButton");
                throw new Error("You are not logged in. Please reload or login again.");
            }

            // Perform delete with select to confirm row modification
            const { data, error } = await supabase
                .from(table)
                .delete()
                .eq("id", id)
                .select(); // IMPORTANT: Request return data to confirm deletion

            if (error) {
                throw error;
            }

            if (!data || data.length === 0) {
                logger.error({ table, id }, "Delete operation succeeded but no rows were returned. RLS may be blocking partial access.");
                throw new Error("Item could not be deleted involved. Possible permission issue.");
            }

            logger.info({ table, id }, "Item deleted successfully");

            if (revalidateAction) {
                await revalidateAction();
            }

            router.refresh(); // Refresh server components to show updated list

            if (onSuccess) {
                onSuccess();
            }
        } catch (error) {
            logger.error({ err: error, table, id }, "Failed to delete item");
            alert("Failed to delete item. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={handleDelete}
            disabled={loading}
        >
            {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
                <Trash2 className="w-4 h-4" />
            )}
        </Button>
    );
}
