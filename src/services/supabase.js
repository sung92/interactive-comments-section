import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://cvrvhnsuvpskjipylfbi.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2cnZobnN1dnBza2ppcHlsZmJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU4MjAzNjAsImV4cCI6MjAzMTM5NjM2MH0.gFWH85GC1lZnKQbuhElbeQT3BR1HX3ogyFnDcg0kyAw";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
