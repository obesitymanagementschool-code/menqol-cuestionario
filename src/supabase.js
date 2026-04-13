import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mpoynslwcyuigxrvpzqn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wb3luc2x3Y3l1aWd4cnZwenFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3NzI3OTYsImV4cCI6MjA5MTM0ODc5Nn0.UXAIAk0auJT-PX94az78LVj3gJfxQk6GZG5WIqXV3cU'

export const supabase = createClient(supabaseUrl, supabaseKey)
