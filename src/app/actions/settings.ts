"use server";

import { updateSetting } from "@/lib/settings";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const settingsSchema = z.object({
    mac_download_url: z.string().url("Invalid macOS URL"),
    win_download_url: z.string().url("Invalid Windows URL"),
});

export async function updateDownloadLinks(prevState: any, formData: FormData) {
    const macUrl = formData.get("mac_download_url") as string;
    const winUrl = formData.get("win_download_url") as string;

    const validation = settingsSchema.safeParse({
        mac_download_url: macUrl,
        win_download_url: winUrl,
    });

    if (!validation.success) {
        return {
            success: false,
            message: validation.error.issues[0].message,
        };
    }

    try {
        const [macResult, winResult] = await Promise.all([
            updateSetting("mac_download_url", macUrl),
            updateSetting("win_download_url", winUrl),
        ]);

        if (!macResult.success || !winResult.success) {
            return {
                success: false,
                message: "Failed to update one or more settings.",
            };
        }

        // Revalidate the pages that use these settings
        revalidatePath('/update');
        revalidatePath('/admin/settings');

        return {
            success: true,
            message: "Settings updated successfully!",
        };
    } catch (error) {
        console.error("Error updating settings:", error);
        return {
            success: false,
            message: "An unexpected error occurred.",
        };
    }
}
