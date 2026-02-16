"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TeamMember {
  id: string;
  name: string;
  image_url: string | null;
  role: string;
}

interface MemberGridProps {
  members: TeamMember[];
}

export function MemberGrid({ members }: MemberGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {members.map((member) => (
        <Link key={member.id} href={`/admin/daily-tracking/${member.id}`}>
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {member.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center pt-6">
              <Avatar className="h-20 w-20 mb-4">
                <AvatarImage src={member.image_url || ""} />
                <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <p className="text-xs text-muted-foreground capitalize">{member.role}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
