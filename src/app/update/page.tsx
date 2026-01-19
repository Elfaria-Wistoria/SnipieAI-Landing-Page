import UpdateClient from "@/app/update/UpdateClient";
import { getSetting } from "@/lib/settings";

export default async function UpdatePage() {
    const macDownloadUrl = await getSetting('mac_download_url');
    const winDownloadUrl = await getSetting('win_download_url');

    return (
        <UpdateClient
            macDownloadUrl={macDownloadUrl || '#'}
            winDownloadUrl={winDownloadUrl || '#'}
        />
    );
}
