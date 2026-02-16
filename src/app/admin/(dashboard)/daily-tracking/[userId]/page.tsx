import { getMemberLogs, getTeamMembers } from "@/actions/daily-tracking";
import { MemberCalendar } from "@/components/admin/daily-tracking/MemberCalendar";
import { getLogger } from "@/lib/logger";
import { notFound } from "next/navigation";

const logger = getLogger('MemberCalendarPage');

export const dynamic = 'force-dynamic';

export default async function MemberCalendarPage({ params }: { params: Promise<{ userId: string }>}) {
  const resolvedParams = await params;
  const userId = resolvedParams.userId;
  
  console.log("MemberCalendarPage params:", resolvedParams);
  console.log("MemberCalendarPage userId:", userId);

  logger.info({ userId }, 'Rendering Member Calendar Page');

  const now = new Date();
  const logs = await getMemberLogs(userId, now.getMonth(), now.getFullYear());
  const members: any[] = await getTeamMembers(); 
  
  const member = members.find((p: any) => p.id === userId);

  if (!member) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Tracking: {member.name}</h1>
      </div>

      <MemberCalendar 
        logs={logs as any} 
        memberId={userId} 
        memberName={member.name}
      />
    </div>
  );
}
