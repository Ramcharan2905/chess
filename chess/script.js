let firstClickedDiv = null
let class_name = null
let type = null
let id = null
let select = 0
let whiteKingId = `(8,5)`
let blackKingId = `(1,5)`

let para = document.querySelector("p")

// to see if there are any checks
const checkForCheck = (whiteKingId, blackKingId, select) => {
  let divs = document.querySelectorAll('.chess-board div')

  for (let div of divs) {
    if (div.classList.length >= 3) {
      let pieceColor = div.classList[2].slice(0, 5)
      let pieceType = div.classList[2].slice(6)

      let king = select
        ? document.getElementById(whiteKingId)
        : document.getElementById(blackKingId)
      let targetColor = select ? 'black' : 'white'

      if (pieceColor === targetColor) {
        switch (pieceType) {
          case 'pawn':
            if (conditionsOfPawn(pieceColor, div.id, king)) {
              para.innerText =
                `${select ? 'White' : 'Black'} king is in check by pawn`

              return 1
            }
            break
          case 'rook':
            if (conditionsOfRook(pieceColor, div.id, king)) {
              para.innerText =
                `${select ? 'White' : 'Black'} king is in check by rook`

              return 1
            }
            break
          case 'bishop':
            if (conditionsOfBishop(pieceColor, div.id, king)) {
              para.innerText =
                `${select ? 'White' : 'Black'} king is in check by bishop`

              return 1
            }
            break
          case 'knight':
            if (conditionsOfKnight(pieceColor, div.id, king)) {
              para.innerText =
                `${select ? 'White' : 'Black'} king is in check by knight`

              return 1
            }
            break
          case 'queen':
            if (
              conditionsOfRook(pieceColor, div.id, king) ||
              conditionsOfBishop(pieceColor, div.id, king)
            ) {
              para.innerText =
                `${select ? 'White' : 'Black'} king is in check by queen`

              return 1
            }
            break
          case 'king':
            if (conditionsOfKingWithoutChecks(pieceColor, div.id, king)) {
              para.innerText =
                `${select ? 'White' : 'Black'} king is in check by king`

              return 1
            }
            break
        }
      }
    }
  }
  return 0
}

// conditions on pawn movements
const conditionsOfPawn = (color, id, target) => {
  let row = parseInt(id[1])
  let col = parseInt(id[3])
  let rowTarget = parseInt(target.id[1])
  let colTarget = parseInt(target.id[3])

  if (row == rowTarget && col == colTarget) return false

  if (color === 'white') {
    // Capture move (diagonal)
    if (Math.abs(col - colTarget) === 1 && row - 1 === rowTarget) {
      let targetDiv = document.getElementById(`(${rowTarget},${colTarget})`)
      if (
        targetDiv &&
        targetDiv.classList[2] &&
        targetDiv.classList[2].slice(0, 5) === 'black'
      ) {
        return true
      }
      return false
    }

    // Ensure pawn moves vertically in the same column
    if (col !== colTarget) return false

    // First move (2 steps forward)
    if (row === 7) {
      if (row - 2 === rowTarget) {
        return checkObstaclesPawn(col, row, rowTarget)
      } else if (row - 1 === rowTarget) {
        return checkObstaclesPawn(col, row, rowTarget)
      }
    } else {
      // Normal move (1 step forward)
      if (row - 1 === rowTarget) {
        return checkObstaclesPawn(col, row, rowTarget)
      }
    }
  }

  if (color === 'black') {
    // Capture move (diagonal)
    if (Math.abs(col - colTarget) === 1 && row + 1 === rowTarget) {
      let targetDiv = document.getElementById(`(${rowTarget},${colTarget})`)
      if (
        targetDiv &&
        targetDiv.classList[2] &&
        targetDiv.classList[2].slice(0, 5) === 'white'
      ) {
        return true
      }
      return false
    }

    // Ensure pawn moves vertically in the same column
    if (col !== colTarget) return false

    // First move (2 steps forward)
    if (row === 2) {
      if (row + 2 === rowTarget) {
        return checkObstaclesPawn(col, row, rowTarget)
      } else if (row + 1 === rowTarget) {
        return checkObstaclesPawn(col, row, rowTarget)
      }
    } else {
      // Normal move (1 step forward)
      if (row + 1 === rowTarget) {
        return checkObstaclesPawn(col, row, rowTarget)
      }
    }
  }

  return false
}

