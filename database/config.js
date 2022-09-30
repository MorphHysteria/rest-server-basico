require('colors');
const mongoose = require('mongoose');

// Conexión de base de datos
const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Base de datos conectada!'.blue);
    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la base de datos'.red);
    }
};

module.exports = {
    dbConnection
}