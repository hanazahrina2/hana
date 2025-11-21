const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Mahasiswa = require('./mahasiswa'); 
require('dotenv').config(); // Panggil dotenv di awal

const app = express();
const PORT = 3000; 

// Middleware untuk parsing JSON
app.use(express.json()); 

// --- KONFIGURASI KONEKSI MONGODB ---
// Menggunakan environment variables dari docker-compose dan .env
// Pastikan DB_HOST di .env adalah 'mongodb' (nama service di docker-compose)
const connectionString = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/db_mahasiswa?authSource=admin`;

mongoose.connect(connectionString)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));
  app.listen(PORT, () => {
    console.log(`🚀 Server API berjalan di http://localhost:${PORT}`);
});


// --- ROUTING ---

// 1. Rute Default (Root Path) - Wajib agar tidak mendapat "Cannot GET /"
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Mahasiswa API! Use /api/mahasiswa for data access.',
        status: 'Server Running'
    });
});

// 2. Rute GET /api/mahasiswa (Mengambil semua data)
app.get('/api/mahasiswa', async (req, res) => {
    try {
        const daftarMahasiswa = await Mahasiswa.find({});
        res.status(200).json(daftarMahasiswa);
    } catch (err) {
        // Jika ada error database, kirim status 500
        res.status(500).json({ error: 'Failed to fetch data', details: err.message });
    }
});

// 3. Rute POST /api/mahasiswa (Menambahkan data baru)
app.post('/api/mahasiswa', async (req, res) => {
    try {
        const { nim, nama, ipk, jurusan } = req.body;
        
        // Validasi dasar
        if (!nim || !nama) {
            return res.status(400).json({ message: 'NIM dan Nama wajib diisi.' });
        }

        const newMahasiswa = new Mahasiswa({ nim, nama, ipk, jurusan });
        await newMahasiswa.save();

        res.status(201).json({ 
            message: 'Mahasiswa berhasil ditambahkan!',
            data: newMahasiswa 
        });
    } catch (err) {
        // Jika ada error validasi atau database
        res.status(500).json({ error: 'Failed to save data', details: err.message });
    }
});


// Middleware untuk static file (jika ada folder 'public')
// app.use(express.static(path.join(__dirname, 'public')));


