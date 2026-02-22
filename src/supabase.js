import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://unxiutvipbqsjhphvdfj.supabase.co'
const supabaseKey = 'sb_publishable_YuiNoHq0BBYEG14Rlks3rQ_wOcK0OIW'

export const supabase = createClient(supabaseUrl, supabaseKey)
