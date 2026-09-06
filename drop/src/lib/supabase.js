import { createClient } from '@supabase/supabase-js'

// Ces variables devront être remplacées par vos vraies clés Supabase
// (à récupérer dans les Settings > API de votre projet Supabase)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://eooqshnzvxqzmmebugqk.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_haaLs-9dj5-ePyWc5W7xyw_Tw_8LSy8'


export const supabase = createClient(supabaseUrl, supabaseAnonKey)
