"use server";

import { supabaseAdmin } from "@/lib/supabase-admin";
import { getLogger } from "@/lib/logger";
import { revalidatePath } from "next/cache";

const logger = getLogger("TeamActions");

export interface TeamMember {
    id: string;
    name: string;
    role: string;
    image_url?: string;
    percentage: number;
}

export async function getTeamMembers(): Promise<TeamMember[]> {
    try {
        const { data, error } = await supabaseAdmin
            .from("team_members")
            .select("*")
            .order("percentage", { ascending: false });

        if (error) {
            logger.error({ err: error }, "Failed to fetch team members");
            return [];
        }

        return data || [];
    } catch (error) {
        logger.error({ err: error }, "Error in getTeamMembers");
        return [];
    }
}

export async function updateTeamMember(id: string, updates: Partial<TeamMember>): Promise<{ success: boolean; error?: string }> {
    try {
        const { error } = await supabaseAdmin
            .from("team_members")
            .update(updates)
            .eq("id", id);

        if (error) {
            logger.error({ err: error, id }, "Failed to update team member");
            return { success: false, error: "Failed to update team member" };
        }

        revalidatePath("/admin/revenue");
        return { success: true };
    } catch (error) {
        logger.error({ err: error, id }, "Error in updateTeamMember");
        return { success: false, error: "Internal server error" };
    }
}
