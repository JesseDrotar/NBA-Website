"use strict";

let east = 'east'
let west = 'west'

loadDoc(getTeams, east);
loadDoc(getTeams, west);

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

	let colors = teamColors();
	let imagePaths = teamImages();

	for (let i = 0; i < teamsObject.length; i ++) {
		teamsObject[i].color = colors[i];
		teamsObject[i].image_path = imagePaths[i];
	}

	let standingsUrl = 'http://data.nba.net/10s/prod/v1/current/standings_conference.json'	
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			let standingsObject = callback(this.response, teamsObject, conf);
			return standingsObject;
		}
	};

	xhttp.open('GET', standingsUrl);
	xhttp.send();
}

function parseStandings (object, dictionary, conf) {
	let standingsObject = JSON.parse(object);
	standingsObject = standingsObject.league.standard.conference[conf]

	let standingsObjectKeys = standingsKeys();

	let standingsTable = document.createElement("TABLE");
	let tableId = conf + 'StandingsTable';
	standingsTable.id = tableId;

	let div_id = conf +'_div'
	document.getElementById(div_id).appendChild(standingsTable);

	let headerRow = document.createElement('thead');
	document.getElementById(tableId).append(headerRow);
	
	/*for (let i =0; i <standingsObjectKeys.length; i++) {
		headerRow.appendChild(document.createElement('th')).appendChild(document.createTextNode(standingsObjectKeys[i]));
	}*/

	headerRow.appendChild(document.createElement('th')).appendChild(document.createTextNode(''));
	headerRow.appendChild(document.createElement('th')).appendChild(document.createTextNode('Team'));
	headerRow.appendChild(document.createElement('th')).appendChild(document.createTextNode('Wins'));
	headerRow.appendChild(document.createElement('th')).appendChild(document.createTextNode('Losses'));
	headerRow.appendChild(document.createElement('th')).appendChild(document.createTextNode('Win %'));
	headerRow.appendChild(document.createElement('th')).appendChild(document.createTextNode('Loss %'));
	headerRow.appendChild(document.createElement('th')).appendChild(document.createTextNode('Games Behind'));
	headerRow.appendChild(document.createElement('th')).appendChild(document.createTextNode('Div. Games Behind'));
	headerRow.appendChild(document.createElement('th')).appendChild(document.createTextNode('Conference Rank'));
	headerRow.appendChild(document.createElement('th')).appendChild(document.createTextNode('Streak'));

	for (let i = 0; i < standingsObject.length; i++) {
		let row = document.createElement('TR');
		let rowId = standingsObject[i].teamId;
		row.id = rowId;
		document.getElementById(tableId).appendChild(row);


		for (let j = 0; j < standingsObjectKeys.length; j++) {
			let tableData = document.createElement('TD');
			let key = standingsObjectKeys[j];
			if (key == 'teamId') {
				let team_ID = standingsObject[i][key];

				//Maps over teamDictionary object to find all teams that match standingsObject teamID and returns the full name of that team
				let team_name = dictionary.filter(team => team.teamId === team_ID).map(team => team.fullName);
				let cell = document.createTextNode(team_name)

				let teamLink = document.createElement('a');
				teamLink.id = team_ID;
				teamLink.href = ('./teamsTemplate.html?' + team_ID);

				teamLink.appendChild(cell);
				tableData.appendChild(teamLink);
			}
			else {
				let cell = document.createTextNode(standingsObject[i][key]);
				tableData.appendChild(cell);
			}
			
			
			document.getElementById(rowId).appendChild(tableData);
		}

		
    		let currentRow=document.getElementById(tableId).rows[i];
    		let img_cell =currentRow.insertCell(0);

    		let img = document.createElement('img');
    		img.src = dictionary.filter(team => team.teamId === rowId).map(team => team.image_path);;
    		img.style.width = '40px';
    		img.style.height = '40px';
    		img_cell.appendChild(img);
		

		//Map overteamDictionary object and filter for teams that have the same teamID as the rowId. Return the color value for this team
		//document.getElementById(rowId).style.backgroundColor = dictionary.filter(team => team.teamId === rowId).map(team => team.color);

		
	}

	document.getElementById(tableId).style.display = 'none';
	return standingsTable;


}



