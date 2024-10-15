#!/usr/bin/env node

const axios = require('axios');
const inquirer = require('inquirer');

const BASE_URL = 'https://pokeapi.co/api/v2';

const playerHP = 300;
const botHP = 300;

// Fonction pour choisir un Pokémon aléatoire pour le bot
const getRandomPokemon = async () => {
  const randomId = Math.floor(Math.random() * 150) + 1;
  const response = await axios.get(`${BASE_URL}/pokemon/${randomId}`);
  return response.data;
};

// Fonction pour choisir un Pokémon pour le joueur
const choosePokemon = async () => {
  const answer = await inquirer.prompt({
    type: 'input',
    name: 'pokemon',
    message: 'Choisissez un Pokémon (entrez le nom ou l\'ID) :',
  });
  const response = await axios.get(`${BASE_URL}/pokemon/${answer.pokemon}`);
  return response.data;
};

// Fonction pour lancer le combat
const fight = async (playerPokemon, botPokemon) => {
  let playerCurrentHP = playerHP;
  let botCurrentHP = botHP;

  // Boucle de combat
  while (playerCurrentHP > 0 && botCurrentHP > 0) {
    console.log(`\n${playerPokemon.name} (HP: ${playerCurrentHP}) vs ${botPokemon.name} (HP: ${botCurrentHP})`);

    // Joueur choisit son attaque
    const moveChoices = playerPokemon.moves.slice(0, 5).map((move, index) => {
      return { name: move.move.name, value: index };
    });

    const playerMove = await inquirer.prompt({
      type: 'list',
      name: 'move',
      message: 'Choisissez votre attaque :',
      choices: moveChoices,
    });

    const playerAttack = playerPokemon.moves[playerMove.move].move;
    const botMove = botPokemon.moves[Math.floor(Math.random() * 5)].move;

    // Calcul des dégâts basés sur la précision et la puissance
    const playerPower = Math.floor(Math.random() * 100) <= 80 ? 60 : 0; // Assume 80% accuracy
    const botPower = Math.floor(Math.random() * 100) <= 80 ? 60 : 0;    // Assume 80% accuracy

    botCurrentHP -= playerPower;
    playerCurrentHP -= botPower;

    console.log(`${playerPokemon.name} utilise ${playerAttack.name} ! Il inflige ${playerPower} dégâts.`);
    console.log(`${botPokemon.name} utilise ${botMove.name} ! Il inflige ${botPower} dégâts.`);

    // Si l'un des Pokémon tombe à 0 HP
    if (playerCurrentHP <= 0) {
      console.log(`${playerPokemon.name} a perdu !`);
      return;
    } else if (botCurrentHP <= 0) {
      console.log(`${botPokemon.name} est K.O. ! Vous avez gagné !`);
      return;
    }
  }
};

// Démarrage du jeu
const startGame = async () => {
  console.log("Bienvenue dans le mini-jeu Pokémon !");

  const playerPokemon = await choosePokemon();
  const botPokemon = await getRandomPokemon();

  console.log(`Vous avez choisi ${playerPokemon.name}!`);
  console.log(`Votre adversaire est ${botPokemon.name}.`);

  await fight(playerPokemon, botPokemon);
};

startGame();
