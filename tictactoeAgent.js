class Agent {
    constructor() {}

    minimax(board, isMaximizing) {
        // Base cases - check if the game is over or a draw
        var gameOver = board.gameOver();
        if (gameOver === 1) {
            return 1; // X wins
        } else if (gameOver === 2) {
            return -1; // O wins
        } else if (gameOver === 3) {
            return 0; // the game is a draw
        }

        //Evaluate all posible moves and choose the best move, starting at 1, instead of creating cell i + 1
        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 1; i <= board.cells.length; i++) {
                if (board.cellFree(i)) {
                    const newBoard = board.clone();
                    newBoard.move(i);
                    const score = this.minimax(newBoard, false);
                    bestScore = Math.max(bestScore, score);
                }
            }
            return bestScore;
        } else {
             //Evaluate all posible moves and choose the "worst" move/least optimal move, starting at 1, instead of creating cell i + 1
            let bestScore = Infinity;
            for (let i = 1; i <= board.cells.length; i++) {
                if (board.cellFree(i)) {
                    const newBoard = board.clone();
                    newBoard.move(i);
                    const score = this.minimax(newBoard, true);
                    bestScore = Math.min(bestScore, score);
                }
            }
            return bestScore;
        }
    }

    selectMove(board) {
        //check current player and check whether we want the max score or the least score
        let bestScore = board.playerOne ? -Infinity : Infinity;
        //set best move to null, edit result to bestscore to leastscore, depending on the current player
        let bestMove = null;

        //loop through each cell to evaluate best move, starting at 1, instead of creating cell i + 1
        for (let i = 1; i <= board.cells.length; i++) {
            if (board.cellFree(i)) {
                //make move in current cell
                const newBoard = board.clone();
                newBoard.move(i);

                //evaluate score for the move
                const score = this.minimax(newBoard, !board.playerOne);
                
                //check if the current players is playerOne, if they are give them the best score
                if (board.playerOne) {
                    if (score > bestScore) {
                        bestScore = score;
                        bestMove = i;
                    }
                } else {
                    //if current player is not playerOne, look for the "worst" move
                    if (score < bestScore) {
                        bestScore = score;
                        bestMove = i;
                    }
                }
            }
        }

        return bestMove;
    }
}