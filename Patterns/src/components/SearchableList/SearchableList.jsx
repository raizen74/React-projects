import { useRef, useState } from "react";

export default function SearchableList({ items, itemKeyFn, children }) {
  const lastChange = useRef();
  const [searchTerm, setSearchTerm] = useState("");

  const searchResults = items.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleChange(event) {
    // if there is a timer, cancel it
    if (lastChange.current) {
      clearTimeout(lastChange.current);
    }
    
    // store the timerid instance in state
    lastChange.current = setTimeout(() => {
      lastChange.current = null; // clear the pointer
      setSearchTerm(event.target.value);
    }, 500); // state only is updated after 500 ms
    // set the state to the input value set by the user
    // setSearchTerm(event.target.value);
  }

  return (
    <div className='searchable-list'>
      <input type='search' placeholder='Search' onChange={handleChange} />
      <ul>
        {searchResults.map((item) => (
          <li key={itemKeyFn(item)}>{children(item)}</li>
        ))}
      </ul>
    </div>
  );
}
