
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zyomsnysetblzumtsada.supabase.co';
const supabaseAnonKey = 'sb_publishable_03O1oqmXzRjoOxuO00Xdhg_9c8l5gXn';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
