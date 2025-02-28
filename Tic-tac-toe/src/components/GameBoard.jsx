

export default function GameBoard({ onSelectSquare, board }) {
  // activePlayerSymbol => 'X' or 'O'
  // onSelectSquare => switches activePlayerSymbol from 'X' to 'O' and viceversa
  //   const [gameBoard, setGameBoard] = useState(initialGameBoard);

  //   function handleSelectSquare(rowIndex, colIndex) {
  //     setGameBoard((prevGameBoard) => {
  //         const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])]; // create a deep copy
  //         updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
  //         return updatedBoard
  //     });

  //     onSelectSquare();
  //   }
// disabled prop is supported in the builtin button JSX component, if playerSymbol exist it means that the cell is filled
  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                  disabled={playerSymbol !== null}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
