document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell'); 
    const computerScoreEl = document.querySelector('.computer-score');
    const playerScoreEl = document.querySelector('.player-score');
    const tiesScoreEl = document.querySelector('.ties-score');
    let playerScore = 0, computerScore = 0, tiesScore = 0;
    let currentPlayer = 'X', gameActive = false;

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    function checkWin(currentPlayer) {
        // 현재 유저가 이겼는지 확인하기
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return cells[index].textContent === currentPlayer;
            });
        });
    }

    function checkDraw() {
        return [...cells].every(cell => cell.textContent);
    }

    function computerMove() {
        // 1. 유저 턴이면 하면 안되잖아.
        if (gameActive === true) return;
        // 1. text content가 비어있는 셀 확인
        const availableCells = [...cells].filter(cell => !cell.textContent);
        // 2. 비어있는 셀이 없으면 아무것도 하지 않는다.
        if (availableCells.length === 0) return;
        const randomDelay = Math.random() * 1000;
        // 3. 랜덤하게 셀 하나 뽑기
        setTimeout(() => {
            const randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
            randomCell.textContent = 'O';
            checkGameState('O');
            gameActive = true;
        }, randomDelay);
    }

    function checkGameState(currentPlayer) {
        if (checkWin(currentPlayer)) {
            //player가 이긴 경우
            gameActive = false;
            if (currentPlayer === 'X') {
                //player가 유저라면 유저의 점수를 올려주기
                playerScore++;
                playerScoreEl.textContent = playerScore;
                alert('Player wins!');
            } else {
                //player가 컴퓨터라면 컴퓨터의 점수 올려주기
                computerScore++;
                computerScoreEl.textContent = computerScore;
                alert('Computer wins!');
            }
            //게임 재시작
            restartGame(); 
        } else if (checkDraw()) {
            //비긴경우
            gameActive = false;
            tiesScore++;
            tiesScoreEl.textContent = tiesScore;
            alert('Draw!');
            restartGame();
        }
    }

    function restartGame() {
        // 1초 안에 초기화 하기
        cells.forEach(cell => cell.textContent = '');
        gameActive = true;
    }

    //Cell 이벤트 리스너
    cells.forEach(cell => {
        cell.addEventListener('click', (e) => {
            // 1. 만약에 이미 뭐가 있거나 게임이 진행되고 있지 않다면 걍 무시
            if (e.target.textContent !== '' || !gameActive) return;
            // 2. 유저가 눌렀으니까 X 표시
            e.target.textContent = 'X';
            // 3. 유저가 더는 못누르게 Active 끄기
            gameActive = false;
            // 4. 혹시 게임 끝났나?
            checkGameState('X');
            // 5. 1초 뒤에 ComputerMove
            computerMove();
        });
    });
    gameActive = true;
});
