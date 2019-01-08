"use strict";

let scoresUrl = 'http://data.nba.net//prod/v1/20190104/scoreboard.json'

function currentScoreBoard (object) {
	var teams = object;

	let imagePaths = teamImages();

	for (let i = 0; i < teams.length; i ++) {
		teams[i].image_path = imagePaths[i];
	}

	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			let scoreboard = JSON.parse(this.response);
			scoreboard = scoreboard.games;

			let scoreboardTable = document.createElement('TABLE');
			scoreboardTable.id = 'scoreboardTable';

			let titleRow = document.createElement('TR');
			let title = document.createElement('TH');
			title.appendChild(document.createTextNode('Todays Scores'));

			titleRow.appendChild(title);

			title.colSpan = 6;

			let headerRow = document.createElement('TR');

			let homeTD = document.createElement('TH');
			homeTD.appendChild(document.createTextNode('Home'));

			let placeholderTD = document.createElement('TH');
			placeholderTD.appendChild(document.createTextNode(''));

			let placeholder2TD = document.createElement('TH');
			placeholder2TD.appendChild(document.createTextNode(''));

			let scoreTD = document.createElement('TH');
			scoreTD.colSpan = 2;
			scoreTD.appendChild(document.createTextNode('Score'));

			let awayTD = document.createElement('TH');
			awayTD.appendChild(document.createTextNode('Away'));

			headerRow.appendChild(homeTD);
			headerRow.appendChild(placeholderTD);
			headerRow.appendChild(scoreTD);
			headerRow.appendChild(placeholder2TD);
			headerRow.appendChild(awayTD);

			scoreboardTable.appendChild(titleRow);
			scoreboardTable.appendChild(headerRow);



			document.getElementById('scoreboard').appendChild(scoreboardTable);



			for(let i=0; i < scoreboard.length; i++){
				let homeTeamId = scoreboard[i].hTeam.teamId;
				let awayTeamId = scoreboard[i].vTeam.teamId;
				let homeTeamName = teams.filter(team => team.teamId === homeTeamId).map(team => team.fullName);
				let awayTeamName = teams.filter(team => team.teamId === awayTeamId).map(team => team.fullName);
				let homeTeamScore = scoreboard[i].hTeam.score;
				let awayTeamScore = scoreboard[i].vTeam.score;

				let currentRow = document.createElement('TR');
				currentRow.id = i;

				document.getElementById('scoreboardTable').appendChild(currentRow);
				
				let homeTeamNameTD = document.createElement('TD');
				let homeTeamNameCell = document.createTextNode(homeTeamName);
				homeTeamNameTD.appendChild(homeTeamNameCell);

				let homeTeamScoreTD = document.createElement('TD');
				let homeTeamScoreCell = document.createTextNode(homeTeamScore);
				homeTeamScoreTD.appendChild(homeTeamScoreCell);

				let awayTeamNameTD = document.createElement('TD');
				let awayTeamNameCell = document.createTextNode(awayTeamName);
				awayTeamNameTD.appendChild(awayTeamNameCell);

				let awayTeamScoreTD = document.createElement('TD');
				let awayTeamScoreCell = document.createTextNode(awayTeamScore);
				awayTeamScoreTD.appendChild(awayTeamScoreCell);

				document.getElementById(currentRow.id).appendChild(homeTeamNameTD);

				let home_img_cell =document.getElementById(currentRow.id).insertCell(1);
				let home_img = document.createElement('img');
    			home_img.src = teams.filter(team => team.teamId === homeTeamId).map(team => team.image_path);;
    			home_img.style.width = '40px';
    			home_img.style.height = '40px';
    			home_img_cell.appendChild(home_img);


				document.getElementById(currentRow.id).appendChild(homeTeamScoreTD);
				document.getElementById(currentRow.id).appendChild(awayTeamScoreTD);

				let away_img_cell =document.getElementById(currentRow.id).insertCell(4);
				let away_img = document.createElement('img');

    			away_img.src = teams.filter(team => team.teamId === awayTeamId).map(team => team.image_path);;
    			away_img.style.width = '40px';
    			away_img.style.height = '40px';

    			away_img_cell.appendChild(away_img);

				document.getElementById(currentRow.id).appendChild(awayTeamNameTD);

			}

			return scoreboardTable;
		}
	}

	xhttp.open('GET', scoresUrl, true);
	xhttp.send();

}


function getTeams(callback) {
	let teamsUrl = 'http://data.nba.net/10s/prod/v2/2018/teams.json'

	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			let teams = JSON.parse(this.response);
			teams = teams.league.vegas;
			let scoreboard = callback(teams);
			return scoreboard;
		}
	};

	xhttp.open('GET', teamsUrl);
	xhttp.send();

}

let scoreboard = getTeams(currentScoreBoard);





