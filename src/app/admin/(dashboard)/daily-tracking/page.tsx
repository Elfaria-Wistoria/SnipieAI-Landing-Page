import { getTeamMembers } from "@/actions/daily-tracking";
import { MemberGrid } from "@/components/admin/daily-tracking/MemberGrid";
import { getLogger } from "@/lib/logger";

const logger = getLogger('DailyTrackingPage');

export const dynamic = 'force-dynamic';

export default async function DailyTrackingPage() {
  logger.info('Rendering Daily Tracking Page (Member Grid)');
  const members = await getTeamMembers();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Daily Tracking</h1>
      </div>

      <div className="rounded-md border p-4">
        <h2 className="mb-4 text-xl font-semibold">Select Member</h2>
        <MemberGrid members={members as any} />
      </div>
    </div>
  );
}
