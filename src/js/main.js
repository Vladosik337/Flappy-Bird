import '../scss/style.scss'

// ------------------------------------

document.addEventListener('DOMContentLoaded', ()=>{
    const bird = document.querySelector('.bird');
    const gameDisplay = document.querySelector('.game-container');
    const ground = document.querySelector('.ground');

    let birdLeft = 220;
    let birdBottom = 100;
    let gravity = 2;
    let IsGameOver = false;
    let gap = 430;


    function startGame(){
        birdBottom -= gravity;

        bird.style.bottom = birdBottom + 'px';
        bird.style.left = birdLeft + 'px';

    }

    let gameTimerId = setInterval(startGame, 20);

    function jump(){
        if (birdBottom < 450){
            birdBottom += 50;
            bird.style.bottom = birdBottom + 'px';
        }
    }

    document.addEventListener('click', jump);

    function generateObstacle(){
        let obstacleLeft = 500;
        let randomHeight = Math.random() * 60;
        let obstacleBottom = randomHeight;
        const obstacle = document.createElement('div');
        const topObstacle = document.createElement('div');

        if (!IsGameOver){
            obstacle.classList.add('obstacle');
            topObstacle.classList.add('topObstacle');
        }
        gameDisplay.appendChild(obstacle);
        gameDisplay.appendChild(topObstacle);

        obstacle.style.left = obstacleLeft + 'px';
        topObstacle.style.left = obstacleLeft + 'px';

        obstacle.style.bottom = obstacleBottom + 'px';
        topObstacle.style.bottom = obstacleBottom + gap +'px';

        function moveObstacle(){
            obstacleLeft -= 2;
            obstacle.style.left = obstacleLeft + 'px'
            topObstacle.style.left = obstacleLeft + 'px'

            if (obstacleLeft === -60){
                clearInterval(gameTimerId)
                gameDisplay.removeChild(obstacle);
                gameDisplay.removeChild(topObstacle);
            }

            if (obstacleLeft > 200 &&
                obstacleLeft < 280 &&
                birdLeft === 220 &&
                (birdBottom < obstacleBottom + 151 || birdBottom > obstacleBottom + gap - 200) ||
                birdBottom === 0
                )
            {
                gameOver();
                clearInterval(gameTimerId);
            }
        }
        let gameTimerId = setInterval(moveObstacle, 20);
        setTimeout(generateObstacle,3000);
    }

    generateObstacle();

    function gameOver(){
        clearInterval(gameTimerId);
        IsGameOver = true;
        alert('Game Over!')
        document.removeEventListener('click', jump);
    }
});
