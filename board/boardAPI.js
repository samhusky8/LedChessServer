var alph = ["a", "b", "c", "d", "e", "f", "g", "h"];
var board = []
var index = []

const pawnAPI = require("../pieces/pawnAPI")
const knightAPI = require("../pieces/knightAPI")
const rookAPI = require("../pieces/rookAPI")
const bishopAPI = require("../pieces/bishopAPI")
const kingAPI = require("../pieces/kingAPI")
const queenAPI = require("../pieces/queenAPI")
const emptyAPI = require("../pieces/emptyAPI")

for (var i = 0; i < 8; i++){
    for (var j = 0; j < 8; j++){
        index[j + (i*8)] = {name: alph[i] + (j+1).toString(), coords: [j, i]}
    }
}

for (var i = 0; i < 64; i++){
    board[i] = {position: index[i], currentPiece: emptyAPI.empty}
}

function printBoard(){
    var boardPieces = []
    for (var i = 0; i < 64; i++){
        boardPieces[i] = board[i].currentPiece; 
    }
    return boardPieces;
}

function loadStdBoard(){
    board[0].currentPiece = rookAPI.wRook
    board[1].currentPiece = knightAPI.wKnight
    board[2].currentPiece = bishopAPI.wBishop
    board[3].currentPiece = queenAPI.wQueen
    board[4].currentPiece = kingAPI.wKing
    board[5].currentPiece = bishopAPI.wBishop
    board[6].currentPiece = knightAPI.wKnight
    board[7].currentPiece = rookAPI.wRook
    for (let i = 8; i < 16; i++){
        board[i].currentPiece = pawnAPI.wPawn
    }
    board[56].currentPiece = rookAPI.bRook
    board[57].currentPiece = knightAPI.bKnight
    board[58].currentPiece = bishopAPI.bBishop
    board[59].currentPiece = queenAPI.bQueen
    board[60].currentPiece = kingAPI.bKing
    board[61].currentPiece = bishopAPI.bBishop
    board[62].currentPiece = knightAPI.bKnight
    board[63].currentPiece = rookAPI.bRook
    for (let i = 48; i < 56; i++){
        board[i].currentPiece = pawnAPI.bPawn
    }
    return board
}

function pawnMoves(index){
    moves = [7, 8, 9, 16]//pawnAPI.moves
    let Piece = board[index].currentPiece
    for (i = 0; i < moves.length; i++){  
        let targetPiece = board[index + moves[i]].currentPiece

        if ((board[index].position.coords[1] != 1 && Piece.color == "white") || (board[index].position.coords[1] != 6 && Piece.color == "black")){
            Piece.moved = true
        }

        if (board[index + 8].currentPiece.char != " "){
            moves [1] = null
        }

        if (moves[i] % 8 != 0 && (targetPiece.char == " " || targetPiece.color == Piece.color)){
            moves[i] = null
        }
        
        if (Piece.moved || board[index + 8].currentPiece.char != " "){
            moves[3] = null
        }
        }
    return moves
}

function movePawn(index, input){
    moves = pawnMoves(index)
    console.log(moves)
    let piece = board[index].currentPiece
    if (moves.includes(input)){
        board[index].currentPiece = emptyAPI
        board[index + input].currentPiece = piece
        return board[index]
        
    }
    else{
        return console.log("Not a vaild move!")
    }
    // console.log(board[index])
}

function rookMoves(index){
    moves = [
        [
          1, 2, 3, 4,
          5, 6, 7
        ],
        [
          -1, -2, -3, -4,
          -5, -6, -7
        ],
        [
           8, 16, 24, 32,
          40, 48, 56
        ],
        [
           -8, -16, -24,
          -32, -40, -48,
          -56
        ]
    ]
    let Piece = board[index].currentPiece
    for (i = 0; i < moves.length; i++){
        for (j = 0; j < moves[i].length; j++){
            if (((index + moves[i][j]) >= 0 && (index + moves[i][j]) <= 64)){
                let targetPiece = board[index + moves[i][j]].currentPiece
                console.log(targetPiece)
                if (targetPiece.char == ' '){
                }
                else{
                    if (targetPiece.color == Piece.color){
                        for (k = j; k < moves[i].length; k ++){
                            moves[i][k] = null
                        }
                    }
                    else if (targetPiece.color != Piece.color){
                        for (k = (j+1); k < moves[i].length; k ++){
                            moves[i][k] = null
                        }
                    }
                }
            }
            // if (((index + moves[i][j]) % 8 == 0) || ((index + moves[i][j] + 1) % 8 == 0)){
            //     for (k = (j+1); k < moves[i].length; k ++){
            //         moves[i][k] = null
            //     }
            // }
            else{
                moves[i][j] = null
            }

        }
    }
    return moves
}

function moveRook(index, input){
    moves = rookMoves(index)
    console.log(moves)
    valid = false
    let piece = board[index].currentPiece
    for (i = 0; i < 4; i++){
        if (moves[i].includes(input)){
            board[index].currentPiece = emptyAPI
            board[index + input].currentPiece = piece
            valid = true
            return board[index]
            
        }
    }

    if (!valid){
        return console.log("Not a vaild move!")
    }

}





loadStdBoard()

board[17].currentPiece = queenAPI.bQueen
board[19].currentPiece = rookAPI.wRook
// board[15+8].currentPiece = rookAPI.wRook

moveRook(19, 7)

module.exports = {board, printBoard, movePawn, loadStdBoard, pawnMoves}