const checkObstaclesPawn = (col, row, rowTarget) => {
  const startRow = Math.min(row, rowTarget)
  const endRow = Math.max(row, rowTarget)

  for (let r = startRow + 1; r < endRow; r++) {
    // Check only in-between squares
    const targetId = `(${r},${col})`
    const targetDiv = document.getElementById(targetId)
    if (targetDiv && targetDiv.classList.length >= 3) {
      return false
    }
  }

  if (document.getElementById(`(${rowTarget},${col})`).classList.length >= 3) {
    return false
  }

  return true
}

//conditions on rook movements
const conditionsOfRook = (color, id, target) => {
  let row = parseInt(id[1])
  let col = parseInt(id[3])
  let rowTarget = parseInt(target.id[1])
  let colTarget = parseInt(target.id[3])

  if (row == rowTarget && col == colTarget) return false

  if (rowTarget != row && colTarget != col) {
    return false
  }

  if (rowTarget == row) {
    const startCol = Math.min(col, colTarget)
    const endCol = Math.max(col, colTarget)

    for (let c = startCol + 1; c < endCol; c++) {
      const targetId = `(${row},${c})`
      const targetDiv = document.getElementById(targetId)
      if (targetDiv && targetDiv.classList.length >= 3) {
        return false
      }
    }

    const targetDiv = document.getElementById(`(${row},${colTarget})`)
    if (
      targetDiv &&
      targetDiv.classList.length >= 3 &&
      targetDiv.classList[2].slice(0, 5) == color
    ) {
      return false
    }

    return true
  }

  if (colTarget == col) {
    const startRow = Math.min(row, rowTarget)
    const endRow = Math.max(row, rowTarget)

    for (let r = startRow + 1; r < endRow; r++) {
      const targetId = `(${r},${col})`
      const targetDiv = document.getElementById(targetId)
      if (targetDiv && targetDiv.classList.length >= 3) {
        return false
      }
    }

    const targetDiv = document.getElementById(`(${rowTarget},${col})`)
    if (
      targetDiv &&
      targetDiv.classList.length >= 3 &&
      targetDiv.classList[2].slice(0, 5) == color
    ) {
      return false
    }

    return true
  }

  return false
}

//conditions on bishop movements
conditionsOfBishop = (color, id, target) => {
  let row = parseInt(id[1])
  let col = parseInt(id[3])
  let rowTarget = parseInt(target.id[1])
  let colTarget = parseInt(target.id[3])

  if (row == rowTarget && col == colTarget) return false

  if (Math.abs(row - rowTarget) != Math.abs(col - colTarget)) return false

  let rowStep = row < rowTarget ? 1 : -1
  let colStep = col < colTarget ? 1 : -1
  let r = row + rowStep
  let c = col + colStep
  while (r !== rowTarget && c !== colTarget) {
    const targetId = `(${r},${c})`
    const targetDiv = document.getElementById(targetId)
    if (targetDiv && targetDiv.classList.length >= 3) {
      return false
    }
    r += rowStep
    c += colStep
  }

  const targetDiv = document.getElementById(`(${rowTarget},${colTarget})`)
  if (
    targetDiv &&
    targetDiv.classList.length >= 3 &&
    targetDiv.classList[2].slice(0, 5) == color
  ) {
    return false
  }

  return true
}

//conditions on knight movements
const conditionsOfKnight = (color, id, target) => {
  let row = parseInt(id[1])
  let col = parseInt(id[3])
  let rowTarget = parseInt(target.id[1])
  let colTarget = parseInt(target.id[3])

  if (row == rowTarget && col == colTarget) return false

  if (
    (Math.abs(col - colTarget) == 1 && Math.abs(row - rowTarget) == 2) ||
    (Math.abs(col - colTarget) == 2 && Math.abs(row - rowTarget) == 1)
  ) {
    const targetId = `(${rowTarget},${colTarget})`
    const targetDiv = document.getElementById(targetId)

    if (
      targetDiv.classList.length < 3 ||
      targetDiv.classList[2].slice(0, 5) != color
    )
      return true
  }

  return false
}

