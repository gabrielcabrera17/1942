var player = {
    left: 450,
    top: 620
}

var enemies = [
    { left: 350, top: 200 },
    { left: 450, top: 250 },
    { left: 200, top: 150 },
    { left: 600, top: 300 },
    { left: 250, top: 400 },
    { left: 550, top: 500 },
    { left: 150, top: 510 }
]

var missile = [];

var score = 0;

function drawPlayer() {
    var content = "<div class='player' style='left:" + player.left + "px; top: " + player.top + "px'></div>";
    document.getElementById("players").innerHTML = content;
}

function drawEnemies() {
    var content = "";
    for (var idx = 0; idx < enemies.length; idx++) {
        content += "<div class='enemy' style='left:" + enemies[idx].left + "px; top: " + enemies[idx].top + "px'></div>";
    }
    document.getElementById("enemies").innerHTML = content;
}

function drawMissiles() {
    var content = "";
    for (var idx = 0; idx < missile.length; idx++) {
        content += "<div class='missile' style='left:" + missile[idx].left + "px; top:" + missile[idx].top + "px;'></div>";
    }
    document.getElementById("missiles").innerHTML = content;
}

function moveEnemies(){
    for (var idx = 0; idx < enemies.length; idx++) {
       enemies[idx].top = enemies[idx].top + 5;
    }
}

function moveMissiles(){
    for (var idx = 0; idx < missile.length; idx++) {
        missile[idx].top = missile[idx].top - 18;
    }
}

function detectCollision() {
    for (var i = 0; i < enemies.length; i++) {
        if (player.left < enemies[i].left + 40 &&
            player.left + 40 > enemies[i].left &&
            player.top < enemies[i].top + 40 &&
            player.top + 40 > enemies[i].top) {
            // Colisión detectada, reduce la puntuación en 500
            score -= 500;
            // Actualiza el elemento HTML que muestra la puntuación
            document.getElementById('score').innerText = "Score: " + score;
            // Elimina el enemigo de la matriz
            enemies.splice(i, 1);
            // Vuelve a dibujar los enemigos
            drawEnemies();
        }
    }
}

document.onkeydown = function (e) {
    if (e.keyCode === 37) { // left
        player.left = player.left - 10;
    } else if (e.keyCode === 39) { // right
        player.left = player.left + 10;
    } else if (e.keyCode === 40) { // down
        if (player.top + 10 <= (700 - 220)) { 
            player.top = player.top + 10;
        }
    } else if (e.keyCode === 38) { // up
        if (player.top - 10 >= 0) { 
            player.top = player.top - 10;
        }
    } else if (e.keyCode === 32) { // space (fire)
       missile.push({left: (player.left+17), top:(player.top-10)})
       drawMissiles();
    }
}

// Crea un nuevo objeto Audio y carga el archivo de sonido
var explosionSound = new Audio('explosion.mp3');

function detectCollision() {
    for (var i = 0; i < enemies.length; i++) {
        for (var j = 0; j < missile.length; j++) {
            if (missile[j] &&
                enemies[i] &&
                missile[j].left < enemies[i].left + 40 &&
                missile[j].left + 5 > enemies[i].left &&
                missile[j].top < enemies[i].top + 40 &&
                missile[j].top + 5 > enemies[i].top) {
                // Colisión detectada, el misil alcanzó al enemigo
                // Elimina el enemigo y el misil
                enemies.splice(i, 1);
                missile.splice(j, 1);
                // Aumenta la puntuación
                score += 100;
                document.getElementById('score').innerText = "Score: " + score;
                // Reproduce el sonido de explosión
                explosionSound.play();
                // Vuelve a dibujar los enemigos
                drawEnemies();
                // Sale del bucle interno
                break;
            }
        }

        // Verifica la colisión entre el héroe y el enemigo
        if (player.left < enemies[i].left + 40 &&
            player.left + 40 > enemies[i].left &&
            player.top < enemies[i].top + 40 &&
            player.top + 40 > enemies[i].top) {
            // Colisión detectada, el héroe chocó con el enemigo
            // Reduce la puntuación en 500
            score -= 500;
            document.getElementById('score').innerText = "Score: " + score;
            // Reproduce el sonido de explosión
            explosionSound.play();
            // Elimina el enemigo
            enemies.splice(i, 1);
            // Vuelve a dibujar los enemigos
            drawEnemies();
            // Sale del bucle
            break;
        }
    }
}


function gameLoop(){
    drawPlayer();
    moveEnemies();
    drawEnemies();
    drawMissiles();
    moveMissiles();
    detectCollision();
    setTimeout(gameLoop, 100);
}

gameLoop();
