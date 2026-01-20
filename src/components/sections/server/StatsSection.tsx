import { getDownloadStats } from "@/app/actions/stats";
import Stats from "@/components/sections/Stats";

export default async function StatsSection() {
    const stats = await getDownloadStats();
    return <Stats stats={stats} />;
}
