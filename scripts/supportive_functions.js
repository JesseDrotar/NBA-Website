'use strict';

function standingsKeys() {
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

	return standingsObjectKeys;
}

function teamColors() {
	let colors = ['#E03A3E', '#007A33', '#6F263D', '#0C2340', '#CE1141', '#00538C',
	'#0E2240', '#006BB6', '#CE1141', '#C8102E', '#552583', '#98002E', '#00471B', '#0C2340',
	'#000000', '#006BB6', '#0077C0', '#002D62', '#006BB6', '#1D1160', '#E03A3E', '#5A2D81', 
	'#C4CED4', '#007AC1', '#CE1141', '#002B5C', '#5D76A9', '#002B5C', '#C8102E', '#1D1160']

	return colors;
}

function teamImages() {
	let imagePath = ['./logos/AtlantaHawks.png', './logos/BostonCeltics.png', './logos/BrooklynNets.png',
	'./logos/CharlotteHornets.png', './logos/ChicagoBulls.png', './logos/ClevelandCavaliers.png', 
	'./logos/DallasMavericks.png', './logos/DenverNuggets.png', './logos/DetroitPistons.png', './logos/GoldenStateWarriors.png',
	'./logos/HoustonRockets.png', './logos/IndianaPacers.png', './logos/LosAngelesClippers.png', './logos/LosAngelesLakers.png',
	'./logos/MemphisGrizzlies.png', './logos/MiamiHeat.png', './logos/MilwaukeeBucks.png', './logos/MinnesotaTimberwolves.png',
	'./logos/NewOrleansPelicans.png', './logos/NewYorkKnicks.png', './logos/OklahomaCityThunder.png', './logos/OrlandoMagic.png',
	'./logos/PhiladelphiaSixers.png', './logos/PheonixSuns.png', './logos/PortlandTrailblazers.png', './logos/SacramentoKings.png',
	'./logos/SanAntonioSpurs.png', './logos/TorontoRaptors.png', './logos/UtahJazz.png', './logos/WashingtonWizards.png']

	return imagePath;

}

function buildScoreBoard(response) {
	let scoreboard = response.games;
	let imagePaths = teamImages();

	for (let i = 0; i < teams.length; i ++) {
		teams[i].image_path = imagePaths[i];
	}

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

function parseStandings (conf, teams, response) {

	let standingsObject = response.league.standard.conference[conf];
	
	let standingsObjectKeys = standingsKeys();

	let standingsTable = document.createElement("TABLE");
	let tableId = conf + 'StandingsTable';
	standingsTable.id = tableId;

	let div_id = conf +'_div'
	document.getElementById(div_id).appendChild(standingsTable);

	let headerRow = document.createElement('thead');
	document.getElementById(tableId).append(headerRow);


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
				let team_name = teams.filter(team => team.teamId === team_ID).map(team => team.fullName);
				let cell = document.createTextNode(team_name)

				let teamLink = document.createElement('a');
				teamLink.id = team_ID;
				teamLink.href = ('./teamroster.html?' + team_ID);

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
    		img.src = teams.filter(team => team.teamId === rowId).map(team => team.image_path);;
    		img.style.width = '40px';
    		img.style.height = '40px';
    		img_cell.appendChild(img);
		

		//Map overteamDictionary object and filter for teams that have the same teamID as the rowId. Return the color value for this team
		//document.getElementById(rowId).style.backgroundColor = dictionary.filter(team => team.teamId === rowId).map(team => team.color);

		
	}

	document.getElementById(tableId).style.display = 'none';
	return standingsTable;


}

function loadPlayers(playerDict, roster) {

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

	for(let i=0; i < roster.length; i++) {
		
		let personId = roster[i].personId;
		let individualPlayerUrl = `http://data.nba.net/prod/v1/2018/players/${personId}_profile.json`;

		let player;

		fetch(individualPlayerUrl)
		.then(function (response) {
			return response.json();
		})
		.then(function (response) {
			player = response.league.standard.stats.latest;
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
					let cell = document.createTextNode(playerDict[roster[i].personId]);

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

		})
		.catch(function (error) {
			console.log(error);
		});


		
		};

}

