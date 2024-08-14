const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const server = express();
const port = 5000;

// Configurar o Firebase
const serviceAccount = require('./data/firebase-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'airsoft-diretorio-equipas.appspot.com'
});

const db = admin.firestore();
const bucket = admin.storage().bucket();

server.use(cors());

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
server.get('/teams', async (req, res) => {
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
            // Formatar o campo lastUpdate
            const lastUpdateFormatted = data.lastUpdate
                ? format(data.lastUpdate.toDate(), 'yyyy-MM-dd HH:mm:ss')
                : null;

            teams.push({
                id: doc.id,
                name: data.name,
                city: data.city,
                district: data.district,
                email: data.email,
                facebook: data.facebook,
                instagram: data.instagram,
                whatsapp: data.whatsapp,
                isActive: data.isActive,
                lastUpdate: lastUpdateFormatted,
                //lastUpdate: data.lastUpdate,// ? new Date(data.timestamp.seconds * 1000).toLocaleString() : 'Data não disponível',
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
server.get('/teams/:id', async (req, res) => {
    try {
        const teamId = req.params.id;
        const teamRef = db.collection('equipas').doc(teamId);
        const doc = await teamRef.get();

        if (!doc.exists) {
            res.status(404).json({ message: 'Team not found' });
        } else {
            const data = doc.data();
            const logoUrl = await getLogoUrl(data.logo);

            // Formatando o campo lastUpdate
            const lastUpdateFormatted = data.lastUpdate
                ? format(data.lastUpdate.toDate(), 'yyyy-MM-dd HH:mm:ss')
                : null;

            res.json({
                id: doc.id,
                name: data.name,
                city: data.city,
                district: data.district,
                email: data.email,
                facebook: data.facebook,
                instagram: data.instagram,
                whatsapp: data.whatsapp,
                isActive: data.isActive,
                lastUpdate: lastUpdateFormatted,
                logo: logoUrl
            });
        }
    } catch (error) {
        console.error('Error retrieving team:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
