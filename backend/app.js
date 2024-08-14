const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const app = express();
const port = 5000;

// Configurar o Firebase
const serviceAccount = require('./data/firebase-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'airsoft-diretorio-equipas.appspot.com' // Substitua pelo nome do seu bucket
});

const db = admin.firestore();
const bucket = admin.storage().bucket();

app.use(cors());

// Função para obter a URL do logo armazenado no Firebase Storage
async function getLogoUrl(logoPath) {
    try {
        const file = bucket.file(logoPath);
        const [url] = await file.getSignedUrl({
            action: 'read',
            expires: '03-09-2500' // Defina uma data de expiração longa
        });
        return url;
    } catch (error) {
        console.error('Erro ao obter a URL do logo:', error);
        return null;
    }
}

// Rota para buscar todas as equipas
app.get('/teams', async (req, res) => {
    try {
        const teamsRef = db.collection('equipas');
        const snapshot = await teamsRef.get();
        
        if (snapshot.empty) {
            res.status(404).json({ message: 'No teams found' });
            return;
        }

        const teams = [];
        for (const doc of snapshot.docs) {
            const data = doc.data();
            const logoUrl = await getLogoUrl(data.logo);
            teams.push({
                id: doc.id,
                name: data.name,
                city: data.city,
                district: data.district,
                email: data.email,
                facebook: data.facebook,
                instagram: data.instagram,
                whatsapp: data.whatsapp,
                logo: logoUrl
            });
        }

        res.json(teams);
    } catch (error) {
        console.error('Error retrieving teams:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Rota para buscar uma equipa específica pelo ID
app.get('/teams/:id', async (req, res) => {
    try {
        const teamId = req.params.id;
        const teamRef = db.collection('equipas').doc(teamId);
        const doc = await teamRef.get();

        if (!doc.exists) {
            res.status(404).json({ message: 'Team not found' });
        } else {
            const data = doc.data();
            const logoUrl = await getLogoUrl(data.logo);
            res.json({
                id: doc.id,
                name: data.name,
                city: data.city,
                district: data.district,
                email: data.email,
                facebook: data.facebook,
                instagram: data.instagram,
                whatsapp: data.whatsapp,
                logo: logoUrl
            });
        }
    } catch (error) {
        console.error('Error retrieving team:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
