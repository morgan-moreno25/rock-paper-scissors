class Player {
	constructor(name) {
		this.name = name ? name : '';
		this.score = 0;
	}

	incrementScore() {
		console.log(this.score);
		this.score += 1;
		console.log(this.score);
	}
	setName(name) {
		this.name = name;
	}
}
class Computer extends Player {
	constructor() {
		super('Computer');
	}

	randomMove() {
		const moves = ['rock', 'paper', 'scissors'];
		const index = Math.floor(Math.random() * 3);
		return moves[index];
	}
}

const DOM = (() => {
	const startButton = document.querySelector('#start-btn');
	const gameResults = document.querySelector('#game-results');
	const playerName = document.querySelector('#player-name');
	const playerScore = document.querySelector('#player-score');
	const computerScore = document.querySelector('#computer-score');
	const rockButton = document.querySelector('#rock-btn');
	const paperButton = document.querySelector('#paper-btn');
	const scissorsButton = document.querySelector('#scissors-btn');

	function init() {
		startButton.addEventListener('click', () => DOM.renderPlayerNameForm());
	}
	function clearGameResults() {
		while (gameResults.children.length > 0) {
			gameResults.removeChild(gameResults.firstChild);
		}
	}
	function addGameButtonListeners() {
		rockButton.addEventListener('click', () => Game.playMove('rock'));
		paperButton.addEventListener('click', () => Game.playMove('paper'));
		scissorsButton.addEventListener('click', () => Game.playMove('scissors'));
	}
	function renderPlayerNameForm() {
		clearGameResults();

		const container = document.createElement('div');
		container.id = 'player-name-form';

		const nameGroup = document.createElement('div');
		nameGroup.className = 'form-group';

		const label = document.createElement('label');
		label.innerHTML = 'Enter your name';

		const input = document.createElement('input');
		input.type = 'text';
		input.id = 'player-name';
		input.name = 'player-name';

		const button = document.createElement('button');
		button.classList.add('btn', 'btn-success');
		button.innerHTML = 'OK';
		button.addEventListener('click', () => {
			Game.initializePlayer(input.value);
			playerName.innerHTML = input.value;
			addGameButtonListeners();
			renderTurnInstructions();
		});

		nameGroup.append(label, input);

		container.append(nameGroup, button);

		gameResults.appendChild(container);
	}
	function renderTurnInstructions() {
		clearGameResults();

		const container = document.createElement('div');
		container.id = 'game-instructions';

		const instructions = document.createElement('p');
		instructions.innerHTML = 'Select your move below!';

		container.appendChild(instructions);

		gameResults.appendChild(container);
	}
	function renderResults(result, msg) {
		clearGameResults();
		function clearClassList() {
			gameResults.classList.remove('win');
			gameResults.classList.remove('lose');
			gameResults.classList.remove('tie');
		}

		const container = document.createElement('div');
		container.id = 'results';

		const message = document.createElement('p');
		message.innerHTML = msg;

		const playAgain = document.createElement('p');
		playAgain.innerHTML = 'Select a move to play again!';

		container.append(message, playAgain);

		playerScore.innerHTML = Game.player.score;
		computerScore.innerHTML = Game.computer.score;

		clearClassList();
		gameResults.classList.add(result);
		gameResults.appendChild(container);
	}

	return {
		init,
		renderPlayerNameForm,
		renderResults,
	};
})();

const Game = (() => {
	const computer = new Computer();
	const player = new Player();

	function initializePlayer(name) {
		player.setName(name);
	}
	function playMove(playerMove) {
		const computerMove = computer.randomMove();

		console.log('Player Selected: ', playerMove);
		console.log('Computer Selected: ', computerMove);

		if (playerMove === 'rock') {
			if (computerMove === 'rock') {
				DOM.renderResults('tie', "It's a tie. You both selected rock!");
			} else if (computerMove === 'paper') {
				computer.incrementScore();
				DOM.renderResults('lose', 'You lose. Computer selected paper!');
			} else if (computerMove === 'scissors') {
				player.incrementScore();
				DOM.renderResults('win', 'You win. Computer selected scissors!');
			}

			return;
		} else if (playerMove === 'paper') {
			if (computerMove === 'rock') {
				player.incrementScore();
				DOM.renderResults('win', 'You win. Computer selected rock!');
			} else if (computerMove === 'paper') {
				DOM.renderResults('tie', "It's a tie. You both selected paper!");
			} else if (computerMove === 'scissors') {
				computer.incrementScore();
				DOM.renderResults('lose', 'You lose. Computer selected scissors!');
			}

			return;
		} else if (playerMove === 'scissors') {
			if (computerMove === 'rock') {
				computer.incrementScore();
				DOM.renderResults('lose', 'You lose. Computer selected rock!');
			} else if (computerMove === 'paper') {
				player.incrementScore();
				DOM.renderResults('win', 'You win. Computer selected paper!');
			} else if (computerMove === 'scissors') {
				DOM.renderResults('tie', "It's a tie. You both selected scissors!");
			}

			return;
		}

		return;
	}

	return {
		player,
		computer,
		initializePlayer,
		playMove,
	};
})();

DOM.init();