//conditions on king movements
const conditionsOfKing = (color, id, target) => {
  let row = parseInt(id[1])
  let col = parseInt(id[3])
  let rowTarget = parseInt(target.id[1])
  let colTarget = parseInt(target.id[3])

  if (row == rowTarget && col == colTarget) {
    return false
  }

  if (!(Math.abs(col - colTarget) <= 1 && Math.abs(row - rowTarget) <= 1)) {
    return false
  }

  if (
    target.classList.length >= 3 &&
    target.classList[2].slice(0, 5) == color
  ) {
    return false
  }

  document.getElementById(id).classList.remove(`${color}-king`)

  let classHere = null
  if (target.classList.length >= 3) {
    classHere = target.classList[2]
    target.classList.remove(target.classList[2])
  }

  if (color == 'white') target.classList.add('white-king')
  else target.classList.add('black-king')

  let returnVal = !checkForKing(color, target)

  if (classHere != null) target.classList.add(classHere)

  if (color == 'white') target.classList.remove('white-king')
  else target.classList.remove('black-king')

  document.getElementById(id).classList.add(`${color}-king`)

  return returnVal
}

const checkForKing = (color, target) => {
  let divs = document.querySelectorAll('.chess-board div')

  for (let div of divs) {
    if (div.classList.length >= 3) {
      let divColor = div.classList[2].slice(0, 5)
      let type = div.classList[2].slice(6)
      let divId = div.id

      if (divColor !== color) {
        if (type === 'pawn' && conditionsOfPawn(divColor, divId, target)) {
          return true
        }
        if (type === 'rook' && conditionsOfRook(divColor, divId, target)) {
          return true
        }
        if (type === 'bishop' && conditionsOfBishop(divColor, divId, target)) {
          return true
        }
        if (
          type === 'queen' &&
          (conditionsOfRook(divColor, divId, target) ||
            conditionsOfBishop(divColor, divId, target))
        ) {
          return true
        }
        if (type === 'knight' && conditionsOfKnight(divColor, divId, target)) {
          return true
        }
        if (
          type === 'king' &&
          conditionsOfKingWithoutChecks(divColor, divId, target)
        ) {
          return true
        }
      }
    }
  }

  return false
}

const conditionsOfKingWithoutChecks = (color, id, target) => {
  let row = parseInt(id[1])
  let col = parseInt(id[3])
  let rowTarget = parseInt(target.id[1])
  let colTarget = parseInt(target.id[3])

  if (row == rowTarget && col == colTarget) return false

  if (!(Math.abs(col - colTarget) <= 1 && Math.abs(row - rowTarget) <= 1))
    return false

  if (target.classList.length >= 3 && target.classList[2].slice(0, 5) === color)
    return false

  return true
}

const checkForCheckMate = (whiteKingId, blackKingId, select) => {
  let divs = document.querySelectorAll('.chess-board div')
  let pieceColor = select ? 'black' : 'white'

  for (let div of divs) {
    if (div.classList.length >= 3) {
      let divColor = div.classList[2].slice(0, 5)
      let pieceType = div.classList[2].slice(6)

      if (divColor == pieceColor) {
        let id = div.id

        for (let target of divs) {
          let validMove = false

          switch (pieceType) {
            case 'pawn':
              validMove = conditionsOfPawn(pieceColor, id, target)
              break
            case 'rook':
              validMove = conditionsOfRook(pieceColor, id, target)
              break
            case 'bishop':
              validMove = conditionsOfBishop(pieceColor, id, target)
              break
            case 'queen':
              validMove =
                conditionsOfRook(pieceColor, id, target) ||
                conditionsOfBishop(pieceColor, id, target)
              break
            case 'knight':
              validMove = conditionsOfKnight(pieceColor, id, target)
              break
            case 'king':
              validMove = conditionsOfKing(pieceColor, id, target)
              break
          }

          if (validMove) {
            let targetClass = null
            let divClass = div.classList[2]

            if (target.classList.length >= 3) {
              targetClass = target.classList[2]
              target.classList.remove(targetClass)
            }
            target.classList.add(divClass)
            div.classList.remove(divClass)

            let isStillInCheck = checkForCheck(
              whiteKingId,
              blackKingId,
              !select
            )

            // Undo the move
            div.classList.add(divClass)
            target.classList.remove(divClass)
            if (targetClass) {
              target.classList.add(targetClass)
            }

            if (!isStillInCheck) {
              return false
            }
          }
        }
      }
    }
  }
  return true
}

