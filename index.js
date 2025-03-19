// .env dosyasını yükle (en başta olmalı)
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

// API anahtarını kontrol et
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
if (!GOOGLE_MAPS_API_KEY) {
  console.warn('Uyarı: GOOGLE_MAPS_API_KEY environment variable tanımlanmamış');
} else {
  console.log('Google Maps API key başarıyla yüklendi');
}

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
const allowedOrigins = ['http://127.0.0.1:3001', 'http://localhost:3001', 'https://localhost:3001'];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('CORS hatası: İzin verilmeyen alan adı'));
        }
    },
    credentials: true
}));
app.get('/hava-durumu', async (req, res) => {
    try {
        // Content-Type'ı açıkça belirtiyoruzaaa
        res.setHeader('Content-Type', 'application/javascript');
        
        const response = await axios.get('https://maps.googleapis.com/maps/api/js', {
            params: {
                key: GOOGLE_MAPS_API_KEY,
                libraries: 'places',
                callback: '_googleMapsCallback'
            },
            // Response type'ı text olarak belirtiyoruz
            responseType: 'text'
        });
        
        res.send(response.data);
    } catch (error) {
        console.error('Google Maps API proxy hatası:', error);
        res.status(500).send(`console.error("Google Maps API yüklenemedi: ${error.message}")`);
    }
});
app.get('/', async (req, res) => {
    try {
        res.send("hello world");
    } catch (error) {
        console.error('Google Maps API proxy hatası:', error);
        res.status(404).send(`not found`);
    }
});

// Sunucunun çalıştığını kontrol etmek için
app.listen(3002, () => {
    console.log('Server running on port 3001');
}); 