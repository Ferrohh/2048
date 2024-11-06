const gameBoard = document.getElementById("game")
const tilesElems = document.getElementsByClassName("tile")

var tiles;
var animation_mult = []
var animation_move = []
var animation_spawn = []
var dir = ""

const reset = () => {
    dir = ""
    tiles = []

    for(let i = 0; i < 4; i++) {
        tiles.push([])
        for(let j = 0; j < 4; j++) {
            tiles[i].push('*')
        }
    }
    generateTile();
    
    draw();
}

const movement = (direction) => {
    let moves = 0;
    animation_mult = []
    animation_move = []
    dir = direction

    if(direction === "up") {
        
        for(let j = 0; j < 4; j++) {
            for(let i = 1; i < 4; i++) {
                if(tiles[i][j] != '*') {
                    for(let k = i-1; k >= 0; k--) {
                        if(tiles[k][j] === "*") {
                            tiles[k][j] = tiles[k+1][j];
                            tiles[k+1][j] = "*";
                            moves++;
                            animation_move.push([k,j]);
                        }
                        else if(tiles[k][j] === tiles[k+1][j] && tiles[k][j]%2 == 0) {
                            tiles[k][j] = tiles[k+1][j] * 2 + 1;
                            tiles[k+1][j] = "*";
                            moves++;
                            animation_mult.push([k, j])
                        }
                    }
                }
            }
        }
    }
    else if (direction === "down") {
        for(let j = 0; j < 4; j++) {
            for(let i = 2; i >= 0; i--) {
                if(tiles[i][j] != '*') {
                    for(let k = i+1; k < 4; k++) {
                        if(tiles[k][j] === "*") {
                            tiles[k][j] = tiles[k-1][j];
                            tiles[k-1][j] = "*";
                            moves++;
                            animation_move.push([k,j]);
                        }
                        else if(tiles[k][j] === tiles[k-1][j] && tiles[k][j]%2 == 0) {
                            tiles[k][j] = tiles[k-1][j] * 2 + 1;
                            tiles[k-1][j] = "*";
                            moves++;
                            animation_mult.push([k, j])
                        }
                    }
                }
            }
        }
    }
    else if (direction === "left") {
        for(let i = 0; i < 4; i++) {
            for(let j = 0; j < 4; j++) {
                if(tiles[i][j] != '*') {
                    for(let k = j-1; k >= 0; k--) {
                        if(tiles[i][k] === "*") {
                            tiles[i][k] = tiles[i][k+1];
                            tiles[i][k+1] = "*";
                            moves++;
                            animation_move.push([i,k]);
                        }
                        else if(tiles[i][k] === tiles[i][k+1] && tiles[i][k]%2 == 0) {
                            tiles[i][k] = tiles[i][k+1] * 2 + 1;
                            tiles[i][k+1] = "*";
                            moves++;
                            animation_mult.push([i, k])
                        }
                    }
                }
            }
        }
    }
    else if (direction === "right") {
        for(let i = 0; i < 4; i++) {
            for(let j = 2; j >= 0; j--) {
                if(tiles[i][j] != '*') {
                    for(let k = j+1; k < 4; k++) {
                        if(tiles[i][k] === "*") {
                            tiles[i][k] = tiles[i][k-1];
                            tiles[i][k-1] = "*";
                            moves++;
                            animation_move.push([i,k]);
                        }
                        else if(tiles[i][k] === tiles[i][k-1] && tiles[i][k]%2 == 0) {
                            tiles[i][k] = tiles[i][k-1] * 2 + 1;
                            tiles[i][k-1] = "*";
                            moves++;
                            animation_mult.push([i, k])
                        }
                    }
                }
            }
        }
    }
    if(moves != 0) {
        generateTile()
    }
    draw();
}

const generateTile = () => {
    let i, j;
    animation_spawn = []
    do {
        i = randomInt(4);
        j = randomInt(4);
    } while(tiles[i][j] != '*');
    
    if(randomInt(100) <= 20)
        tiles[i][j] = 4;
    else
        tiles[i][j] = 2;

    animation_spawn = [i,j]
}

const draw = () => {
    let k = 0;
    for(let i = 0; i < 4; i++) {
        for(let j = 0; j < 4; j++) {
            if(tiles[i][j]%2 != 0 && !isNaN(tiles[i][j]) && Number.isInteger(tiles[i][j]))
                tiles[i][j]--;
            let style = ""
            for(let e of animation_mult) {
                if(i == e[0] && j == e[1]) {
                    style += " push"
                    break;
                }
            }
            for(let e of animation_move) {
                if(i == e[0] && j == e[1]) {
                    style += (" move-" + dir)
                }
            }
            if(i == animation_spawn[0] && j == animation_spawn[1])
                style += " spawnn";

            tilesElems.item(k).innerHTML = '<div class="tile-' + String(tiles[i][j]) + " " + style + '">' + tiles[i][j] + "</div>";

            if(tiles[i][j] === '*') {
                tilesElems.item(k).innerHTML = ""
            }
            k++;
        }
    }
    console.log(tiles)
}


document.addEventListener(`keydown`, e => {

	if (e.code == `KeyW` || e.code == `ArrowUp`) {
		movement("up")
	} 
    else if (e.code == `KeyS` || e.code == `ArrowDown`) {
		movement("down")
	} 
    else if (e.code == `KeyA` || e.code == `ArrowLeft`) {
		movement("left")
	} 
    else if (e.code == `KeyD` || e.code == `ArrowRight`) {
		movement("right")
	}
    else if ( e.code == 'KeyR') {
        reset()
    }

});

const randomInt = (max) => {
    return Math.floor(Math.random() * max);
  }