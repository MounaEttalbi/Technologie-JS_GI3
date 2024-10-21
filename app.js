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

// Endpoint GET pour récupérer un élément par ID
app.get('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = items.find(item => item.id === id);
    
    if (!item) {
      return res.status(404).send('Item non trouvé');
    }
    
    res.json(item);
  });
  
  // Endpoint PUT pour mettre à jour un élément
  app.put('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = items.findIndex(item => item.id === id);
    
    if (index === -1) {
      return res.status(404).send('Item non trouvé');
    }
    
    items[index] = req.body;  // Remplace l'élément par les nouvelles données
    res.send(items[index]);
  });
  

  // Endpoint DELETE pour supprimer un élément
app.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (items[id]) {
      items.splice(id, 1); // Retirer l'élément du tableau
      res.status(204).send(); // Répondre sans contenu
  } else {
      res.status(404).json({ message: 'Élément non trouvé' });
  }
});
