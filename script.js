let cell_w = 25; //розмір клітинок в пікселях

class Snake_Game {
	constructor() {

		// змінні для рахунку
		this.score_text = document.getElementById("score").value;
		this.score = 0;

		window.addEventListener("keydown", this.HandleKeyPress.bind(this));
		this.field = [];
		for (let i = 0; i < 20; i++){
			let temp_arr = [];
			for (let j = 0; j < 20; j++){
				temp_arr.push(0);
			}
			this.field.push(temp_arr);
		}
		this.snake_direction = "r"; //напрямок змійки
		this.snake_position = [[8,8], [7,8], [6,8]]; // стартова позиція змійки
		this.apple_position = [[11, 11]]; // перше яблуко
		let canvas = document.getElementById("canvas");
		this.pen = canvas.getContext("2d");
		this.pen.fillStyle = "#d3d48c";
		this.pen.fillRect(0, 0, 500, 500);
		this.Create_Field();
	}
	Create_Field() {
		// малюємо саме поле
		for (let i = 0; i < this.field.length; i++){
			for (let j = 0; j < this.field[i].length; j++){
				this.pen.fillStyle = "#d3d48c";
				this.pen.strokeStyle = "#000000";
				this.pen.fillRect(j * cell_w, i * cell_w, cell_w, cell_w);
				this.pen.strokeRect(j * cell_w, i * cell_w, cell_w, cell_w);
			}
		}
		//малюємо змійку
		this.pen.fillStyle = "#0000ff"; // колір для голови
		for (let i = 0; i < this.snake_position.length; i++){
			this.pen.fillRect(this.snake_position[i][0] * cell_w, this.snake_position[i][1] * cell_w, cell_w, cell_w);
			this.pen.strokeRect(this.snake_position[i][0] * cell_w, this.snake_position[i][1] * cell_w, cell_w, cell_w);
			this.pen.fillStyle = "#ff5500"; // колір хвоста
		}

		// малюємо яблуко
		this.pen.fillStyle = "#00ff00";
		for (let i = 0; i < this.apple_position.length; i++){
			this.pen.fillRect(this.apple_position[i][0] * cell_w, this.apple_position[i][1] * cell_w, cell_w, cell_w);
			this.pen.strokeRect(this.apple_position[i][0] * cell_w, this.apple_position[i][1] * cell_w, cell_w, cell_w);
		}

	}
	Move(){
		// координати змійки
		let x = this.snake_position[0][0];
		let y = this.snake_position[0][1];
		// рух змійки
		if (this.snake_direction === "r"){
			x += 1;
		}
		else if (this.snake_direction === "l"){
			x -= 1;
		}
		else if (this.snake_direction === "u"){
			y -= 1;
		}
		else if (this.snake_direction === "d"){
			y += 1;
		}

		// зіткнення з границею поля
		if (x < 0 || x >= 20 || y < 0 || y >= 20){
			window.location.reload();
		}

		// зіткнення змійки з самою собою
		for (let i = 1; i < this.snake_position.length; i++) {
            if (this.snake_position[i][0] === x && this.snake_position[i][1] === y) {
                window.location.reload();
            }
        }

		this.snake_position.unshift([x, y]); // зміщуємо голову
		this.snake_position.pop(); // зміщуємо хвіст
		this.Create_Field();
		this.Eat_apples();
	}
	HandleKeyPress(event){
		switch(event.key){
		case "w":
		case "ц":
			this.snake_direction = "u";
			break;
		case "a":
		case "ф":
			this.snake_direction = "l";
			break;
		case "s":
		case "і":
		case "ы":
			this.snake_direction = "d";
			break;	
		case "d":
		case "в":
			this.snake_direction = "r";
			break;
		default:
			return;
		}
	}
	Eat_apples() {
		let headX = this.snake_position[0][0];
		let headY = this.snake_position[0][1];
		for (let i = 0; i < this.apple_position.length; i++){
			let appleX = this.apple_position[i][0];
			let appleY = this.apple_position[i][1];
			if (headX === appleX && headY === appleY){
				this.apple_position.splice(i, 1);
				let tailX = this.snake_position[this.snake_position.length - 1][0];
				let tailY = this.snake_position[this.snake_position.length - 1][1];
				this.snake_position.push([tailX, tailY]);
				this.Create_apples();
				this.score_text = this.score;
				// ------- ДОМАШНЄ ЗАВДАННЯ --------
				// ---- Зробити виведення рахунку на екран -----

			}
		}
	}
	Create_apples(){
		let randomX = Math.floor(Math.random() * 20);
		let randomY = Math.floor(Math.random() * 20);
		this.apple_position.push([randomX, randomY])
		this.score += 1;
	}
}



let game;

$(document).ready(function(){
	game = new Snake_Game();
});




function Start() {
	setInterval(function(){
		game.Move();
	}, 1000)
}





