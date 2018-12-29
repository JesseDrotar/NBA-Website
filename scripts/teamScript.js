'use strict';

var query = window.location.search;

if(query.substring(0,1) == '?') {
	query = query.substring(1);
}

let leaguePlayerUrl = 'http://data.nba.net/prod/v1/2018/players.json';
let rosterUrl = `http://data.nba.net/prod/v1/2018/teams/${query}/roster.json` 


function playerNames(callback) {
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			let allPlayers = JSON.parse(this.response);
			allPlayers = allPlayers.league.standard
	
			let playerDict = {}
			for (let i =0; i < allPlayers.length; i++) {
				let name = allPlayers[i].firstName + '	' + allPlayers[i].lastName
				playerDict[allPlayers[i].personId] = name;
			}
			callback(playerDict, loadPlayers)
		}
	};

	xhttp.open('GET', leaguePlayerUrl);
	xhttp.send();
	
}


function loadTeam(dictionary, callback) {
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			let roster = JSON.parse(this.response);
			roster = roster.league.standard.players;
			callback(roster, dictionary);
		}
	};

	xhttp.open('GET', rosterUrl);
	xhttp.send();

}

function loadPlayers(object, dictionary) {

	let headerRow = document.createElement('thead');

	headerRow.appendChild(document.createElement('th')).appendChild(document.createTextNode('Name'));
	headerRow.appendChild(document.createElement('th')).appendChild(document.createTextNode('Games Played'));
	headerRow.appendChild(document.createElement('th')).appendChild(document.createTextNode('Minutes Per Game'));
	headerRow.appendChild(document.createElement('th')).appendChild(document.createTextNode('Points Per Game'));
	headerRow.appendChild(document.createElement('th')).appendChild(document.createTextNode('Field Goal Percentage'));
	headerRow.appendChild(document.createElement('th')).appendChild(document.createTextNode('3 Point Percentage'));
	headerRow.appendChild(document.createElement('th')).appendChild(document.createTextNode('Free Throw Percentage'));
	headerRow.appendChild(document.createElement('th')).appendChild(document.createTextNode('Assists Per Game'));
	headerRow.appendChild(document.createElement('th')).appendChild(document.createTextNode('Rebounds Per Game'));
	headerRow.appendChild(document.createElement('th')).appendChild(document.createTextNode('Blocks Per Game'));
	headerRow.appendChild(document.createElement('th')).appendChild(document.createTextNode('Steals Per Game'));
	headerRow.appendChild(document.createElement('th')).appendChild(document.createTextNode('Turn Overs Per Game'));

	document.getElementById('rosterTable').append(headerRow);
	
	//let playerNames = dictionary;

	for(let i=0; i < object.length; i++) {
		
		let personId = object[i].personId;
		let url = `http://data.nba.net/prod/v1/2018/players/${personId}_profile.json`;
		let xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if(this.readyState == 4 && this.status == 200) {
				let player = JSON.parse(this.response);
				player = player.league.standard.stats.latest;
				let rosterTable = document.getElementById('rosterTable');

				let row = document.createElement('TR');
				let rowId = Math.random().toString(36).substr(2, 16)
				row.id = rowId;

				
	
				let rosterKeys = []
				rosterKeys.push('name');
				rosterKeys.push('gamesPlayed');
				rosterKeys.push('mpg');
				rosterKeys.push('ppg');
				rosterKeys.push('fgp');
				rosterKeys.push('tpp');
				rosterKeys.push('ftp');
				rosterKeys.push('apg');
				rosterKeys.push('rpg');
				rosterKeys.push('bpg');
				rosterKeys.push('spg');
				rosterKeys.push('topg');

				for (let j = 0; j < rosterKeys.length; j++) {
					let tableData = document.createElement('TD');
					if(rosterKeys[j] == 'name'){
						let cell = document.createTextNode(dictionary[object[i].personId]);

						tableData.appendChild(cell);

						row.appendChild(tableData);
		
						document.getElementById('rosterTable').appendChild(row);		

					}
					else {
						let key = rosterKeys[j];
						let cell = document.createTextNode(player[key]);

						tableData.appendChild(cell);

						row.appendChild(tableData);
		
						document.getElementById('rosterTable').appendChild(row);		

					}

	
				}

			}
		};

		xhttp.open('GET', url);
		xhttp.send();
	}

}



playerNames(loadTeam);
