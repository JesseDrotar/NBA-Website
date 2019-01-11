"use strict";

let teams;

function loadScoreBoard() {

	let teamsUrl = 'http://data.nba.net/10s/prod/v2/2018/teams.json'

	
	fetch(teamsUrl)
	.then(function(response) {
		 return response.json();
	})
	.then(function(response) {
		teams = response.league.vegas;

		let scoresUrl = 'http://data.nba.net//prod/v1/20190104/scoreboard.json';
		let scoreboard;

		fetch(scoresUrl).then(function(response) {
			return response.json()
		})
		.then(buildScoreBoard) //found in supportive_functions.js
		.catch(function (error) {
			console.log(error);
		});

	})
	.catch(function(error) {
		console.log(error)
	}); 

}


