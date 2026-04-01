require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());

// Supabase setup
const supabaseUrl = 'https://blaphkwcgumzdylngfri.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// API endpoint
app.get('/employees', async (req, res) => {
  try {
    const { data, error } = await supabase.from('employees').select('*');
    console.log("Supabase Data:", data);
    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error('Supabase Error:', err);
    res.status(500).send(err.message);
  }
});

// Server
app.listen(5000, '0.0.0.0', () => {
  console.log('Server running on port 5000');
});
