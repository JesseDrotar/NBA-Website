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