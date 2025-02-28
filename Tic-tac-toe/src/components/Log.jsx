export default function Log({ turns }) {
  // when ouputing a dynamic list, you must specify the key attribute, which must be unique for each list el
  // `` JS template literal
  return (
    <ol id="log">
      {turns.map((turn) => (
        <li key={`${turn.square.row}${turn.square.col}`}>
          {turn.player} selected {turn.square.row}, {turn.square.col}
        </li>
      ))}
    </ol>
  );
}
