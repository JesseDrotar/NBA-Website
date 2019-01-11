'use strict';

var query = window.location.search;

if(query.substring(0,1) == '?') {
	query = query.substring(1);
}

function getAllPlayers () {
	let leaguePlayerUrl = 'http://data.nba.net/prod/v1/2018/players.json';
	let playerDict = {};

	fetch(leaguePlayerUrl)
	.then(function (response) {
		return response.json();
	})
	.then(function (response) {
		let allPlayers = response.league.standard;
		
		for (let i =0; i < allPlayers.length; i++) {
			let name = allPlayers[i].firstName + '	' + allPlayers[i].lastName;
			playerDict[allPlayers[i].personId] = name;
		}
	})
	.catch(function (error) {
		console.log(error);
	});

	let rosterUrl = `http://data.nba.net/prod/v1/2018/teams/${query}/roster.json`;
	let roster;

	fetch(rosterUrl)
	.then(function (response) {
		return response.json();
	})
	.then(function (response) {
		roster = response.league.standard.players;
	})
	.then(function (response) {return loadPlayers(playerDict, roster); })
	.catch(function (error) {
		console.log(error);
	});
	
};


