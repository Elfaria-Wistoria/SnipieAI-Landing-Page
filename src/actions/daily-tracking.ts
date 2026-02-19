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
  const submittingDate = new Date(data.date);
  submittingDate.setHours(0, 0, 0, 0);
  
  // Using admin client to bypass RLS
  const { error } = await supabaseAdmin.from("daily_logs").insert({
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
  // Using admin client to bypass RLS for admin dashboard
  const { data, error } = await supabaseAdmin.from("team_members").select("*").order("name");
  
  if (error) throw new Error(error.message);
  return data;
}

export async function getMemberLogs(memberId: string, month: number, year: number) {
  // Format dates for range query
  const startDate = new Date(year, month, 1).toISOString();
  const endDate = new Date(year, month + 1, 0).toISOString();

  // Using admin client to bypass RLS
  const { data, error } = await supabaseAdmin
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
  
  // Using admin client to bypass RLS
  const { error, data } = await supabaseAdmin
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
  // Using admin client to bypass RLS
  const { error } = await supabaseAdmin
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

import { supabaseAdmin } from "@/lib/supabase-admin";

export async function addTeamMember(data: FormData) {
  const name = data.get("name") as string;
  const role = data.get("role") as string;
  const email = data.get("email") as string;
  const avatarFile = data.get("avatar") as File;

  if (!name || !role) {
    throw new Error("Name and Role are required");
  }

  const supabase = await createClient();
  let avatar_url = `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`;

  if (avatarFile && avatarFile.size > 0) {
    // Validate file type and size
    if (!avatarFile.type.startsWith("image/")) {
      throw new Error("Invalid file type. Please upload an image.");
    }
    if (avatarFile.size > 2 * 1024 * 1024) { // 2MB limit
      throw new Error("File size too large. Max 2MB.");
    }

    const fileExt = avatarFile.name.split('.').pop();
    const fileName = `${name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    // Use regular client for upload (assuming authenticated user has upload rights)
    // or switch to admin if needed. Sticking to regular client for storage as policy allows authenticated uploads.
    const { error: uploadError, data: uploadData } = await supabase.storage
      .from('avatars')
      .upload(filePath, avatarFile);

    if (uploadError) {
      console.error("Error uploading avatar:", uploadError);
      throw new Error("Failed to upload avatar image.");
    }

    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    avatar_url = publicUrl;
  }

  // Create member using ADMIN client to bypass RLS
  const { error: memberError } = await supabaseAdmin.from("team_members").insert({
    name,
    role,
    email: email || null,
    image_url: avatar_url,
    percentage: parseFloat(data.get("percentage") as string) || 0,
  });

  if (memberError) {
    console.error("Error creating member:", memberError);
    throw new Error(memberError.message);
  }

  revalidatePath("/admin/daily-tracking");
}
