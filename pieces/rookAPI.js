let moves = [[1, 2, 3, 4, 5, 6, 7], [], [], []]
moves[1] = moves[0].map(x => x * -1)
moves[2] = moves[0].map(x => x * 8)
moves[3] = moves[0].map(x => x * -8)

wRook = {
    char: "♖",
    color: "white",
    moved: null,
    moves: null,
  }

  bRook = {
    char: "♜",
    color: "black",
    moved: null,
    moves: null,
  }

  module.exports = {wRook, bRook}