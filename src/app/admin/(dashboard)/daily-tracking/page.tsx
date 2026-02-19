import { Suspense } from "react";
import { getTeamMembers } from "@/actions/daily-tracking";
import { MemberGrid } from "@/components/admin/daily-tracking/MemberGrid";
import { MemberGridSkeleton } from "@/components/admin/daily-tracking/MemberGridSkeleton";
import { getLogger } from "@/lib/logger";
import { AddMemberDialog } from "@/components/admin/daily-tracking/AddMemberDialog";

const logger = getLogger('DailyTrackingPage');

export const dynamic = 'force-dynamic';

async function MembersList() {
  const members = await getTeamMembers();
  return <MemberGrid members={members as any} />;
}

export default function DailyTrackingPage() {
  logger.info('Rendering Daily Tracking Page Shell');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black uppercase tracking-tighter text-black dark:text-white">Daily Tracking</h1>
        <AddMemberDialog />
      </div>

      <div className="rounded-xl border-2 border-black dark:border-gray-700 p-6 bg-white dark:bg-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-none transition-colors">
        <h2 className="mb-6 text-xl font-bold uppercase tracking-tight text-black dark:text-white">Select Member</h2>
        <Suspense fallback={<MemberGridSkeleton />}>
          <MembersList />
        </Suspense>
      </div>
    </div>
  );
}
