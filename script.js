"use strict";

let east = 'east'
let west = 'west'

loadDoc(getTeams, east);
loadDoc(getTeams, west);

function toggleEast() {
	let table = document.getElementById('eastStandingsTable');
	table.style.display = table.style.display === 'none' ? '' : 'none';
}

function toggleWest() {
	let table = document.getElementById('westStandingsTable');
	table.style.display = table.style.display === 'none' ? '' : 'none';
}

function loadDoc (callback, conf) {
	let teamUrl = 'http://data.nba.net/10s/prod/v2/2018/teams.json' 
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			let standingsObject = callback(this.response, parseStandings, conf);
			return standingsObject;
		}
	};

	xhttp.open("GET", teamUrl, true);
	xhttp.send();
}

function getTeams(object, callback, conf) {
	let teamsObject = JSON.parse(object);
	teamsObject = teamsObject.league.vegas;

	let teamDictionary = {};
	for (let i = 0; i < teamsObject.length; i ++) {
		teamDictionary[teamsObject[i].teamId] = teamsObject[i].fullName;
	}

	let standingsUrl = 'http://data.nba.net/10s/prod/v1/current/standings_conference.json'	
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			let standingsObject = callback(this.response, teamDictionary, conf);
			return standingsObject;
		}
	};

	xhttp.open('GET', standingsUrl);
	xhttp.send();
}

function parseStandings (object, dictionary, conf) {
	let standingsObject = JSON.parse(object);
	standingsObject = standingsObject.league.standard.conference[conf]

	let standingsObjectKeys = [];
	standingsObjectKeys.push('teamId');
	standingsObjectKeys.push('win');
	standingsObjectKeys.push('loss');
	standingsObjectKeys.push('winPctV2');
	standingsObjectKeys.push('lossPctV2');
	standingsObjectKeys.push('gamesBehind');
	standingsObjectKeys.push('divGamesBehind');
	standingsObjectKeys.push('confRank');
	standingsObjectKeys.push('streak');

	let standingsTable = document.createElement("TABLE");
	let id = conf + 'StandingsTable';
	standingsTable.id = id;

	let div_id = conf +'_div'
	document.getElementById(div_id).appendChild(standingsTable);

	let headerRow = document.createElement('thead');
	document.getElementById(id).append(headerRow);
	
	for (let i =0; i <standingsObjectKeys.length; i++) {
		headerRow.appendChild(document.createElement('th')).appendChild(document.createTextNode(standingsObjectKeys[i]));
	}

	for (let i = 0; i < standingsObject.length; i++) {
		let row = document.createElement('TR');
		let rowId = conf + 'row' + i.toString();
		row.id = rowId;
		document.getElementById(id).appendChild(row);

		console.log(id);


		for (let j = 0; j < standingsObjectKeys.length; j++) {
			let tableData = document.createElement('TD');
			let key = standingsObjectKeys[j];
			if (key == 'teamId') {
				let team_name = dictionary[standingsObject[i][key]];
				let cell = document.createTextNode(team_name)
				tableData.appendChild(cell);
			}
			else {
				let cell = document.createTextNode(standingsObject[i][key]);
				tableData.appendChild(cell);
			}
			
			
			document.getElementById(rowId).appendChild(tableData);
		}
		
	}

	document.getElementById(id).style.display = 'none';
	return standingsTable;

}






