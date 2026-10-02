const cells = document.querySelectorAll(".cell");
const status = document.getElementById("status");
const resetButton = document.getElementById("reset");

let currentPlayer = "X";
let gameActive = true;
let board = ["", "", "", "", "", "", "", ""];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
        if (board[index] !== "" || !gameActive) {
            return;
        }

        board[index] = currentPlayer;
        cell.textContent = currentPlayer;

        checkWinner();
    });
});

function checkWinner() {
    for (let condition of winningConditions) {
        const a = condition[0];
        const b = condition[1];
        const c = condition[2];

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[b] === board[c]
        ) {
            status.textContent = `Player ${currentPlayer} Wins!`;
            gameActive = false;
            return;
        }
    }

    if (!board.includes("")) {
        status.textContent = "It's a Draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    status.textContent = `Player ${currentPlayer}'s Turn`;
}

resetButton.addEventListener("click", resetGame);

function resetGame() {
    board = ["", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;

    cells.forEach(cell => {
        cell.textContent = "";
    });

    status.textContent = "Player X's Turn";
}
