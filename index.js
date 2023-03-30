// Importer les modules nécessaires
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

// Créer une instance de l'application Express
const app = express();

// Configurer le module Body Parser pour lire les données des formulaires
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configurer la connexion à la base de données MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'votre_utilisateur_mysql',
  password: 'votre_mot_de_passe_mysql',
  database: 'votre_base_de_donnees_mysql'
});

// Vérifier que la connexion à la base de données est établie
connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données MySQL: ', err);
    return;
  }
  console.log('Connexion à la base de données MySQL réussie!');
});

// Créer une route pour la page d'accueil
app.get('/', (req, res) => {
  res.send('Bienvenue sur la page d\'accueil!');
});

// Créer une route pour la page de contact
app.get('/contact', (req, res) => {
  res.send('Voici la page de contact!');
});

// Créer une route pour la page d'administration des articles
app.get('/admin/articles', (req, res) => {
  connection.query('SELECT * FROM articles', (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des articles: ', err);
      res.status(500).send('Erreur lors de la récupération des articles');
      return;
    }
    res.json(results);
  });
});

// Créer une route pour la modification d'un article
app.put('/admin/articles/:id', (req, res) => {
  const { titre, contenu } = req.body;
  const { id } = req.params;

  connection.query('UPDATE articles SET titre = ?, contenu = ? WHERE id = ?', [titre, contenu, id], (err, results) => {
    if (err) {
      console.error('Erreur lors de la modification de l\'article: ', err);
      res.status(500).send('Erreur lors de la modification de l\'article');
      return;
    }
    res.json(results);
  });
});

// Lancer le serveur sur le port 3000
app.listen(3000, () => {
  console.log('Le serveur est en écoute sur le port 3000!');
});
