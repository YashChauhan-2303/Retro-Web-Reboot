import { createClient, SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL: string = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY: string = import.meta.env.VITE_SUPABASE_KEY;

const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabase;
