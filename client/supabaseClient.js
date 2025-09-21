const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

supabase
  .from('users')
  .select('*')
  .then(response => console.log(`Estatus de la conexión: ${response.status} ${response.statusText}`))
  .catch(error => console.error('Error de conexión:', error));

module.exports = supabase;