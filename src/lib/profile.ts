import { supabase } from "./supabase";

export type Profile = {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  city: string | null;
  pace: string | null;
  run_count: number | null;
  created_at: string | null;
  updated_at: string | null;
};

export async function getProfile(userId: string) {
  return supabase
    .from<Profile>("profiles")
    .select("id, full_name, avatar_url, bio, city, pace, run_count, created_at, updated_at")
    .eq("id", userId)
    .maybeSingle();
}

export async function createProfile(profile: Partial<Profile> & { id: string }) {
  return supabase
    .from<Profile>("profiles")
    .insert(profile);
}

export async function updateProfile(profile: Partial<Profile> & { id: string }) {
  return supabase
    .from<Profile>("profiles")
    .update(profile)
    .eq("id", profile.id);
}

export async function saveProfile(profile: Partial<Profile> & { id: string }, existingRow: boolean) {
  if (existingRow) {
    return updateProfile(profile);
  }

  const response = await createProfile(profile);
  if (
    response.error &&
    typeof response.error.message === "string" &&
    response.error.message.toLowerCase().includes("duplicate")
  ) {
    return updateProfile(profile);
  }

  return response;
}

export async function createOrUpdateProfile(profile: Partial<Profile> & { id: string }) {
  return supabase
    .from<Profile>("profiles")
    .upsert(profile, { onConflict: "id" });
}

export async function uploadAvatar(userId: string, file: File) {
  const filePath = `${userId}/avatar.jpg`;
  const { error: uploadError } = await supabase.storage.from("avatars").upload(filePath, file, {
    cacheControl: "3600",
    upsert: true,
    contentType: file.type,
  });

  if (uploadError) {
    throw uploadError;
  }

  const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
  return data.publicUrl;
}
