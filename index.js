const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

// CORS middleware'ini ekleyin
app.use(cors());

/* // İzin verilen IP adresi
const allowedIP = '123.456.789.000'; // Buraya izin vermek istediğiniz IP adresini yazın */

/* // IP adresini kontrol eden middleware
app.use((req, res, next) => {
    const requestIP = req.ip || req.connection.remoteAddress;
    if (requestIP === allowedIP) {
        next(); // İzin verilen IP adresi ise devam et
    } else {
        res.status(403).send('Erişim engellendi: Bu IP adresine izin verilmiyor.');
    }
}); */


// İzin verilen web adresi
/* const allowedReferer = 'http://localhost:3000/'; // Buraya izin vermek istediğiniz web adresini yazın


// Referer başlığını kontrol eden middleware
app.use((req, res, next) => {
    const referer = req.get('Referer');
    if (referer && referer.startsWith(allowedReferer)) {
        next(); // İzin verilen web adresi ise devam et
    } else {
        res.status(403).send('Erişim engellendi: Bu web adresine izin verilmiyor.');
    }
});
 */
const allowedOrigins = ['http://127.0.0.1:3000/', 'http://localhost:3000/', 'http://127.0.0.1:3000/', 'https://localhost:3000/'];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('CORS hatası: İzin verilmeyen alan adı'));
        }
    }
}));
app.get('/', async (req, res) => {
    try {
        res.send('hello world');
    } catch (error) {
        res.status(500).send(`console.error("Google Maps API yüklenemedi: ${error.message}")`);
    }
});

// Sunucunun çalıştığını kontrol etmek için
app.listen(3001, () => {
    console.log('Server running on port 3001');
}); 