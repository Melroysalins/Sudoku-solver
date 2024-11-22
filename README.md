# Sudoku Solver WebApp
This is a web-based Sudoku solver built using Next.js. The application allows users to:

Play Sudoku: Users can input values into the Sudoku grid.

Check Progress: Verify if the current entries are correct and solvable.

Solve Automatically: Automatically solve the Sudoku puzzle using a backtracking algorithm.

Reset the Puzzle: Reset the grid to its initial state.

Key Features

Dynamic Grid Rendering:

The Sudoku grid is rendered dynamically using a 2D array, where -1 represents an empty cell.
Backtracking Algorithm:

The app uses a recursive backtracking algorithm to solve the puzzle. The algorithm checks rows, columns, and 3x3 subgrids to ensure valid placements.
Real-time Updates:

Users can interact with the grid, and changes are updated in real-time using React's state management.
Validation:

The app checks if the puzzle is solvable or complete.
User-friendly Buttons:

 Check: Verifies the current state of the Sudoku grid.

Reset: Resets the grid to the initial unsolved state.

Solve: Automatically solves the puzzle and displays the solution.

# Code Overview

initialSet: Represents the initial state of the Sudoku puzzle with some pre-filled values.
getDeepCopyArr: Creates a deep copy of the Sudoku array to avoid state mutation.
handleInputValue: Handles user input for a specific cell.
solver: The recursive function that solves the Sudoku puzzle using backtracking.
handleCheckSudoko: Compares the user's grid with the solved grid and provides feedback.
handleReset: Resets the grid to its original state.
handleSolveSudoko: Solves the Sudoku puzzle and updates the grid.

# Components
Cell Component:
Each cell in the Sudoku grid is represented by a Cell component. Users can input values into these cells.
How to Run the Project
Clone the Repository:


Copy code
git clone <repository-url>
cd <project-directory>
Install Dependencies: Ensure you have Node.js installed. Then, run:

# Install Dependencies: Ensure you have Node.js installed. Then, run:
npm install


# Run the Development Server: Start the Next.js development server:

npm run dev


# Access the WebApp: Open your browser and go to:\

http://localhost:3000


# Build for Production: To build the project for production:

npm run build



# Usage Instructions
Input Values: Click on a cell and input a number (1-9). Empty cells are represented by -1.

Solve Automatically: Click the Solve button to see the solved puzzle.

Check Progress: Click the Check button to verify the correctness of your inputs.

Reset Puzzle: Click the Reset button to start over.

Let me know if you'd like additional details or adjustments!






