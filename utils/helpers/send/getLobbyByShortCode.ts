import { createClient } from "@supabase/supabase-js";

export default async function getLobbyByShortCode(shortCode: string) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISH_KEY ?? "",
  );

  return supabase
    .from("send_lobby")
    .select("id")
    .eq("short_id", shortCode)
    .single();
}
