"use strict";
let teams;

function loadAllStandings() {
	loadStandings('east');
	loadStandings('west');
};

function toggleEast() {
	let eastTable = document.getElementById('eastStandingsTable');
	let westTable = document.getElementById('westStandingsTable');
	eastTable.style.display = eastTable.style.display === 'none' ? '' : 'none';
	westStandingsTable.style.display = 'none';
}

function toggleWest() {
	let westTable = document.getElementById('westStandingsTable');
	let eastTable = document.getElementById('eastStandingsTable');
	westTable.style.display = westTable.style.display === 'none' ? '' : 'none';
	eastStandingsTable.style.display = 'none';
}

function loadStandings(conf) {
	let teamUrl = 'http://data.nba.net/10s/prod/v2/2018/teams.json';

	fetch(teamUrl)
	.then(function(response) {
		return response.json();
	})
	.then(function(response) {
		teams = response.league.vegas;

		let imagePaths = teamImages();

		for (let i = 0; i < teams.length; i ++) {
			teams[i].image_path = imagePaths[i];
		}
	})


	let standingsUrl = 'http://data.nba.net/10s/prod/v1/current/standings_conference.json';

	fetch(standingsUrl)
	.then(function(response) {
		return response.json();
	})
	.then(function(response) { return parseStandings(conf, teams, response); })
	.catch(function(error) {
		console.log(error);
	});


}


