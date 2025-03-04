import { useContext } from "react";
import { currencyFormatter } from "../utils/formatting";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";

// renders a single meal item
export default function MealItem({ meal }) {
  const cartCtx = useContext(CartContext); // import the context
  
  function handleAddMeal() {
    cartCtx.addItem(meal); // call the addItem function from the context, mo
  }

  return (
    <li className='meal-item'>
      <article>
        <img src={`http://172.30.210.50:3000/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className='meal-item-price'>
            {currencyFormatter.format(meal.price)}
          </p>
          <p className='meal-item-description'>{meal.description}</p>
        </div>
        <p className='meal-item-actions'>
          <Button onClick={handleAddMeal}>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
}
