"use server";

import { supabaseAdmin } from "@/lib/supabase-admin";
import { getLogger } from "@/lib/logger";

const logger = getLogger("RevenueAction");

export type RevenuePeriod = "day" | "month" | "year";

export interface RevenueDataPoint {
    name: string;
    total: number;
    count: number;
}

export async function getRevenueData(period: RevenuePeriod): Promise<RevenueDataPoint[]> {
    try {
        const { data: transactions, error } = await supabaseAdmin
            .from("transactions")
            .select("amount, created_at")
            .eq("status", "SUCCESS")
            .order("created_at", { ascending: true }); // Ascending for correct chart order

        if (error) {
            logger.error({ err: error }, "Failed to fetch transactions for revenue");
            throw new Error("Failed to fetch revenue data");
        }

        if (!transactions || transactions.length === 0) {
            return [];
        }

        const aggregatedData: Record<string, { total: number; count: number }> = {};

        transactions.forEach((tx) => {
            const date = new Date(tx.created_at);
            let key = "";

            if (period === "day") {
                // Last 30 days logic could be handled by filtering data first, 
                // but for now we aggregate what we have or filtering in JS if data set is small.
                // Let's format as "MMM dd" e.g. "Feb 10"
                key = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
            } else if (period === "month") {
                // "MMM YYYY" e.g. "Feb 2026"
                key = date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
            } else if (period === "year") {
                // "YYYY" e.g. "2026"
                key = date.getFullYear().toString();
            }

            if (!aggregatedData[key]) {
                aggregatedData[key] = { total: 0, count: 0 };
            }

            aggregatedData[key].total += Number(tx.amount) || 0;
            aggregatedData[key].count += 1;
        });

        // Convert to array
        // Note: Since we sorted by created_at asc, the keys insertion order *should* be roughly chronological 
        // but relying on object key order is risky. 
        // However, if we iterate based on the processed list it might be better.
        // simpler approach: map keys

        const result = Object.entries(aggregatedData).map(([name, data]) => ({
            name,
            total: data.total,
            count: data.count,
        }));

        return result;
    } catch (error) {
        logger.error({ err: error }, "Error in getRevenueData");
        return [];
    }
}
