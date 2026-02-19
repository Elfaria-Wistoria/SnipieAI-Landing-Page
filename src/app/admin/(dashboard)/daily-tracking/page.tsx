import { getTeamMembers } from "@/actions/daily-tracking";
import { MemberGrid } from "@/components/admin/daily-tracking/MemberGrid";
import { getLogger } from "@/lib/logger";

const logger = getLogger('DailyTrackingPage');

export const dynamic = 'force-dynamic';

import { AddMemberDialog } from "@/components/admin/daily-tracking/AddMemberDialog";

export default async function DailyTrackingPage() {
  logger.info('Rendering Daily Tracking Page (Member Grid)');
  const members = await getTeamMembers();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black uppercase tracking-tighter text-black dark:text-white">Daily Tracking</h1>
        <AddMemberDialog />
      </div>

      <div className="rounded-xl border-2 border-black dark:border-gray-700 p-6 bg-white dark:bg-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-none transition-colors">
        <h2 className="mb-6 text-xl font-bold uppercase tracking-tight text-black dark:text-white">Select Member</h2>
        <MemberGrid members={members as any} />
      </div>
    </div>
  );
}
