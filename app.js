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
