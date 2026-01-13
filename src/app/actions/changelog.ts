"use server";

// Server Actions for Changelog management

import { revalidatePath } from "next/cache";

export async function revalidateChangelog() {
    revalidatePath('/changelog', 'page');
    revalidatePath('/admin/changelog', 'page');
    return { success: true };
}
