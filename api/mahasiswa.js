const mongoose = require('mongoose');

const MahasiswaSchema = new mongoose.Schema({
    nim: { type: String, required: true, unique: true },
    nama: { type: String, required: true },
    ipk: { type: Number, default: 0.0 },
    jurusan: { type: String },
});

const Mahasiswa = mongoose.model("Mahasiswa", MahasiswaSchema, "mahasiswa");


module.exports = Mahasiswa;