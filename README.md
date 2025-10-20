# Client-Side Chess Game (HTML, CSS, JS)

This repository contains a complete, 2-player **chess game** built entirely with **HTML, CSS, and vanilla JavaScript**.

The application runs entirely in the browser, handling all game logic, move validation, and win conditions (check, checkmate, and stalemate) on the client side.

---

## 📘 Overview

This project demonstrates how to build a complex, stateful application using only core web technologies. It uses the DOM to represent the chessboard and CSS for all styling, including the board and pieces (which are loaded as background images).

The JavaScript file contains all the logic for a 2-player game, including managing turns, validating moves for every piece, and checking for game-ending conditions.

---

## 🧠 Problem Statement

To create a functional, interactive, 2-player chess game in a web browser. The application must:
-   Visually represent an 8x8 chessboard and all 32 pieces.
-   Correctly enforce move validation for all 6 piece types (pawn, rook, knight, bishop, queen, king).
-   Manage alternating player turns (White and Black).
-   Detect and announce when a king is in **check**.
-   Correctly identify **checkmate** and **stalemate** conditions to end the game.

---

## ⚙️ Tech Stack

-   **HTML5**
-   **CSS3**
-   **Vanilla JavaScript (ES6+)**

---

## 🚀 Features

-   **Full 8x8 Chessboard**: An interactive board rendered with HTML and styled with CSS.
-   **Complete Move Validation**: The game logic correctly handles the unique movement and capture rules for pawns, rooks, knights, bishops, queens, and kings.
-   **Player Turn Management**: The game state alternates between White (select=0) and Black (select=1).
-   **Check Detection**: The `checkForCheck` function runs after every move to determine if the opposing king is under attack.
-   **Checkmate & Stalemate Detection**: The `checkForCheckMate` function correctly identifies if a player is in checkmate (in check and no legal moves) or stalemate (not in check and no legal moves), ending the game.
-   **Piece Capture**: Supports capturing by moving onto an opponent's square.

---

## 🛠️ Future Work

Based on the project's `still_to_do.txt` file, the following features are planned for implementation:

-   **Pawn Promotion**: Adding the UI and logic to allow a player to choose a new piece (Queen, Rook, etc.) when a pawn reaches the end of the board.
-   **Castling**: Implementing the special King-side and Queen-side castling move.

---

## ▶️ How to Run

1.  **Clone the repository**
    ```bash
    git clone https://github.com/Ramcharan2905/chess
    cd chess-frontend
    ```

2.  **Add Piece Images**
    This project requires 12 image files for the pieces (e.g., `black-pawn.png`, `white-king.png`). Make sure these `.png` files, which are referenced in `style.css`, are in the same directory as the `index.html` file.

3.  **Open in Browser**
    No server is required. Simply open the `index.html` file in any modern web browser.
    ```bash
    # On Windows
    start index.html
    
    # On macOS
    open index.html
    
    # On Linux
    xdg-open index.html
    ```
