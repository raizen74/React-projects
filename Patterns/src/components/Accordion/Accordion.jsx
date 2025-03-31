import { useContext, useState, createContext } from "react";
import AccordionItem from "./AccordionItem";
import AccordionTitle from "./AccordionTitle";
import AccordionContent from "./AccordionContent";
const AccordionContext = createContext();

export function useAccordionContext() {
  const ctx = useContext(AccordionContext);

  if (!ctx) {
    throw new Error(
      "Accordion-related components must be wrapped by <Accordion></Accordion>"
    );
  }

  return ctx;
}

export default function Accordion({ children, className }) {
  // substituted by toggleItem
  // function openItem(id) {
  //   setOpenItemId(id);
  // }
  // function closeItem() {
  //   setOpenItemId(null);
  // }
  const [openItemId, setOpenItemId] = useState();

  function toggleItem(id) {
    // if the same id is clicked, toggle. If not replace
    setOpenItemId((prevId) => (prevId === id ? null : id));
  }

  const contextValue = {
    openItemId: openItemId,
    toggleItem,
    // openItem,
    // closeItem,
  };

  return (
    <AccordionContext.Provider value={contextValue}>
      <ul className={className}>{children}</ul>
    </AccordionContext.Provider>
  );
}

Accordion.Item = AccordionItem;
Accordion.Title = AccordionTitle;
Accordion.Content = AccordionContent;
