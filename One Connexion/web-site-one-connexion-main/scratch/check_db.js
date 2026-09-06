
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkData() {
  console.log('Checking profiles...');
  const { data: profiles, error: pError } = await supabase.from('profiles').select('*');
  if (pError) console.error('Profiles error:', pError);
  else console.log(`Found ${profiles.length} profiles`);

  console.log('Checking clients...');
  const { data: clients, error: cError } = await supabase.from('clients').select('*');
  if (cError) console.error('Clients error:', cError);
  else console.log(`Found ${clients.length} clients`);

  console.log('Sample profiles roles:', [...new Set(profiles?.map(p => p.role))]);
  
  const registeredClients = (profiles || []).filter(p => p.role?.toLowerCase() === 'client' || !p.role);
  console.log(`Registered clients (from profiles): ${registeredClients.length}`);
  if (registeredClients.length > 0) {
    console.log('First registered client:', JSON.stringify(registeredClients[0], null, 2));
  }
}

checkData();
