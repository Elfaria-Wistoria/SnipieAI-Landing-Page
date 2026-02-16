"use server";

import { createClient } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";

export async function submitDailyLog(data: {
  member_id: string;
  content_count: number;
  video_link: string;
  date: Date;
}) {
  console.log("Submitting daily log:", data);
  
  // Server-side validation: prevent past dates
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const submittedDate = new Date(data.date);
  submittedDate.setHours(0, 0, 0, 0);
  
  if (submittedDate < today) {
    throw new Error("Cannot log work for past dates");
  }
  
  const supabase = await createClient();
  
  const { error } = await supabase.from("daily_logs").insert({
    member_id: data.member_id,
    content_count: data.content_count,
    video_link: data.video_link,
    created_at: data.date.toISOString(), 
  });

  if (error) {
    console.error("Error submitting daily log:", error);
    throw new Error(error.message);
  }

  revalidatePath(`/admin/daily-tracking/${data.member_id}`);
}

export async function getTeamMembers() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("team_members").select("*").order("name");
  
  if (error) throw new Error(error.message);
  return data;
}

export async function getMemberLogs(memberId: string, month: number, year: number) {
  const supabase = await createClient();
  
  // Format dates for range query
  const startDate = new Date(year, month, 1).toISOString();
  const endDate = new Date(year, month + 1, 0).toISOString();

  const { data, error } = await supabase
    .from("daily_logs")
    .select("*")
    .eq("member_id", memberId)
    .gte("created_at", startDate)
    .lte("created_at", endDate)
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);
  return data;
}

export async function deleteDailyLog(logId: string, memberId: string) {
  console.log("Attempting to delete log:", { logId, memberId });
  const supabase = await createClient();
  
  const { error, data } = await supabase
    .from("daily_logs")
    .delete()
    .eq("id", logId)
    .select();

  if (error) {
    console.error("Delete error:", error);
    throw new Error(error.message);
  }

  console.log("Delete successful, deleted rows:", data);
  revalidatePath(`/admin/daily-tracking/${memberId}`);
}

export async function updateDailyLog(data: {
  id: string;
  member_id: string;
  content_count: number;
  video_link: string;
  date: Date;
}) {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from("daily_logs")
    .update({
      content_count: data.content_count,
      video_link: data.video_link,
      created_at: data.date.toISOString(),
    })
    .eq("id", data.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/admin/daily-tracking/${data.member_id}`);
}
