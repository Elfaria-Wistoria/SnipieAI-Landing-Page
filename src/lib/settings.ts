import { supabaseAdmin } from "@/lib/supabase-admin";


export type AppSetting = {
    key: string;
    value: string;
    description: string;
    updated_at: string;
};

export async function getSetting(key: string): Promise<string | null> {
    const { data, error } = await supabaseAdmin
        .from('app_settings')
        .select('value')
        .eq('key', key)
        .single();

    if (error) {
        console.error(`Error fetching setting ${key}:`, error);
        return null;
    }

    return data?.value || null;
}

export async function getAllSettings(): Promise<AppSetting[]> {
    const { data, error } = await supabaseAdmin
        .from('app_settings')
        .select('*')
        .order('key');

    if (error) {
        console.error('Error fetching all settings:', error);
        return [];
    }

    return data || [];
}

export async function updateSetting(key: string, value: string): Promise<{ success: boolean; error?: any }> {
    const { error } = await supabaseAdmin
        .from('app_settings')
        .update({ value, updated_at: new Date().toISOString() })
        .eq('key', key);

    if (error) {
        console.error(`Error updating setting ${key}:`, error);
        return { success: false, error };
    }

    return { success: true };
}
