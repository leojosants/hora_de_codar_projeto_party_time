const mongoose = require('mongoose');
require('dotenv').config();

async function main() {
    try {
        const connectionString = process.env.CONNECTION_STRING;
        mongoose.set('strictQuery', true);
        await mongoose.connect(connectionString);
        console.log('Conectado ao BD!');
    }
    catch (error) {
        console.log(`Erro: ${error}`);
    }
}

module.exports = main;