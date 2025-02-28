import { useState, useRef } from "react";

export default function Player() {
  const playerName = useRef(); // returns a JS object that has .current property
  const [enteredPlayerName, setEnteredPlayerName] = useState("");
  // const [submitted, setSubmitted] = useState(false)

  // function handleChange(event) {  // React will execute this function for every character entered in <input></ipu>
  //   setSubmitted(false)
  //   setPlayerName(event.target.value)
  // }

  function handleClick() {
    setEnteredPlayerName(playerName.current.value); // playerName.current holds the <input> element as value
    // so we access the text typed in input via .value and update state
  }
  return (
    // enteredPlayerName ?? 'unknown identity' -> shortcut for ternary conditional, outputs enteredPlayerName if truthy
    <section id="player">
      <h2>Welcome {enteredPlayerName ?? "unknown identity"}</h2>
      <p>
        <input ref={playerName} type="text" />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
