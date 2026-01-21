import SettingsForm from "@/components/admin/SettingsForm";
import { getSetting } from "@/lib/settings";

export default async function SettingsPage() {
    const macUrl = await getSetting('mac_download_url') || '';
    const winUrl = await getSetting('win_download_url') || '';
    const licenseKeyword = await getSetting('license_product_keyword') || 'clipiee';

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
            </div>
            <div className="space-y-4">
                <SettingsForm
                    initialMacUrl={macUrl}
                    initialWinUrl={winUrl}
                    initialLicenseKeyword={licenseKeyword}
                />
            </div>
        </div>
    );
}
