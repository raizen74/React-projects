import { createContext, useContext } from "react";

const AccordionContext = createContext();

export function useAccordionItemContext() {
  const ctx = useContext(AccordionContext);

  if (!ctx) {
    throw new Error(
      "AccordionItem-related components must be wrapped by <Accordion.Item>."
    );
  }

  return ctx;
}

export default function AccordionItem({ id, className, children }) {
  return (
    <AccordionContext.Provider value={id}>
      <li className={className}>{children}</li>
    </AccordionContext.Provider>
  );
}
