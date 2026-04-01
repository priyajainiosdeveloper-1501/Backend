const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();
app.use(cors());

// SQL Server Authentication config
const config = {
    user: 'testuser',                     // SQL login
    password: 'Test@1234',                // SQL login password
    server: 'DESKTOP-16S9TLR\\SQLEXPRESS', // instance name
    database: 'PracticeDB',
    options: {
        encrypt: false,
        enableArithAbort: true
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
};

// Global pool
let pool;
async function getPool() {
    if (!pool) {
        pool = await sql.connect(config);
        console.log('SQL Pool created');
    }
    return pool;
}

// API endpoint
app.get('/employees', async (req, res) => {
    try {
        const pool = await getPool();
        const result = await pool.request().query('SELECT * FROM Employees');
        res.json(result.recordset);
    } catch (err) {
        console.error('DB Error:', err);
        res.status(500).send(err.message);
    }
});

app.listen(5000, '0.0.0.0', () => {
  console.log("Server running on port 5000");
});