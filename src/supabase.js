import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mpoynslwcyuigxrvpzqn.supabase.co'
const supabaseKey = 'sb_publishable_XXoGWL8CplK8EXhijNt9Rg_EMD9p474'

export const supabase = createClient(supabaseUrl, supabaseKey)
