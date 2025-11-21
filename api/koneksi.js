// Menggunakan dotenv untuk membaca .env
require('dotenv').config(); 

const express = require('express');
const mongoose = require('mongoose');
const path = require('path'); // Menggunakan path bawaan Node.js

// PERBAIKAN PATH: Pastikan require() ini benar
const Mahasiswa = require('./mahasiswa'); 

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); 

// PERBAIKAN KONEKSI DATABASE
// Menggunakan 'mongodb' sebagai HOSTNAME (nama service Docker)
const connectionString = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@mongodb:27017/db_mahasiswa?authSource=admin`; 

mongoose.connect(connectionString)
    .then(() => console.log('SELAMAT! Koneksi ke MongoDB berhasil!'))
    .catch(err => {
        console.error('Koneksi MongoDB GAGAL:', err.message);
        // Penting: Keluar dari aplikasi jika DB gagal agar Docker dapat restart
        process.exit(1); 
    });


// Rute Utama (index.html)
app.get('/', (req, res) => {
    // Mengirim file index.html dari folder yang sama
    res.sendFile(path.join(__dirname, 'index.html')); 
});

// Contoh Rute API (GET all)
app.get('/api/mahasiswa', async (req, res) => {
    try {
        const data = await Mahasiswa.find();
        res.json(data);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Tambahkan rute POST, PUT, DELETE Anda di sini...

app.listen(PORT, () => {
    console.log(`Server Node.js berjalan di port ${PORT}`);
});