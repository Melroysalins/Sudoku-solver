"use client";
import Cell from "@/components/cell";
import { useState } from "react";

export default function Home() {
  const initialSet = [
    [-1, 5, -1, 9, -1, -1, -1, -1, -1],
    [8, -1, -1, -1, 4, -1, 3, -1, 7],
    [-1, -1, -1, 2, 8, -1, 1, 9, -1],
    [5, 3, 8, 6, -1, 7, 9, 4, -1],
    [-1, 2, -1, 3, -1, 1, -1, -1, -1],
    [1, -1, 9, 8, -1, 4, 6, 2, 3],
    [9, -1, 7, 4, -1, -1, -1, -1, -1],
    [-1, 4, 5, -1, -1, -1, 2, -1, 9],
    [-1, -1, -1, -1, 3, -1, -1, 7, -1],
  ];

  const [sudokoArr, SetSudokoArr] = useState(getDeepCopyArr(initialSet));

  function getDeepCopyArr(arr) {
    return JSON.parse(JSON.stringify(arr));
  }

  const handleInputValue = (e, row, col) => {
    let value = parseInt(e.target.value) || -1,
      grid = getDeepCopyArr(sudokoArr);
    if (value === -1 || value >= 1 || value <= 9) {
      grid[row][col] = value;
    }
    SetSudokoArr(grid);
  };

  function compareSudokos(currentSudoko, solvedSudoko) {
    let res = {
      isComplete: false,
      isSolvable: true,
    };

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 8; j++) {
        if (currentSudoko[i][j] !== solvedSudoko[i][j]) {
          if (currentSudoko[i][j] !== -1) {
            res.isSolvable = false;
          }
          res.isComplete = false;
        }
      }
    }
    return res;
  }

  const handleCheckSudoko = () => {
    let sudoko = getDeepCopyArr(initialSet);
    solver(sudoko);

    let compare = compareSudokos(sudokoArr, sudoko);

    if (compare.isComplete) {
      alert("Congratulations! You have solved Sudoku");
    } else if (compare.isSolvable) {
      alert("Keep going !");
    } else {
      alert("Sudoku can't be solved ! Try again");
    }
  };

  const handleReset = () => {
    let sudoko = getDeepCopyArr(initialSet);
    SetSudokoArr(sudoko);
  };

  function checkRow(grid, row, num) {
    return grid[row].indexOf(num) === -1;
  }

  function checkCol(grid, col, num) {
    return grid?.map((row) => row[col]).indexOf(num) === -1;
  }

  function checkBox(grid, row, col, num) {
    let boxArr = [];
    let rowStart = row - (row % 3);
    let colStart = col - (col % 3);

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        boxArr.push(grid[rowStart + i][colStart + j]);
      }
    }

    return boxArr.indexOf(num) === -1;
  }

  function isCheckValid(grid, row, col, num) {
    if (
      checkRow(grid, row, num) &&
      checkCol(grid, col, num) &&
      checkBox(grid, row, col, num)
    ) {
      return true;
    }

    return false;
  }

  function getNext(row, col) {
    return col !== 8 ? [row, col + 1] : row !== 8 ? [row + 1, 0] : [0, 0];
  }

  // recursive function to solve sudoko
  function solver(grid, row = 0, col = 0) {
    if (row === 8 && col === 8) {
      // End of grid
      if (grid[row][col] !== -1) return true;

      for (let num = 1; num <= 9; num++) {
        if (isCheckValid(grid, row, col, num)) {
          grid[row][col] = num;
          return true;
        }
      }
      grid[row][col] = -1; // Reset cell
      return false;
    }

    if (grid[row][col] !== -1) {
      // Skip filled cells
      let [newRow, newCol] = getNext(row, col);
      return solver(grid, newRow, newCol);
    }

    for (let num = 1; num <= 9; num++) {
      if (isCheckValid(grid, row, col, num)) {
        grid[row][col] = num;

        let [newRow, newCol] = getNext(row, col);
        if (solver(grid, newRow, newCol)) {
          return true;
        }
      }
    }

    grid[row][col] = -1; // Reset cell
    return false;
  }

  const handleSolveSudoko = () => {
    let sudoko = getDeepCopyArr(initialSet);

    solver(sudoko);
    console.log(sudoko);
    SetSudokoArr(sudoko);
  };

  return (
    <div className="App">
      <h1>Sudoku Solver WebApp</h1>
      <table className="table">
        <tbody>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8]?.map((row, rowIndex) => {
            return (
              <tr
                key={rowIndex}
                className={(row + 1) % 3 === 0 ? "bBorder" : ""}
              >
                {[0, 1, 2, 3, 4, 5, 6, 7, 8]?.map((col, colIndex) => {
                  return (
                    <td
                      key={colIndex + rowIndex}
                      className={(col + 1) % 3 === 0 ? "rBorder" : ""}
                    >
                      <Cell
                        key={rowIndex * colIndex}
                        row={row}
                        col={col}
                        initialSet={initialSet}
                        colvalue={
                          sudokoArr[rowIndex][colIndex] === -1
                            ? ""
                            : sudokoArr[rowIndex][colIndex]
                        }
                        handleInputValue={handleInputValue}
                      />
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="button-containner">
        <button className="check-btn" onClick={() => handleCheckSudoko()}>
          Check
        </button>
        <button className="reset-btn" onClick={() => handleReset()}>
          Reset
        </button>
        <button className="solve-btn" onClick={() => handleSolveSudoko()}>
          {" "}
          Solve
        </button>
      </div>
    </div>
  );
}
