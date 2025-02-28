import { useState } from "react";

export default function Player({ initialName, symbol, isActive, onChangeName }) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() { // can access the function scope
    setIsEditing(editing => !editing);
    if (isEditing) {
    onChangeName(symbol, playerName);
    }
  }

  function handleChange(event) { // every keystroke that the user types is passed automatically
    setPlayerName(event.target.value);
  }

  return (
    // dynamically pass a CSS class 'active'
    <li className={isActive ? 'active' : undefined}>
      <span className="player">
        {!isEditing ? (
          <span className="player-name">{playerName}</span>
        ) : (
          <input type="text" required value={playerName} onChange={handleChange}></input> //playerName is updated dynamically 
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
