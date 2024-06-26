const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PacienteSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("Paciente", PacienteSchema);