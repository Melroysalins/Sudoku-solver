import React from "react";

const Cell = ({ colvalue, handleInputValue, row, col, initialSet }) => {
  return (
    <div className="cell">
      <input
        type="text"
        value={colvalue}
        className={colvalue ? "filledInput" : "emptyInput"}
        onChange={(e) => handleInputValue(e, row, col)}
        disabled={initialSet[row][col] !== -1}
      />
    </div>
  );
};

export default Cell;
