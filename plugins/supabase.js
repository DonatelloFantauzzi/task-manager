import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://iremkhiakjayjvgssrcy.supabase.co"; // ← la tua url
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlyZW1raGlha2pheWp2Z3NzcmN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyNjg2NDMsImV4cCI6MjA2Nzg0NDY0M30.qsx0vCkwuzedcJAZxCYMIDiFjSg-qw7kkR_3Ikz3n3c"; // ← la tua anon key

export default defineNuxtPlugin(() => {
  const supabase = createClient(supabaseUrl, supabaseKey);
  return {
    provide: {
      supabase,
    },
  };
});
