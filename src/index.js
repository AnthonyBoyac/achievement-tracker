import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Game from './Game';
import configData from './config.json';

// store all games the user has with achievements enabled
var allGames = {};
// TODO: add below - it's used for each game component - links to game's guide
// 'https://steamcommunity.com/app/' + <appid> + '/guides/'

fetch('IPlayerService/GetOwnedGames/v1/?key=' + configData.apiKey + '&steamid=' + configData.steamId + '&include_appinfo=true&include_played_free_games=true&appids_filter=0')
  .then(res => res.json())
  .then(res => {
    for (var i = 0; i < res.response.game_count; i++) {
      allGames[res.response.games[i].name] = res.response.games[i].appid;
    }
    console.log(res.response.game_count)
    console.log('Output: ', allGames);
    Object.entries(allGames).forEach(game => {
    fetch('ISteamUserStats/GetSchemaForGame/v0002/?key=' + configData.apiKey + '&appid=' + game[1] + '&l=english&format=json')
    .then(res => res.json())
    .then(res => console.log(res))
    })
  });

const root = ReactDOM.createRoot(document.getElementById('root'));
console.log(allGames);
root.render(
  <Game />
);