// main event
document.addEventListener('click', event => {
  const target = event.target
  para.innerText = ''
  if (target.tagName === 'DIV') {
    if (!firstClickedDiv) {
      firstClickedDiv = target

      if (firstClickedDiv.classList.length >= 3) {
        class_name = firstClickedDiv.classList[2]
      }

      if (select == 1 && class_name.slice(0, 5) === 'white') {
        para.innerText = ('you should select black')
        firstClickedDiv = null
        class_name = null
      } else if (select == 0 && class_name.slice(0, 5) === 'black') {
        para.innerText = ('you should select white')
        firstClickedDiv = null
        class_name = null
      } else if (firstClickedDiv) {
        color = class_name.slice(0, 5)
        type = class_name.slice(6)
        id = firstClickedDiv.id
      }
    } else {
      if (class_name) {
        let validMove = false
        if (firstClickedDiv) {
          switch (type) {
            case 'pawn':
              validMove = conditionsOfPawn(color, id, target)
              break
            case 'rook':
              validMove = conditionsOfRook(color, id, target)
              break
            case 'bishop':
              validMove = conditionsOfBishop(color, id, target)
              break
            case 'queen':
              validMove =
                conditionsOfRook(color, id, target) ||
                conditionsOfBishop(color, id, target)
              break
            case 'knight':
              validMove = conditionsOfKnight(color, id, target)
              break
            case 'king':
              validMove = conditionsOfKing(color, id, target)
              if (color === 'black') {
                blackKingId = target.id
              } else {
                whiteKingId = target.id
              }
              break
          }

          if (validMove) {
            let targetRemoved = null
            doSecondTouch(firstClickedDiv, target, class_name, targetRemoved)

            if (
              type === 'pawn' &&
              (target.id[1] === '1' || target.id[1] === '8')
            ) {
              target.classList.remove(target.classList[2])
              target.classList.add(`${color}-queen`)
            }

            if (checkForCheck(whiteKingId, blackKingId, select)) {
              if (
                type === 'pawn' &&
                (target.id[1] === '1' || target.id[1] === '8')
              ) {
                target.classList.remove(target.classList[2])
                firstClickedDiv.classList.add(`${color}-pawn`)
              }

              if (color === 'black') {
                blackKingId = firstClickedDiv.id
              } else {
                whiteKingId = firstClickedDiv.id
              }

              removeSecondTouch(firstClickedDiv, target, class_name)
            }
          } else {
            para.innerText = 'wrong move'
          }
        }
      }
      class_name = null
      firstClickedDiv = null
    }
  }
  if (checkForCheckMate(whiteKingId, blackKingId, select)) {
    if(checkForCheck(whiteKingId, blackKingId, !select)) {
    para.innerText = 'CheckMate'
    } else {
      para.innerText = 'StaleMate'
    }
    alert('Game Over!!')
  }
})

//shifting pieces
const doSecondTouch = (firstClickedDiv, target, class_name, targetRemoved) => {
  firstClickedDiv.classList.remove(class_name)
  if (target.classList.length >= 3) {
    targetRemoved = target.classList[2]
    target.classList.remove(target.classList[2])
  }

  target.classList.add(class_name)
  select = !select
}

// if anything is wrong it reverses the piece movement
const removeSecondTouch = (
  firstClickedDiv,
  target,
  class_name,
  targetRemoved
) => {
  firstClickedDiv.classList.add(class_name)

  if (targetRemoved == null) {
    target.classList.remove(target.classList[2])
  } else {
    target.classList.remove(target.classList[2])
    target.classList.add(targetRemoved)
  }
  select = !select
}
