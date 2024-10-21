const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // Middleware pour parser les données JSON

// Route de base pour vérifier que le serveur fonctionne
app.get('/', (req, res) => {
  res.send('Serveur Express est opérationnel !');
});

// Lancer le serveur
app.listen(port, () => {
  console.log(`Serveur en écoute sur http://localhost:${port}`);
});

let items = []; // Variable locale pour stocker les éléments

// Endpoint POST pour ajouter des éléments
app.post('/items', (req, res) => {
    const item = req.body; // Récupérer l'élément depuis le corps de la requête
    items.push(item); // Ajouter l'élément à l'array local
    res.status(201).json(item); // Répondre avec l'élément créé
});


// Endpoint GET pour récupérer tous les éléments
app.get('/items', (req, res) => {
  res.json(items); // Répondre avec le tableau des éléments
});

